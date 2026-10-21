import { useEffect, useState } from "react";
import api from "./api/axiosClient";

export default function StudentDashboard() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/students/me")
      .then((res) => setMe(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />

      {/* TOP NAV */}
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <span style={styles.navIcon}>🎮</span>
          <div>
            <div style={styles.navTitle} className="glitch">
              STUDENT
            </div>
            <div style={styles.navSub}>PORTAL · INF238</div>
          </div>
        </div>
        <div style={styles.navRight}>
          <span style={styles.navBadge} className="pixel-badge badge-student">
            STUDENT
          </span>
          <button
            className="btn-pixel btn-red"
            onClick={logout}
            style={styles.logoutBtn}
          >
            ✕ LOGOUT
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={styles.wrapper}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <div style={styles.sideTop}>
            <div style={styles.avatarWrap} className="float">
              <img
                src="/pixel_char.jpg"
                alt="pixel character"
                style={styles.avatar}
              />
            </div>
            <div style={styles.sideTitle}>MY PROFILE</div>
            <div style={styles.sideLine} />
          </div>

          <div style={styles.sideMenu}>
            <div style={{ ...styles.sideBtn, ...styles.sideBtnActive }}>
              <span>👤</span> PROFILE
            </div>
          </div>

          <div style={styles.sideFooter}>
            <div style={styles.creditBox}>
              <div style={styles.creditText}>★ JEYA MAE D. DACARA</div>
              <div style={styles.creditText}>INF238 ★</div>
            </div>
          </div>
        </aside>

        {/* MAIN PANEL */}
        <main style={styles.main}>
          {loading ? (
            <div style={styles.loadWrap}>
              <span
                style={styles.loadText}
                className="blink"
              >
                LOADING DATA...
              </span>
            </div>
          ) : me ? (
            <>
              {/* WELCOME BANNER */}
              <div style={styles.banner} className="pixel-box scan-in">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div style={styles.bannerInner}>
                  <div>
                    <div style={styles.welcomeLabel}>WELCOME BACK,</div>
                    <div style={styles.welcomeName}>{me.name || "STUDENT"}</div>
                  </div>
                  <span style={styles.bannerIcon}>🏆</span>
                </div>
              </div>

              {/* PROFILE CARD */}
              <div style={styles.card} className="pixel-box">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />

                <div style={styles.cardHeader}>
                  <span style={styles.cardTitle}>▶ STUDENT RECORD</span>
                  <div style={styles.divider} />
                </div>

                <div style={styles.fields}>
                  {/* Name */}
                  <div style={styles.fieldRow}>
                    <div style={styles.fieldLabel}>
                      <span style={styles.fieldIcon}>👤</span> FULL NAME
                    </div>
                    <div style={styles.fieldVal}>{me.name || "—"}</div>
                  </div>
                  <div style={styles.hr} />

                  {/* Email */}
                  <div style={styles.fieldRow}>
                    <div style={styles.fieldLabel}>
                      <span style={styles.fieldIcon}>📧</span> EMAIL ADDRESS
                    </div>
                    <div style={styles.fieldVal}>{me.email || "—"}</div>
                  </div>
                  <div style={styles.hr} />

                  {/* Role */}
                  <div style={styles.fieldRow}>
                    <div style={styles.fieldLabel}>
                      <span style={styles.fieldIcon}>🎓</span> ROLE
                    </div>
                    <div>
                      <span className="pixel-badge badge-student">
                        STUDENT
                      </span>
                    </div>
                  </div>
                  <div style={styles.hr} />

                  {/* Status */}
                  <div style={styles.fieldRow}>
                    <div style={styles.fieldLabel}>
                      <span style={styles.fieldIcon}>📡</span> STATUS
                    </div>
                    <div style={styles.statusOnline}>
                      <span style={styles.statusDot} className="blink" />
                      ONLINE
                    </div>
                  </div>
                </div>
              </div>

              {/* STATS ROW */}
              <div style={styles.statsRow}>
                <div style={styles.statBox} className="pixel-box">
                  <div style={styles.statNum}>01</div>
                  <div style={styles.statLabel}>ENROLLED</div>
                </div>
                <div style={styles.statBox} className="pixel-box">
                  <div style={{ ...styles.statNum, color: "var(--teal)" }}>
                    ★★★
                  </div>
                  <div style={styles.statLabel}>STANDING</div>
                </div>
                <div style={styles.statBox} className="pixel-box">
                  <div style={{ ...styles.statNum, color: "var(--purple)" }}>
                    A+
                  </div>
                  <div style={styles.statLabel}>GRADE</div>
                </div>
              </div>
            </>
          ) : (
            <div style={styles.errBox} className="pixel-box">
              <span style={styles.errText}>⚠ FAILED TO LOAD PROFILE DATA</span>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span style={styles.footerText}>
          © 2025 JEYA MAE D. DACARA · INF238 · STUDENT PORTAL
        </span>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  bgGlow: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(ellipse at 20% 40%, rgba(0,229,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, rgba(74,222,128,0.05) 0%, transparent 60%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  nav: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "var(--bg-panel)",
    borderBottom: "4px solid var(--border)",
    boxShadow: "0 4px 0 var(--bg-dark)",
  },
  navLeft: { display: "flex", alignItems: "center", gap: "12px" },
  navIcon: { fontSize: "2rem" },
  navTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.85rem",
    color: "var(--teal)",
    letterSpacing: "3px",
  },
  navSub: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.35rem",
    color: "var(--text-dim)",
    letterSpacing: "2px",
    marginTop: "4px",
  },
  navRight: { display: "flex", alignItems: "center", gap: "12px" },
  navBadge: {},
  logoutBtn: { fontSize: "0.5rem", padding: "8px 14px" },

  wrapper: {
    display: "flex",
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  sidebar: {
    width: "200px",
    background: "var(--bg-panel)",
    borderRight: "4px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    padding: "20px 14px",
    gap: "16px",
  },
  sideTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  avatarWrap: {},
  avatar: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    imageRendering: "pixelated",
    filter: "drop-shadow(0 0 10px rgba(74,222,128,0.5))",
  },
  sideTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.45rem",
    color: "var(--teal)",
    letterSpacing: "2px",
    textAlign: "center",
  },
  sideLine: {
    width: "100%",
    height: "3px",
    background: "linear-gradient(90deg, transparent, var(--teal), transparent)",
  },
  sideMenu: { display: "flex", flexDirection: "column", gap: "8px" },
  sideBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.4rem",
    color: "var(--text-dim)",
    border: "3px solid var(--border)",
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "border-color 0.15s, color 0.15s",
  },
  sideBtnActive: {
    borderColor: "var(--teal)",
    color: "var(--teal)",
    background: "rgba(0,255,200,0.06)",
  },
  sideFooter: { marginTop: "auto" },
  creditBox: {
    background: "var(--bg-card)",
    border: "3px solid var(--purple)",
    padding: "10px",
    textAlign: "center",
  },
  creditText: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.35rem",
    color: "var(--purple)",
    letterSpacing: "1px",
    lineHeight: 2,
  },

  main: {
    flex: 1,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  loadWrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadText: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.7rem",
    color: "var(--cyan)",
    letterSpacing: "2px",
  },

  banner: {
    background: "linear-gradient(135deg, var(--bg-card), rgba(74,222,128,0.08))",
    padding: "20px 24px",
    position: "relative",
  },
  bannerInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.5rem",
    color: "var(--text-dim)",
    letterSpacing: "2px",
  },
  welcomeName: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "1rem",
    color: "var(--teal)",
    letterSpacing: "3px",
    marginTop: "8px",
    textTransform: "uppercase",
  },
  bannerIcon: { fontSize: "2.5rem" },

  card: {
    background: "var(--bg-panel)",
    padding: "24px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  cardHeader: { display: "flex", flexDirection: "column", gap: "10px" },
  cardTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.65rem",
    color: "var(--cyan)",
    letterSpacing: "2px",
  },
  divider: {
    height: "3px",
    background: "linear-gradient(90deg, var(--cyan-dim), transparent)",
  },

  fields: { display: "flex", flexDirection: "column", gap: "12px" },
  fieldRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px",
  },
  fieldLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.45rem",
    color: "var(--text-dim)",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  fieldIcon: { fontSize: "1rem" },
  fieldVal: {
    fontFamily: "'VT323', monospace",
    fontSize: "1.4rem",
    color: "var(--text-main)",
    letterSpacing: "1px",
  },
  hr: {
    height: "2px",
    background: "var(--border)",
  },

  statusOnline: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.45rem",
    color: "var(--green)",
    letterSpacing: "1px",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    background: "var(--green)",
    display: "inline-block",
    boxShadow: "0 0 8px var(--green)",
  },

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  statBox: {
    background: "var(--bg-card)",
    padding: "18px 12px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    position: "relative",
  },
  statNum: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "1.4rem",
    color: "var(--cyan)",
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.4rem",
    color: "var(--text-dim)",
    letterSpacing: "1px",
  },

  errBox: {
    padding: "30px",
    background: "rgba(248,113,113,0.06)",
    border: "3px solid var(--red)",
    textAlign: "center",
    position: "relative",
  },
  errText: {
    fontFamily: "'VT323', monospace",
    fontSize: "1.3rem",
    color: "var(--red)",
    letterSpacing: "1px",
  },

  footer: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    padding: "12px",
    background: "var(--bg-panel)",
    borderTop: "4px solid var(--border)",
  },
  footerText: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.35rem",
    color: "var(--text-dim)",
    letterSpacing: "1px",
  },
};