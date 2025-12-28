import { useEffect, useState } from "react";
import api from "../api/api";
import ChartPanel from "../components/ChartPanel";
import RecordForm from "../components/RecordForm";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [recordTypes, setRecordTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [error, setError] = useState("");

  const fetchRecords = async () => {
    setLoadingRecords(true);
    setError("");
    try {
      const res = await api.get("/records");
      setRecords(res.data);
    } catch (err) {
      console.error("Fetch records error:", err);
      setError("Failed to fetch records. Please try again.");
    } finally {
      setLoadingRecords(false);
    }
  };

  const fetchRecordTypes = async () => {
    setLoadingTypes(true);
    setError("");
    try {
      const res = await api.get("/record-types");
      setRecordTypes(res.data);
    } catch (err) {
      console.error("Fetch record types error:", err);
      setError("Failed to fetch record types. Please try again.");
    } finally {
      setLoadingTypes(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchRecordTypes();
  }, []);

  const handleSaved = () => {
    fetchRecords(); // refresh records after save
  };

  // calculate totals
  const totals = recordTypes.map((type) => {
    const total = records
      .filter((r) => r.record_type_id === type.id)
      .reduce((sum, r) => sum + Number(r.amount || 0), 0); // fallback to 0
    return { ...type, total };
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button
          className="theme-toggle"
          onClick={() => {
            const body = document.body;
            body.classList.toggle("light");
            body.classList.toggle("dark");
          }}
        >
          Toggle Theme
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {(loadingRecords || loadingTypes) && <p>Loading data...</p>}

      {/* Statistics Cards */}
      <div className="stats-grid">
        {totals.map((t) => (
          <StatsCard key={t.id} title={t.name} value={t.total} />
        ))}
      </div>

      <button className="primary" onClick={() => setShowForm(true)}>
        Add Record
      </button>

      {showForm && (
        <RecordForm
          recordTypes={recordTypes}
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}

      {/* Chart */}
      {!loadingRecords && !loadingTypes && (
        <div className="card chart-wrapper">
          <ChartPanel records={records} recordTypes={recordTypes} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
