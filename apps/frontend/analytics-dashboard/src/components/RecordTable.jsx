// src/components/RecordForm.jsx
import { useState } from "react";
import api from "../api/api";

function RecordForm({ recordTypes, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
    record_type_id: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.amount || isNaN(parseFloat(form.amount))) {
      setError("Amount must be a valid number.");
      return;
    }
    if (!form.date) {
      setError("Date is required.");
      return;
    }
    if (!form.record_type_id) {
      setError("Please select a record type.");
      return;
    }

    try {
      await api.post("/records", {
        ...form,
        amount: parseFloat(form.amount),
        record_type_id: parseInt(form.record_type_id),
      });
      onSaved(); // refresh table
      onClose(); // close form
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save record.");
    }
  };

  return (
    <div style={formContainer}>
      <form onSubmit={submit} style={formStyle}>
        <h3>Add Record</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={onChange}
          style={input}
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={onChange}
          style={input}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={onChange}
          style={input}
        />
        <select
          name="record_type_id"
          value={form.record_type_id}
          onChange={onChange}
          style={input}
        >
          <option value="">Select type</option>
          {recordTypes.map((rt) => (
            <option key={rt.id} value={rt.id}>
              {rt.name}
            </option>
          ))}
        </select>
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={onChange}
          style={input}
        />

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <button type="submit" style={submitButton}>
            Save
          </button>
          <button type="button" onClick={onClose} style={cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const formContainer = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 100,
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "2rem",
  width: "400px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 0 15px rgba(0,0,0,0.2)",
};

const input = {
  padding: "0.5rem",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ced4da",
};

const submitButton = {
  padding: "0.5rem 1rem",
  backgroundColor: "#0d6efd",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

const cancelButton = {
  padding: "0.5rem 1rem",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default RecordForm;
