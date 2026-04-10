import { useState, useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "./AuthContext.jsx";
import { startRedditLogin } from "./redditOAuth.js";
import { startAppleLogin } from "./appleAuth.js";

// ─── colour tokens (mirror the main app palette) ───
const P = {
  black: "#101820",
  bgCard: "#182230",
  border: "#243040",
  borderAct: "#344860",
  ruby: "#C8102E",
  ghost: "#F2F2F2",
  gray: "#888B8D",
  textDim: "#4a5868",
  mono: "'IBM Plex Mono',monospace",
};

// ─── SVG brand icons ───
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const RedditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#FF4500"/>
    <path d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.07 2.13.45a1 1 0 1 0 .1-.48l-2.38-.5a.24.24 0 0 0-.28.18l-.73 3.43a7.14 7.14 0 0 0-3.89 1.24 1.46 1.46 0 1 0-1.61 2.39 2.87 2.87 0 0 0 0 .39c0 2 2.33 3.61 5.21 3.61s5.21-1.62 5.21-3.61a2.87 2.87 0 0 0 0-.38 1.46 1.46 0 0 0 .81-1.42zM7.5 11a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.57 2.65a3.53 3.53 0 0 1-3.07.74 3.53 3.53 0 0 1-3.07-.74.25.25 0 0 1 .35-.35 3.07 3.07 0 0 0 2.72.6 3.07 3.07 0 0 0 2.72-.6.25.25 0 0 1 .35.35zm-.07-1.65a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" fill="white"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.9 0 663.1 0 541.8c0-207.3 107.4-317.3 213-317.3 89.1 0 119.6 48.6 183.8 48.6 61.8 0 100.4-48.6 193.2-48.6 37.1 0 137.3 3.9 207 107.1zm-166.3-36.8c-32.4-40.7-76.9-67-124-67-4.5 0-9 .3-13.4.9 1.3 9 1.9 18.1 1.9 27.2 0 48.6-17.9 99.5-52.5 139.4C401 440 346.7 465.3 296.8 465.3c-3.9 0-7.7-.2-11.5-.5 11.6 55.7 45.3 109.4 90.5 146.5 35.5 29 80.4 47.2 127.7 47.2 85.5 0 139.4-54.9 182.2-54.9 41.1 0 89.7 53.6 183.8 53.6 10.3 0 20.5-1.1 30.6-3.4-21.6-48.6-45.8-95.2-72.8-138.6-18.9-30.3-40.4-59.6-39.5-174.2z"/>
  </svg>
);

function ProviderButton({ icon, label, onClick, loading, color }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "10px 14px",
        background: "transparent",
        border: `1px solid ${P.border}`,
        cursor: loading ? "wait" : "pointer",
        fontFamily: P.mono,
        fontSize: 11,
        color: loading ? P.textDim : P.ghost,
        letterSpacing: "1px",
        transition: "border-color 0.15s, background 0.15s",
        opacity: loading ? 0.6 : 1,
      }}
      onMouseEnter={e => { if (!loading) { e.currentTarget.style.borderColor = color || P.ruby; e.currentTarget.style.background = (color || P.ruby) + "12"; } }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = P.border; e.currentTarget.style.background = "transparent"; }}
    >
      {icon}
      <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
      {loading && <span style={{ fontSize: 9, color: P.textDim }}>…</span>}
    </button>
  );
}

export default function AuthModal({ onClose }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const info = await res.json();
        login({ provider: "google", id: info.sub, name: info.name, email: info.email, avatar: info.picture });
        onClose();
      } catch {
        setError("Failed to fetch Google profile.");
      } finally {
        setLoading(null);
      }
    },
    onError: () => { setError("Google sign-in failed."); setLoading(null); },
  });

  const handleGoogle = useCallback(() => {
    if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      setError("Google Client ID not configured. Set VITE_GOOGLE_CLIENT_ID in your .env file.");
      return;
    }
    setLoading("google");
    setError(null);
    handleGoogleLogin();
  }, [handleGoogleLogin]);

  const handleReddit = useCallback(async () => {
    setLoading("reddit");
    setError(null);
    try {
      await startRedditLogin();
    } catch (e) {
      setError(e.message || "Reddit sign-in failed.");
      setLoading(null);
    }
  }, []);

  const handleApple = useCallback(async () => {
    setLoading("apple");
    setError(null);
    try {
      const userData = await startAppleLogin();
      if (userData) { login(userData); onClose(); }
    } catch (e) {
      setError(e.message || "Apple sign-in failed.");
    } finally {
      setLoading(null);
    }
  }, [login, onClose]);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(16,24,32,0.85)", backdropFilter: "blur(6px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: P.bgCard, border: `1px solid ${P.borderAct}`, padding: 28, width: "100%", maxWidth: 360, position: "relative" }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", color: P.gray, cursor: "pointer", fontSize: 16, lineHeight: 1 }}
          aria-label="Close"
        >✕</button>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 8, color: P.ruby, letterSpacing: "4px", marginBottom: 6 }}>DIGGERZ — AUTH</div>
          <h2 style={{ fontSize: 18, fontWeight: 300, color: P.ghost, margin: 0, letterSpacing: "-0.5px" }}>Sign in</h2>
          <p style={{ fontSize: 9, color: P.gray, marginTop: 4 }}>Choose a provider to continue</p>
        </div>

        {/* Providers */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <ProviderButton
            icon={<GoogleIcon />}
            label="Continue with Google"
            onClick={handleGoogle}
            loading={loading === "google"}
            color="#4285F4"
          />
          <ProviderButton
            icon={<RedditIcon />}
            label="Continue with Reddit"
            onClick={handleReddit}
            loading={loading === "reddit"}
            color="#FF4500"
          />
          <ProviderButton
            icon={<AppleIcon />}
            label="Continue with Apple"
            onClick={handleApple}
            loading={loading === "apple"}
            color={P.ghost}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{ marginTop: 12, padding: "8px 10px", border: `1px solid ${P.ruby}44`, background: P.ruby + "10", fontSize: 9, color: P.ruby, lineHeight: 1.5 }}>
            {error}
          </div>
        )}

        {/* Footer */}
        <p style={{ marginTop: 16, fontSize: 8, color: P.textDim, lineHeight: 1.5, textAlign: "center" }}>
          By signing in you agree to the Diggerz terms of use.
        </p>
      </div>
    </div>
  );
}
