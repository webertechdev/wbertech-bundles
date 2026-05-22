import React, { useState } from "react";
import { useLang } from "../hooks/useLang";

export default function TrackPage() {
  const { lang } = useLang();
  const [txn, setTxn] = useState("");
  const [result, setResult] = useState(null);

  const trackOrder = async () => {
    // Placeholder: will connect to Firestore later
    setResult({ status:"Completed", bundle:"2GB Data", number:"0703423227" });
  };

  return (
    <div style={{ padding:"30px" }}>
      <h2>{lang === "en" ? "Track Your Order" : "Fuata Oda Yako"}</h2>
      <input
        type="text"
        placeholder={lang === "en" ? "Enter M-PESA TXN Code" : "Weka Nambari ya M-PESA"}
        value={txn}
        onChange={(e) => setTxn(e.target.value)}
        style={{ padding:"8px", marginRight:"10px" }}
      />
      <button className="btn btn-primary" onClick={trackOrder}>
        {lang === "en" ? "Track" : "Fuata"}
      </button>

      {result && (
        <div style={{ marginTop:20 }}>
          <p>{lang === "en" ? "Status:" : "Hali:"} {result.status}</p>
          <p>{lang === "en" ? "Bundle:" : "Bundle:"} {result.bundle}</p>
          <p>{lang === "en" ? "Number:" : "Nambari:"} {result.number}</p>
        </div>
      )}
    </div>
  );
}
