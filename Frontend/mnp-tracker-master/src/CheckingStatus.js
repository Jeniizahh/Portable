import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMoon, FaSun } from "react-icons/fa";
import "./CheckingStatus.css";

const CheckingStatus = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const [upcCode, setUpcCode] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStatus = async () => {
    if (!upcCode.trim()) {
      setError("Please enter a UPC code");
      setStatus(null);
      return;
    }
    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const resp = await fetch(`http://localhost:8087/requests/status/${upcCode}`);
      if (resp.ok) {
        const data = await resp.json();
        setStatus(data.status);
      } else if (resp.status === 404) {
        const errData = await resp.json();
        setError(errData.message);
      } else {
        setError("Failed to fetch status. Try again later.");
      }
    } catch (e) {
      setError("Error connecting to server");
    }
    setLoading(false);
  };

  // Auto hide popmsg after 3 seconds
  useEffect(() => {
    if (status || error) {
      const timer = setTimeout(() => {
        setStatus(null);
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, error]);

  return (
    <div className="checking-status-dashboard">
      <header className="dashboard-header fixed-header">
        <img src="/images/logo.png" alt="Logo" className="header-logo" />
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go Back">
          <FaArrowLeft size={20} />
        </button>
        <h1>Checking Porting Status</h1>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setDarkMode((d) => !d)}
          onKeyDown={(e) => (e.key === "Enter" ? setDarkMode((d) => !d) : null)}
          title="Toggle Dark/Light Theme"
          aria-pressed={darkMode}
          aria-label="Toggle Dark/Light Theme"
          className="header-theme-toggle"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>
      </header>

     <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem" }}>
  <div style={{ position: "relative", width: "100%" }}>
    <div className="glossy-container" tabIndex={-1}>
      <label htmlFor="upcInput" style={{ display: "block", marginBottom: "0.5rem" }}>
        Enter UPC Code:
      </label>
      <input
        id="upcInput"
        type="text"
        value={upcCode}
        onChange={(e) => setUpcCode(e.target.value)}
        placeholder="Enter UPC code"
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "1rem",
          marginBottom: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          background: "rgba(255,255,255,0.81)",
          boxShadow: "0 2px 8px rgba(42, 58, 112, 0.11)",
        }}
      />
      <button
        onClick={fetchStatus}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "1rem",
          fontWeight: "bold",
          background: darkMode
            ? "linear-gradient(90deg,#233b63 70%,#28448a 100%)"
            : "linear-gradient(90deg,#246cbf 70%,#4b8cef 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 6px 16px rgba(33,56,142,0.09)",
        }}
      >
        {loading ? "Checking..." : "Check Porting Status"}
      </button>
    </div>
    {(status || error) && (
      <div
        className={`popmsg ${status ? "popmsg-success" : ""} ${error ? "popmsg-error" : ""}`}
        style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "110%", width: "auto" }}
        role="alert"
        aria-live="assertive"
      >
        {status ? `Porting Status: ${status}` : error}
      </div>
    )}
  </div>
</main>

    </div>
  );
};

export default CheckingStatus;
