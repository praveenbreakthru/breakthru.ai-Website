import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function FintechStory() {
  const [stats, setStats] = useState({ acquisition: 0, latency: 0, fraud: 0 })
  const statsRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const targets = { acquisition: 2.5, latency: 40, fraud: 0 }
          const duration = 2000
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)

            setStats({
              acquisition: Math.round(eased * targets.acquisition * 10) / 10,
              latency: Math.round(eased * targets.latency),
              fraud: Math.round(eased * targets.fraud),
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

  return (
    <div className="wrapper-content fintech-story-page">
            <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Fintech Story</span>
      </div>
      {/* Hero */}
      <section className="fs-hero">
        <div className="fs-hero-bg">
          <div className="fs-hero-gradient" />
          <div className="fs-hero-grid" />
        </div>
        <div className="fs-hero-content">
          <div className="fs-hero-left">
            <div className="fs-hero-tag">
              <span className="fs-hero-tag-dot" />
              FINANCE SERVICES
            </div>
            <h1 className="fs-hero-title">
              THE NEO –<br />
              BANK <span className="fs-hero-title-accent">HEIST</span>
            </h1>
            <div className="fs-hero-meta">
              <div className="fs-hero-meta-item">
                <span className="fs-hero-meta-label">Industry</span>
                <span className="fs-hero-meta-value">Fintech</span>
              </div>
              <div className="fs-hero-meta-divider" />
              <div className="fs-hero-meta-item">
                <span className="fs-hero-meta-label">Story</span>
                <span className="fs-hero-meta-value">01</span>
              </div>
            </div>
          </div>
          <div className="fs-hero-right">
            <a href="/lottie-animation/computer-science-animation_13060840" target="self" className="fs-hero-animation-link">
              <video loading="lazy" muted playsInline autoPlay loop className="fs-hero-animation-video">
                <source src="" type="video/mp4" />
              </video>
            </a>
            <img src="/gifs/bank-heist.gif" alt="Bank Heist GIF" className="fs-hero-animation-gif" loading="lazy" />
          </div>
        </div>
        <div className="fs-hero-scroll-hint">
          <div className="fs-hero-scroll-line" />
        </div>
      </section>

      {/* The Context */}
      <section className="fs-context">
        <div className="fs-context-inner">
          <div className="fs-section-label">
            <span className="fs-section-num">01</span>
            <span className="fs-section-label-text">THE CONTEXT</span>
          </div>
          <div className="fs-context-grid">
            <div className="fs-context-card fs-context-card-main">
              <div className="fs-context-card-border" />
              <p className="fs-context-text">
                Legacy banks are like <strong>fortresses built on quicksand</strong>.
                We walked into a landscape where opening an account took
                <strong> 3 days</strong> and compliance was a paper trail.
              </p>
            </div>
            <div className="fs-context-card fs-context-card-side">
              <p className="fs-context-text">
                The domain challenge wasn&apos;t just &apos;going digital&apos;—it was
                <strong> rewriting the genetic code</strong> of money movement
                without breaking the vault.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="fs-techstack">
        <div className="fs-techstack-inner">
          <div className="fs-section-label">
            <span className="fs-section-num">02</span>
            <span className="fs-section-label-text">TECH STACK</span>
          </div>
          <p className="fs-techstack-intro">
            We didn&apos;t just patch APIs. We built a <strong>parallel core</strong>.
            Using Event-Driven Architecture for real-time ledgers and a
            Micro-frontend architecture to decouple the UI from the monolith.
          </p>
          <div className="fs-techstack-grid">
            <div className="fs-tech-card fs-tech-card-1">
              <div className="fs-tech-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="fs-tech-card-name">Kafka</span>
              <span className="fs-tech-card-desc">Event Streaming</span>
            </div>
            <div className="fs-tech-card fs-tech-card-2">
              <div className="fs-tech-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="fs-tech-card-name">React Native</span>
              <span className="fs-tech-card-desc">Mobile Frontend</span>
            </div>
            <div className="fs-tech-card fs-tech-card-3">
              <div className="fs-tech-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </div>
              <span className="fs-tech-card-name">Spring Boot</span>
              <span className="fs-tech-card-desc">Backend Core</span>
            </div>
            <div className="fs-tech-card fs-tech-card-4">
              <div className="fs-tech-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              </div>
              <span className="fs-tech-card-name">AWS Lambda</span>
              <span className="fs-tech-card-desc">Serverless Compute</span>
            </div>
          </div>
          <p className="fs-techstack-sub">
            We deployed biometric auth that feels like <strong>magic, not security</strong>.
          </p>
        </div>
      </section>

      {/* The Grind */}
      <section className="fs-grind">
        <div className="fs-grind-inner">
          <div className="fs-section-label fs-section-label-light">
            <span className="fs-section-num">03</span>
            <span className="fs-section-label-text">THE GRIND</span>
          </div>
          <div className="fs-grind-card">
            <div className="fs-grind-quote-mark">&ldquo;</div>
            <p className="fs-grind-text">
              Our squads didn&apos;t just submit code PRs. We
              <strong> owned the P&L of the latency</strong>.
              When the auth service jittered at 2 AM, our engineers were
              already fixing it before the alarm rang.
            </p>
            <p className="fs-grind-text fs-grind-text-bottom">
              We embedded into their risk teams, arguing about liquidity models
              until we <strong>automated them</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* The Breakthrough */}
      <section className="fs-breakthrough">
        <div className="fs-breakthrough-inner">
          <div className="fs-section-label">
            <span className="fs-section-num">04</span>
            <span className="fs-section-label-text">THE BREAKTHROUGH</span>
          </div>
          <div className="fs-stats-grid" ref={statsRef}>
            <div className="fs-stat-card fs-stat-card-1">
              <div className="fs-stat-card-top" />
              <div className="fs-stat-value">{stats.acquisition}<span className="fs-stat-unit">x</span></div>
              <div className="fs-stat-label">User Acquisition</div>
              <div className="fs-stat-bar">
                <div className="fs-stat-bar-fill" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="fs-stat-card fs-stat-card-2">
              <div className="fs-stat-card-top" />
              <div className="fs-stat-value">{stats.latency}<span className="fs-stat-unit">ms</span></div>
              <div className="fs-stat-label">Transaction Latency</div>
              <div className="fs-stat-bar">
                <div className="fs-stat-bar-fill" style={{ width: '95%' }} />
              </div>
            </div>
            <div className="fs-stat-card fs-stat-card-3">
              <div className="fs-stat-card-top" />
              <div className="fs-stat-value">${stats.fraud}</div>
              <div className="fs-stat-label">Fraud Loss (Q4)</div>
              <div className="fs-stat-bar">
                <div className="fs-stat-bar-fill" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FintechStory
