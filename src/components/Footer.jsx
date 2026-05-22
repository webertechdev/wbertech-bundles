import React from "react";

export default function Footer() {
  return (
    <footer style={{ background:"#f3f4f6", padding:"20px", textAlign:"center", marginTop:"40px" }}>
      <p style={{ fontSize:13, color:"#6b7280" }}>
        © {new Date().getFullYear()} WeberTech Bundles. All rights reserved.
      </p>
      <p style={{ fontSize:13, color:"#6b7280" }}>
        If you don’t receive your bundle within 2 minutes, contact us via WhatsApp or call <a href="tel:+254722508904">0722508904</a>.  
        Or send a “Please Call Me” text using *130*0722508904#.
      </p>
    </footer>
  );
}
