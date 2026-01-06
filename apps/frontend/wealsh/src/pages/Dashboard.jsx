import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  ChartIcon,
  CogIcon,
  CreditCardIcon,
  SendIcon,
} from "../components/Icons";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const transactions = [
    {
      name: "Amazon",
      type: "Shopping",
      amount: -156.99,
      date: "Today",
      icon: "🛒",
    },
    {
      name: "Salary Deposit",
      type: "Income",
      amount: 5200.0,
      date: "Yesterday",
      icon: "💰",
    },
    {
      name: "Netflix",
      type: "Subscription",
      amount: -15.99,
      date: "Yesterday",
      icon: "🎬",
    },
    {
      name: "Transfer to John",
      type: "Transfer",
      amount: -500.0,
      date: "Mar 15",
      icon: "👤",
    },
    {
      name: "Freelance Payment",
      type: "Income",
      amount: 1200.0,
      date: "Mar 14",
      icon: "💻",
    },
    {
      name: "Uber Eats",
      type: "Food",
      amount: -32.5,
      date: "Mar 14",
      icon: "🍔",
    },
    {
      name: "Spotify",
      type: "Subscription",
      amount: -9.99,
      date: "Mar 13",
      icon: "🎵",
    },
  ];

  const cards = [
    {
      name: "Main Card",
      number: "•••• 4582",
      balance: 12450.0,
      color: "green",
      type: "VISA",
    },
    {
      name: "Savings Card",
      number: "•••• 8923",
      balance: 35902.5,
      color: "purple",
      type: "Mastercard",
    },
  ];

  const quickActions = [
    { icon: <SendIcon />, label: "Send", color: "green" },
    { icon: <ArrowDownIcon />, label: "Request", color: "purple" },
    { icon: <CreditCardIcon />, label: "Cards", color: "orange" },
    { icon: <ChartIcon />, label: "Invest", color: "blue" },
  ];

  const investments = [
    { name: "S&P 500 ETF", value: 4250.0, change: "+12.5%", positive: true },
    { name: "Bitcoin", value: 2100.0, change: "+8.3%", positive: true },
    { name: "Apple Inc.", value: 1850.0, change: "-2.1%", positive: false },
    { name: "Ethereum", value: 980.0, change: "+15.7%", positive: true },
  ];

  return (
    <section className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-welcome">
              Welcome back, {user?.name || "User"} 👋
            </h1>
            <p className="dashboard-subtitle">
              Here's what's happening with your money
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="dashboard-icon-btn">
              <BellIcon />
              <span className="dashboard-notification-dot"></span>
            </button>
            <button className="dashboard-icon-btn">
              <CogIcon />
            </button>
            <button className="dashboard-send-btn">
              <SendIcon /> Send Money
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="dashboard-main-grid">
          {/* Balance Card */}
          <div className="dashboard-balance-card">
            <div className="dashboard-balance-header">
              <div>
                <p className="dashboard-balance-label">Total Balance</p>
                <p className="dashboard-balance-value">
                  $
                  {(user?.balance || 48352.5).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="dashboard-balance-change">
                <ArrowUpIcon />
                <span>+12.5%</span>
                <small>vs last month</small>
              </div>
            </div>

            <div className="dashboard-chart">
              {[
                30, 45, 35, 60, 50, 70, 55, 80, 65, 90, 75, 85, 70, 95, 80, 100,
                85, 90, 75, 95, 88, 92, 78, 96,
              ].map((h, i) => (
                <div
                  key={i}
                  className="dashboard-chart-bar"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <div className="dashboard-chart-labels">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>

          {/* Cards */}
          <div className="dashboard-cards-stack">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`dashboard-credit-card ${card.color}`}
              >
                <div className="dashboard-card-circle-1"></div>
                <div className="dashboard-card-circle-2"></div>
                <div className="dashboard-card-content">
                  <div className="dashboard-card-header">
                    <p className="dashboard-card-name">{card.name}</p>
                    <span className="dashboard-card-type">{card.type}</span>
                  </div>
                  <p className="dashboard-card-balance">
                    $
                    {card.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <p className="dashboard-card-number">{card.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="dashboard-second-grid">
          {/* Transactions */}
          <div className="dashboard-transactions">
            <div className="dashboard-section-header">
              <h3 className="dashboard-section-title">Recent Transactions</h3>
              <button className="dashboard-view-all">View All</button>
            </div>
            <div className="dashboard-transactions-list">
              {transactions.map((transaction, index) => (
                <div key={index} className="dashboard-transaction">
                  <div className="dashboard-transaction-left">
                    <div
                      className={`dashboard-transaction-icon ${
                        transaction.amount > 0 ? "income" : ""
                      }`}
                    >
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="dashboard-transaction-name">
                        {transaction.name}
                      </p>
                      <p className="dashboard-transaction-type">
                        {transaction.type}
                      </p>
                    </div>
                  </div>
                  <div className="dashboard-transaction-right">
                    <p
                      className={`dashboard-transaction-amount ${
                        transaction.amount > 0 ? "positive" : ""
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="dashboard-transaction-date">
                      {transaction.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="dashboard-sidebar">
            {/* Quick Actions */}
            <div className="dashboard-quick-actions">
              <h3 className="dashboard-section-title">Quick Actions</h3>
              <div className="dashboard-quick-actions-grid">
                {quickActions.map((action, index) => (
                  <button key={index} className="dashboard-quick-action">
                    <div
                      className={`dashboard-quick-action-icon ${action.color}`}
                    >
                      {action.icon}
                    </div>
                    <p className="dashboard-quick-action-label">
                      {action.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Savings Goal */}
            <div className="dashboard-savings">
              <div className="dashboard-savings-header">
                <h3 className="dashboard-section-title">Savings Goal</h3>
                <span className="dashboard-savings-badge">On Track</span>
              </div>
              <div className="dashboard-savings-card">
                <div className="dashboard-savings-info">
                  <span className="dashboard-savings-emoji">🏖️</span>
                  <div>
                    <h4 className="dashboard-savings-name">Vacation Fund</h4>
                    <p className="dashboard-savings-date">Summer 2024</p>
                  </div>
                </div>
                <div className="dashboard-savings-progress">
                  <div
                    className="dashboard-savings-progress-bar"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div className="dashboard-savings-amounts">
                  <span>$3,250 / $5,000</span>
                  <span>65%</span>
                </div>
              </div>
            </div>

            {/* Investments */}
            <div className="dashboard-investments">
              <div className="dashboard-section-header">
                <h3 className="dashboard-section-title">Investments</h3>
                <button className="dashboard-view-all">View All</button>
              </div>
              <div className="dashboard-investments-list">
                {investments.map((inv, index) => (
                  <div key={index} className="dashboard-investment">
                    <div>
                      <p className="dashboard-investment-name">{inv.name}</p>
                      <p className="dashboard-investment-value">
                        ${inv.value.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`dashboard-investment-change ${
                        inv.positive ? "positive" : "negative"
                      }`}
                    >
                      {inv.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
