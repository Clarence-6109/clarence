import { useEffect, useState } from "react";
import ActivityTable from "./components/ActivityTable";
import Charts from "./components/Charts";
import KPIGrid from "./components/KPIGrid";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function App() {
  const [metrics, setMetrics] = useState(null);
  const [activity, setActivity] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 5;
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/metrics")
      .then((res) => res.json())
      .then((data) =>
        setMetrics([
          { label: "Revenue", value: data.revenue, prev: data.revenuePrev },
          { label: "Users", value: data.users, prev: data.usersPrev },
          { label: "Conversion", value: data.conversion, prev: null },
          { label: "Bounce", value: data.bounce, prev: null },
        ])
      )
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "" : "light-mode"} style={{ display: "flex" }}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="main">
        <Topbar />
        <KPIGrid metrics={metrics} />
        <Charts metrics={metrics} />
        <ActivityTable
          activity={activity}
          page={page}
          setPage={setPage}
          perPage={perPage}
        />
      </main>
    </div>
  );
}

export default App;
