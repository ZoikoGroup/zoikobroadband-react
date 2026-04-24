"use client";

import {
  useState,
  useRef,
  type FormEvent,
  useEffect,
} from "react";

/* -------------------------------------------------------------
   Types – the shape of the address that the BT endpoint returns
   ------------------------------------------------------------ */
interface FormattedAddress {
  /** A globally unique identifier (or a deterministic fallback) */
  uid: string; // ← **new field** – we will generate it on the client
  display: string;
  streetNr?: string;
  streetName?: string;
  city?: string;
  postcode: string;
  districtCode?: string;
  uprn?: string;
  exchangeGroupCode?: string;
  qualifier?: string;
}

/* -------------------------------------------------------------
   API response wrapper
   ------------------------------------------------------------ */
interface SearchResponse {
  success: boolean;
  addresses?: Omit<FormattedAddress, "uid">[]; // raw items – no uid yet
  count?: number;
  cached?: boolean;
  message?: string;
}

/* -------------------------------------------------------------
   Props that the parent component can pass in
   ------------------------------------------------------------ */
interface PostcodeSearchBarProps {
  /** Called when user picks an address */
  onAddressSelect?: (address: FormattedAddress) => void;
  /** Called after a successful search (full list) */
  onSearchSuccess?: (addresses: FormattedAddress[]) => void;
  /** Called on any error */
  onSearchError?: (message: string) => void;

  buttonLabel?: string;
  loadingLabel?: string;
  placeholder?: string;
  /** Override the default API endpoint */
  apiEndpoint?: string;
}

/* ==============================================================
   Helper – create a *deterministic* unique identifier
   ============================================================== */
function makeUid(addr: Omit<FormattedAddress, "uid">): string {
  // Prefer the UPRN (guaranteed unique).  If not present we compose a
  // string that will be the same for the same address but different for
  // any other address.
  return addr.uprn
    ? `uprn-${addr.uprn}`
    : `fallback-${addr.display}-${addr.city ?? ""}-${addr.postcode}`;
}

/* ==============================================================
   Component implementation
   ============================================================== */
export default function PostcodeSearchBar({
  onAddressSelect,
  onSearchSuccess,
  onSearchError,
  buttonLabel = "See your deals",
  loadingLabel = "Searching…",
  placeholder = "Enter postcode",
  apiEndpoint = "/api/BritishTelecom/search-address",
}: PostcodeSearchBarProps) {
  /* --------------------------- */
  /* State                        */
  /* --------------------------- */
  const [postcode, setPostcode] = useState(""); // what the user types (or the selected address)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawAddresses, setRawAddresses] = useState<Omit<FormattedAddress, "uid">[] | null>(null);
  const [addresses, setAddresses] = useState<FormattedAddress[] | null>(null); // **with uid**
  const [selectedKey, setSelectedKey] = useState<string | null>(null); // uid of chosen address
  const [selectedAddress, setSelectedAddress] = useState<FormattedAddress | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  /* --------------------------- */
  /* Side‑effects                  */
  /* --------------------------- */

  // Close dropdown on click‑outside (or Escape)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        listboxRef.current &&
        !listboxRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    function handleEsc(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // When we get the raw list from the API we transform it once
  // (add uid, dedupe) and store it in `addresses`.
  useEffect(() => {
    if (!rawAddresses) {
      setAddresses(null);
      return;
    }

    const withUid: FormattedAddress[] = rawAddresses.map((a) => ({
      ...a,
      uid: makeUid(a),
    }));

    // Optional – dedupe identical `uid`s (the BT data can contain many copies)
    const seen = new Set<string>();
    const deduped: FormattedAddress[] = [];
    withUid.forEach((a) => {
      if (!seen.has(a.uid)) {
        seen.add(a.uid);
        deduped.push(a);
      }
    });

    setAddresses(deduped);
    setDropdownOpen(true);
  }, [rawAddresses]);

  /* --------------------------- */
  /* Handlers                     */
  /* --------------------------- */

  async function handleSearch(e?: FormEvent) {
    e?.preventDefault();

    const trimmed = postcode.trim();
    if (!trimmed) {
      setError("Please enter a postcode");
      inputRef.current?.focus();
      return;
    }

    // Reset state for a fresh search
    setLoading(true);
    setError(null);
    setAddresses(null);
    setRawAddresses(null);
    setSelectedAddress(null);
    setSelectedKey(null);
    setDropdownOpen(false);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postcode: trimmed }),
      });

      const data: SearchResponse = await res.json();

      if (!data.success) {
        const msg = data.message ?? "Something went wrong. Please try again.";
        setError(msg);
        onSearchError?.(msg);
        return;
      }

      const found = data.addresses ?? [];
      setRawAddresses(found);
      onSearchSuccess?.(
        // we can give the parent the enriched objects (with uid) here:
        found.map((a) => ({
          ...a,
          uid: makeUid(a),
        }))
      );
    } catch {
      const msg = "Network error. Please check your connection and try again.";
      setError(msg);
      onSearchError?.(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(addr: FormattedAddress) {
    setSelectedAddress(addr);
    setSelectedKey(addr.uid);
    // We want the *full address* in the input, not just the postcode
    const addressString = [addr.display, addr.city, addr.postcode]
      .filter(Boolean)
      .join(", ");
    setPostcode(addressString);
    setDropdownOpen(false);
    onAddressSelect?.(addr);
    // Move focus back to the field – useful for accessibility
    inputRef.current?.focus();
  }

  function clearSelection() {
    setSelectedAddress(null);
    setSelectedKey(null);
    setPostcode("");
    inputRef.current?.focus();
    // Show the list again if a postcode is already typed (optional)
    if (rawAddresses) setDropdownOpen(true);
  }

  /* --------------------------- */
  /* Render UI                    */
  /* --------------------------- */
  return (
    <div className="w-full">
      {/* -----------------------------------------------------------------
          Search form – the same as before, we just bind `value` to the
          `postcode` state (which now also holds the selected address string)
         ----------------------------------------------------------------- */}
      <form
        className="flex flex-col md:flex-row gap-4 items-center"
        noValidate
        onSubmit={handleSearch}
      >
        <label htmlFor="postcode-input" className="sr-only">
          Enter your postcode
        </label>

        <div className="relative flex-1 w-full">
          <input
            ref={inputRef}
            id="postcode-input"
            name="postcode"
            type="text"
            autoComplete="postal-code"
            placeholder={placeholder}
            required
            pattern="^[A-Za-z0-9 ]{5,8}$"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            disabled={loading}
            maxLength={8}
            className="w-full text-gray-700 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10446C] disabled:opacity-60 disabled:cursor-not-allowed"
          />

          {/* ✕ button – only visible when something is selected */}
          {selectedAddress && (
            
            <button
              type="button"
              onClick={clearSelection}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear selected address"
            >
              X
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-7 py-3 rounded-full bg-[#10446C] font-semibold text-white hover:bg-[#0d3555] transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              {loadingLabel}
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </form>

      {/* -----------------------------------------------------------------
          Inline error message
         ----------------------------------------------------------------- */}
      {error && (
        <p className="mt-3 text-sm text-red-600 text-left" role="alert">
          {error}
        </p>
      )}

      {/* -----------------------------------------------------------------
          Addresses dropdown – only rendered when we have a list and it’s open
         ----------------------------------------------------------------- */}
      {addresses !== null && dropdownOpen && (
        <div className="mt-5 text-left">
          {addresses.length === 0 ? (
            <p className="text-sm text-gray-500">
              No addresses found for this postcode.
            </p>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                {addresses.length} address{addresses.length !== 1 ? "es" : ""} found
              </p>

              <ul
                ref={listboxRef}
                className="divide-y divide-gray-100 max-h-64 overflow-y-auto rounded-lg border border-gray-200"
                role="listbox"
                aria-label="Select your address"
              >
                {addresses.map((addr) => {
                  const selected = selectedKey === addr.uid;
                  return (
                    <li
                      key={addr.uid}
                      role="option"
                      aria-selected={selected}
                      onClick={() => handleSelect(addr)}
                      className={`flex items-baseline justify-between gap-3 px-4 py-3 cursor-pointer transition-colors
                        ${selected ? "bg-[#eaf2ff] border-l-4 border-[#10446C]" : "hover:bg-gray-50"}
                      `}
                    >
                      <span className="text-sm font-medium text-gray-800 flex-1">
                        {addr.display}
                      </span>
                      {addr.city && (
                        <span className="text-xs text-gray-500 shrink-0">{addr.city}</span>
                      )}
                      <span className="text-xs font-semibold text-[#10446C] tracking-wider shrink-0">
                        {addr.postcode}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}

    </div>
  );
}
