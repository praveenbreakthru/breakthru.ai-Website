import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CareersPage() {
  const [visibleSections, setVisibleSections] = useState({})
  const [careerStats, setCareerStats] = useState({ engineers: 0, hubs: 0, clients: 0, rating: 0 })
  const sectionRefs = useRef({})
  const hasAnimated = useRef(false)
  const statsRef = useRef(null)
  const positionsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActivePosition(-1)
        }
      },
      { threshold: 0.05 }
    )
    if (positionsRef.current) observer.observe(positionsRef.current)
    return () => observer.disconnect()
  }, [])
  const [statsVisible, setStatsVisible] = useState(false)
  const navigate = useNavigate()
  const [activePosition, setActivePosition] = useState(-1)

  const positions = [
    { label: 'Data Engineer', index: 0, theme: 'btn-purple' },
    { label: 'Platform Engineer', index: 1, theme: 'btn-green' },
    { label: 'Solutions Architect', index: 2, theme: 'btn-blue' },
    { label: 'Full Stack', index: 3, theme: 'btn-pink' },
    { label: 'DevOps', index: 4, theme: 'btn-orange' },
    { label: 'Consultant', index: 5, theme: 'btn-teal' }
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-section')
          if (id) {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => ({ ...prev, [id]: true }))
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!statsVisible || hasAnimated.current) return

    hasAnimated.current = true

    const targets = { engineers: 200, hubs: 3, clients: 50, rating: 4.8 }
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCareerStats({
        engineers: Math.round(eased * targets.engineers),
        hubs: Math.round(eased * targets.hubs),
        clients: Math.round(eased * targets.clients),
        rating: Math.round(eased * targets.rating * 10) / 10,
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [statsVisible])

  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el
  }

  return (
    <div className="wrapper-content">
            <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Careers</span>
      </div>
      {/* Careers Section */}
      <section
        id="careers"
        className="careers-section"
        data-section="careers"
        ref={setSectionRef('careers')}
      >
        <div className={`careers-inner ${visibleSections.careers ? 'careers-visible' : ''}`}>
          {/* Hero */}
          <div className="careers-hero">
            <span className="careers-tag">CAREERS</span>
            <span className="careers-hiring-badge">WE'RE HIRING</span>
            <h2 className="careers-hero-title">Join The Fabric</h2>
            <p className="careers-hero-sub">
              Build the future of enterprise technology. No corporate BS. Just impactful work with brilliant people.
            </p>
          </div>

          {/* Why Join Us - New Design */}
          <div className="careers-why">
            <div className="careers-why-card careers-why-1">
              <div className="careers-why-number">01</div>
              <div className="careers-why-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="careers-why-title">Real Engineering</h3>
              <p className="careers-why-desc">Production code, not PowerPoints</p>
              <div className="careers-why-line"></div>
            </div>
            <div className="careers-why-card careers-why-2">
              <div className="careers-why-number">02</div>
              <div className="careers-why-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" /><path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <h3 className="careers-why-title">AI-Native</h3>
              <p className="careers-why-desc">Work with cutting-edge AI/ML</p>
              <div className="careers-why-line"></div>
            </div>
            <div className="careers-why-card careers-why-3">
              <div className="careers-why-number">03</div>
              <div className="careers-why-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3 className="careers-why-title">Global Exposure</h3>
              <p className="careers-why-desc">Work with Fortune 500 clients</p>
              <div className="careers-why-line"></div>
            </div>
            <div className="careers-why-card careers-why-4">
              <div className="careers-why-number">04</div>
              <div className="careers-why-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="careers-why-title">Fast Growth</h3>
              <p className="careers-why-desc">Ownership from day one</p>
              <div className="careers-why-line"></div>
            </div>
          </div>

          {/* Our Culture */}
          <div className="careers-culture">
            <div className="careers-culture-left">
              <span className="careers-section-tag">OUR CULTURE</span>
              <h3 className="careers-culture-title">
                We're a collective of engineers, architects, and problem-solvers who believe that the best consulting happens in the terminal, not the boardroom.
              </h3>
            </div>
            <div className="careers-culture-right">
              <div className="careers-culture-item">
                <div className="careers-culture-dot" />
                <span><strong>Pods &amp; Squads:</strong> Small, autonomous teams</span>
              </div>
              <div className="careers-culture-item">
                <div className="careers-culture-dot" />
                <span><strong>No hierarchy:</strong> Ideas win, not titles</span>
              </div>
              <div className="careers-culture-item">
                <div className="careers-culture-dot" />
                <span><strong>Remote-first:</strong> Work from anywhere</span>
              </div>
              <div className="careers-culture-item">
                <div className="careers-culture-dot" />
                <span><strong>Continuous learning:</strong> Upskill constantly</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="careers-stats" ref={statsRef}>
            <div className="careers-stat-card">
              <span className="careers-stat-value">{careerStats.engineers}+</span>
              <span className="careers-stat-label">Engineers</span>
            </div>
            <div className="careers-stat-card">
              <span className="careers-stat-value">{careerStats.hubs}</span>
              <span className="careers-stat-label">Global Hubs</span>
            </div>
            <div className="careers-stat-card">
              <span className="careers-stat-value">{careerStats.clients}+</span>
              <span className="careers-stat-label">Enterprise Clients</span>
            </div>
            <div className="careers-stat-card">
              <span className="careers-stat-value">{careerStats.rating}&#9733;</span>
              <span className="careers-stat-label">Glassdoor Rating</span>
            </div>
          </div>

          {/* Open Positions */}
          <div className="careers-positions" ref={positionsRef}>
            <span className="careers-section-tag">OPEN POSITIONS</span>

            {/* Quick Nav Buttons */}
            <div className="ind-quicknav" style={{ marginBottom: '40px', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {positions.map((pos) => (
                <button
                  key={pos.index}
                  className={`ind-quicknav-btn ${pos.theme} ${activePosition === pos.index ? `ind-quicknav-btn-active active-${pos.theme}` : ''}`}
                  onClick={() => setActivePosition(pos.index)}
                >
                  {pos.label.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="careers-positions-track">
              <div 
                className="careers-positions-row"
                style={activePosition !== -1 ? {
                  animation: 'none',
                  position: 'relative',
                  left: '50%',
                  transform: `translateX(-${activePosition * 340 + 160}px)`,
                  transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), left 0.6s ease'
                } : {}}
              >
                <div className={`careers-pos-card careers-pos-purple ${activePosition !== -1 && activePosition !== 0 ? 'careers-pos-inactive' : ''} ${activePosition === 0 ? 'careers-pos-active' : ''}`}>
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">Senior Data Engineer</h3>
                  <span className="careers-pos-dept">Data &amp; AI</span>
                  <span className="careers-pos-location">Bengaluru / Remote</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">Snowflake</span>
                    <span className="careers-pos-tag">Databricks</span>
                    <span className="careers-pos-tag">Python</span>
                  </div>
                </div>

                <div className={`careers-pos-card careers-pos-green ${activePosition !== -1 && activePosition !== 1 ? 'careers-pos-inactive' : ''} ${activePosition === 1 ? 'careers-pos-active' : ''}`}>
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">Platform Engineer</h3>
                  <span className="careers-pos-dept">Engineering</span>
                  <span className="careers-pos-location">Bengaluru</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">Kubernetes</span>
                    <span className="careers-pos-tag">Terraform</span>
                    <span className="careers-pos-tag">Go</span>
                  </div>
                </div>

                <div className={`careers-pos-card careers-pos-blue ${activePosition !== -1 && activePosition !== 2 ? 'careers-pos-inactive' : ''} ${activePosition === 2 ? 'careers-pos-active' : ''}`}>
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">GenAI Solutions Architect</h3>
                  <span className="careers-pos-dept">Data &amp; AI</span>
                  <span className="careers-pos-location">Remote</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">LLMs</span>
                    <span className="careers-pos-tag">RAG</span>
                    <span className="careers-pos-tag">LangChain</span>
                  </div>
                </div>

                <div className={`careers-pos-card careers-pos-pink ${activePosition !== -1 && activePosition !== 3 ? 'careers-pos-inactive' : ''} ${activePosition === 3 ? 'careers-pos-active' : ''}`}>
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">Full Stack Developer</h3>
                  <span className="careers-pos-dept">Product Squads</span>
                  <span className="careers-pos-location">Bengaluru / Hyderabad</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">React</span>
                    <span className="careers-pos-tag">Node.js</span>
                    <span className="careers-pos-tag">TypeScript</span>
                  </div>
                </div>

                <div className={`careers-pos-card careers-pos-orange ${activePosition !== -1 && activePosition !== 4 ? 'careers-pos-inactive' : ''} ${activePosition === 4 ? 'careers-pos-active' : ''}`}>
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">DevOps Engineer</h3>
                  <span className="careers-pos-dept">Engineering</span>
                  <span className="careers-pos-location">Remote</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">AWS</span>
                    <span className="careers-pos-tag">CI/CD</span>
                    <span className="careers-pos-tag">Docker</span>
                  </div>
                </div>

                <div className={`careers-pos-card careers-pos-teal ${activePosition !== -1 && activePosition !== 5 ? 'careers-pos-inactive' : ''} ${activePosition === 5 ? 'careers-pos-active' : ''}`}>
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">Technical Consultant</h3>
                  <span className="careers-pos-dept">Strategy</span>
                  <span className="careers-pos-location">Dubai / Riyadh</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">Digital Transformation</span>
                    <span className="careers-pos-tag">BFSI</span>
                  </div>
                </div>

                {activePosition === -1 && (<>
                {/* Duplicate set for seamless loop */}
                <div className="careers-pos-card careers-pos-purple">
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">Senior Data Engineer</h3>
                  <span className="careers-pos-dept">Data &amp; AI</span>
                  <span className="careers-pos-location">Bengaluru / Remote</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">Snowflake</span>
                    <span className="careers-pos-tag">Databricks</span>
                    <span className="careers-pos-tag">Python</span>
                  </div>
                </div>

                <div className="careers-pos-card careers-pos-green">
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">Platform Engineer</h3>
                  <span className="careers-pos-dept">Engineering</span>
                  <span className="careers-pos-location">Bengaluru</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">Kubernetes</span>
                    <span className="careers-pos-tag">Terraform</span>
                    <span className="careers-pos-tag">Go</span>
                  </div>
                </div>

                <div className="careers-pos-card careers-pos-blue">
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">GenAI Solutions Architect</h3>
                  <span className="careers-pos-dept">Data &amp; AI</span>
                  <span className="careers-pos-location">Remote</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">LLMs</span>
                    <span className="careers-pos-tag">RAG</span>
                    <span className="careers-pos-tag">LangChain</span>
                  </div>
                </div>

                <div className="careers-pos-card careers-pos-pink">
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">Full Stack Developer</h3>
                  <span className="careers-pos-dept">Product Squads</span>
                  <span className="careers-pos-location">Bengaluru / Hyderabad</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">React</span>
                    <span className="careers-pos-tag">Node.js</span>
                    <span className="careers-pos-tag">TypeScript</span>
                  </div>
                </div>

                <div className="careers-pos-card careers-pos-orange">
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">DevOps Engineer</h3>
                  <span className="careers-pos-dept">Engineering</span>
                  <span className="careers-pos-location">Remote</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">AWS</span>
                    <span className="careers-pos-tag">CI/CD</span>
                    <span className="careers-pos-tag">Docker</span>
                  </div>
                </div>

                <div className="careers-pos-card careers-pos-teal">
                  <div className="careers-pos-top">
                    <span className="careers-pos-type">Full-time</span>
                  </div>
                  <h3 className="careers-pos-title">Technical Consultant</h3>
                  <span className="careers-pos-dept">Strategy</span>
                  <span className="careers-pos-location">Dubai / Riyadh</span>
                  <div className="careers-pos-tags">
                    <span className="careers-pos-tag">Digital Transformation</span>
                    <span className="careers-pos-tag">BFSI</span>
                  </div>
                </div></>)}
              </div>
            </div>
          </div>

          {/* Don't See Your Role */}
          <div className="careers-cta">
            <h3 className="careers-cta-title">Don't See Your Role?</h3>
            <p className="careers-cta-desc">
              We're always looking for exceptional talent. Send us your profile and let's talk.
            </p>
            <a href="https://mail.google.com/mail/?view=cm&to=" target="_blank" rel="noopener noreferrer" className="careers-cta-button">
              <span>Send Your Profile</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CareersPage
