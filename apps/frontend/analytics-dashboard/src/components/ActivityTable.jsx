export default function ActivityTable({ activity, page, setPage, perPage }) {
  const exportCSV = () => {
    const csv = activity.map((r) => Object.values(r).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "activity.csv";
    a.click();
  };

  return (
    <section className="card">
      <h4>Recent Activity</h4>
      <div className="table-controls">
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>Prev</button>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
        <button onClick={exportCSV}>Export CSV</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {activity.map((r, i) => (
            <tr key={i}>
              <td>{r.user}</td>
              <td>{r.action}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
