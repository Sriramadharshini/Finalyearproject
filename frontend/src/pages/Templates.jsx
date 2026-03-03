import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaStar, 
  FaDownload, 
  FaEye, 
  FaCheckCircle, 
  FaArrowRight,
  FaRocket,
  FaPalette,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaAward,
  FaFilter,
  FaSearch,
  FaUserTie,
  FaChartLine,
  FaBullseye,
  FaLightbulb,
  FaHeart,
  FaShare
} from "react-icons/fa";
import "../styles/Templates.css";

const Templates = () => {
  const navigate = useNavigate();
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const templates = [
    { 
      id: "1", 
      name: "🚀 Streamline ATS", 
      category: "ATS Friendly", 
      color: "#4361ee",
      secondaryColor: "#3a0ca3",
      description: "ATS-optimized design that passes automated screening. Perfect for corporate applications.",
      features: ["🤖 ATS Optimized", "📄 Clean Layout", "⚡ Quick Parse"],
      preview: "📋",
      popular: true,
      downloads: "12.5k",
      rating: 4.8,
      bestFor: "Corporate Jobs"
    },
    { 
      id: "2", 
      name: "👔 Executive Pro", 
      category: "Executive", 
      color: "#2a5298",
      secondaryColor: "#1e3c72",
      description: "Two-column layout highlighting leadership experience and achievements.",
      features: ["📊 Leadership Focus", "🎯 Achievement Highlight", "📈 Results Driven"],
      preview: "📑",
      popular: true,
      downloads: "9.8k",
      rating: 4.9,
      bestFor: "Senior Roles"
    },
    { 
      id: "3", 
      name: "🎨 Creative Portfolio", 
      category: "Creative", 
      color: "#10b981",
      secondaryColor: "#059669",
      description: "Showcase your creative work with this visually appealing design.",
      features: ["🎭 Portfolio Ready", "🌈 Colorful", "🖼️ Visual Elements"],
      preview: "🎨",
      popular: true,
      downloads: "7.5k",
      rating: 4.7,
      bestFor: "Designers & Creatives"
    },
    { 
      id: "4", 
      name: "🏢 Corporate Classic", 
      category: "Corporate", 
      color: "#8b5cf6",
      secondaryColor: "#7c3aed",
      description: "Traditional corporate style trusted by Fortune 500 companies.",
      features: ["💼 Professional", "🏛️ Formal", "📋 Traditional"],
      preview: "🏢",
      popular: false,
      downloads: "6.2k",
      rating: 4.5,
      bestFor: "Business Roles"
    },
    { 
      id: "5", 
      name: "💻 Tech Master", 
      category: "Technical", 
      color: "#f59e0b",
      secondaryColor: "#d97706",
      description: "Highlight your technical skills, projects, and GitHub contributions.",
      features: ["👨‍💻 Skill Focus", "📁 Project Showcase", "🔧 Tech Stack"],
      preview: "💻",
      popular: false,
      downloads: "8.9k",
      rating: 4.6,
      bestFor: "Developers & Engineers"
    },
    { 
      id: "6", 
      name: "✨ Minimal Elegance", 
      category: "Minimal", 
      color: "#ef4444",
      secondaryColor: "#dc2626",
      description: "Clean, simple design that lets your experience speak for itself.",
      features: ["🌸 Clean", "✨ Elegant", "📄 Simple"],
      preview: "✨",
      popular: false,
      downloads: "5.4k",
      rating: 4.4,
      bestFor: "Any Industry"
    },
    { 
      id: "7", 
      name: "🎓 Fresh Graduate", 
      category: "Entry Level", 
      color: "#06b6d4",
      secondaryColor: "#0891b2",
      description: "Perfect for freshers - focus on education, internships, and potential.",
      features: ["📚 Education Focus", "🎯 Entry Level", "🌟 Internship Ready"],
      preview: "🎓",
      popular: true,
      downloads: "11k",
      rating: 4.7,
      bestFor: "Students & Freshers"
    },
    { 
      id: "8", 
      name: "📊 Data Scientist", 
      category: "Technical", 
      color: "#ec4899",
      secondaryColor: "#db2777",
      description: "Showcase your data projects, analysis skills, and technical expertise.",
      features: ["📈 Analytics", "📊 Visualizations", "🔢 Statistics"],
      preview: "📊",
      popular: false,
      downloads: "4.3k",
      rating: 4.8,
      bestFor: "Data Professionals"
    },
    { 
      id: "9", 
      name: "🎯 Sales Pro", 
      category: "Executive", 
      color: "#f97316",
      secondaryColor: "#ea580c",
      description: "Highlight your sales achievements, targets met, and revenue growth.",
      features: ["📈 Revenue Growth", "🎯 Targets Met", "🤝 Client Relations"],
      preview: "🎯",
      popular: false,
      downloads: "3.8k",
      rating: 4.6,
      bestFor: "Sales & Marketing"
    },
    { 
      id: "10", 
      name: "⚕️ Medical Professional", 
      category: "Corporate", 
      color: "#14b8a6",
      secondaryColor: "#0d9488",
      description: "Designed for healthcare professionals, doctors, and medical staff.",
      features: ["🏥 Healthcare", "⚕️ Clinical", "📋 Patient Care"],
      preview: "⚕️",
      popular: false,
      downloads: "3.2k",
      rating: 4.7,
      bestFor: "Healthcare"
    }
  ];

  const categories = ["All", "ATS Friendly", "Executive", "Creative", "Corporate", "Technical", "Minimal", "Entry Level"];

  const filteredTemplates = templates
    .filter(t => activeCategory === "All" || t.category === activeCategory)
    .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 t.bestFor.toLowerCase().includes(searchTerm.toLowerCase()));

  const popularTemplates = templates.filter(t => t.popular).slice(0, 3);

  const handleSelect = (id) => setSelectedTemplate(id);

  const handleGenerate = () => {
    if (!selectedTemplate) {
      alert("Please select a template");
      return;
    }
    const template = templates.find(t => t.id === selectedTemplate);
    navigate('/resume-preview', { state: { template } });
  };

  return (
    <div className="templates-page">
      {/* Header with Career Insight */}
      <div className="templates-header">
        <div className="header-content">
          <h1>
            Career Insight
            <span className="header-emoji">✨</span>
          </h1>
          <p className="header-subtitle">
            <FaLightbulb className="inline-icon" /> 
            Build your dream career with professionally crafted resume templates
            <FaHeart className="inline-icon heart-icon" />
          </p>
          
          {/* Stats Cards with Emojis */}
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-icon">📄</span>
              <div>
                <h3>10+</h3>
                <p>Expert Templates</p>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🏆</span>
              <div>
                <h3>75k+</h3>
                <p>Resumes Created</p>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⚡</span>
              <div>
                <h3>ATS</h3>
                <p>Optimized</p>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <div>
                <h3>4.8</h3>
                <p>User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="welcome-message">
        <FaUserTie className="welcome-icon" />
        <div>
          <h2>Your Career Journey Starts Here</h2>
          <p>Choose a template that matches your industry and experience level. All templates are <strong>100% free</strong> and ATS-friendly.</p>
        </div>
        <FaChartLine className="welcome-icon" />
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by role, industry, or template name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="categories-section">
        <div className="categories-header">
          <FaFilter className="filter-icon" />
          <h2>Browse by Category</h2>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "All" && "🔍 "}
              {category === "ATS Friendly" && "🤖 "}
              {category === "Executive" && "👔 "}
              {category === "Creative" && "🎨 "}
              {category === "Corporate" && "🏢 "}
              {category === "Technical" && "💻 "}
              {category === "Minimal" && "✨ "}
              {category === "Entry Level" && "🎓 "}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Templates */}
      <div className="trending-section">
        <div className="section-header">
          <FaChartLine className="section-icon" />
          <h2>🔥 Trending Now</h2>
          <span className="template-count">Most popular this month</span>
        </div>
        <div className="trending-grid">
          {popularTemplates.map((template) => (
            <div
              key={template.id}
              className={`trending-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => handleSelect(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="trending-preview" style={{ background: `${template.color}10` }}>
                <span className="preview-emoji">{template.preview}</span>
              </div>
              <div className="trending-info">
                <h3>{template.name}</h3>
                <p className="trending-category">{template.category}</p>
                <p className="trending-best"><FaBullseye /> Best for: {template.bestFor}</p>
                <div className="trending-meta">
                  <span className="rating"><FaStar /> {template.rating}</span>
                  <span className="downloads"><FaDownload /> {template.downloads}</span>
                </div>
              </div>
              {hoveredTemplate === template.id && (
                <button className="quick-view-btn">
                  <FaEye /> Quick Preview
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div className="all-templates-section">
        <div className="section-header">
          <FaPalette className="section-icon" />
          <h2>📋 All Templates</h2>
          <span className="template-count">{filteredTemplates.length} templates available</span>
        </div>

        <div className="templates-grid">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => handleSelect(template.id)}
            >
              {template.popular && <span className="trending-tag">🔥 Trending</span>}
              
              <div className="card-preview" style={{ background: `${template.color}10` }}>
                <span className="card-emoji">{template.preview}</span>
              </div>

              <div className="card-content">
                <h3>{template.name}</h3>
                <p className="card-category">
                  {template.category === "ATS Friendly" && "🤖 "}
                  {template.category === "Executive" && "👔 "}
                  {template.category === "Creative" && "🎨 "}
                  {template.category === "Corporate" && "🏢 "}
                  {template.category === "Technical" && "💻 "}
                  {template.category === "Minimal" && "✨ "}
                  {template.category === "Entry Level" && "🎓 "}
                  {template.category}
                </p>
                <p className="card-description">{template.description}</p>
                
                <p className="card-best">
                  <FaBullseye className="bullseye-icon" /> 
                  <span>Best for: {template.bestFor}</span>
                </p>

                <div className="card-features">
                  {template.features.map((feature, i) => (
                    <span key={i} className="feature-badge" style={{ background: `${template.color}15`, color: template.color }}>
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="card-stats">
                    <span><FaStar /> {template.rating}</span>
                    <span><FaDownload /> {template.downloads}</span>
                  </div>
                  <button 
                    className={`select-btn ${selectedTemplate === template.id ? 'selected' : ''}`}
                    style={selectedTemplate === template.id ? { background: template.color } : { borderColor: template.color, color: template.color }}
                  >
                    {selectedTemplate === template.id ? '✓ Selected' : 'Choose Template'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Tip */}
      <div className="career-tip">
        <FaLightbulb className="tip-icon" />
        <p>
          <strong>Pro Tip:</strong> Choose a template that matches your industry. 
          Corporate roles prefer clean layouts, while creative fields can use more design elements.
        </p>
        <FaShare className="tip-icon" />
      </div>

      {/* Bottom Action Bar */}
      {selectedTemplate && (
        <div className="bottom-bar">
          <div className="bottom-bar-content">
            <div className="selected-template-info">
              <span className="selected-badge">✨ Selected</span>
              <span className="selected-name">
                {templates.find(t => t.id === selectedTemplate)?.name}
              </span>
            </div>
            <button className="generate-btn" onClick={handleGenerate}>
              Build My Resume <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;