import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token"); // remove token
    delete api.defaults.headers.common["Authorization"]; // remove default header
    navigate("/login"); // redirect to login
  };

  return (
    <nav style={navStyle}>
      <h1 style={{ color: "white" }}>Analytics Dashboard</h1>
      <div>
        {token ? (
          <button onClick={logout} style={buttonStyle}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  backgroundColor: "#0d6efd",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  color: "#0d6efd",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Navbar;
