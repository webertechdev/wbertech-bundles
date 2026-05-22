import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../hooks/useLang";

export default function Navbar() {
  const { lang, setLang } = useLang();

  return (
    <nav style={{ background: "var(--brand-green)", padding: "10px 20px", color: "#fff", display:"flex", justifyContent:"space-between" }}>
      <div>
        <Link to="/" style={{ color:"#fff", fontWeight:"bold", marginRight:20 }}>WeberTech Bundles</Link>
        <Link to="/bundles" style={{ color:"#fff", marginRight:15 }}>Bundles</Link>
        <Link to="/track" style={{ color:"#fff", marginRight:15 }}>Track</Link>
        <Link to="/support" style={{ color:"#fff", marginRight:15 }}>Support</Link>
        <Link to="/admin" style={{ color:"#fff" }}>Admin</Link>
      </div>
      <div>
        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding:"4px", borderRadius:"4px" }}>
          <option value="en">English</option>
          <option value="sw">Swahili</option>
        </select>
      </div>
    </nav>
  );
}
