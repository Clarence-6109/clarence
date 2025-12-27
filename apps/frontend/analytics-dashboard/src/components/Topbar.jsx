export default function Topbar({ timeRange, setTimeRange }) {
  return (
    <header className="topbar">
      <h1>Analytics Dashboard</h1>
      <div className="filters">
        <label htmlFor="timeRange">Time Range:</label>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>
    </header>
  );
}
