import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const capabilities = [
  {
    id: 1,
    num: '01',
    title: 'MODERN DATA STACK',
    desc: 'Snowflake/Databricks implementation. Moving from ETL to ELT streaming pipelines.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: 2,
    num: '02',
    title: 'GenAI AGENT',
    desc: 'Custom LLMs and RAG architectures for internal knowledge retrieval and customer support.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v4a4 4 0 0 0 8 0v-4h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 3,
    num: '03',
    title: 'DATA GOVERNANCE',
    desc: 'Ensuring lineage, quality, and security compliance (GDPR/DPDP) at scale.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 4,
    num: '04',
    title: 'PREDICTIVE ANALYTICS',
    desc: 'Forecasting models for supply chain, churn, and risk management.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
]

function DataAI() {
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
        <span className="breadcrumb-current">Data & AI</span>
      </div>
      {/* Hero Section */}
      <section className="content-splits hero-section dataai-hero-section">
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
            <div className="our-services-tag our-services-tag-dataai">
              <img
                src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6804bfe11fa4a378b7321682_ai-idea.png"
                alt=""
                className="service-icon"
                loading="lazy"
              />
              <span className="service-label">Our Services</span>
            </div>

            <h1 className="hero-heading dataai-hero-heading">
              Data &amp; AI <br />
              Engineering
            </h1>
          </div>

          <div className="svc-hero-image-side">
            <div className="svc-image-box">
              <img
                src="/gifs/aiml.gif"
                alt="Data and AI Illustration"
                className="hero-illustration dataai-hero-illustration"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            From Lake to Intelligence
          </p>
          <p className="intro-paragraph">
            Data is only as good as the decisions it drives. We build robust data
            fabrics, modern lakehouses, and pragmatic AI agents that move beyond
            the hype cycle into production utility.
          </p>
        </div>
      </section>

      {/* Approach Section */}
      <section className="dataai-approach-section">
        <div className="dataai-approach-inner">
          <div className="dataai-approach-label">
            <span className="dataai-label-dot" />
            THE APPROACH
          </div>
          <h2 className="dataai-approach-heading">
            Data is only as good as the{' '}
            <span className="dataai-accent">decisions it drives</span>.
          </h2>
          <p className="dataai-approach-text">
            We build robust data fabrics, modern lakehouses, and pragmatic AI agents
            that move beyond the hype cycle into production utility. Every pipeline,
            every model, every agent is designed for measurable business impact.
          </p>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="dataai-capabilities-section">
        <div className="dataai-capabilities-header">
          <h4 className="section-subtitle">_ Key Capabilities</h4>
          <h2 className="section-heading">
            What we <br />
            <span className="dataai-accent">deliver</span>
          </h2>
        </div>

        <div className="dataai-capabilities-grid">
          {capabilities.map((item, index) => (
            <div
              key={item.id}
              className={`dataai-cap-card dataai-cap-card-${index + 1} ${visibleCards.includes(index) ? 'dataai-cap-visible' : ''}`}
              data-idx={index}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="dataai-cap-card-top">
                <span className="dataai-cap-num">{item.num}</span>
                <div className="dataai-cap-icon">{item.icon}</div>
              </div>
              <h3 className="dataai-cap-title">{item.title}</h3>
              <p className="dataai-cap-desc">{item.desc}</p>
              <div className="dataai-cap-line" />
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="dataai-how-section">
        <div className="dataai-how-inner">
          <div className="dataai-how-left">
            <h4 className="section-subtitle">_ How We Work</h4>
            <h2 className="dataai-how-heading">
              Data as a <br />
              <span className="dataai-accent-alt">Product</span>
            </h2>
          </div>
          <div className="dataai-how-right">
            <p className="dataai-how-text">
              We believe in &apos;Data as a Product&apos;. We treat your datasets as APIs with
              defined SLAs, ensuring consumption is seamless for both humans and machines.
            </p>
            <div className="dataai-how-steps">
              <div className="dataai-how-step">
                <div className="dataai-step-num">01</div>
                <div className="dataai-step-content">
                  <h4>Ingest &amp; Catalog</h4>
                  <p>Unified data ingestion with automated lineage tracking and cataloging.</p>
                </div>
              </div>
              <div className="dataai-how-step">
                <div className="dataai-step-num">02</div>
                <div className="dataai-step-content">
                  <h4>Transform &amp; Govern</h4>
                  <p>ELT pipelines with built-in quality checks and compliance guardrails.</p>
                </div>
              </div>
              <div className="dataai-how-step">
                <div className="dataai-step-num">03</div>
                <div className="dataai-step-content">
                  <h4>Activate &amp; Measure</h4>
                  <p>Surface insights through dashboards, agents, and predictive models with SLAs.</p>
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
            Ready to turn data into <br />
            <span className="dataai-accent">production intelligence</span>?
          </h2>
          <a href="/contactus" className="cta-link">
            <div className="cta-inner">
              <h4 className="cta-text">
                Talk to a <br />
                Data &amp; AI Expert
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

export default DataAI
