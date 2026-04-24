/**
 * BT API Generic Caller
 * Equivalent to call_api() in WordPress plugin
 *
 * Handles auth headers, tracking UUID, retry with exponential back-off,
 * and normalised error/success responses.
 */

import { getAccessToken } from "./authToken";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  status_code: number;
  data: T;
  retry_count: number;
}

export interface ApiErrorResponse {
  success: false;
  status_code?: number;
  message: string;
  body?: unknown;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface CallApiOptions {
  method?: HttpMethod;
  body?: Record<string, unknown> | unknown[];
  headers?: Record<string, string>;
  retryCount?: number;
  maxRetries?: number;
  /** Pass true to suppress console logging (e.g. for high-volume endpoints) */
  silent?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateUUID(): string {
  // crypto.randomUUID() is available in Node 19+ / Edge runtime
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older runtimes
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Retryable HTTP status codes */
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

// ─── Core function ────────────────────────────────────────────────────────────

/**
 * Make an authenticated request to the BT API.
 *
 * Required env var:
 *   BT_API_BASE_URL  – e.g. https://api.bt.com
 */
export async function callApi<T = unknown>(
  endpoint: string,
  options: CallApiOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    body,
    headers: extraHeaders = {},
    retryCount = 0,
    maxRetries = 3,
    silent = false,
  } = options;

  const baseUrl = process.env.NEXT_BT_ENDPOINT_URI;
  if (!baseUrl) {
    return {
      success: false,
      message:
        "BT_API_BASE_URL environment variable is not set.",
    };
  }

  // ── 1. Obtain token ──────────────────────────────────────────────────────
  let token: string;
  try {
    token = await getAccessToken();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to retrieve access token";
    return { success: false, message };
  }

  // ── 2. Build request ─────────────────────────────────────────────────────
  const url = `${baseUrl}${endpoint}`;
  const trackingUUID = generateUUID();

  const defaultHeaders: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "APIGW-Tracking-Header": trackingUUID,
  };

  const mergedHeaders = { ...defaultHeaders, ...extraHeaders };

  const fetchOptions: RequestInit = {
    method,
    headers: mergedHeaders,
    cache: "no-store",
  };

  if (["POST", "PUT", "PATCH"].includes(method) && body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
    if (!silent) {
      console.log(`[BT API] [${method}] ${endpoint} → request body:`, body);
    }
  }

  if (!silent) {
    console.log(`[BT API] REQUEST [${method}] ${url} (tracking: ${trackingUUID})`);
  }

  // ── 3. Execute request ───────────────────────────────────────────────────
  let response: Response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (networkErr) {
    const message =
      networkErr instanceof Error
        ? networkErr.message
        : "Network error occurred";

    if (!silent) {
      console.error(`[BT API] NETWORK ERROR [${method}] ${endpoint}:`, message);
    }

    // Retry on network errors
    if (retryCount < maxRetries) {
      await sleep(Math.pow(2, retryCount) * 1000);
      return callApi<T>(endpoint, {
        ...options,
        retryCount: retryCount + 1,
      });
    }

    return { success: false, message };
  }

  // ── 4. Parse response ────────────────────────────────────────────────────
  const statusCode = response.status;
  let responseData: T | undefined;

  try {
    const text = await response.text();
    responseData = text ? (JSON.parse(text) as T) : undefined;
  } catch {
    responseData = undefined;
  }

  if (!silent) {
    console.log(`[BT API] RESPONSE [${method}] ${endpoint} → status: ${statusCode}`);
  }

  // ── 5. Handle HTTP errors ────────────────────────────────────────────────
  if (statusCode >= 400) {
    // Retry on transient server errors
    if (retryCount < maxRetries && RETRYABLE_STATUSES.has(statusCode)) {
      if (!silent) {
        console.warn(
          `[BT API] Retrying ${endpoint} (attempt ${retryCount + 1}/${maxRetries}) after status ${statusCode}`
        );
      }
      await sleep(Math.pow(2, retryCount) * 1000);
      return callApi<T>(endpoint, {
        ...options,
        retryCount: retryCount + 1,
      });
    }

    // Build a descriptive error message from BT's standard fault envelope
    const errorBody = responseData as Record<string, unknown> | undefined;
    let errorMessage = `API returned error: ${statusCode}`;

    const fault = errorBody?.fault as Record<string, unknown> | undefined;
    if (fault?.faultstring) {
      errorMessage += ` - ${fault.faultstring}`;
    } else if (errorBody?.message) {
      errorMessage += ` - ${errorBody.message}`;
    }

    return {
      success: false,
      status_code: statusCode,
      message: errorMessage,
      body: responseData,
    };
  }

  // ── 6. Success ───────────────────────────────────────────────────────────
  return {
    success: true,
    status_code: statusCode,
    data: responseData as T,
    retry_count: retryCount,
  };
}