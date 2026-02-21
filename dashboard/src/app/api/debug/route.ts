import { NextResponse } from "next/server";

export async function GET() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const rawKey = process.env.GA4_SERVICE_ACCOUNT_KEY;
  const keyPath = process.env.GA4_SERVICE_ACCOUNT_KEY_PATH;

  let keyInfo = "not set";
  if (rawKey) {
    keyInfo = `set (${rawKey.length} chars, starts with: ${rawKey.substring(0, 20)}...)`;
    try {
      let parsed;
      try {
        parsed = JSON.parse(rawKey);
      } catch {
        const decoded = Buffer.from(rawKey, "base64").toString("utf-8");
        parsed = JSON.parse(decoded);
        keyInfo += " [decoded from base64]";
      }
      keyInfo += ` | client_email: ${parsed.client_email ?? "missing"} | has_private_key: ${Boolean(parsed.private_key)}`;
    } catch (e) {
      keyInfo += ` | PARSE FAILED: ${e instanceof Error ? e.message : String(e)}`;
    }
  }

  return NextResponse.json({
    GA4_PROPERTY_ID: propertyId ?? "not set",
    GA4_SERVICE_ACCOUNT_KEY: keyInfo,
    GA4_SERVICE_ACCOUNT_KEY_PATH: keyPath ?? "not set",
  });
}
