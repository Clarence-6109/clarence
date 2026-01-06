import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  const stats = [
    { value: "500+", label: "Team Members" },
    { value: "$50M", label: "Series C Funding" },
    { value: "15+", label: "Global Offices" },
    { value: "4.9★", label: "App Store Rating" },
  ];

  const values = [
    {
      title: "Our Mission",
      desc: "Democratize financial services and empower everyone to build wealth regardless of their background.",
      color: "green",
    },
    {
      title: "Our Values",
      desc: "Transparency, innovation, and customer-first approach guide everything we do.",
      color: "cyan",
    },
    {
      title: "Security First",
      desc: "Bank-level encryption and SOC 2 Type II certified infrastructure protect your assets.",
      color: "purple",
    },
    {
      title: "Innovation",
      desc: "Constantly pushing boundaries with AI, blockchain, and cutting-edge technology.",
      color: "orange",
    },
  ];

  const team = [
    { name: "Alex Rivera", role: "CEO & Co-founder", avatar: "AR" },
    { name: "Sarah Kim", role: "CTO & Co-founder", avatar: "SK" },
    { name: "Michael Chen", role: "CFO", avatar: "MC" },
    { name: "Emily Watson", role: "Head of Product", avatar: "EW" },
    { name: "David Park", role: "Head of Engineering", avatar: "DP" },
    { name: "Lisa Thompson", role: "Head of Design", avatar: "LT" },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Founded",
      desc: "Wealsh was born in a small apartment with a big vision.",
    },
    {
      year: "2021",
      title: "Seed Funding",
      desc: "Raised $5M seed round from top VC firms.",
    },
    {
      year: "2022",
      title: "1M Users",
      desc: "Reached our first million users milestone.",
    },
    {
      year: "2023",
      title: "Series C",
      desc: "Raised $50M to expand globally.",
    },
    {
      year: "2024",
      title: "Global Launch",
      desc: "Now serving 180+ countries worldwide.",
    },
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-grid">
            <div>
              <h1 className="about-hero-title">
                Built for the{" "}
                <span className="gradient-text">future of finance</span>
              </h1>
              <p className="about-hero-description">
                Founded in 2020, Wealsh emerged from a simple idea: financial
                services should be accessible, transparent, and empowering for
                everyone, everywhere.
              </p>
              <p className="about-hero-description">
                Today, we serve over 2 million customers in 180+ countries,
                managing more than $12 billion in assets. Our team of 500+
                experts works tirelessly to bring you the best financial tools.
              </p>

              <div className="about-stats-grid">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="about-stat-value">{stat.value}</div>
                    <div className="about-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-values-grid">
              {values.map((value, index) => (
                <div key={index} className={`about-value-card ${value.color}`}>
                  <h4 className="about-value-title">{value.title}</h4>
                  <p className="about-value-description">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-timeline">
        <div className="about-timeline-container">
          <h2 className="about-timeline-title">Our Journey</h2>
          <div className="about-timeline-wrapper">
            <div className="about-timeline-line"></div>
            <div className="about-timeline-items">
              {timeline.map((item, index) => (
                <div key={index} className="about-timeline-item">
                  <div className="about-timeline-content">
                    <div className="about-timeline-card">
                      <div className="about-timeline-year">{item.year}</div>
                      <div className="about-timeline-event">{item.title}</div>
                      <div className="about-timeline-description">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <div className="about-timeline-dot"></div>
                  <div className="about-timeline-spacer"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="about-team-container">
          <div className="about-team-header">
            <h2 className="about-team-title">Meet our leadership</h2>
            <p className="about-team-subtitle">
              Passionate people building the future of finance
            </p>
          </div>
          <div className="about-team-grid">
            {team.map((member, index) => (
              <div key={index} className="about-team-card">
                <div className="about-team-avatar">{member.avatar}</div>
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-investors">
        <div className="about-investors-container">
          <div className="about-investors-header">
            <h2 className="about-investors-title">Backed by the best</h2>
            <p className="about-investors-subtitle">
              Leading investors believe in our vision
            </p>
          </div>
          <div className="about-investors-grid">
            {[
              "Sequoia",
              "Andreessen",
              "Y Combinator",
              "Tiger Global",
              "Accel",
            ].map((investor, index) => (
              <div key={index} className="about-investor-card">
                {investor}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-container">
          <h2 className="about-cta-title">
            Join us in building the{" "}
            <span className="gradient-text">future of finance</span>
          </h2>
          <p className="about-cta-description">
            We're always looking for talented people to join our team.
          </p>
          <div className="about-cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <button className="btn btn-secondary btn-lg">View Careers</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
