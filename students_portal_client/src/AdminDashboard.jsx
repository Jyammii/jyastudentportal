import { useEffect, useState } from "react";
import api from "./api/axiosClient";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'form'

  const load = async () => setStudents((await api.get("/students")).data);
  useEffect(() => { load(); }, []);

  const flash = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2500);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  const addStudent = async () => {
    await api.post("/students", { name, email, password });
    flash("✔ STUDENT ADDED!");
    resetForm();
    load();
    setActiveTab("list");
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setEmail(student.email);
    setPassword("");
    setActiveTab("form");
  };

  const updateStudent = async () => {
    await api.put(`/students/${editingId}`, { name, email, password });
    flash("✔ STUDENT UPDATED!");
    resetForm();
    load();
    setActiveTab("list");
  };

  const deleteStudent = async (id) => {
    await api.delete(`/students/${id}`);
    flash("✖ STUDENT DELETED");
    load();
  };

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
            <div style={styles.navTitle} className="glitch">ADMIN PANEL</div>
            <div style={styles.navSub}>JEYA MAE D. DACARA · INF238</div>
          </div>
        </div>
        <div style={styles.navRight}>
          <span className="pixel-badge badge-admin">ADMIN</span>
          <button id="admin-logout-btn" className="btn-pixel btn-red" onClick={logout} style={{ fontSize: "0.5rem" }}>
            ⏻ LOGOUT
          </button>
        </div>
      </nav>
      <div style={styles.navDivider} />

      {/* FLASH MESSAGE */}
      {msg && (
        <div style={styles.flashMsg}>
          <span style={styles.flashText}>{msg}</span>
        </div>
      )}

      <div style={styles.body}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <div style={styles.sideTitle}>MENU</div>
          <button
            id="tab-list"
            className="btn-pixel"
            onClick={() => { resetForm(); setActiveTab("list"); }}
            style={{ ...styles.sideBtn, ...(activeTab === "list" ? styles.sideBtnActive : {}) }}
          >
            📋 STUDENT LIST
          </button>
          <button
            id="tab-add"
            className="btn-pixel"
            onClick={() => { resetForm(); setActiveTab("form"); }}
            style={{ ...styles.sideBtn, ...(activeTab === "form" && !editingId ? styles.sideBtnActive : {}) }}
          >
            ➕ ADD STUDENT
          </button>
          <div style={styles.sideStats}>
            <div style={styles.statBox} className="pixel-box">
              <div style={styles.statNum}>{students.length}</div>
              <div style={styles.statLabel}>STUDENTS</div>
            </div>
          </div>
          <div style={styles.sideFooter}>
            <img src="/pixel_char.jpg" alt="char" style={styles.sideChar} className="float" />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.main}>

          {/* ── FORM TAB ── */}
          {activeTab === "form" && (
            <div style={styles.card} className="pixel-box scan-in">
              <div className="corner-tl" /><div className="corner-tr" />
              <div className="corner-bl" /><div className="corner-br" />

              <h2 style={styles.cardTitle}>
                {editingId ? "✏ EDIT STUDENT" : "➕ ADD NEW STUDENT"}
              </h2>
              <div style={styles.divider} />

              <div style={styles.formGrid}>
                <div style={styles.field}>
                  <label className="pixel-label" style={styles.label}>👤 FULL NAME</label>
                  <input
                    id="form-name"
                    className="pixel-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="student full name"
                  />
                </div>
                <div style={styles.field}>
                  <label className="pixel-label" style={styles.label}>📧 EMAIL</label>
                  <input
                    id="form-email"
                    className="pixel-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student email"
                  />
                </div>
                <div style={styles.field}>
                  <label className="pixel-label" style={styles.label}>🔑 PASSWORD</label>
                  <input
                    id="form-password"
                    className="pixel-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={editingId ? "leave blank to keep" : "set password"}
                  />
                </div>
              </div>

              <div style={styles.btnRow}>
                {editingId ? (
                  <>
                    <button id="update-btn" className="btn-pixel btn-yellow" onClick={updateStudent}>✔ UPDATE</button>
                    <button id="cancel-btn" className="btn-pixel btn-red" onClick={() => { resetForm(); setActiveTab("list"); }}>✖ CANCEL</button>
                  </>
                ) : (
                  <button id="add-btn" className="btn-pixel btn-cyan" onClick={addStudent}>➕ ADD STUDENT</button>
                )}
              </div>
            </div>
          )}

          {/* ── LIST TAB ── */}
          {activeTab === "list" && (
            <div style={styles.card} className="pixel-box scan-in">
              <div className="corner-tl" /><div className="corner-tr" />
              <div className="corner-bl" /><div className="corner-br" />

              <div style={styles.listHeader}>
                <h2 style={styles.cardTitle}>📋 STUDENT REGISTRY</h2>
                <button
                  id="list-add-btn"
                  className="btn-pixel btn-cyan"
                  onClick={() => { resetForm(); setActiveTab("form"); }}
                  style={{ fontSize: "0.5rem", padding: "8px 12px" }}
                >
                  ➕ ADD
                </button>
              </div>
              <div style={styles.divider} />

              {students.length === 0 ? (
                <div style={styles.emptyBox}>
                  <div style={styles.emptyText} className="blink">NO STUDENTS FOUND</div>
                  <p style={{ fontFamily: "'VT323', monospace", fontSize: "1.2rem", color: "var(--text-dim)", marginTop: "8px" }}>
                    Click ➕ ADD to register a student
                  </p>
                </div>
              ) : (
                <div style={styles.tableWrap}>
                  <table className="pixel-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s, i) => (
                        <tr key={s._id}>
                          <td style={{ color: "var(--cyan)", fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem" }}>
                            {String(i + 1).padStart(2, "0")}
                          </td>
                          <td>{s.name}</td>
                          <td style={{ color: "var(--text-dim)" }}>{s.email}</td>
                          <td>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button
                                id={`edit-btn-${s._id}`}
                                className="btn-pixel btn-yellow"
                                onClick={() => startEdit(s)}
                                style={{ fontSize: "0.45rem", padding: "6px 10px" }}
                              >
                                EDIT
                              </button>
                              <button
                                id={`del-btn-${s._id}`}
                                className="btn-pixel btn-red"
                                onClick={() => deleteStudent(s._id)}
                                style={{ fontSize: "0.45rem", padding: "6px 10px" }}
                              >
                                DEL
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  bgGlow: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 10% 10%, rgba(0,229,255,0.05) 0%, transparent 50%),
      radial-gradient(circle at 90% 90%, rgba(168,85,247,0.05) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 24px",
    background: "var(--bg-panel)",
    borderBottom: "3px solid var(--border)",
  },
  navLeft: { display: "flex", alignItems: "center", gap: "14px" },
  navIcon: { fontSize: "1.8rem" },
  navTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.9rem",
    color: "var(--cyan)",
    letterSpacing: "3px",
  },
  navSub: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.4rem",
    color: "var(--purple)",
    letterSpacing: "1px",
    marginTop: "4px",
  },
  navRight: { display: "flex", alignItems: "center", gap: "14px" },
  navDivider: {
    height: "3px",
    background: "linear-gradient(90deg, var(--cyan), var(--purple), var(--teal))",
  },
  flashMsg: {
    background: "rgba(74,222,128,0.1)",
    border: "3px solid var(--green)",
    padding: "10px 20px",
    textAlign: "center",
    margin: "0",
  },
  flashText: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.55rem",
    color: "var(--green)",
    letterSpacing: "1px",
  },
  body: {
    display: "flex",
    flex: 1,
    gap: "0",
  },
  sidebar: {
    width: "200px",
    minWidth: "200px",
    background: "var(--bg-panel)",
    borderRight: "3px solid var(--border)",
    padding: "20px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sideTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.55rem",
    color: "var(--text-dim)",
    letterSpacing: "2px",
    padding: "0 4px 10px",
    borderBottom: "2px solid var(--border)",
    marginBottom: "6px",
  },
  sideBtn: {
    width: "100%",
    background: "var(--bg-card)",
    color: "var(--text-main)",
    border: "3px solid var(--border)",
    boxShadow: "3px 3px 0 #000",
    textAlign: "left",
    padding: "10px 12px",
    fontSize: "0.5rem",
    letterSpacing: "0.5px",
    cursor: "pointer",
    fontFamily: "'Press Start 2P', monospace",
    transition: "border-color 0.15s, color 0.15s",
  },
  sideBtnActive: {
    borderColor: "var(--cyan)",
    color: "var(--cyan)",
    background: "rgba(0,229,255,0.08)",
  },
  sideStats: { marginTop: "auto", paddingTop: "14px" },
  statBox: {
    background: "var(--bg-card)",
    padding: "14px",
    textAlign: "center",
    position: "relative",
  },
  statNum: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "1.8rem",
    color: "var(--cyan)",
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.4rem",
    color: "var(--text-dim)",
    marginTop: "6px",
    letterSpacing: "1px",
  },
  sideFooter: { display: "flex", justifyContent: "center", paddingTop: "12px" },
  sideChar: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
    imageRendering: "pixelated",
    filter: "drop-shadow(0 0 8px rgba(0,229,255,0.4))",
  },
  main: { flex: 1, padding: "24px", display: "flex", flexDirection: "column", gap: "16px" },
  card: {
    background: "var(--bg-panel)",
    padding: "24px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    flex: 1,
  },
  listHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  cardTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.7rem",
    color: "var(--teal)",
    letterSpacing: "2px",
  },
  divider: {
    height: "3px",
    background: "linear-gradient(90deg, var(--cyan-dim), transparent)",
  },
  formGrid: { display: "flex", flexDirection: "column", gap: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.5rem",
    color: "var(--cyan)",
    letterSpacing: "1px",
  },
  btnRow: { display: "flex", gap: "12px", flexWrap: "wrap" },
  tableWrap: { overflowX: "auto" },
  emptyBox: { textAlign: "center", padding: "40px 0" },
  emptyText: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.65rem",
    color: "var(--text-dim)",
    letterSpacing: "2px",
  },
};
