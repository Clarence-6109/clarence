import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ChartPanel({ records, recordTypes }) {
  const [chartType, setChartType] = useState("bar");

  // Example: totals per record type
  const totals = recordTypes.map((type) => ({
    label: type.name,
    total: records
      .filter((r) => r.record_type_id === type.id)
      .reduce((sum, r) => sum + Number(r.amount), 0),
  }));

  const data = {
    labels: totals.map((t) => t.label),
    datasets: [
      {
        label: "Total Amount",
        data: totals.map((t) => t.total),
        backgroundColor: ["#2563eb", "#3b82f6", "#60a5fa"],
        borderColor: "#1d4ed8",
        borderWidth: 1,
      },
    ],
  };

  const ChartComponent = {
    bar: Bar,
    line: Line,
    pie: Pie,
    doughnut: Doughnut,
  }[chartType];

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h3>Records Overview</h3>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          style={{
            padding: "0.3rem",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="doughnut">Doughnut Chart</option>
        </select>
      </div>
      <div className="chart-container">
        <ChartComponent data={data} />
      </div>
    </div>
  );
}

export default ChartPanel;
