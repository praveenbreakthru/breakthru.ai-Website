import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function WhoWeAre() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="wrapper-content whoweare-page">
      <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Who We Are</span>
      </div>
      <section className="whoweare-hero-section">
        <h1 className="whoweare-title">Who We Are</h1>
        <div className="whoweare-hero-orb whoweare-orb-1" />
        <div className="whoweare-hero-orb whoweare-orb-2" />
      </section>

      <section className="founder-details-section">
        <div className="founder-grid">
          {/* Image Space Section (Left) */}
          <div className="founder-image-container">
            <div className="founder-image-glow" />
            <div className="founder-image-placeholder">
              <div className="placeholder-content">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <p className="placeholder-title">Dr. Selvakumar</p>
                <p className="placeholder-hint">[ Founder Image Space - Attach Here ]</p>
              </div>
            </div>
          </div>

          {/* Details & Contents Section (Right) */}
          <div className="founder-info-container">
            {/* Quote Block */}
            <div className="founder-quote-card">
              <div className="quote-icon">“</div>
              <p className="founder-quote-text">
                At Breakthru Solutions, we don’t just build technology—we empower business solutions that creates impact. 
                Our mission is to create AI-native products and services that shape the future while nurturing the next generation of technology leaders.
              </p>
              <div className="founder-signature-row">
                <div className="signature-line" />
                <span className="founder-signature-name">- Dr. Selvakumar</span>
              </div>
            </div>

            {/* Contents Paragraphs */}
            <div className="founder-bio-card">
              <p className="bio-paragraph highlight-bio">
                Breakthru Solutions represents the vanguard of digital transformation, specializing in artificial intelligence, automation, and product innovation.
              </p>
              <p className="bio-paragraph">
                Founded by the visionary <strong>Dr. Selvakumar</strong> who has built multiple technology organizations in US and India. 
                He has nurtured and created a huge impact to the startup ecosystem and is widely considered as the <strong>“Startup GURU”</strong>.
              </p>

              {/* Tag Badges */}
              <div className="founder-badges">
                <span className="founder-badge badge-visionary">
                  <span className="badge-dot" /> Visionary Leader
                </span>
                <span className="founder-badge badge-guru">
                  <span className="badge-dot" /> Startup Guru
                </span>
                <span className="founder-badge badge-impact">
                  <span className="badge-dot" /> Global Impact
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhoWeAre
