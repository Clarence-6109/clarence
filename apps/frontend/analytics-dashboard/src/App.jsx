import Dashboard from "./components/Dashboard";
import "./styles.css";

function App() {
  const userId = 1; // Hardcoded for demo; integrate auth later
  return <Dashboard userId={userId} />;
}

export default App;
