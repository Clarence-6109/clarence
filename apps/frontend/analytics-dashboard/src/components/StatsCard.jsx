function StatsCard({ title, value }) {
  return (
    <div className="card stats-card">
      <h3>{title}</h3>
      <p className="stats-value">{value.toLocaleString()}</p>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default StatsCard;
