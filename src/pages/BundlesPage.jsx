import React, { useState } from "react";
import PurchaseModal from "../components/PurchaseModal";
import { useLang } from "../hooks/useLang";

export default function BundlesPage() {
  const { lang } = useLang();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding:"30px" }}>
      <h2>{lang === "en" ? "Bundles & Offers" : "Bundles na Ofa"}</h2>
      <p style={{ marginBottom:20 }}>
        {lang === "en"
          ? "Choose Data, Minutes, SMS, or Airtime. WeberTech lets you buy even with Okoa Jahazi balance."
          : "Chagua Data, Dakika, SMS au Airtime. WeberTech inakuruhusu kununua hata ukiwa na deni la Okoa Jahazi."}
      </p>

      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        {lang === "en" ? "Buy Bundle" : "Nunua Bundle"}
      </button>

      {showModal && <PurchaseModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
