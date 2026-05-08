import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function BreakthruLabsStory() {
  const [stats, setStats] = useState({ downtime: 0, products: 0, cycle: 0 })
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
          const targets = { downtime: 60, products: 2, cycle: 2 }
          const duration = 2000
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)

            setStats({
              downtime: Math.round(eased * targets.downtime),
              products: Math.round(eased * targets.products),
              cycle: Math.round(eased * targets.cycle),
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
    <div className="wrapper-content labs-story-page">
            <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Breakthru Labs</span>
      </div>

      {/* Hero */}
      <section className="ls-hero">
        <div className="ls-hero-bg">
          <div className="ls-hero-gradient" />
          <div className="ls-hero-grid" />
        </div>
        <div className="ls-hero-content">
          <div className="ls-hero-left">
            <div className="ls-hero-tag">
              <span className="ls-hero-tag-dot" />
              EXPERIMENTAL DIVISION
            </div>
            <h1 className="ls-hero-title">
              BREAKTHRU<br />
              <span className="ls-hero-title-accent">LABS</span>
            </h1>
            <div className="ls-hero-meta">
              <div className="ls-hero-meta-item">
                <span className="ls-hero-meta-label">Division</span>
                <span className="ls-hero-meta-value">Labs</span>
              </div>
              <div className="ls-hero-meta-divider" />
              <div className="ls-hero-meta-item">
                <span className="ls-hero-meta-label">Story</span>
                <span className="ls-hero-meta-value">04</span>
              </div>
            </div>
          </div>
          <div className="ls-hero-right">
            <img
              src="https://s13.gifyu.com/images/bmPda.gif"
              alt="Breakthru Labs Animation"
              className="ls-hero-animation-gif"
            />
          </div>
        </div>
        <div className="ls-hero-scroll-hint">
          <div className="ls-hero-scroll-line" />
        </div>
      </section>

      {/* The Context */}
      <section className="ls-context">
        <div className="ls-context-inner">
          <div className="ls-section-label">
            <span className="ls-section-num">01</span>
            <span className="ls-section-label-text">THE VISION</span>
          </div>
          <div className="ls-context-grid">
            <div className="ls-context-card ls-context-card-main">
              <div className="ls-context-card-border" />
              <p className="ls-context-text">
                Where the world&apos;s best creative ideas get built.
                Experience the art of <strong>modern AI studios</strong>.
                We don&apos;t wait for the future — we <strong>prototype it</strong>.
              </p>
            </div>
            <div className="ls-context-card ls-context-card-side">
              <p className="ls-context-text">
                Breakthru Labs is our <strong>experimental division</strong> —
                a sandbox where bold ideas become production-ready products.
                Two products. Two bets. Both shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="ls-products">
        <div className="ls-products-inner">
          <div className="ls-section-label">
            <span className="ls-section-num">02</span>
            <span className="ls-section-label-text">THE PRODUCTS</span>
          </div>
          <div className="ls-products-grid">
            {/* Nexus BD */}
            <div className="ls-product-card ls-product-card-1">
              <div className="ls-product-card-accent" />
              <div className="ls-product-card-inner">
                <div className="ls-product-card-top">
                  <span className="ls-product-card-number">LABS 01</span>
                  <span className="ls-product-badge ls-badge-beta">BETA ACCESS</span>
                </div>
                <h3 className="ls-product-card-title">Nexus BD</h3>
                <span className="ls-product-card-tagline">The Autonomous Growth Engine</span>
                <div className="ls-product-card-line" />
                <p className="ls-product-card-desc">
                  An advanced AI-powered Business Development automation platform
                  that streamlines the entire sales prospecting workflow. From
                  dual-provider AI research (Gemini + Deepseek) to hyper-personalized
                  email outreach.
                </p>
                <ul className="ls-product-card-features">
                  <li>Dual AI Research Engine</li>
                  <li>Auto-Personalized Landing Pages</li>
                  <li>Sentiment Analysis on Replies</li>
                  <li>Workflow Automation</li>
                </ul>
              </div>
              <div className="ls-product-card-glow" />
            </div>

            {/* Agent Lenz */}
            <div className="ls-product-card ls-product-card-2">
              <div className="ls-product-card-accent" />
              <div className="ls-product-card-inner">
                <div className="ls-product-card-top">
                  <span className="ls-product-card-number">LABS 02</span>
                  <span className="ls-product-badge ls-badge-live">LIVE V1.0</span>
                </div>
                <h3 className="ls-product-card-title">Agent Lenz</h3>
                <span className="ls-product-card-tagline">The AIOps Sentinel</span>
                <div className="ls-product-card-line" />
                <p className="ls-product-card-desc">
                  Comprehensive AI-powered incident management and SRE platform.
                  Streamline operations, reduce downtime by 60%, and automate
                  routine tasks to focus human expertise on complex problems.
                </p>
                <ul className="ls-product-card-features">
                  <li>Intelligent Alert Correlation</li>
                  <li>Real-time SLA Compliance</li>
                  <li>Automated War Rooms</li>
                  <li>Predictive Breach Detection</li>
                </ul>
              </div>
              <div className="ls-product-card-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* The Grind */}
      <section className="ls-grind">
        <div className="ls-grind-inner">
          <div className="ls-section-label ls-section-label-light">
            <span className="ls-section-num">03</span>
            <span className="ls-section-label-text">THE APPROACH</span>
          </div>
          <div className="ls-grind-card">
            <div className="ls-grind-quote-mark">&ldquo;</div>
            <p className="ls-grind-text">
              Labs isn&apos;t a side project. It&apos;s a <strong>parallel engine</strong>.
              Every product starts as a 2-week spike. If it survives the gauntlet
              of real users and real data, it earns its place in the stack.
            </p>
            <p className="ls-grind-text ls-grind-text-bottom">
              We build fast, fail faster, and ship <strong>what works</strong>.
              No innovation theatre. No demo-ware. Just products that
              <strong> solve real problems</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* The Impact */}
      <section className="ls-breakthrough">
        <div className="ls-breakthrough-inner">
          <div className="ls-section-label">
            <span className="ls-section-num">04</span>
            <span className="ls-section-label-text">THE IMPACT</span>
          </div>
          <div className="ls-stats-grid" ref={statsRef}>
            <div className="ls-stat-card ls-stat-card-1">
              <div className="ls-stat-card-top" />
              <div className="ls-stat-value">{stats.downtime}<span className="ls-stat-unit">%</span></div>
              <div className="ls-stat-label">Downtime Reduction</div>
              <div className="ls-stat-bar">
                <div className="ls-stat-bar-fill" style={{ width: '60%' }} />
              </div>
            </div>
            <div className="ls-stat-card ls-stat-card-2">
              <div className="ls-stat-card-top" />
              <div className="ls-stat-value">{stats.products}</div>
              <div className="ls-stat-label">Products Shipping</div>
              <div className="ls-stat-bar">
                <div className="ls-stat-bar-fill" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="ls-stat-card ls-stat-card-3">
              <div className="ls-stat-card-top" />
              <div className="ls-stat-value">{stats.cycle}<span className="ls-stat-unit">wk</span></div>
              <div className="ls-stat-label">Spike-to-Ship Cycle</div>
              <div className="ls-stat-bar">
                <div className="ls-stat-bar-fill" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BreakthruLabsStory
