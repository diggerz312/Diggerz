// Reddit OAuth 2.0 PKCE helpers (installed app type — no client_secret required)
// Docs: https://www.reddit.com/dev/api/oauth

const REDDIT_CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID || "";
const REDDIT_REDIRECT_URI = import.meta.env.VITE_REDDIT_REDIRECT_URI || window.location.origin;

const REDDIT_STATE_KEY = "diggerz_reddit_state";
const REDDIT_VERIFIER_KEY = "diggerz_reddit_verifier";

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return hash;
}

function base64urlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64urlEncode(array);
}

async function generateCodeChallenge(verifier) {
  const hash = await sha256(verifier);
  return base64urlEncode(hash);
}

function generateState() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return base64urlEncode(array);
}

export async function startRedditLogin() {
  if (!REDDIT_CLIENT_ID) {
    alert("Reddit Client ID not configured. Set VITE_REDDIT_CLIENT_ID in your .env file.");
    return;
  }

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = generateState();

  sessionStorage.setItem(REDDIT_VERIFIER_KEY, verifier);
  sessionStorage.setItem(REDDIT_STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: REDDIT_CLIENT_ID,
    response_type: "code",
    state,
    redirect_uri: REDDIT_REDIRECT_URI,
    duration: "temporary",
    scope: "identity",
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  window.location.href = `https://www.reddit.com/api/v1/authorize?${params}`;
}

export async function handleRedditCallback(code, state) {
  const savedState = sessionStorage.getItem(REDDIT_STATE_KEY);
  const verifier = sessionStorage.getItem(REDDIT_VERIFIER_KEY);

  if (!savedState || savedState !== state) {
    throw new Error("State mismatch — possible CSRF attack.");
  }

  sessionStorage.removeItem(REDDIT_STATE_KEY);
  sessionStorage.removeItem(REDDIT_VERIFIER_KEY);

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDDIT_REDIRECT_URI,
    code_verifier: verifier,
  });

  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${REDDIT_CLIENT_ID}:`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) throw new Error("Reddit token exchange failed.");
  const tokens = await response.json();

  const meRes = await fetch("https://oauth.reddit.com/api/v1/me", {
    headers: { Authorization: `bearer ${tokens.access_token}` },
  });

  if (!meRes.ok) throw new Error("Failed to fetch Reddit user info.");
  const me = await meRes.json();

  return {
    provider: "reddit",
    id: me.id,
    name: me.name,
    email: null,
    avatar: me.icon_img?.split("?")[0] || null,
  };
}

export function getRedditCallbackParams() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");
  const error = params.get("error");
  if (error) return { error };
  if (code && state) return { code, state };
  return null;
}
