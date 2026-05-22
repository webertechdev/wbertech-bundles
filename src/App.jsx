import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BundlesPage from "./pages/BundlesPage";
import TrackPage from "./pages/TrackPage";
import SupportPage from "./pages/SupportPage";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./hooks/useAuth";
import { LangProvider } from "./hooks/useLang";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <LangProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bundles" element={<BundlesPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <Footer />
        </LangProvider>
      </AuthProvider>
    </Router>
  );
}
