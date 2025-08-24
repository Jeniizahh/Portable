import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMobileAlt,
  FaClipboard,
  FaInfoCircle,
  FaTachometerAlt,
  FaFileAlt,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import "./UPCInfo.css";

const UPCInfo = () => {
  const navigate = useNavigate();
  const nextStepsRef = useRef(null);

  // Detect system preference and allow toggle with persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    else return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [mobileNumber, setMobileNumber] = useState("");
  const [upcCode, setUpcCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const validate = () => {
    if (!mobileNumber) {
      setError("Mobile number is required.");
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Mobile number must be exactly 10 digits.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleFetchUPC = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUpcCode("1234-5678-9012");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2100);
    }, 1800);
  };

  const handleCopyUPC = () => {
    if (upcCode) {
      navigator.clipboard.writeText(upcCode);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1700);
    }
  };

  useEffect(() => {
    if (upcCode && nextStepsRef.current) {
      setTimeout(() => {
        nextStepsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [upcCode]);

  const handleSidebarNav = (path) => {
    navigate(path);
  };

  return (
    <div className="page-layout">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-logo-wrap" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
          <img src="/images/logo.png" alt="MNP Tracker Logo" className="side-logo" />
         
        </div>
        <ul>
          <li onClick={() => handleSidebarNav("/dashboard")} tabIndex={0} role="link" onKeyDown={(e) => { if (e.key === "Enter") handleSidebarNav("/dashboard"); }}>
            <FaTachometerAlt /> Dashboard
          </li>
          <li onClick={() => handleSidebarNav("/request-porting")} tabIndex={0} role="link" onKeyDown={(e) => { if (e.key === "Enter") handleSidebarNav("/porting-request"); }}>
            <FaFileAlt /> Request New Porting
          </li>
          <li onClick={() => handleSidebarNav("/checking-status")} tabIndex={0} role="link" onKeyDown={(e) => { if (e.key === "Enter") handleSidebarNav("/check-status"); }}>
            <FaSearch /> Check Porting Status
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <span className="animated-glow"></span>
        <header className="page-header fixed-header">
          <img src="/images/logo.png" alt="Logo" className="header-logo" />
          <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go Back">
            <FaArrowLeft size={18} aria-hidden="true" />
          </button>
          <h1>Get UPC Info</h1>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setDarkMode((d) => !d)}
            onKeyDown={(e) => e.key === "Enter" && setDarkMode((d) => !d)}
            title="Toggle Dark/Light Theme"
            aria-pressed={darkMode}
            aria-label="Toggle Dark/Light Theme"
            className="header-theme-toggle"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>
        </header>

        <main className="page-container glass-card">
          <div className="upc-form">
            <label htmlFor="mobileNumber">
              <FaMobileAlt className="input-icon" aria-hidden="true" /> Enter Mobile Number
              <FaInfoCircle
                className="info-icon"
                title="Your mobile number is only used for fetching your UPC code."
                style={{ marginLeft: "7px", color: "#4a90e2", cursor: "pointer" }}
                aria-hidden="true"
              />
            </label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="tel"
                id="mobileNumber"
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
                aria-describedby="mobileNumberError"
                aria-invalid={!!error}
                className="mobile-input-only"
              />
            </div>
            {error && (
              <div id="mobileNumberError" className="error-text" role="alert">
                {error}
              </div>
            )}

            <button className="fetch-btn" onClick={handleFetchUPC} disabled={loading} aria-live="polite" aria-busy={loading}>
              {loading ? <ClipLoader color="#fff" size={22} /> : "Get UPC Code"}
            </button>

            {upcCode && (
              <div className="upc-result fade-in" aria-live="polite">
                <span className="key-icon" role="img" aria-label="key">
                  🔑
                </span>
                <span>Your UPC Code:</span>
                <strong style={{ letterSpacing: ".08em" }}>{upcCode}</strong>
                <button className="copy-btn" onClick={handleCopyUPC} title="Copy UPC Code" aria-label="Copy UPC Code">
                  <FaClipboard />
                </button>
              </div>
            )}

            {upcCode && (
              <div className="porting-guide-card fade-in" ref={nextStepsRef} tabIndex={-1}>
                <h3>Next Steps</h3>
                <ul>
                  <li>Go to Request New Porting page</li>
                  <li>Fill out the porting request and enter your UPC code</li>
                  <li>Complete KYC and port your mobile number</li>
                </ul>
              </div>
            )}
          </div>
        </main>

        {showToast && (
          <div className="toast-notify" role="alert">
            {upcCode ? "Copied!" : "Done!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default UPCInfo;
