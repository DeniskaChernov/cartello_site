/**
 * Google Sheets integration for Cartello contact form
 * 
 * Setup instructions:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project or select existing one
 * 3. Enable Google Sheets API
 * 4. Create Service Account (IAM & Admin > Service Accounts)
 * 5. Create JSON key for the service account
 * 6. Copy the entire JSON content and save it as GOOGLE_SHEETS_CREDENTIALS secret
 * 7. Create a Google Sheet and share it with the service account email
 * 8. Copy the Sheet ID from URL and save as GOOGLE_SHEETS_ID secret
 */

interface SheetRow {
  timestamp: string;
  name: string;
  phone: string;
  service: string;
  email: string;
  comment: string;
}

/**
 * Appends a new row to Google Sheets
 */
export async function appendToSheet(data: {
  name: string;
  phone: string;
  service?: string;
  email?: string;
  comment?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const credentials = Deno.env.get("GOOGLE_SHEETS_CREDENTIALS");
    const spreadsheetId = Deno.env.get("GOOGLE_SHEETS_ID");

    if (!credentials || !spreadsheetId) {
      console.error("Google Sheets not configured");
      return {
        success: false,
        error: "Google Sheets credentials not configured",
      };
    }

    // Parse credentials
    const creds = JSON.parse(credentials);
    const { client_email, private_key } = creds;

    // Get OAuth2 access token
    const accessToken = await getAccessToken(client_email, private_key);

    // Prepare row data
    const timestamp = new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Tashkent",
    });
    const rowData = [[
      timestamp,
      data.name,
      data.phone,
      data.service || "-",
      data.email || "-",
      data.comment || "-",
    ]];

    // Append to sheet (колонки A–F: время, имя, телефон, услуга, email, комментарий)
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:F:append?valueInputOption=RAW`;

    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: rowData,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheets API error:", errorText);
      return { success: false, error: "Failed to write to Google Sheets" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Gets OAuth2 access token for Google Sheets API
 */
async function getAccessToken(
  clientEmail: string,
  privateKey: string,
): Promise<string> {
  // Create JWT header
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  // Create JWT claim set
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  // Encode header and claim
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaim = base64UrlEncode(JSON.stringify(claim));
  const signatureInput = `${encodedHeader}.${encodedClaim}`;

  // Sign with private key
  const signature = await sign(signatureInput, privateKey);
  const jwt = `${signatureInput}.${signature}`;

  // Exchange JWT for access token
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${await response.text()}`);
  }

  const { access_token } = await response.json();
  return access_token;
}

/**
 * Signs data with RSA-SHA256
 */
async function sign(data: string, privateKey: string): Promise<string> {
  // Import private key
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = privateKey
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  // Sign data
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    encoder.encode(data),
  );

  // Encode signature
  return base64UrlEncode(signature);
}

/**
 * Base64 URL encode
 */
function base64UrlEncode(data: string | ArrayBuffer): string {
  let base64: string;

  if (typeof data === "string") {
    base64 = btoa(data);
  } else {
    const bytes = new Uint8Array(data);
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
      "",
    );
    base64 = btoa(binary);
  }

  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
