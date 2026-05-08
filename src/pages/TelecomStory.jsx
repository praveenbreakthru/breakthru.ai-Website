import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function TelecomStory() {
  const [visibleSections, setVisibleSections] = useState({})
  const [resultStats, setResultStats] = useState({ uptime: 0, truckRolls: 0 })
  const sectionRefs = useRef({})
  const statsRef = useRef(null)
  const hasStatsAnimated = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section')
            setVisibleSections((prev) => ({ ...prev, [id]: true }))
          }
        })
      },
      { threshold: 0.15 }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStatsAnimated.current) {
          hasStatsAnimated.current = true
          const targets = { uptime: 99.99, truckRolls: 30 }
          const duration = 2000
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)

            setResultStats({
              uptime: Math.round(eased * targets.uptime * 100) / 100,
              truckRolls: Math.round(eased * targets.truckRolls),
            })

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el
  }

  return (
    <div className="tlc-story-page">
            <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Telecom Story</span>
      </div>
      {/* Hero */}
      <section className="tlc-hero">
        <div className="tlc-hero-bg">
          <div className="tlc-hero-gradient" />
          <div className="tlc-hero-grid" />
          <div className="tlc-hero-glow tlc-hero-glow-1" />
          <div className="tlc-hero-glow tlc-hero-glow-2" />
        </div>

        {/* Signal Waves */}
        <div className="tlc-signal-waves">
          <div className="tlc-wave tlc-wave-1" />
          <div className="tlc-wave tlc-wave-2" />
          <div className="tlc-wave tlc-wave-3" />
          <div className="tlc-wave tlc-wave-4" />
          <div className="tlc-wave tlc-wave-5" />
        </div>

        <div className="tlc-hero-content">
          <div className="tlc-hero-tag">
            <span className="tlc-hero-tag-dot" />
            TELECOM
          </div>
          <h1 className="tlc-hero-title">
            SIGNAL VS.<br />
            <span className="tlc-hero-title-accent">NOISE</span>
          </h1>
          <div className="tlc-hero-meta">
            <div className="tlc-hero-meta-item">
              <span className="tlc-hero-meta-label">Industry</span>
              <span className="tlc-hero-meta-value">Telecom</span>
            </div>
            <div className="tlc-hero-meta-divider" />
            <div className="tlc-hero-meta-item">
              <span className="tlc-hero-meta-label">Story</span>
              <span className="tlc-hero-meta-value">03</span>
            </div>
            <div className="tlc-hero-meta-divider" />
            <div className="tlc-hero-meta-item">
              <span className="tlc-hero-meta-label">Assets</span>
              <span className="tlc-hero-meta-value">40K+</span>
            </div>
          </div>
        </div>

        <div className="tlc-hero-scroll-hint">
          <div className="tlc-hero-scroll-line" />
        </div>
      </section>

      {/* The Context */}
      <section
        className="tlc-context"
        data-section="context"
        ref={setSectionRef('context')}
      >
        <div className={`tlc-context-inner ${visibleSections.context ? 'tlc-visible' : ''}`}>
          <div className="tlc-section-label">
            <span className="tlc-section-num">01</span>
            <span className="tlc-section-label-text">THE CONTEXT</span>
          </div>

          <div className="tlc-context-layout">
            <div className="tlc-context-main">
              <div className="tlc-context-quote-card">
                <div className="tlc-quote-pulse" />
                <div className="tlc-quote-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
                  </svg>
                </div>
                <p className="tlc-context-quote-text">
                  Tower downtime costs <strong>millions per minute</strong>.
                  The old way? Wait for a customer to scream, then roll a truck.
                  We needed to shift from <strong>&apos;Repair&apos;</strong> to <strong>&apos;Predict&apos;</strong>.
                  The network needed to heal itself.
                </p>
              </div>

              <div className="tlc-context-info-cards">
                <div className="tlc-info-card tlc-info-card-1">
                  <div className="tlc-info-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="tlc-info-card-content">
                    <span className="tlc-info-card-label">Response Time</span>
                    <span className="tlc-info-card-value">Minutes = Millions</span>
                  </div>
                </div>
                <div className="tlc-info-card tlc-info-card-2">
                  <div className="tlc-info-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 20h.01" />
                      <path d="M7 20v-4" />
                      <path d="M12 20v-8" />
                      <path d="M17 20V8" />
                      <path d="M22 4v16" />
                    </svg>
                  </div>
                  <div className="tlc-info-card-content">
                    <span className="tlc-info-card-label">Old Model</span>
                    <span className="tlc-info-card-value">Reactive Repair</span>
                  </div>
                </div>
                <div className="tlc-info-card tlc-info-card-3">
                  <div className="tlc-info-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4" />
                      <path d="m4.93 4.93 2.83 2.83" />
                      <path d="M2 12h4" />
                      <path d="m4.93 19.07 2.83-2.83" />
                      <path d="M12 18v4" />
                      <path d="m19.07 19.07-2.83-2.83" />
                      <path d="M18 12h4" />
                      <path d="m19.07 4.93-2.83 2.83" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <div className="tlc-info-card-content">
                    <span className="tlc-info-card-label">New Model</span>
                    <span className="tlc-info-card-value">AI Prediction</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tlc-context-side">
              <div className="tlc-context-side-card">
                <div className="tlc-side-card-number">48h</div>
                <p className="tlc-side-card-text">
                  Advance failure prediction window. We don&apos;t wait for the signal to drop —
                  we see the <strong>distortion before it becomes silence</strong>.
                </p>
              </div>
              <div className="tlc-context-side-card tlc-context-side-dark">
                <div className="tlc-side-card-number tlc-num-alt">N</div>
                <p className="tlc-side-card-text">
                  Nerve center of <strong>national connectivity</strong>.
                  Every tower heartbeat, monitored. Every anomaly, decoded.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Tech */}
      <section
        className="tlc-tech"
        data-section="tech"
        ref={setSectionRef('tech')}
      >
        <div className={`tlc-tech-inner ${visibleSections.tech ? 'tlc-visible' : ''}`}>
          <div className="tlc-section-label">
            <span className="tlc-section-num tlc-num-teal">02</span>
            <span className="tlc-section-label-text">THE TECH</span>
          </div>

          <p className="tlc-tech-intro">
            We built <strong>TRAMS</strong> (Total Remote Asset Management System).
            An AI brain that ingests weather data, power fluctuations, and signal patterns.
            It predicts failures <strong>48 hours in advance</strong> and dispatches drones
            for visual inspection.
          </p>

          <div className="tlc-tech-grid">
            <div className="tlc-tech-card tlc-tech-card-python">
              <div className="tlc-tech-card-glow" />
              <div className="tlc-tech-card-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <span className="tlc-tech-card-name">Python AI/ML</span>
              <span className="tlc-tech-card-tag">Machine Learning Core</span>
              <div className="tlc-tech-card-line" />
            </div>

            <div className="tlc-tech-card tlc-tech-card-drone">
              <div className="tlc-tech-card-glow" />
              <div className="tlc-tech-card-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 2.83 2.83" />
                  <path d="M2 18h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="M12 22v-8" />
                  <path d="m19.07 19.07-2.83-2.83" />
                  <path d="M18 18h4" />
                  <path d="m19.07 10.93-2.83 2.83" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="tlc-tech-card-name">Drone API</span>
              <span className="tlc-tech-card-tag">Visual Inspection</span>
              <div className="tlc-tech-card-line" />
            </div>

            <div className="tlc-tech-card tlc-tech-card-lora">
              <div className="tlc-tech-card-glow" />
              <div className="tlc-tech-card-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12A10 10 0 0 1 12 2" />
                  <path d="M7 4.3A10 10 0 0 1 12 2" />
                  <path d="M22 12A10 10 0 0 1 12 22" />
                  <path d="M17 19.7A10 10 0 0 1 12 22" />
                  <path d="M2 12a10 10 0 0 0 10 10" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
              </div>
              <span className="tlc-tech-card-name">LORAWAN</span>
              <span className="tlc-tech-card-tag">IoT Network</span>
              <div className="tlc-tech-card-line" />
            </div>

            <div className="tlc-tech-card tlc-tech-card-bigdata">
              <div className="tlc-tech-card-glow" />
              <div className="tlc-tech-card-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
                </svg>
              </div>
              <span className="tlc-tech-card-name">Big Data</span>
              <span className="tlc-tech-card-tag">Signal Analysis</span>
              <div className="tlc-tech-card-line" />
            </div>
          </div>

          {/* TRAMS Architecture Diagram */}
          <div className="tlc-trams-diagram">
            <div className="tlc-trams-flow">
              <div className="tlc-trams-node tlc-trams-node-sensor">
                <div className="tlc-trams-node-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                    <line x1="12" y1="20" x2="12.01" y2="20" />
                  </svg>
                </div>
                <span>Sensors</span>
              </div>
              <div className="tlc-trams-arrow">
                <div className="tlc-trams-arrow-line" />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <div className="tlc-trams-node tlc-trams-node-ai">
                <div className="tlc-trams-node-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v4a4 4 0 0 0 8 0v-4h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
                  </svg>
                </div>
                <span>TRAMS AI</span>
              </div>
              <div className="tlc-trams-arrow">
                <div className="tlc-trams-arrow-line" />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <div className="tlc-trams-node tlc-trams-node-drone">
                <div className="tlc-trams-node-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="m4.93 4.93 2.83 2.83" />
                    <path d="m16.24 16.24 2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="m4.93 19.07 2.83-2.83" />
                    <path d="m16.24 7.76 2.83-2.83" />
                  </svg>
                </div>
                <span>Drones</span>
              </div>
              <div className="tlc-trams-arrow">
                <div className="tlc-trams-arrow-line" />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <div className="tlc-trams-node tlc-trams-node-uptime">
                <div className="tlc-trams-node-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span>99.99% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Grind */}
      <section
        className="tlc-grind"
        data-section="grind"
        ref={setSectionRef('grind')}
      >
        <div className={`tlc-grind-inner ${visibleSections.grind ? 'tlc-visible' : ''}`}>
          <div className="tlc-section-label tlc-section-label-light">
            <span className="tlc-section-num">03</span>
            <span className="tlc-section-label-text">THE GRIND</span>
          </div>

          <div className="tlc-grind-layout">
            <div className="tlc-grind-main-card">
              <div className="tlc-grind-quote-mark">&ldquo;</div>
              <p className="tlc-grind-text">
                We managed <strong>40,000 assets</strong> virtually.
                Our team wasn&apos;t just IT support; we were the
                <strong> nerve center of national connectivity</strong>.
              </p>
              <p className="tlc-grind-text tlc-grind-text-bottom">
                We took ownership of the uptime metric as if it were
                <strong> our own heartbeat</strong>.
              </p>
            </div>

            <div className="tlc-grind-stats-row">
              <div className="tlc-grind-stat-card">
                <div className="tlc-grind-stat-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <span className="tlc-grind-stat-value">40,000</span>
                <span className="tlc-grind-stat-label">Assets Managed</span>
              </div>
              <div className="tlc-grind-stat-card">
                <div className="tlc-grind-stat-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="tlc-grind-stat-value">24/7</span>
                <span className="tlc-grind-stat-label">Monitoring</span>
              </div>
              <div className="tlc-grind-stat-card">
                <div className="tlc-grind-stat-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="tlc-grind-stat-value">100%</span>
                <span className="tlc-grind-stat-label">Team Ownership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Breakthrough */}
      <section
        className="tlc-breakthrough"
        data-section="breakthrough"
        ref={setSectionRef('breakthrough')}
      >
        <div className={`tlc-breakthrough-inner ${visibleSections.breakthrough ? 'tlc-visible' : ''}`}>
          <div className="tlc-section-label">
            <span className="tlc-section-num tlc-num-amber">04</span>
            <span className="tlc-section-label-text">THE BREAKTHROUGH</span>
          </div>

          <div className="tlc-breakthrough-grid" ref={statsRef}>
            <div className="tlc-result-card tlc-result-1">
              <div className="tlc-result-top-bar" />
              <div className="tlc-result-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="tlc-result-value">
                {resultStats.uptime}<span className="tlc-result-pct">%</span>
              </div>
              <div className="tlc-result-label">Network Uptime</div>
              <div className="tlc-result-bar">
                <div className="tlc-result-bar-fill" style={{ width: '99.99%' }} />
              </div>
              <div className="tlc-result-corner tlc-corner-tl" />
              <div className="tlc-result-corner tlc-corner-br" />
            </div>

            <div className="tlc-result-card tlc-result-2">
              <div className="tlc-result-top-bar" />
              <div className="tlc-result-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="tlc-result-value">
                -{resultStats.truckRolls}<span className="tlc-result-pct">%</span>
              </div>
              <div className="tlc-result-label">Truck Rolls</div>
              <div className="tlc-result-bar">
                <div className="tlc-result-bar-fill" style={{ width: '70%' }} />
              </div>
              <div className="tlc-result-corner tlc-corner-tl" />
              <div className="tlc-result-corner tlc-corner-br" />
            </div>

            <div className="tlc-result-card tlc-result-3">
              <div className="tlc-result-top-bar" />
              <div className="tlc-result-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="tlc-result-value tlc-result-value-text">
                Real-Time
              </div>
              <div className="tlc-result-label">Visibility</div>
              <div className="tlc-result-bar">
                <div className="tlc-result-bar-fill" style={{ width: '100%' }} />
              </div>
              <div className="tlc-result-corner tlc-corner-tl" />
              <div className="tlc-result-corner tlc-corner-br" />
            </div>
          </div>

          <div className="tlc-breakthrough-banner">
            <div className="tlc-banner-pulse" />
            <div className="tlc-banner-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>
            <p className="tlc-banner-text">
              From reactive repair to <strong>predictive intelligence</strong>.
              The network doesn&apos;t just connect — it <strong>thinks</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TelecomStory
