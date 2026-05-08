import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

function ManufacturingStory() {
  const [visible, setVisible] = useState({})
  const [resultStats, setResultStats] = useState({ efficiency: 0, downtime: 0, traceability: 0 })
  const observerRef = useRef(null)
  const statsRef = useRef(null)
  const hasStatsAnimated = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.dataset.anim]: true }))
          }
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll('[data-anim]').forEach((el) => {
      observerRef.current.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStatsAnimated.current) {
          hasStatsAnimated.current = true
          const targets = { efficiency: 40, downtime: 0, traceability: 100 }
          const duration = 2000
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)

            setResultStats({
              efficiency: Math.round(eased * targets.efficiency),
              downtime: Math.round(eased * targets.downtime),
              traceability: Math.round(eased * targets.traceability),
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

  const av = (key) => visible[key] ? 'mfg-visible' : ''

  return (
    <div className="wrapper-content mfg-story-page">
            <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Manufacturing Story</span>
      </div>

      {/* ===== HERO ===== */}
      <section className="mfg-hero">
        <div className="mfg-hero-bg">
          <div className="mfg-hero-gradient" />
          <div className="mfg-hero-grid-lines" />
          <div className="mfg-hero-glow mfg-hero-glow-1" />
          <div className="mfg-hero-glow mfg-hero-glow-2" />
        </div>
        <div className="mfg-hero-content">
          <div className="mfg-hero-tag">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            MANUFACTURING
          </div>
          <h1 className="mfg-hero-title">
            GHOST IN<br />
            THE <span className="mfg-hero-title-accent">MACHINE</span>
          </h1>
          <div className="mfg-hero-meta">
            <div className="mfg-hero-meta-chip">
              <span className="mfg-hero-meta-chip-dot" />
              Story 02
            </div>
            <div className="mfg-hero-meta-chip">
              <span className="mfg-hero-meta-chip-dot mfg-chip-dot-2" />
              Industry 4.0
            </div>
          </div>
          <div className="mfg-hero-indicator">
            <div className="mfg-hero-indicator-line" />
            <span>Scroll to explore</span>
          </div>
        </div>
        <div className="mfg-hero-side-art">
          <div className="mfg-hero-gear mfg-hero-gear-1">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="50" r="20" />
              <path d="M50 10 L55 25 L65 15 L60 30 L75 28 L65 40 L80 42 L67 50 L80 58 L65 60 L75 72 L60 70 L65 85 L55 75 L50 90 L45 75 L35 85 L40 70 L25 72 L35 60 L20 58 L33 50 L20 42 L35 40 L25 28 L40 30 L35 15 L45 25 Z" />
            </svg>
          </div>
          <div className="mfg-hero-gear mfg-hero-gear-2">
            <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="40" cy="40" r="15" />
              <path d="M40 5 L44 18 L52 10 L48 23 L60 20 L52 30 L65 32 L55 40 L65 48 L52 50 L60 60 L48 57 L52 70 L44 62 L40 75 L36 62 L28 70 L32 57 L20 60 L28 50 L15 48 L25 40 L15 32 L28 30 L20 20 L32 23 L28 10 L36 18 Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== THE CONTEXT ===== */}
      <section className="mfg-context" data-anim="context">
        <div className={`mfg-context-inner ${av('context')}`}>
          <div className="mfg-section-header">
            <div className="mfg-section-num-block">01</div>
            <h2 className="mfg-section-title">The Context</h2>
            <div className="mfg-section-line" />
          </div>
          <div className="mfg-context-layout">
            <div className="mfg-context-left">
              <div className="mfg-context-quote-card">
                <div className="mfg-quote-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
                  </svg>
                </div>
                <p className="mfg-context-quote-text">
                  Factories are loud, dirty, and <strong>surprisingly disconnected</strong>.
                  Machines worth millions were &apos;dumb&apos; — generating data that
                  vanished into thin air.
                </p>
              </div>
              <div className="mfg-context-stats-row">
                <div className="mfg-context-mini-card">
                  <div className="mfg-mini-card-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="mfg-mini-card-content">
                    <span className="mfg-mini-card-value">$M+</span>
                    <span className="mfg-mini-card-label">In Hardware</span>
                  </div>
                </div>
                <div className="mfg-context-mini-card mfg-mini-card-alt">
                  <div className="mfg-mini-card-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="mfg-mini-card-content">
                    <span className="mfg-mini-card-value">24/7</span>
                    <span className="mfg-mini-card-label">Operations</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mfg-context-right">
              <div className="mfg-context-block">
                <div className="mfg-context-block-accent" />
                <div className="mfg-context-block-number">A</div>
                <p className="mfg-context-text">
                  The shop floor manager was running a 24/7 operation on
                  <strong> gut feeling and a clipboard</strong>.
                </p>
              </div>
              <div className="mfg-context-block mfg-context-block-alt">
                <div className="mfg-context-block-number">B</div>
                <p className="mfg-context-text">
                  Every machine was an island. No communication, no intelligence,
                  no <strong>predictive capability</strong>. Just noise and heat.
                </p>
              </div>
              <div className="mfg-context-block mfg-context-block-third">
                <div className="mfg-context-block-number">C</div>
                <p className="mfg-context-text">
                  Data existed — terabytes of it — but it was
                  <strong> trapped in silos</strong>, never reaching the people who needed it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE TECH ===== */}
      <section className="mfg-tech" data-anim="tech">
        <div className={`mfg-tech-inner ${av('tech')}`}>
          <div className="mfg-section-header">
            <div className="mfg-section-num-block mfg-num-red">02</div>
            <h2 className="mfg-section-title mfg-section-title-light">The Tech</h2>
            <div className="mfg-section-line mfg-section-line-light" />
          </div>
          <p className="mfg-tech-intro">
            We wired the <strong>nervous system</strong>. IoT sensors on every vibration point,
            fed into a Digital Twin on Azure. We used Computer Vision to spot defects
            faster than the human eye, and Edge AI to make decisions without
            round-tripping to the cloud.
          </p>
          <div className="mfg-tech-cards-grid">
            <div className="mfg-tech-card mfg-tech-card-azure">
              <div className="mfg-tech-card-glow" />
              <div className="mfg-tech-card-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span className="mfg-tech-card-name">Azure IoT</span>
              <span className="mfg-tech-card-tag">Cloud Platform</span>
              <div className="mfg-tech-card-line" />
            </div>
            <div className="mfg-tech-card mfg-tech-card-tf">
              <div className="mfg-tech-card-glow" />
              <div className="mfg-tech-card-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="mfg-tech-card-name">TensorFlow</span>
              <span className="mfg-tech-card-tag">ML Framework</span>
              <div className="mfg-tech-card-line" />
            </div>
            <div className="mfg-tech-card mfg-tech-card-edge">
              <div className="mfg-tech-card-glow" />
              <div className="mfg-tech-card-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="14" x2="23" y2="14" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="14" x2="4" y2="14" />
                </svg>
              </div>
              <span className="mfg-tech-card-name">Edge Computing</span>
              <span className="mfg-tech-card-tag">On-Premise AI</span>
              <div className="mfg-tech-card-line" />
            </div>
            <div className="mfg-tech-card mfg-tech-card-5g">
              <div className="mfg-tech-card-glow" />
              <div className="mfg-tech-card-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" />
                </svg>
              </div>
              <span className="mfg-tech-card-name">5G</span>
              <span className="mfg-tech-card-tag">Connectivity</span>
              <div className="mfg-tech-card-line" />
            </div>
          </div>
          <div className="mfg-tech-data-flow">
            <div className="mfg-data-flow-track">
              <div className="mfg-data-flow-particle" />
            </div>
            <div className="mfg-data-flow-labels">
              <span>Sensor</span>
              <span>Edge</span>
              <span>Cloud</span>
              <span>Insight</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE GRID ===== */}
      <section className="mfg-grid-section" data-anim="grid">
        <div className={`mfg-grid-inner ${av('grid')}`}>
          <div className="mfg-section-header">
            <div className="mfg-section-num-block">03</div>
            <h2 className="mfg-section-title">The Grid</h2>
            <div className="mfg-section-line" />
          </div>
          <div className="mfg-grid-layout">
            <div className="mfg-grid-visual">
              <div className="mfg-grid-visual-ring mfg-ring-1">
                <div className="mfg-grid-visual-ring mfg-ring-2">
                  <div className="mfg-grid-visual-ring mfg-ring-3">
                    <div className="mfg-ring-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mfg-grid-orbit-items">
                <div className="mfg-orbit-item mfg-orbit-1">
                  <div className="mfg-orbit-dot" />
                  <span>Hard Hats</span>
                </div>
                <div className="mfg-orbit-item mfg-orbit-2">
                  <div className="mfg-orbit-dot" />
                  <span>OEE / TEEP</span>
                </div>
                <div className="mfg-orbit-item mfg-orbit-3">
                  <div className="mfg-orbit-dot" />
                  <span>Operators</span>
                </div>
                <div className="mfg-orbit-item mfg-orbit-4">
                  <div className="mfg-orbit-dot" />
                  <span>HMI Design</span>
                </div>
              </div>
            </div>
            <div className="mfg-grid-content">
              <div className="mfg-grid-card mfg-grid-card-1">
                <div className="mfg-grid-card-number">01</div>
                <p className="mfg-grid-card-text">
                  You can&apos;t code this from a coffee shop.
                  <strong> We wore hard hats.</strong>
                </p>
              </div>
              <div className="mfg-grid-card mfg-grid-card-2">
                <div className="mfg-grid-card-number">02</div>
                <p className="mfg-grid-card-text">
                  We learned the difference between OEE and TEEP. We sat with
                  operators to understand why they hated the old HMI, and
                  <strong> built one they actually loved using</strong>.
                </p>
              </div>
              <div className="mfg-grid-card mfg-grid-card-3">
                <div className="mfg-grid-card-number">03</div>
                <p className="mfg-grid-card-text">
                  We embedded on the shop floor. We didn&apos;t just write specs —
                  <strong> we lived the production line</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE BREAKTHROUGH ===== */}
      <section className="mfg-breakthrough" data-anim="breakthrough">
        <div className={`mfg-breakthrough-inner ${av('breakthrough')}`}>
          <div className="mfg-section-header">
            <div className="mfg-section-num-block mfg-num-red">04</div>
            <h2 className="mfg-section-title">The Breakthrough</h2>
            <div className="mfg-section-line" />
          </div>
          <div className="mfg-breakthrough-grid" ref={statsRef}>
            <div className="mfg-result-card mfg-result-1">
              <div className="mfg-result-top-bar" />
              <div className="mfg-result-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="mfg-result-value">{resultStats.efficiency}<span className="mfg-result-pct">%</span></div>
              <div className="mfg-result-label">Efficiency Gain</div>
              <div className="mfg-result-bar">
                <div className="mfg-result-bar-fill" style={{ width: '40%' }} />
              </div>
              <div className="mfg-result-corner mfg-corner-tl" />
              <div className="mfg-result-corner mfg-corner-br" />
            </div>
            <div className="mfg-result-card mfg-result-2">
              <div className="mfg-result-top-bar" />
              <div className="mfg-result-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="mfg-result-value">{resultStats.downtime === 0 ? 'Zero' : resultStats.downtime}</div>
              <div className="mfg-result-label">Unplanned Downtime</div>
              <div className="mfg-result-bar">
                <div className="mfg-result-bar-fill" style={{ width: '100%' }} />
              </div>
              <div className="mfg-result-corner mfg-corner-tl" />
              <div className="mfg-result-corner mfg-corner-br" />
            </div>
            <div className="mfg-result-card mfg-result-3">
              <div className="mfg-result-top-bar" />
              <div className="mfg-result-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="mfg-result-value">{resultStats.traceability}<span className="mfg-result-pct">%</span></div>
              <div className="mfg-result-label">Traceability</div>
              <div className="mfg-result-bar">
                <div className="mfg-result-bar-fill" style={{ width: '100%' }} />
              </div>
              <div className="mfg-result-corner mfg-corner-tl" />
              <div className="mfg-result-corner mfg-corner-br" />
            </div>
          </div>
          <div className="mfg-breakthrough-banner">
            <div className="mfg-banner-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <p className="mfg-banner-text">
              From clipboard chaos to <strong>zero downtime</strong>. That&apos;s not an improvement — that&apos;s a transformation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ManufacturingStory
