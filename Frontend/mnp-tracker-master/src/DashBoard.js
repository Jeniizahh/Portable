import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaExchangeAlt,
  FaKey,
  FaBell,
  FaMoon,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Link as RouterLink } from "react-router-dom";

import "./DashBoard.css";
import "./Sidebar"

const ActionCard = ({ icon, title, desc, onClick }) => (
  <button className="dashboard-action-card" onClick={onClick} type="button">
    {icon}
    <div>
      <div className="action-title">{title}</div>
      <div className="action-desc">{desc}</div>
    </div>
  </button>
);

const samplePortingData = [
  { date: "Jan", count: 400 },
  { date: "Feb", count: 300 },
  { date: "Mar", count: 500 },
  { date: "Apr", count: 200 },
  { date: "May", count: 278 },
  { date: "Jun", count: 400 },
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const userName = location.state?.userName || "User"; // <-- use name from login

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  useEffect(() => {
    const darkPref = localStorage.getItem("darkMode") === "true";
    setDarkMode(darkPref);
    if (darkPref) document.body.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      if (!prev) document.body.classList.add("dark");
      else document.body.classList.remove("dark");
      return !prev;
    });
  };

  const toggleMobileDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen);

  const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);

  const handleLogout = () => {
    handleProfileClose();
    navigate("/");
  };

  const profileMenuId = "profile-menu";

  const drawerContent = (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 2 }}
      >
      <img
          src="/images/logo.png"
          alt="Logo"
          style={{
            height: "72px",
            width: "72px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        />
      </Box>
      <Typography
        variant="h6"
        align="center"
        sx={{ color: "#72cae5ff", fontWeight: 700, mb: 1, letterSpacing: "1px" }}
      >
        MNP Tracker
      </Typography>

      <Divider />

      <List>
        <ListItem
          button
          onClick={() => {
            navigate("/checking-status");
            if (!isDesktop) setMobileDrawerOpen(false);
          }}
        >
          <FaChartBar style={{ marginRight: 8 }} />
          <ListItemText primary="Check Porting Status" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate("/request-porting");
            if (!isDesktop) setMobileDrawerOpen(false);
          }}
        >
          <FaExchangeAlt style={{ marginRight: 8 }} />
          <ListItemText primary="Request New Porting" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate("/upc-info");
            if (!isDesktop) setMobileDrawerOpen(false);
          }}
        >
          <FaKey style={{ marginRight: 8 }} />
          <ListItemText primary="Get UPC Info" />
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: "#223354" }}
      >
        <Toolbar>
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleMobileDrawer}
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <FaChartBar />
            </IconButton>
          )}

          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{
                height: "48px",
                width: "48px",
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
              }}
            />
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: "#35cefe", fontWeight: "bold" }}
          >
            MNP Tracker
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography color="inherit" sx={{ display: { xs: "none", sm: "block" } }}>
              Hi, {userName}
            </Typography>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileClick}
              color="inherit"
            >
              <FaUserCircle size={26} />
            </IconButton>
            <Menu
              anchorEl={profileAnchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              id={profileMenuId}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileClose}
            >
              
              <MenuItem component={RouterLink} to="/" onClick={handleProfileClose}>
                logout
              </MenuItem>
            </Menu>

            <IconButton onClick={toggleDarkMode} aria-label="Toggle dark mode" sx={{ color: "white" }}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </IconButton>

           
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop ? true : mobileDrawerOpen}
        onClose={toggleMobileDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            background: "linear-gradient(135deg, #2e3f61 80%, #35cefe 100%)",
            color: "#fff",
          },
        }}
      >
        <Toolbar />
        <Divider />
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <div className="dashboard-welcome-card">
          <h2>
            <span role="img" aria-label="wave" style={{ fontSize: "1.5em" }}>
              👋
            </span>{" "}
            Welcome to Your Mobile Number Porting Dashboard
          </h2>
          <p>
            Seamlessly manage requests, check statuses, and access UPC codes{" "}
            <b>all in one secure place.</b>
          </p>
        </div>

        <Box sx={{ height: 240, mb: 3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={samplePortingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#35cefe" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <div className="dashboard-extras-row">
          <div className="extra-stat-card">
            <span className="extra-stat-emoji" role="img" aria-label="mobile">
              📱
            </span>
            <div>
              <div className="extra-stat-label">Accounts Ported</div>
              <div className="extra-stat-value">1,850</div>
            </div>
          </div>
          <div className="extra-stat-card">
            <span className="extra-stat-emoji" role="img" aria-label="clock">
              ⏱
            </span>
            <div>
              <div className="extra-stat-label">Avg. Porting Time</div>
              <div className="extra-stat-value">15 mins</div>
            </div>
          </div>
          <div className="extra-stat-card">
            <span className="extra-stat-emoji" role="img" aria-label="star">
              ⭐
            </span>
            <div>
              <div className="extra-stat-label">User Rating</div>
              <div className="extra-stat-value">4.8 / 5</div>
            </div>
          </div>
        </div>

        <div className="dashboard-actions-row">
          <ActionCard
            icon={<FaChartBar className="action-icon" />}
            title="Check Porting Status"
            desc="Track your number switch progress."
            onClick={() => navigate("/checking-status")}
          />
          <ActionCard
            icon={<FaExchangeAlt className="action-icon" />}
            title="Request New Porting"
            desc="Start a fresh network change."
            onClick={() => navigate("/request-porting")}
          />
          <ActionCard
            icon={<FaKey className="action-icon" />}
            title="Get UPC Info"
            desc="Find or generate your UPC code securely."
            onClick={() => navigate("/upc-info")}
          />
        </div>

        <div className="dashboard-row-flex">
          <div className="dashboard-info-card">
            <h3>Available Services</h3>
            <ul>
              <li>Mobile Number Porting</li>
              <li>Status Tracking</li>
              <li>UPC Code Generation</li>
              <li>24/7 Customer Support</li>
            </ul>
          </div>
          <div className="dashboard-guidance-card">
            <h3>How to Get Started?</h3>
            <ul>
              <li>Check your porting status any time.</li>
              <li>Raise a new porting request with one click.</li>
              <li>
                Need help? Use the <b>Subscriber Zone</b> at top-right.
              </li>
            </ul>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
