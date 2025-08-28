import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './DashBoard';
import Login from './LoginPage'; // You'll need to create this
import RequestPorting from './RequestPorting'; // You'll need to create this
import CheckingStatus from './CheckingStatus'; // You'll need to create this
import UPCInfo from './UPCInfo'; // You'll need to create this
import Help from './Help';
import Settings from './Settings';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request-porting" element={<RequestPorting />} />
        <Route path="/checking-status" element={<CheckingStatus />} />
        <Route path="/upc-info" element={<UPCInfo />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />

      </Routes>
    </Router>
  );
}

export default App;