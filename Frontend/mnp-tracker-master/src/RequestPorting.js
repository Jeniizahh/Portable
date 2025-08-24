import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPhoneAlt, FaNetworkWired, FaExchangeAlt, FaMoon, FaSun } from "react-icons/fa";
import "./RequestPorting.css";

const providers = ["Airtel", "Jio", "Vi", "BSNL"];

const RequestPorting = () => {
  const navigate = useNavigate();

  // Dark mode state with system preference & persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    else return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const [mobileNumber, setMobileNumber] = useState("");
  const [currentProvider, setCurrentProvider] = useState(providers[0]);
  const [preferredProvider, setPreferredProvider] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits.";
    }
    if (!currentProvider) {
      newErrors.currentProvider = "Please select your current provider.";
    }
    if (!preferredProvider) {
      newErrors.preferredProvider = "Please select your preferred provider.";
    }
    if (currentProvider === preferredProvider) {
      newErrors.preferredProvider = "Preferred provider must be different.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Prepare payload matching your backend PortabilityRequest model
      const payload = {
        subscriberId: Number(mobileNumber.trim()),
        currentProvider,
        preferredProvider,
      };
      try {
        const response = await fetch("http://your-backend-url/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Failed to submit porting request");
        const data = await response.json();
        alert(`Porting Request Submitted successfully!\nReference ID: ${data.requestReferenceId}`);
        navigate("/checking-status");
      } catch (error) {
        alert("Error submitting porting request: " + error.message);
      }
    }
  };

  return (
    <div className="request-porting-page">
      {/* Header like UPCInfo page */}
      <header className="page-header fixed-header">
        <img src="/images/logo.png" alt="Logo" className="header-logo" />
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go Back">
          <FaArrowLeft size={18} aria-hidden="true" />
        </button>
        <h1>Request Porting</h1>
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

      <main className="request-container">
        <form className="request-form" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="mobileNumber">
              <FaPhoneAlt className="input-icon" aria-hidden="true" /> Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="tel"
              placeholder="Enter 10-digit number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              maxLength="10"
              aria-describedby="mobileNumberError"
              aria-invalid={!!errors.mobileNumber}
            />
            {errors.mobileNumber && (
              <span id="mobileNumberError" className="error-text">
                {errors.mobileNumber}
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="currentProvider">
              <FaNetworkWired className="input-icon" aria-hidden="true" /> Current Provider
            </label>
            <select
              id="currentProvider"
              value={currentProvider}
              onChange={(e) => setCurrentProvider(e.target.value)}
              aria-describedby="currentProviderError"
              aria-invalid={!!errors.currentProvider}
            >
              <option value="">-- Select Provider --</option>
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
            {errors.currentProvider && (
              <span id="currentProviderError" className="error-text">
                {errors.currentProvider}
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="preferredProvider">
              <FaExchangeAlt className="input-icon" aria-hidden="true" /> Preferred Provider
            </label>
            <select
              id="preferredProvider"
              value={preferredProvider}
              onChange={(e) => setPreferredProvider(e.target.value)}
              aria-describedby="preferredProviderError"
              aria-invalid={!!errors.preferredProvider}
            >
              <option value="">-- Select Provider --</option>
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
            {errors.preferredProvider && (
              <span id="preferredProviderError" className="error-text">
                {errors.preferredProvider}
              </span>
            )}
          </div>

          <button type="submit" className="submit-btn" aria-label="Submit Porting Request">
            Submit Request
          </button>
        </form>
      </main>
    </div>
  );
};

export default RequestPorting;
