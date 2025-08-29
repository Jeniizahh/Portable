import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPhoneAlt,
  FaNetworkWired,
  FaExchangeAlt,
  FaMoon,
  FaSun,
  FaIdCard,
} from "react-icons/fa";
import "./RequestPorting.css";
import "./CustomAlert.css"; // <-- import modal CSS

const providers = ["1", "2", "3", "4"];
const proofTypes = ["VoterID", "Passport", "Aadhar", "Driving License"];

// Custom Alert Component
const CustomAlert = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

const RequestPorting = () => {
  const navigate = useNavigate();

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
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

  // Alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [nextPage, setNextPage] = useState(null);

  // Validation function for form inputs
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

    if (!imsi) {
      newErrors.imsi = "IMSI number is required.";
    } else if (!/^\d{10,15}$/.test(imsi)) {
      newErrors.imsi = "IMSI must be 10–15 digits.";
    }

    if (!proofIdType) {
      newErrors.proofIdType = "Please select a Proof ID type.";
    }

    if (!proofIdNumber) {
      newErrors.proofIdNumber = "Proof ID number is required.";
    } else {
      switch (proofIdType) {
        case "Aadhar":
          if (!/^[2-9][0-9]{11}$/.test(proofIdNumber)) {
            newErrors.proofIdNumber =
              "Aadhaar must be exactly 12 digits and not start with 0 or 1.";
          }
          break;
        case "Driving License":
          if (!/^[A-Z]{2}[0-9]{13}$/.test(proofIdNumber)) {
            newErrors.proofIdNumber =
              "Driving License must be 2 letters (state code) followed by 13 digits (e.g., TN0123456789123).";
          }
          break;
        default:
          break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler for the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Validate form fields before sending any requests
    if (!validate()) return;

    // Payload to validate subscriber via microservice
    const validationPayload = {
      msisdn: Number(mobileNumber),
      imsi: Number(imsi),
      idType: proofIdType,
      idNumber: proofIdNumber,
      currentProvider: Number(currentProvider),
    };

    try {
      console.log("Sending validationPayload:", validationPayload);
      // Step 2: Call validation microservice first to validate subscriber details
      const response = await fetch("http://localhost:8081/requests/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationPayload),
      });
      if (!response.ok) {
    console.error("Validation fetch failed with status", response.status);
    throw new Error(`Validation failed: ${response.statusText}`);
  }

      const validationResult = await response.text();
      console.log("Validation microservice response:", validationResult);

      // If validation is successful, proceed to store data in your database
      if (validationResult === "Valid Subscriber") {
        setAlertMessage("Subscriber validation successful!");

        // === Here is the key part where you call Express.js endpoint to store porting request ===
        // You send the relevant form data to your backend server to save in the PostgreSQL database.
        // This call happens immediately AFTER validation succeeds.
        const payload = {
          subscriberId: Number(mobileNumber.trim()),
          currentProvider,
          preferredProvider,
          imsi,
          proofIdType,
          proofIdNumber,
        };

        const portingResponse = await fetch("http://localhost:8085/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // If backend returns error, throw exception to catch block
        if (!portingResponse.ok) throw new Error("Failed to submit porting request");

        // Convert response JSON to get reference ID & possibly UPC code
        const data = await portingResponse.json();

        // Show success message to user including reference info
        setAlertMessage(
          `Porting Request Submitted successfully!\nReference ID: ${data.requestReferenceId}${
            data.upcCode ? `\nUPC Code: ${data.upcCode}` : ""
          }`
        );

        // Notification microservice trigger, can be called later or here as you want
        const triggerPayload = {
          subscriberId: Number(mobileNumber.trim()),
          imsi: imsi,
          currentProvider: currentProvider,
          preferredProvider: preferredProvider,
        };

        try {
          const username = "provider_user";
  const password = "secret_sauce";
  const basicAuth = "Basic " + btoa(username + ":" + password);

  const notifyResponse = await fetch("http://localhost:8083/provider/notify", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": basicAuth,
    },
    body: JSON.stringify(triggerPayload),
          });

          if (!notifyResponse.ok) throw new Error("Failed to trigger notify microservice");

         //const notifyData = await notifyResponse.json();
         setAlertMessage(
  `Porting Request Submitted successfully!\n${
    data.upcCode ? `\nUPC Code: ${data.upcCode}` : ""
  }\n "Your request has been submitted after successful Validation"`
);


          //setAlertMessage(`Notify Response: Your request has been submitted after successful Validation`);
        } catch (error) {
          setAlertMessage(`Error: ${error.message || "Unknown error"}`);
        }

        // Store the next page path to navigate AFTER user dismisses the alert
        setNextPage("/checking-status");
      } else {
        // If validation fails, show validation error message
        setAlertMessage("Subscriber validation failed. Please check your details.");
      }
    } catch (error) {
      // Handle any network/server errors gracefully
      console.error("Error:", error);
      setAlertMessage("Error processing request. Please try again.");
    }
  };

  return (
    <div className={`request-porting-page ${darkMode ? "dark" : ""}`}>
      {/* Header */}
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

      {/* Main form container */}
      <main className="request-container">
        {/* Form element */}
        <form className="request-form" onSubmit={handleSubmit} noValidate>
          
          {/* Mobile Number Field */}
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
            {errors.mobileNumber && <span className="error-text">{errors.mobileNumber}</span>}
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
            <small className="note" style={{ marginTop: "4px" }}>
              1 - VOD | 2 - Airtel | 3 - Jio | 4 - BSNL
            </small>
            {errors.currentProvider && <span className="error-text">{errors.currentProvider}</span>}
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
            <small className="note" style={{ marginTop: "4px" }}>
              1 - VOD | 2 - Airtel | 3 - Jio | 4 - BSNL
            </small>
            {errors.preferredProvider && <span className="error-text">{errors.preferredProvider}</span>}
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
            <small className="note">ℹ️ To get your IMSI: Go to Settings → About Device</small>
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
            {errors.proofIdType && <span className="error-text">{errors.proofIdType}</span>}
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
            {errors.proofIdNumber && <span className="error-text">{errors.proofIdNumber}</span>}
          </div>

          {/* Submit button */}
          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </form>
      </main>

      {/* Custom Alert Modal */}
      <CustomAlert
        message={alertMessage}
        onClose={() => {
          setAlertMessage("");
          // Navigate only AFTER alert is closed and nextPage is set
          if (nextPage) {
            navigate(nextPage);
            setNextPage(null); // Reset to prevent loops
          }
        }}
      />
    </div>
  );
};

export default RequestPorting;
