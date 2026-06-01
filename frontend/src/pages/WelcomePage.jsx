import { useNavigate } from 'react-router-dom';
import { clearSession, getUsername } from '../auth';
import './WelcomePage.css';

export default function WelcomePage() {
  const navigate = useNavigate();
  const username = getUsername() || 'Player';

  function handleLogout() {
    clearSession();
    navigate('/login', { replace: true });
  }

  return (
    <div className="welcome-page">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-brand">
          <svg
            className="nav-ps-logo"
            viewBox="0 0 100 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="PlayStation"
          >
            <text x="0" y="16" fill="#0070d1" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14">
              PlayStation
            </text>
          </svg>
        </div>
        <div className="nav-actions">
          <span className="nav-username">{username}</span>
          <button className="btn-secondary" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome back,<br />{username}
          </h1>
          <p className="hero-body">
            You are successfully signed in to your PlayStation account.
            Explore the world of PlayStation gaming.
          </p>
          <button className="btn-primary" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="features-section">
        <div className="features-inner">
          <h2 className="features-title">Discover PlayStation</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3 className="feature-card-title">PlayStation 5</h3>
              <p className="feature-card-body">
                Experience lightning-fast loading with an ultra-high speed SSD,
                deeper immersion with support for haptic feedback, adaptive
                triggers and 3D Audio.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3 className="feature-card-title">PlayStation Plus</h3>
              <p className="feature-card-body">
                Explore a curated catalogue of PS4 and PS5 titles, access
                online multiplayer, and enjoy monthly games with PlayStation
                Plus Essential, Extra, or Premium.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-card-title">Trophies</h3>
              <p className="feature-card-body">
                Earn Bronze, Silver, Gold, and Platinum trophies as you play.
                Track your progress, compare with friends, and showcase your
                achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Microsoft Certifications 2026 Section */}
      <section className="certifications-section">
        <div className="certifications-inner">
          <h2 className="certifications-title">Microsoft Certifications 2026</h2>
          <p className="certifications-subtitle">
            Validate your cloud, AI, and data skills with the latest Microsoft certifications for 2026.
          </p>
          <div className="certifications-grid">
            <div className="cert-card">
              <div className="cert-badge cert-badge--beginner">Beginner</div>
              <div className="cert-icon">☁️</div>
              <h3 className="cert-card-title">Azure Fundamentals</h3>
              <p className="cert-exam-code">AZ-900</p>
              <p className="cert-card-body">
                Foundational knowledge of cloud services and how those services are provided with
                Microsoft Azure. Ideal for those starting a cloud career.
              </p>
              <a
                className="cert-link"
                href="https://learn.microsoft.com/credentials/certifications/azure-fundamentals/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more →
              </a>
            </div>
            <div className="cert-card">
              <div className="cert-badge cert-badge--beginner">Beginner · New 2026</div>
              <div className="cert-icon">🤖</div>
              <h3 className="cert-card-title">Azure AI Fundamentals</h3>
              <p className="cert-exam-code">AI-901</p>
              <p className="cert-card-body">
                Foundational AI concepts including machine learning and responsible AI, with
                hands-on skills using Microsoft Azure AI Foundry. Updated April 2026.
              </p>
              <a
                className="cert-link"
                href="https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more →
              </a>
            </div>
            <div className="cert-card">
              <div className="cert-badge cert-badge--associate">Associate</div>
              <div className="cert-icon">🧠</div>
              <h3 className="cert-card-title">Azure AI Engineer Associate</h3>
              <p className="cert-exam-code">AI-102</p>
              <p className="cert-card-body">
                Design and implement AI solutions using Azure AI services including natural language
                processing, computer vision, knowledge mining, and generative AI.
              </p>
              <a
                className="cert-link"
                href="https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more →
              </a>
            </div>
            <div className="cert-card">
              <div className="cert-badge cert-badge--associate">Associate · New 2026</div>
              <div className="cert-icon">🔐</div>
              <h3 className="cert-card-title">Cloud and AI Security Engineer</h3>
              <p className="cert-exam-code">SC-500</p>
              <p className="cert-card-body">
                Implement end-to-end security controls for cloud and AI workloads. Replaces
                AZ-500 with expanded coverage of AI model protection. Beta available May 2026.
              </p>
              <a
                className="cert-link"
                href="https://learn.microsoft.com/credentials/certifications/exams/sc-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more →
              </a>
            </div>
            <div className="cert-card">
              <div className="cert-badge cert-badge--associate">Associate</div>
              <div className="cert-icon">📊</div>
              <h3 className="cert-card-title">Fabric Data Engineer Associate</h3>
              <p className="cert-exam-code">DP-700</p>
              <p className="cert-card-body">
                Implement data engineering solutions using Microsoft Fabric. Covers data ingestion,
                transformation, orchestration, and optimization. Skills updated April 2026.
              </p>
              <a
                className="cert-link"
                href="https://learn.microsoft.com/credentials/certifications/fabric-data-engineer-associate/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more →
              </a>
            </div>
            <div className="cert-card">
              <div className="cert-badge cert-badge--associate">Associate</div>
              <div className="cert-icon">📈</div>
              <h3 className="cert-card-title">Fabric Analytics Engineer Associate</h3>
              <p className="cert-exam-code">DP-600</p>
              <p className="cert-card-body">
                Design, create, and deploy enterprise-scale analytics solutions using Microsoft
                Fabric. Validate your skills in building semantic models and data pipelines.
              </p>
              <a
                className="cert-link"
                href="https://learn.microsoft.com/credentials/certifications/fabric-analytics-engineer-associate/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blue CTA Band */}
      <section className="cta-band">
        <div className="cta-inner">
          <h2 className="cta-title">30 Years of PlayStation</h2>
          <p className="cta-body">
            Celebrate three decades of iconic gaming moments, legendary
            franchises, and groundbreaking technology.
          </p>
          <button className="btn-secondary-dark">Learn More</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2024 Sony Interactive Entertainment LLC. PlayStation and the "PS"
          Family logo are registered trademarks of Sony Interactive
          Entertainment Inc.
        </p>
      </footer>
    </div>
  );
}
