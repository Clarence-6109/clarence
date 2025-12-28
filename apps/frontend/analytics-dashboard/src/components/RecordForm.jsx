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

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.title || !form.amount || !form.date || !form.record_type_id) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await api.post("/records", {
        ...form,
        amount: parseFloat(form.amount),
        record_type_id: parseInt(form.record_type_id),
      });
      onSaved();
      onClose();
    } catch (err) {
      console.error("Save record error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to save record. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{ margin: "1rem 0", padding: "1rem", border: "1px solid #ccc" }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={onChange}
        required
      />
      <input
        name="amount"
        placeholder="Amount"
        type="number"
        value={form.amount}
        onChange={onChange}
        required
      />
      <input
        name="date"
        placeholder="Date"
        type="date"
        value={form.date}
        onChange={onChange}
        required
      />
      <select
        name="record_type_id"
        value={form.record_type_id}
        onChange={onChange}
        required
      >
        <option value="">Select type</option>
        {recordTypes.map((rt) => (
          <option key={rt.id} value={rt.id}>
            {rt.name}
          </option>
        ))}
      </select>
      <input
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={onChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}

export default RecordForm;
