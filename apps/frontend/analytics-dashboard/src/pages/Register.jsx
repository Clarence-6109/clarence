// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Register user
      await api.post("/auth/register", form);

      // 2️⃣ Auto-login after successful registration
      const res = await api.post("/auth/login", form);

      if (!res.data?.token) {
        throw new Error("No token returned");
      }

      // 3️⃣ Save token
      localStorage.setItem("token", res.data.token);
      api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

      // 4️⃣ Redirect to dashboard
      navigate("/");
    } catch (err) {
      const status = err.response?.status;

      if (status === 409) {
        setError("Username already exists.");
      } else if (status === 401) {
        setError("Invalid credentials.");
      } else {
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={container}>
        <form onSubmit={submit} style={formStyle}>
          <h2 style={title}>Sign Up</h2>

          {error && <p style={errorStyle}>{error}</p>}

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
            style={input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            style={input}
          />

          <button type="submit" style={submitButton} disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

/* ---------- Styles ---------- */

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  backgroundColor: "#f8f9fa",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",
  width: "360px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const title = {
  color: "#0d6efd",
  textAlign: "center",
  fontWeight: 600,
};

const input = {
  padding: "0.75rem",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ced4da",
};

const submitButton = {
  padding: "0.75rem",
  backgroundColor: "#0d6efd",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
};

const errorStyle = {
  color: "#dc3545",
  textAlign: "center",
  fontSize: "0.9rem",
};

const linkStyle = {
  color: "#0d6efd",
  fontWeight: 600,
};

export default Register;
