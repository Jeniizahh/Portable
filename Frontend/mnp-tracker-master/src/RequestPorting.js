import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPhoneAlt,
  FaNetworkWired,
  FaExchangeAlt,
  FaMoon,
  FaSun,
  FaIdCard
} from "react-icons/fa";
import "./RequestPorting.css";
const providers = ["1", "2", "3", "4"];
const proofTypes = ["VoterID", "Passport", "Aadhar", "Driving License"];
//const backendUrl = process.env.REACT_APP_BACKEND_URL;
const RequestPorting = () => {
  const navigate = useNavigate();
  // Dark mode state
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
  // Form state
  const [mobileNumber, setMobileNumber] = useState("");
  const [currentProvider, setCurrentProvider] = useState(providers[0]);
  const [preferredProvider, setPreferredProvider] = useState("");
  const [imsi, setImsi] = useState("");
  const [proofIdType, setProofIdType] = useState("");
  const [proofIdNumber, setProofIdNumber] = useState("");
  const [errors, setErrors] = useState({});
  // Validation
// Validation
const validate = () => {
  const newErrors = {};
  // Mobile Number
  if (!mobileNumber) {
    newErrors.mobileNumber = "Mobile number is required.";
  } else if (!/^\d{10}$/.test(mobileNumber)) {
    newErrors.mobileNumber = "Mobile number must be exactly 10 digits.";
  }
  // Providers
  if (!currentProvider) {
    newErrors.currentProvider = "Please select your current provider.";
  }
  if (!preferredProvider) {
    newErrors.preferredProvider = "Please select your preferred provider.";
  }
  if (currentProvider === preferredProvider) {
    newErrors.preferredProvider = "Preferred provider must be different.";
  }
  // IMSI
  if (!imsi) {
    newErrors.imsi = "IMSI number is required.";
  } else if (!/^\d{10,15}$/.test(imsi)) {
    newErrors.imsi = "IMSI must be 10–15 digits.";
  }
  // Proof ID
  if (!proofIdType) {
    newErrors.proofIdType = "Please select a Proof ID type.";
  }
  if (!proofIdNumber) {
    newErrors.proofIdNumber = "Proof ID number is required.";
  } else {
    switch (proofIdType) {
      /*case "Voter ID":
        if (!/^[A-Z]{3}[0-9]{7}$/.test(proofIdNumber)) {
          newErrors.proofIdNumber = "Voter ID must be 3 letters followed by 7 digits (e.g., ABC1234567).";
        }
        break;*/
      /*case "Passport":
        if (!/^[A-PR-WYa-pr-wy][1-9][0-9]{6}$/.test(proofIdNumber)) {
          newErrors.proofIdNumber = "Passport number must be 1 letter followed by 7 digits (e.g., A1234567).";
        }
        break;*/
      case "Aadhar":
        if (!/^[2-9][0-9]{11}$/.test(proofIdNumber)) {
          newErrors.proofIdNumber = "Aadhaar must be exactly 12 digits and not start with 0 or 1.";
        }
        break;
      case "Driving License":
        if (!/^[A-Z]{2}[0-9]{13}$/.test(proofIdNumber)) {
          newErrors.proofIdNumber = "Driving License must be 2 letters (state code) followed by 13 digits (e.g., TN0123456789123).";
        }
        break;
      default:
        break;
    }
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  // Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  // Prepare validation payload
  const validationPayload = {
    msisdn: Number(mobileNumber),
    imsi: Number(imsi),
    idType: proofIdType,
    idNumber: proofIdNumber,
    currentProvider: Number(currentProvider),
  };
  try {
    // Call validation API
    const response = await fetch("http://localhost:8081/requests/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validationPayload),
    });
    const validationResult = await response.text();
    if (validationResult === "Valid Subscriber") {
      alert("Subscriber validation successful!");
      // If valid, proceed with porting request submission
      const payload = {
        subscriberId: Number(mobileNumber.trim()),
        currentProvider,
        preferredProvider,
        imsi,
        proofIdType,
        proofIdNumber,
      };
      const portingResponse = await fetch("http://localhost:8081/requests", {  // Changed endpoint here
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!portingResponse.ok) throw new Error("Failed to submit porting request");
      const data = await portingResponse.json();
      alert(`Porting Request Submitted successfully!\nReference ID: ${data.requestReferenceId}`);
      navigate("/checking-status");
    } else {
      alert("Subscriber validation failed. Please check your details.");
      return;
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
};
  return (
    <div className="request-porting-page">
      {/* Header */}
      <header className="page-header fixed-header">
        <img src="/images/logo.png" alt="Logo" className="header-logo" />
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
        >
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
          {/* Mobile Number */}
          <div className="input-group">
            <label htmlFor="mobileNumber">
              <FaPhoneAlt className="input-icon" /> Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="tel"
              placeholder="Enter 10-digit number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              maxLength="10"
            />
            {errors.mobileNumber && (
              <span className="error-text">{errors.mobileNumber}</span>
            )}
          </div>
          {/* Current Provider */}
          <div className="input-group">
            <label htmlFor="currentProvider">
              <FaNetworkWired className="input-icon" /> Current Provider
             
            </label>
            <select
              id="currentProvider"
              value={currentProvider}
              onChange={(e) => setCurrentProvider(e.target.value)}
            >
              
              <option value="">-- Select Provider --</option>
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
            <small className="note" style={{ display: "block", marginTop: "4px", color: "#666" }}>
    1 - VOD | 2 - Airtel | 3 - Jio | 4 - BSNL
  </small>
            {errors.currentProvider && (
              <span className="error-text">{errors.currentProvider}</span>
            )}
          </div>
          {/* Preferred Provider */}
          <div className="input-group">
            <label htmlFor="preferredProvider">
              <FaExchangeAlt className="input-icon" /> Preferred Provider
            </label>
            <select
              id="preferredProvider"
              value={preferredProvider}
              onChange={(e) => setPreferredProvider(e.target.value)}
            >
              <option value="">-- Select Provider --</option>
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
             <small className="note" style={{ display: "block", marginTop: "4px", color: "#666" }}>
    1 - VOD | 2 - Airtel | 3 - Jio | 4 - BSNL
  </small>
            {errors.preferredProvider && (
              <span className="error-text">{errors.preferredProvider}</span>
            )}
          </div>
          {/* IMSI Number */}
          <div className="input-group">
            <label htmlFor="imsi">
              <FaIdCard className="input-icon" /> IMSI Number
            </label>
            <input
              id="imsi"
              type="text"
              placeholder="Enter IMSI number"
              value={imsi}
              onChange={(e) => setImsi(e.target.value)}
            />
            <small className="note">
              ℹ️ To get your IMSI: Go to **Settings → About Device**
            </small>
            {errors.imsi && <span className="error-text">{errors.imsi}</span>}
          </div>
          {/* Proof ID Type */}
          <div className="input-group">
            <label htmlFor="proofIdType">
              <FaIdCard className="input-icon" /> Proof of Identity
            </label>
            <select
              id="proofIdType"
              value={proofIdType}
              onChange={(e) => setProofIdType(e.target.value)}
            >
              <option value="">-- Select Proof ID --</option>
              {proofTypes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.proofIdType && (
              <span className="error-text">{errors.proofIdType}</span>
            )}
          </div>
          {/* Proof ID Number */}
          <div className="input-group">
            <label htmlFor="proofIdNumber">
              <FaIdCard className="input-icon" /> Proof ID Number
            </label>
            <input
              id="proofIdNumber"
              type="text"
              placeholder="Enter Proof ID Number"
              value={proofIdNumber}
              onChange={(e) => setProofIdNumber(e.target.value)}
            />
            {errors.proofIdNumber && (
              <span className="error-text">{errors.proofIdNumber}</span>
            )}
          </div>
          {/* Submit */}
          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </form>
      </main>
    </div>
  );
};
export default RequestPorting;
