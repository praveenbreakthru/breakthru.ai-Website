import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const capabilities = [
  {
    id: 1,
    num: '01',
    title: 'DIGITAL ROADMAP',
    desc: '3-year horizon planning aligning tech investments with business KPIs.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 5-9" />
      </svg>
    ),
  },
  {
    id: 2,
    num: '02',
    title: 'ROI MODELING',
    desc: 'Financial engineering to justify tech spend. We calculate the cost of doing nothing.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    id: 3,
    num: '03',
    title: 'TECH DUE DILIGENCE',
    desc: 'Deep-dive auditing of legacy stacks for M&A or modernization efforts.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 4,
    num: '04',
    title: 'FAMILY OFFICE TRANSFORMATION',
    desc: 'Modernizing wealth management with institutional-grade technology stacks.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
]

function Strategy() {
  const [visibleCards, setVisibleCards] = useState([])
  const cardRefs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx)
            setVisibleCards((prev) => {
              if (!prev.includes(idx)) return [...prev, idx]
              return prev
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="wrapper-content">
            <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <Link to="/services" className="breadcrumb-link">Services</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Strategy</span>
      </div>
      {/* Hero Section */}
      <section className="content-splits hero-section strategy-hero-section">
        <div className="top-bg-colors">
          <img
            src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6803b4d2a77749c3dfcc4c71_Rectangle%2018%402x.png"
            alt=""
            className="hero-bg-image"
            loading="lazy"
          />
        </div>

        <div className="svc-hero-content-wrapper">
          <div className="svc-hero-text-side">
            <div className="our-services-tag">
              <img
                src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6804bfe11fa4a378b7321682_ai-idea.png"
                alt=""
                className="service-icon"
                loading="lazy"
              />
              <span className="service-label">Our Services</span>
            </div>

            <h1 className="hero-heading strategy-hero-heading">
              Strategy &amp;<br />
              Value Engineering
            </h1>
          </div>

          <div className="svc-hero-image-side">
            <div className="svc-image-box">
              <img
                src="/gifs/echelon-data-quipo.gif"
                alt="Strategic Planning Illustration"
                className="hero-illustration strategy-hero-illustration"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            Blueprint That Compile
          </p>
          <p className="intro-paragraph">
            We don&apos;t deliver slide decks that gather dust. We deliver actionable
            technical roadmaps, ROI models, and architecture blueprints that bridge
            the gap between business intent and engineering reality.
          </p>
        </div>
      </section>

      {/* Approach Section */}
      <section className="strategy-approach-section">
        <div className="strategy-approach-inner">
          <div className="strategy-approach-label">
            <span className="strategy-label-dot" />
            THE APPROACH
          </div>
          <h2 className="strategy-approach-heading">
            Every line of code has a{' '}
            <span className="strategy-accent">direct line of sight</span> to P&amp;L
            impact.
          </h2>
          <p className="strategy-approach-text">
            Our &apos;Value First&apos; methodology ensures every engagement starts with the
            outcome, then works backward to the architecture. We don&apos;t just advise &mdash;
            we engineer measurable business value from day one.
          </p>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="strategy-capabilities-section">
        <div className="strategy-capabilities-header">
          <h4 className="section-subtitle">_ Key Capabilities</h4>
          <h2 className="section-heading">
            What we <br />
            <span className="strategy-accent">deliver</span>
          </h2>
        </div>

        <div className="strategy-capabilities-grid">
          {capabilities.map((item, index) => (
            <div
              key={item.id}
              className={`strategy-cap-card strategy-cap-card-${index + 1} ${visibleCards.includes(index) ? 'strategy-cap-visible' : ''}`}
              data-idx={index}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="strategy-cap-card-top">
                <span className="strategy-cap-num">{item.num}</span>
                <div className="strategy-cap-icon">{item.icon}</div>
              </div>
              <h3 className="strategy-cap-title">{item.title}</h3>
              <p className="strategy-cap-desc">{item.desc}</p>
              <div className="strategy-cap-line" />
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="strategy-how-section">
        <div className="strategy-how-inner">
          <div className="strategy-how-left">
            <h4 className="section-subtitle">_ How We Work</h4>
            <h2 className="strategy-how-heading">
              Value First <br />
              Methodology
            </h2>
          </div>
          <div className="strategy-how-right">
            <p className="strategy-how-text">
              Our &apos;Value First&apos; methodology ensures every line of code written has a
              direct line of sight to P&amp;L impact. We start with the outcome, then
              work backward to the architecture.
            </p>
            <div className="strategy-how-steps">
              <div className="strategy-how-step">
                <div className="strategy-step-num">01</div>
                <div className="strategy-step-content">
                  <h4>Define Outcome</h4>
                  <p>Align on measurable business KPIs and success criteria.</p>
                </div>
              </div>
              <div className="strategy-how-step">
                <div className="strategy-step-num">02</div>
                <div className="strategy-step-content">
                  <h4>Map Architecture</h4>
                  <p>Design technical blueprints that directly enable the outcome.</p>
                </div>
              </div>
              <div className="strategy-how-step">
                <div className="strategy-step-num">03</div>
                <div className="strategy-step-content">
                  <h4>Build &amp; Measure</h4>
                  <p>Execute with continuous feedback loops tied to P&amp;L metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="secondary-cta">
        <div className="section-title-center">
          <h2 className="section-heading">
            Ready to turn strategy <br />
            into <span className="strategy-accent">engineered outcomes</span>?
          </h2>
          <a href="/contactus" className="cta-link">
            <div className="cta-inner">
              <h4 className="cta-text">
                Talk to a <br />
                Strategy Expert
              </h4>
              <img
                src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/680373c4e864c9bb5f51b71f_arrow-up-right-01.png"
                alt=""
                className="cta-arrow"
                loading="lazy"
              />
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Strategy
