import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      onLogin(res.data.role);
    } catch {
      setError("INVALID EMAIL OR PASSWORD");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div style={styles.page}>
      {/* Background pixel deco */}
      <div style={styles.bgDots} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerBar} />
          <div style={styles.logoRow}>
            <span style={styles.logoIcon}>🎮</span>
            <div>
              <div style={styles.logoTitle} className="glitch">STUDENT</div>
              <div style={styles.logoTitle2}>PORTAL</div>
            </div>
          </div>
          <div style={styles.headerBar} />
        </div>

        {/* Pixel art character */}
        <div style={styles.charWrap} className="float">
          <img
            src="/pixel_char.jpg"
            alt="pixel student character"
            style={styles.charImg}
          />
        </div>

        {/* Author badge */}
        <div style={styles.authorBadge}>
          <span style={styles.authorText}>
            ★ JEYA MAE D. DACARA · INF238 ★
          </span>
        </div>

        {/* Login card */}
        <div style={styles.card} className="pixel-box scan-in">
          <div className="corner-tl" /><div className="corner-tr" />
          <div className="corner-bl" /><div className="corner-br" />

          <h2 style={styles.cardTitle}>▶ LOGIN ACCESS</h2>
          <div style={styles.divider} />

          <div style={styles.field}>
            <label style={styles.label} htmlFor="login-email">📧 EMAIL</label>
            <input
              id="login-email"
              className="pixel-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
              placeholder="enter email address"
              autoComplete="email"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="login-password">🔑 PASSWORD</label>
            <input
              id="login-password"
              className="pixel-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
              placeholder="enter password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorText}>⚠ {error}</span>
            </div>
          )}

          <button
            id="login-btn"
            className="btn-pixel btn-cyan"
            onClick={login}
            disabled={loading}
            style={styles.loginBtn}
          >
            {loading ? (
              <span className="blink">LOADING...</span>
            ) : (
              "▶ ENTER PORTAL"
            )}
          </button>

          <div style={styles.hint}>
            <span style={{ fontFamily: "'VT323', monospace", fontSize: "1.1rem", color: "var(--text-dim)" }}>
              press ENTER to login
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span style={styles.footerText}>
            © 2025 JEYA MAE D. DACARA · INF238
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  bgDots: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(0,229,255,0.07) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(168,85,247,0.07) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
  container: {
    width: "100%",
    maxWidth: "440px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  headerBar: {
    width: "100%",
    height: "4px",
    background: "linear-gradient(90deg, transparent, var(--cyan), transparent)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logoIcon: {
    fontSize: "2.4rem",
  },
  logoTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "1.6rem",
    color: "var(--cyan)",
    letterSpacing: "4px",
    lineHeight: 1.2,
  },
  logoTitle2: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "1.6rem",
    color: "var(--teal)",
    letterSpacing: "4px",
    lineHeight: 1.2,
  },
  charWrap: {
    marginTop: "-4px",
  },
  charImg: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    imageRendering: "pixelated",
    filter: "drop-shadow(0 0 12px rgba(0,229,255,0.5))",
  },
  authorBadge: {
    background: "var(--bg-card)",
    border: "3px solid var(--purple)",
    padding: "8px 18px",
    boxShadow: "4px 4px 0 var(--bg-dark), 0 0 14px rgba(168,85,247,0.3)",
  },
  authorText: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.45rem",
    color: "var(--purple)",
    letterSpacing: "1px",
  },
  card: {
    width: "100%",
    background: "var(--bg-panel)",
    padding: "28px 28px 24px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  cardTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.75rem",
    color: "var(--teal)",
    letterSpacing: "2px",
    textAlign: "center",
  },
  divider: {
    height: "3px",
    background: "linear-gradient(90deg, transparent, var(--cyan-dim), transparent)",
    margin: "-6px 0",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.55rem",
    color: "var(--cyan)",
    letterSpacing: "1px",
  },
  errorBox: {
    background: "rgba(248,113,113,0.1)",
    border: "3px solid var(--red)",
    padding: "10px 14px",
  },
  errorText: {
    fontFamily: "'VT323', monospace",
    fontSize: "1.2rem",
    color: "var(--red)",
    letterSpacing: "1px",
  },
  loginBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "0.7rem",
    letterSpacing: "2px",
  },
  hint: {
    textAlign: "center",
    marginTop: "-8px",
  },
  footer: {
    marginTop: "4px",
    textAlign: "center",
  },
  footerText: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.4rem",
    color: "var(--text-dim)",
    letterSpacing: "1px",
  },
};