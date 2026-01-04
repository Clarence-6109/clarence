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
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartSwitcher = ({ chartType, monthlyData, categoryData }) => {
  const purpleShades = ["#6A1B9A", "#BA68C8", "#D05CE3", "#AB47BC"];

  const monthlyChartData = {
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Income",
        data: monthlyData.map((d) => d.income),
        backgroundColor: purpleShades[0],
      },
      {
        label: "Expense",
        data: monthlyData.map((d) => d.expense),
        backgroundColor: purpleShades[1],
      },
    ],
  };

  const categoryChartData = {
    labels: categoryData.map((d) => d.category),
    datasets: [
      { data: categoryData.map((d) => d.total), backgroundColor: purpleShades },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };

  switch (chartType) {
    case "bar":
      return <Bar data={monthlyChartData} options={options} />;
    case "line":
      return <Line data={monthlyChartData} options={options} />;
    case "pie":
      return <Pie data={categoryChartData} options={options} />;
    default:
      return <Bar data={monthlyChartData} options={options} />;
  }
};

export default ChartSwitcher;
