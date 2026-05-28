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
