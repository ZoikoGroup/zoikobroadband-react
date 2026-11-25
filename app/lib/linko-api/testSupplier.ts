/**
 * Development-only test supplier for the address and availability journey
 * (Doc02 §13.2 "mock suppliers, synthetic data, no live credentials", NFR-08 deterministic fakes).
 *
 * Used when the BT integration isn't configured on a developer machine, so the Linko
 * "Check availability" journey can still be exercised end to end. Every address is labelled
 * "TEST" and every result says it is test data. It can NEVER run in production.
 *
 *   LINKO_TEST_SUPPLIER=true   force on (non-production only)
 *   LINKO_TEST_SUPPLIER=false  force off (you'll see the real "can't check" error instead)
 *   (unset)                    on in development only when BT_API_BASE_URL is missing
 */

const IS_PRODUCTION = (process.env.LINKO_ENVIRONMENT || process.env.NODE_ENV) === "production";

export function testSupplierEnabled(): boolean {
  if (IS_PRODUCTION) return false;
  const flag = process.env.LINKO_TEST_SUPPLIER;
  if (flag === "false") return false;
  if (flag === "true") return true;
  return !process.env.BT_API_BASE_URL;
}

export const TEST_SOURCE = "test_supplier";
export const TEST_NOTICE = "Test data: BT isn't connected in this environment, so these results are made up for testing.";

/** Four premises per postcode, one per scenario: both technologies, Full Fibre only, Part Fibre only, nothing confirmed. */
const SCENARIOS = [
  { suffix: "1", line: "Flat 1, 10 Example Street", tech: ["FTTP", "SOGEA"] },
  { suffix: "2", line: "12 Example Street", tech: ["FTTP"] },
  { suffix: "3", line: "14 Example Street", tech: ["SOGEA"] },
  { suffix: "4", line: "16 Example Street (no service found)", tech: [] as string[] },
];

export function testAddresses(postcode: string) {
  return SCENARIOS.map((s) => ({ id: `TEST-${s.suffix}`, display: `TEST – ${s.line}, ${postcode}`, districtCode: "TS" }));
}

/** Technologies for a test premises id, or null when the id isn't a test id. */
export function testQualification(supplierId: string): string[] | null {
  const s = SCENARIOS.find((x) => `TEST-${x.suffix}` === supplierId);
  return s ? s.tech : null;
}
