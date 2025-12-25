import { theme } from "@clarence/ui-core";
import { useEffect, useState } from "react";

function App() {
  const [machineStatus, setMachineStatus] = useState("Probing Backend...");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setMachineStatus(data.message))
      .catch(() =>
        setMachineStatus("Backend Offline - Restart Node Apps/Backend")
      );
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ color: theme.colors.primary, fontSize: "3rem" }}>
        HabitFlow AI
      </h1>
      <div
        style={{
          padding: "30px",
          border: `3px solid ${theme.colors.accent}`,
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "1.2rem" }}>
          Machine Link: <strong>{machineStatus}</strong>
        </p>
      </div>
      <p style={{ marginTop: "20px", opacity: 0.6 }}>
        Vite 7 + Node 24 + Monorepo Verified
      </p>
    </div>
  );
}

export default App;
