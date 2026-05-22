import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../hooks/useLang";

export default function HomePage() {
  const { lang } = useLang();

  return (
    <div style={{ padding:"40px", textAlign:"center" }}>
      <h1 style={{ color:"var(--brand-green)" }}>
        {lang === "en" ? "Welcome to WeberTech Bundles" : "Karibu WeberTech Bundles"}
      </h1>
      <p style={{ fontSize:16, marginTop:10 }}>
        {lang === "en"
          ? "Buy Safaricom Data, Minutes, SMS, and Airtime instantly — even with Okoa Jahazi balance."
          : "Nunua Data, Dakika, SMS na Airtime papo hapo — hata ukiwa na deni la Okoa Jahazi."}
      </p>
      <Link to="/bundles" className="btn btn-primary" style={{ marginTop:20 }}>
        {lang === "en" ? "Get Started" : "Anza Sasa"}
      </Link>
    </div>
  );
}
