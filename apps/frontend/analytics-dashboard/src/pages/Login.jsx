import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
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
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      navigate("/"); // go to dashboard
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (err.response?.status === 401
            ? "Invalid username or password"
            : "Login failed")
      );
    }
  };

  return (
    <>
      <Navbar />
      <div style={container}>
        <form onSubmit={submit} style={formStyle}>
          <h2 style={{ color: "#0d6efd", textAlign: "center" }}>Login</h2>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

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
          <button type="submit" style={submitButton}>
            Login
          </button>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#0d6efd", fontWeight: "bold" }}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

// Styles (same as Register)
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
  width: "350px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};
const input = {
  padding: "0.5rem",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ced4da",
};
const submitButton = {
  padding: "0.75rem",
  backgroundColor: "#0d6efd",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Login;
