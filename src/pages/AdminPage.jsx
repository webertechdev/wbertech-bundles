import React, { useState } from "react";
import { useLang } from "../hooks/useLang";

export default function AdminPage() {
  const { lang } = useLang();
  const [orders, setOrders] = useState([
    { txn:"TXN123", number:"0703423227", bundle:"2GB Data", status:"Completed" },
    { txn:"TXN456", number:"0702404025", bundle:"100 SMS", status:"Pending" }
  ]);

  return (
    <div style={{ padding:"30px" }}>
      <h2>{lang === "en" ? "Admin Dashboard" : "Dashibodi ya Admin"}</h2>
      <table border="1" cellPadding="8" style={{ marginTop:20, width:"100%" }}>
        <thead>
          <tr>
            <th>TXN</th>
            <th>{lang === "en" ? "Number" : "Nambari"}</th>
            <th>{lang === "en" ? "Bundle" : "Bundle"}</th>
            <th>{lang === "en" ? "Status" : "Hali"}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o,i) => (
            <tr key={i}>
              <td>{o.txn}</td>
              <td>{o.number}</td>
              <td>{o.bundle}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
