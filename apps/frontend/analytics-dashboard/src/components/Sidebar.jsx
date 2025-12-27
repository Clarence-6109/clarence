export default function Sidebar({ darkMode, setDarkMode }) {
  return (
    <aside className="sidebar">
      <h2>Analytics</h2>
      <nav>
        <a className="active">Dashboard</a>
        <a>Reports</a>
        <a>Users</a>
        <a>Settings</a>
      </nav>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
    </aside>
  );
}
