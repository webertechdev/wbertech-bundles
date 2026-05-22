import React, { useState } from "react";
import { useLang } from "../hooks/useLang";

export default function SupportPage() {
  const { lang } = useLang();
  const [chat, setChat] = useState([]);
  const [question, setQuestion] = useState("");

  const askSupport = async () => {
    const res = await fetch("/api/supportChat", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ question, lang }),
    });
    const data = await res.json();
    setChat([...chat, { role:"user", text:question }, { role:"ai", text:data.answer }]);
    setQuestion("");
  };

  return (
    <div style={{ padding:"30px" }}>
      <h2>{lang === "en" ? "WeberTech AI Support" : "Msaada wa AI WeberTech"}</h2>
      <div style={{ border:"1px solid #ddd", padding:"20px", borderRadius:"8px", height:"300px", overflowY:"auto" }}>
        {chat.map((msg, i) => (
          <p key={i} style={{ color: msg.role==="user" ? "#111" : "var(--brand-green)" }}>
            <strong>{msg.role==="user" ? "You:" : "AI:"}</strong> {msg.text}
          </p>
        ))}
      </div>
      <div style={{ marginTop:10 }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={lang === "en" ? "Ask a question..." : "Uliza swali..."}
          style={{ padding:"8px", width:"70%" }}
        />
        <button className="btn btn-primary" onClick={askSupport} style={{ marginLeft:10 }}>
          {lang === "en" ? "Send" : "Tuma"}
        </button>
      </div>
    </div>
  );
}
