import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";
import logo from "../assets/logo.png"; // make sure logo is inside assets folder
import Navbar from "../components/Navbar"; // Optional: if you have a separate Navbar component

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="nav-left">
          <img src={logo} alt="logo" className="nav-logo" />
          <h2>Career Insight System</h2>
        </div>
        <div className="nav-right">
          <button onClick={() => navigate("/login")} className="nav-btn">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="nav-btn-outline">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>
          Discover Your <span>Career Potential</span> with AI
        </h1>
        <p>
          Analyze your resume, detect skill gaps, and get personalized
          job & learning recommendations — all in one intelligent platform.
        </p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/register")} className="primary-btn">
            Get Started
          </button>
          <button onClick={() => navigate("/login")} className="secondary-btn">
            Already have account?
          </button>
        </div>
      </section>
    
     <section className="how-section">
  <h2 className="section-title">How Career Insight System Works</h2>

  <div className="timeline">

    <div className="timeline-item left">
      <div className="timeline-content">
        <h3>📄 Upload Resume</h3>
        <p>
          Upload your resume in PDF format. Our system securely extracts
          skills, education and experience using AI.
        </p>
      </div>
    </div>

    <div className="timeline-item right">
      <div className="timeline-content">
        <h3>🧠 AI Skill Extraction</h3>
        <p>
          NLP models analyze your resume and detect technical
          and soft skills automatically.
        </p>
      </div>
    </div>

    <div className="timeline-item left">
      <div className="timeline-content">
        <h3>📊 Skill Gap Detection</h3>
        <p>
          We compare your skills with real industry expectations
          and highlight missing competencies.
        </p>
      </div>
    </div>

    <div className="timeline-item right">
      <div className="timeline-content">
        <h3>🎯 Career Recommendations</h3>
        <p>
          Get personalized job roles, certifications and
          structured learning roadmaps.
        </p>
      </div>
    </div>

  </div>
</section>


      {/* Features Section */}
      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">

          <div className="feature-card1">
            <h3>Resume Analysis</h3>
            <p>AI powered resume scoring & industry skill comparison.</p>
          </div>

          <div className="feature-card2">
            <h3>Skill Gap Detection</h3>
            <p>Identify missing skills required for your target job role.</p>
          </div>

          <div className="feature-card3">
            <h3>Career Suggestions</h3>
            <p>Get smart job role recommendations based on your profile.</p>
          </div>

          <div className="feature-card4">
            <h3>Learning Roadmap</h3>
            <p>Personalized certifications & course suggestions.</p>
          </div>

        </div>
      </section>
{/* Output Section */}


      {/* About Section */}
      <section className="about-section">
        <h2>Why Career Insight System?</h2>
        <p>
          Many students apply for jobs without knowing industry expectations.
          Our system bridges the gap between academic knowledge and real-world requirements.
          We help you move from confusion to confidence.
        </p>
      </section>
      


     <footer className="footer">
  <div className="footer-container">

    {/* Brand Section */}
    <div className="footer-brand">
      <h2>Career Insight System</h2>
      <p>
        A smart career guidance platform designed to help students
        analyze their skills, explore role opportunities, and grow
        with clarity.
      </p>
    </div>

    {/* Navigation */}
    <div className="footer-links">
      <h4>Explore</h4>
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/register")}>Get Started</li>
        <li onClick={() => navigate("/login")}>Login</li>
      </ul>
    </div>

    {/* Resources */}
    <div className="footer-links">
      <h4>Resources</h4>
      <ul>
        <li>How It Works</li>
        <li>Skill Analysis</li>
        <li>Career Roles</li>
      </ul>
    </div>

  </div>

  <div className="footer-bottom">
    © 2026 Career Insight System • Built for academic learning and innovation
  </div>
</footer>


    </div>
  );
}

export default Landing;
