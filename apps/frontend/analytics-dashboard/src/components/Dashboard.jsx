import axios from "axios";
import { useEffect, useState } from "react";
import ChartSwitcher from "./ChartSwitcher";
import RecordForm from "./RecordForm";

const Dashboard = ({ userId }) => {
  const [records, setRecords] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState({ monthly: [], categories: [] });

  const fetchRecords = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/finances/${userId}`
      );
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/finances/charts/${userId}`
      );
      setChartData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchChartData();
  }, []);

  const handleRecordAdded = () => {
    fetchRecords();
    fetchChartData();
  };

  return (
    <div className="dashboard">
      <h1>Financial Analytics Dashboard</h1>
      <RecordForm userId={userId} onRecordAdded={handleRecordAdded} />
      <div>
        <label>Switch Chart: </label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="bar">Bar (Monthly)</option>
          <option value="line">Line (Trends)</option>
          <option value="pie">Pie (Categories)</option>
        </select>
      </div>
      <div className="chart-container">
        <ChartSwitcher
          chartType={chartType}
          monthlyData={chartData.monthly}
          categoryData={chartData.categories}
        />
      </div>
      <h2>Recent Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.date}: {record.type} - {record.category} (${record.amount})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
