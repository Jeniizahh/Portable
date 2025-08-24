import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaMobileAlt,
  FaHistory,
  FaMoon,
  FaSun,
  FaClipboard,
} from "react-icons/fa";
import "./CheckingStatus.css";

const initialStatusInfo = {
  status: "In Progress",
  number: "9876543210",
  providerFrom: "Jio",
  providerTo: "Airtel",
  requestedOn: "2025-08-20",
  estimatedCompletion: "2025-08-24",
};

const initialStatusSteps = [
  { step: "Request Submitted", date: "2025-08-20", done: true },
  { step: "Verification Completed", date: "2025-08-21", done: true },
  { step: "Processing Porting", date: "2025-08-22", done: false },
  { step: "Completed", date: "Pending", done: false },
];

const CheckingStatus = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [statusInfo, setStatusInfo] = useState(initialStatusInfo);
  const [statusSteps, setStatusSteps] = useState(initialStatusSteps);

  // Dark mode effect & persistence
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Mock refresh status every 60s (replace with your API call)
  useEffect(() => {
    const interval = setInterval(() => {
      // Mock update: here you would call your API and update state
      console.log("Refreshing porting status...");
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Copy phone number to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(statusInfo.number);
    alert("Mobile number copied to clipboard!");
  };

  // Calculate progress percentage for timeline bar
  const completedSteps = statusSteps.filter((step) => step.done).length;
  const progressPercent = (completedSteps / statusSteps.length) * 100;

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

      <main className="dashboard-content">
        <div className="dashboard-row-flex fade-in">
          {/* Status Card */}
          <div className="status-card glassy-green">
            <div className="status-main">
              <FaCheckCircle
                className={`status-icon ${
                  statusInfo.status === "Completed" ? "completed" : "inprogress"
                }`}
              />
              <div>
                <div className="status-title">Request Status</div>
                <div className="status-text">{statusInfo.status}</div>
              </div>
            </div>
            <div className="status-details">
              <div>
                <FaMobileAlt className="mobile-icon" /> {statusInfo.number}
                <button onClick={copyToClipboard} className="copy-phone-btn" aria-label="Copy Mobile Number">
                  <FaClipboard />
                </button>
              </div>
              <div>From: <b>{statusInfo.providerFrom}</b></div>
              <div>To: <b>{statusInfo.providerTo}</b></div>
              <div>Requested On: {statusInfo.requestedOn}</div>
              <div>Estimated Completion: {statusInfo.estimatedCompletion}</div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="timeline-card glassy-silver">
            <div className="timeline-title">
              <FaHistory className="timeline-icon" /> Progress Timeline
            </div>
            {/* Horizontal progress bar */}
            <div className="progress-bar-container" aria-label="Porting progress">
              <div
                className="progress-bar-filled"
                style={{ width: `${progressPercent}%` }}
                aria-valuenow={progressPercent}
                aria-valuemin="0"
                aria-valuemax="100"
                role="progressbar"
              />
            </div>
            {/* Timeline steps */}
            <ul className="timeline-list">
              {statusSteps.map((step, idx) => (
                <li key={idx} className={step.done ? "step-done" : "step-pending"}>
                  <span className="step-marker" aria-hidden="true">
                    {step.done ? "✓" : "○"}
                  </span>
                  <span className="step-label">{step.step}</span>
                  <span className="step-date">{step.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckingStatus;
