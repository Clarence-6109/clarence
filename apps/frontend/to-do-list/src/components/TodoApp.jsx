import { Bell, Check, Clock, History, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import "./TodoApp.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 10000);

    return () => clearInterval(interval);
  }, [tasks]);

  const checkReminders = () => {
    const now = new Date();
    tasks.forEach((task) => {
      if (task.reminder && !task.reminded && !task.completed) {
        const reminderDateTime = new Date(task.reminder);
        if (now >= reminderDateTime) {
          if (Notification.permission === "granted") {
            new Notification("Task Reminder", {
              body: task.text,
              icon: "🔔",
            });
          }
          setTasks((prevTasks) =>
            prevTasks.map((t) =>
              t.id === task.id ? { ...t, reminded: true } : t
            )
          );
        }
      }
    });
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const addToHistory = (task, action) => {
    const historyEntry = {
      ...task,
      action: action,
      actionDate: new Date().toISOString(),
    };
    setHistory((prev) => [historyEntry, ...prev]);
  };

  const addTask = () => {
    if (taskInput.trim() === "") return;

    let reminderDateTime = null;
    if (reminderDate && reminderTime) {
      reminderDateTime = `${reminderDate}T${reminderTime}`;
    }

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      reminder: reminderDateTime,
      reminded: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
    setReminderDate("");
    setReminderTime("");

    if (reminderDateTime) {
      requestNotificationPermission();
    }
  };

  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task && !task.completed) {
      addToHistory(task, "completed");
    }
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      addToHistory(task, "deleted");
    }
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const restoreFromHistory = (historyEntry) => {
    const restoredTask = {
      ...historyEntry,
      id: Date.now(),
      completed: false,
      reminded: false,
    };
    setTasks([...tasks, restoredTask]);
    setHistory(history.filter((h) => h !== historyEntry));
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return null;
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isReminderPast = (dateTimeString) => {
    if (!dateTimeString) return false;
    return new Date(dateTimeString) < new Date();
  };

  const formatActionDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <div className="todo-card">
          <div className="header-section">
            <h1 className="app-title">
              <Bell className="title-icon" />
              To-Do List with Reminders
            </h1>
            <button
              className="history-toggle-btn"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History size={20} />
              History ({history.length})
            </button>
          </div>

          {!showHistory ? (
            <>
              <div className="add-task-form">
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTask()}
                  placeholder="Enter a new task..."
                  className="task-input"
                />

                <div className="reminder-inputs">
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="date-input"
                  />
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="time-input"
                  />
                </div>

                <button onClick={addTask} className="add-button">
                  <Plus size={20} />
                  Add Task
                </button>
              </div>

              <div className="task-list">
                {tasks.length === 0 ? (
                  <p className="empty-message">
                    No tasks yet. Add one to get started!
                  </p>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`task-item ${
                        task.completed ? "completed" : ""
                      }`}
                    >
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className={`check-button ${
                          task.completed ? "checked" : ""
                        }`}
                      >
                        {task.completed && <Check size={16} />}
                      </button>

                      <div className="task-content">
                        <p className="task-text">{task.text}</p>
                        {task.reminder && (
                          <div className="reminder-info">
                            <Clock
                              size={14}
                              className={
                                isReminderPast(task.reminder) ? "past" : ""
                              }
                            />
                            <span
                              className={`reminder-time ${
                                isReminderPast(task.reminder) ? "past" : ""
                              }`}
                            >
                              {formatDateTime(task.reminder)}
                            </span>
                            {task.reminded && (
                              <span className="reminded-badge">✓ Reminded</span>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="delete-button"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {tasks.length > 0 && (
                <div className="task-stats">
                  <span>{tasks.filter((t) => !t.completed).length} active</span>
                  <span>
                    {tasks.filter((t) => t.completed).length} completed
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="history-section">
              <div className="history-header">
                <h2>Task History</h2>
                {history.length > 0 && (
                  <button onClick={clearHistory} className="clear-history-btn">
                    Clear All
                  </button>
                )}
              </div>

              <div className="history-list">
                {history.length === 0 ? (
                  <p className="empty-message">No history yet.</p>
                ) : (
                  history.map((entry, index) => (
                    <div key={index} className="history-item">
                      <div className="history-content">
                        <p className="history-task-text">{entry.text}</p>
                        <div className="history-meta">
                          <span className={`history-action ${entry.action}`}>
                            {entry.action === "completed"
                              ? "✓ Completed"
                              : "✕ Deleted"}
                          </span>
                          <span className="history-time">
                            {formatActionDate(entry.actionDate)}
                          </span>
                        </div>
                        {entry.reminder && (
                          <div className="history-reminder">
                            <Clock size={12} />
                            <span>
                              Reminder was: {formatDateTime(entry.reminder)}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => restoreFromHistory(entry)}
                        className="restore-button"
                        title="Restore task"
                      >
                        ↺
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
