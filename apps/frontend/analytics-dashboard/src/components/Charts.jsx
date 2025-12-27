import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function Charts({ metrics }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!metrics) return;

    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: metrics.map((m) => m.label),
        datasets: [
          {
            label: "Current vs Previous",
            data: metrics.map((m) => m.value),
            borderColor: "rgba(56, 221, 248, 1)",
            backgroundColor: "rgba(56, 221, 248, 0.2)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [metrics]);

  return (
    <section className="chart-grid">
      <canvas ref={chartRef}></canvas>
    </section>
  );
}
