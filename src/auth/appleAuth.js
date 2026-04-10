// Apple Sign In for the Web — loads Apple's JS SDK dynamically
// Docs: https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js

const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID || "";
const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI || window.location.origin;

function loadAppleScript() {
  return new Promise((resolve, reject) => {
    if (window.AppleID) { resolve(); return; }
    const script = document.createElement("script");
    script.src = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Failed to load Apple Sign-In SDK."));
    document.head.appendChild(script);
  });
}

export async function startAppleLogin() {
  if (!APPLE_CLIENT_ID) {
    alert("Apple Client ID not configured. Set VITE_APPLE_CLIENT_ID in your .env file.");
    return;
  }

  await loadAppleScript();

  window.AppleID.auth.init({
    clientId: APPLE_CLIENT_ID,
    scope: "name email",
    redirectURI: APPLE_REDIRECT_URI,
    usePopup: true,
  });

  try {
    const response = await window.AppleID.auth.signIn();
    const { authorization, user } = response;

    // Decode id_token payload (base64url).
    // NOTE: Full signature verification requires Apple's JWKS and is best done
    // server-side. Here we validate the essential claims (iss, exp, aud) so that
    // an obviously invalid or expired token is rejected client-side.
    const [, payload] = authorization.id_token.split(".");
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));

    // Validate issuer
    if (decoded.iss !== "https://appleid.apple.com") {
      throw new Error("Invalid Apple token issuer.");
    }
    // Validate audience (must match our client ID)
    if (decoded.aud !== APPLE_CLIENT_ID) {
      throw new Error("Apple token audience mismatch.");
    }
    // Validate expiry
    if (!decoded.exp || Date.now() / 1000 > decoded.exp) {
      throw new Error("Apple token has expired.");
    }

    return {
      provider: "apple",
      id: decoded.sub,
      name: user
        ? `${user.name?.firstName || ""} ${user.name?.lastName || ""}`.trim() || "Apple User"
        : "Apple User",
      email: decoded.email || user?.email || null,
      avatar: null,
    };
  } catch (err) {
    if (err?.error === "popup_closed_by_user") return null;
    throw err;
  }
}
