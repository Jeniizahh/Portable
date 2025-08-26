import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const testimonialsData = [
  { msg: "MNP Tracker made my process hassle-free!", name: "Priya Sharma", img: "/images/user1.png" },
  { msg: "Accurate updates—I knew exactly when my number would switch.", name: "Ravi Kumar", img: "/images/user2.png" },
  { msg: "Great support team, answered all my queries!", name: "Anjali Mehta", img: "/images/user3.png" },
];

const faqsData = [
  { question: "What is Mobile Number Portability (MNP)?", answer: "MNP allows mobile users to change their network provider while keeping their existing mobile number." },
  { question: "Who can apply for MNP?", answer: "Any mobile subscriber with an active number can apply to switch to another network provider." },
  { question: "How long does porting take?", answer: "Usually within 7 working days, but may vary by provider." },
  { question: "Are there charges for porting?", answer: "Some providers charge a small fee, but many offer free porting." },
  { question: "What documents are required?", answer: "Valid ID proof, address proof, and a passport-size photo are generally needed." },
  { question: "Can I port while on postpaid?", answer: "Yes, but clear any outstanding dues before applying." },
  { question: "Will my number change after porting?", answer: "No, your mobile number stays the same after successful porting." },
  { question: "Do I need to visit a store?", answer: "Many providers allow online requests, though some require a visit for verification." },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [name, setName] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [activeFAQIndex, setActiveFAQIndex] = useState(null);
  const [testIndex, setTestIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const toggleFAQ = (index) => {
    setActiveFAQIndex(activeFAQIndex === index ? null : index);
  };

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput("");
    setCaptchaError("");
    setLoginError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setLoginError("Please enter your name");
      return;
    }

    if (captchaInput !== captchaCode) {
      alert("Captcha code does not match");
      generateCaptcha();
      return;
    }

    setIsLoading(true);

    // Simulate server validation for demo purpose
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);

      setTimeout(() => {
        setLoginSuccess(false);
        setShowLoginModal(false);
        // Pass the entered name as userName to Dashboard
        navigate("/dashboard", { state: { userName: name.trim() } });
      }, 1500);
    }, 1000);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <img src="/images/logo.png" alt="Logo" className="header-logo" />
        </div>
        <h1 className="header-title">MNP Tracker</h1>
        <div className="header-buttons">
          <button className="login-btn" onClick={() => setShowLoginModal(true)}>
            Login
          </button>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      {/* BANNER */}
      <section className="main-banner">
        <video className="banner-video" autoPlay loop muted playsInline>
          <source src="/images/banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      <div className="banner-decor"></div>

      {/* FAQ */}
      <div className="home-section faq-container">
        <h2 className="home-section-title">FAQs on Mobile Number Portability</h2>
        <div className="faq-list">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFAQIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <span className="faq-arrow">{activeFAQIndex === index ? "▲" : "▼"}</span>
              </div>
              <div className="faq-answer">{activeFAQIndex === index && <p>{faq.answer}</p>}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="home-section">
          <h2 className="home-section-title">Welcome to MNP Tracker</h2>
          <p>Track your Mobile Number Portability status with ease.</p>
        </div>
        <div className="home-section">
          <h2 className="home-section-title">Key Facts</h2>
          <div className="key-facts">
            <div className="fact">
              <h3>35+</h3>
              <p>Years of Telecom Expertise</p>
            </div>
            <div className="fact">
              <h3>750+</h3>
              <p>Network Professionals</p>
            </div>
            <div className="fact">
              <h3>4K+</h3>
              <p>Successful Porting Cases</p>
            </div>
            <div className="fact">
              <h3>30+</h3>
              <p>Network Providers Supported</p>
            </div>
          </div>
        </div>
        <div className="home-section">
          <h2 className="home-section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h4>Number Porting</h4>
              <p>Switch network without losing your number.</p>
            </div>
            <div className="service-card">
              <h4>Status Checking</h4>
              <p>Real-time status update for your porting request.</p>
            </div>
            <div className="service-card">
              <h4>Customer Support</h4>
              <p>24/7 assistance for all your queries.</p>
            </div>
          </div>
        </div>
        <div className="home-section">
          <h2 className="home-section-title">What Our Users Say</h2>
          <div className="testimonials">
            <div className="testimonial-card">
              <img
                src={testimonialsData[testIndex].img}
                alt="User"
                className="user-avatar"
              />
              <p>"{testimonialsData[testIndex].msg}"</p>
              <h4>- {testimonialsData[testIndex].name}</h4>
            </div>
          </div>
        </div>
      </main>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!isLoading) setShowLoginModal(false);
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => {
                if (!isLoading) setShowLoginModal(false);
              }}
            >
              &times;
            </button>
            {!loginSuccess ? (
              <div className="login-container">
                <h2 className="login-title">Login with Your Name</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group input-icon" data-icon="👤">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    {loginError && (
                      <div className="warning-text">
                        <span className="warning-icon">⚠</span> {loginError}
                      </div>
                    )}
                  </div>
                  <div className="form-group input-icon" data-icon="🔒">
                    <label>Captcha Verification</label>
                    <div className="captcha-container">
                      <div className="captcha-code">{captchaCode}</div>
                      <button
                        type="button"
                        className="refresh-captcha"
                        onClick={generateCaptcha}
                        title="Refresh Captcha"
                        disabled={isLoading}
                      >
                        ↻
                      </button>
                      <input
                        type="text"
                        className={`form-control captcha-input ${
                          captchaError ? "captcha-error-field" : ""
                        }`}
                        placeholder="Enter captcha"
                        value={captchaInput}
                        onChange={(e) => {
                          setCaptchaInput(e.target.value);
                          setCaptchaError("");
                        }}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn"
                    disabled={isLoading || !name.trim()}
                  >
                    {isLoading ? "Processing..." : "Submit"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="success-animation">✅ Login Successful!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
