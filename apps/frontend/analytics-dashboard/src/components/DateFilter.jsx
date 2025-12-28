function DateFilter({ filter, setFilter }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={filter.start}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, start: e.target.value }))
          }
        />
      </div>

      <div>
        <label>End Date</label>
        <input
          type="date"
          value={filter.end}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, end: e.target.value }))
          }
        />
      </div>
    </div>
  );
}

export default DateFilter;
