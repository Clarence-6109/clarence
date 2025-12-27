import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function KPIGrid({ metrics }) {
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
      type: "bar",
      data: {
        labels: metrics.map((m) => m.label),
        datasets: [
          {
            label: "Value",
            data: metrics.map((m) => m.value),
            backgroundColor: "rgba(56, 221, 248, 0.7)",
            borderColor: "rgba(56, 221, 248, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
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
    <section className="kpi-grid">
      <canvas ref={chartRef}></canvas>
    </section>
  );
}
