// src/components/AuthModal.jsx
import { useState } from "react";
import { FaTimes, FaGoogle, FaSpinner } from "react-icons/fa";
import { useAuthCtx } from "../App.jsx";
import { useLang }    from "../i18n/useLang.js";
import { isPhone }    from "../config/constants.js";
import toast from "react-hot-toast";

const Spin = () => <FaSpinner className="spin-anim" style={{ fontSize:15 }} />;
const clean = (e) => e?.message?.replace("Firebase:", "")?.replace(/\s*\(auth\/[^)]+\)\.?/, "") || "Something went wrong.";

function GooglePhoneStep({ data, onDone, onClose }) {
  const { completeGoogleSignup } = useAuthCtx();
  const [phone, setPhone] = useState("");
  const [loading, setL]   = useState(false);
  const submit = async () => {
    if (!isPhone(phone)) { toast.error("Enter a valid Safaricom number: 07XXXXXXXX"); return; }
    setL(true);
    try { await completeGoogleSignup({ ...data, phone }); onDone(); }
    catch (e) { toast.error(clean(e)); }
    setL(false);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ padding:"32px 26px" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", fontSize:20, cursor:"pointer", color:"var(--muted)" }}><FaTimes /></button>
        <div style={{ fontSize:32, marginBottom:10 }}>🎉</div>
        <h2 style={{ fontFamily:"var(--font-d)", fontSize:20, fontWeight:800, marginBottom:6 }}>One Last Step!</h2>
        <p style={{ color:"var(--muted)", fontSize:14, marginBottom:18, lineHeight:1.6 }}>
          Hi <strong>{data.displayName}</strong>! Add your Safaricom number so bundles auto-fill at checkout.
        </p>
        <input className="input" type="tel" placeholder="07XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ marginBottom:14 }} />
        <button className="btn btn-primary btn-lg btn-full" onClick={submit} disabled={loading}>
          {loading ? <Spin /> : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}

export default function AuthModal({ onClose, defaultTab = "login" }) {
  const { login, signup, googleSignIn, resetPassword } = useAuthCtx();
  const { t } = useLang();
  const [tab, setTab]       = useState(defaultTab);
  const [loading, setL]     = useState(false);
  const [resetSent, setRS]  = useState(false);
  const [gData, setGData]   = useState(null);
  const [form, setForm]     = useState({ firstName:"", lastName:"", email:"", phone:"", password:"" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    setL(true);
    try {
      if (tab === "login") {
        await login(form.email.trim(), form.password);
        onClose();
      } else if (tab === "signup") {
        if (!form.firstName.trim()) { toast.error("Enter your first name"); setL(false); return; }
        if (!isPhone(form.phone))   { toast.error("Enter a valid Safaricom number"); setL(false); return; }
        if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); setL(false); return; }
        await signup({ email:form.email.trim(), password:form.password, firstName:form.firstName.trim(), lastName:form.lastName.trim(), phone:form.phone.trim() });
        onClose();
      } else {
        await resetPassword(form.email.trim());
        setRS(true);
      }
    } catch (e) { toast.error(clean(e)); }
    setL(false);
  };

  const handleGoogle = async () => {
    setL(true);
    try {
      const r = await googleSignIn();
      if (r.needsPhone) setGData({ uid:r.uid, displayName:r.displayName, email:r.email });
      else onClose();
    } catch (e) { toast.error(clean(e)); }
    setL(false);
  };

  if (gData) return <GooglePhoneStep data={gData} onDone={onClose} onClose={onClose} />;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ padding:"32px 28px" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", fontSize:20, cursor:"pointer", color:"var(--muted)" }}><FaTimes /></button>
        <h2 style={{ fontFamily:"var(--font-d)", fontSize:21, fontWeight:800, marginBottom:20 }}>
          {tab==="login" ? t("auth.back") : tab==="signup" ? t("auth.create") : t("auth.reset")}
        </h2>

        {tab !== "reset" && (
          <div style={{ display:"flex", gap:8, marginBottom:22 }}>
            {["login","signup"].map((tb) => (
              <button key={tb} className={`btn btn-md ${tab===tb ? "btn-primary" : "btn-outline"}`} style={{ flex:1 }}
                onClick={() => { setTab(tb); setRS(false); }}>
                {tb==="login" ? t("auth.login") : t("auth.signup")}
              </button>
            ))}
          </div>
        )}

        {/* RESET */}
        {tab === "reset" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {resetSent ? (
              <div style={{ background:"var(--primary-xlight)", border:"1.5px solid #86efac", borderRadius:"var(--r-md)", padding:"18px 20px" }}>
                <div style={{ fontSize:24, marginBottom:6 }}>✅</div>
                <p style={{ fontWeight:700, color:"var(--primary-dark)", fontSize:15 }}>Reset link sent!</p>
                <p style={{ color:"#166534", fontSize:13, marginTop:4, lineHeight:1.6 }}>{t("auth.reset.sent")}</p>
              </div>
            ) : (
              <>
                <p style={{ color:"var(--muted)", fontSize:14, lineHeight:1.6 }}>{t("auth.reset.sub")}</p>
                <input className="input" type="text" placeholder={t("auth.email.ph")} value={form.email} onChange={set("email")} />
                <button className="btn btn-primary btn-lg btn-full" onClick={submit} disabled={loading}>
                  {loading ? <Spin /> : t("auth.send")}
                </button>
              </>
            )}
            <button onClick={() => { setTab("login"); setRS(false); }}
              style={{ background:"none", border:"none", color:"var(--muted)", fontSize:13, cursor:"pointer" }}>
              {t("auth.back.login")}
            </button>
          </div>
        )}

        {/* LOGIN */}
        {tab === "login" && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <input className="input" type="text"     placeholder={t("auth.email.ph")} value={form.email}    onChange={set("email")} />
            <input className="input" type="password" placeholder={t("auth.pass.ph")}  value={form.password} onChange={set("password")} />
            <button className="btn btn-primary btn-lg btn-full" onClick={submit} disabled={loading}>
              {loading ? <Spin /> : t("auth.login")}
            </button>
            <button onClick={() => { setTab("reset"); setRS(false); }}
              style={{ background:"none", border:"none", color:"var(--primary)", fontSize:13, cursor:"pointer", textAlign:"left" }}>
              {t("auth.forgot")}
            </button>
            <div className="divider">{t("auth.or")}</div>
            <button onClick={handleGoogle} disabled={loading}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px 0", border:"1.5px solid var(--border)", borderRadius:"var(--r-md)", background:"#fff", cursor:"pointer", fontWeight:600, fontSize:14 }}>
              <FaGoogle style={{ color:"#ea4335" }} /> {t("auth.google.in")}
            </button>
          </div>
        )}

        {/* SIGNUP */}
        {tab === "signup" && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", gap:10 }}>
              <input className="input" type="text" placeholder={t("gs.fn")} value={form.firstName} onChange={set("firstName")} />
              <input className="input" type="text" placeholder={t("gs.ln")} value={form.lastName}  onChange={set("lastName")} />
            </div>
            <input className="input" type="tel"      placeholder={t("auth.phone.ph")} value={form.phone}    onChange={set("phone")} />
            <input className="input" type="email"    placeholder={t("gs.em")}          value={form.email}    onChange={set("email")} />
            <input className="input" type="password" placeholder={t("gs.pw")}          value={form.password} onChange={set("password")} />
            <p style={{ fontSize:12, color:"var(--muted)", lineHeight:1.5 }}>{t("auth.note")}</p>
            <button className="btn btn-primary btn-lg btn-full" onClick={submit} disabled={loading}>
              {loading ? <Spin /> : t("auth.create.btn")}
            </button>
            <div className="divider">{t("auth.or")}</div>
            <button onClick={handleGoogle} disabled={loading}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px 0", border:"1.5px solid var(--border)", borderRadius:"var(--r-md)", background:"#fff", cursor:"pointer", fontWeight:600, fontSize:14 }}>
              <FaGoogle style={{ color:"#ea4335" }} /> {t("auth.google.up")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
