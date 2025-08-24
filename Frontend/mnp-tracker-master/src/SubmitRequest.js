import React, { useState } from "react";
import axios from "axios";

function SubmitRequest() {
  const [mobile, setMobile] = useState("");
  const [current, setCurrent] = useState("");
  const [newOp, setNewOp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/mnp", {
        mobile_number: mobile,
        current_operator: current,
        new_operator: newOp,
      });
      setMessage("Request submitted successfully!");
    } catch (err) {
      setMessage("Error submitting request");
    }
  };

  return (
    <div>
      <h2>Submit MNP Request</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 max-w-sm">
        <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <input type="text" placeholder="Current Operator" value={current} onChange={(e) => setCurrent(e.target.value)} />
        <input type="text" placeholder="New Operator" value={newOp} onChange={(e) => setNewOp(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white p-2">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SubmitRequest;
