function AggregationControls({ config, setConfig }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
      <select
        value={config.groupBy}
        onChange={(e) => setConfig({ ...config, groupBy: e.target.value })}
      >
        <option value="day">Day</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>

      <select
        value={config.metric}
        onChange={(e) => setConfig({ ...config, metric: e.target.value })}
      >
        <option value="sum">Sum</option>
        <option value="avg">Average</option>
      </select>
    </div>
  );
}

export default AggregationControls;
