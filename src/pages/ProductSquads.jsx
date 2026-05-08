import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const capabilities = [
  {
    id: 1,
    num: '01',
    title: 'DEDICATED PRODUCT SQUADS',
    desc: 'Cross-functional teams embedded in your delivery cycle — engineers, architects, and PMs aligned to your roadmap and release cadence.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 2,
    num: '02',
    title: 'SNOWFLAKE PROFESSIONAL SERVICES',
    desc: 'End-to-end Snowflake implementation — data modeling, pipeline architecture, performance tuning, and governance frameworks.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
        <line x1="8" y1="16" x2="8.01" y2="16" />
        <line x1="8" y1="20" x2="8.01" y2="20" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
        <line x1="12" y1="22" x2="12.01" y2="22" />
        <line x1="16" y1="16" x2="16.01" y2="16" />
        <line x1="16" y1="20" x2="16.01" y2="20" />
      </svg>
    ),
  },
  {
    id: 3,
    num: '03',
    title: 'DATABRICKS IMPLEMENTATION',
    desc: 'Lakehouse architecture, unified analytics, and ML workload deployment on Databricks — built for scale from day one.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 4,
    num: '04',
    title: 'GOOGLE CLOUD PARTNER DELIVERY',
    desc: 'GCP-native builds leveraging BigQuery, Vertex AI, and Cloud Run — delivered by certified partner engineers with hands-on platform depth.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
]

function ProductSquads() {
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
        <span className="breadcrumb-current">Product Squads</span>
      </div>
      {/* Hero Section */}
      <section className="content-splits hero-section ps-hero-section">
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
            <div className="our-services-tag our-services-tag-ps">
              <img
                src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6804bfe11fa4a378b7321682_ai-idea.png"
                alt=""
                className="service-icon"
                loading="lazy"
              />
              <span className="service-label">Our Services</span>
            </div>

            <h1 className="hero-heading ps-hero-heading">
              Product / Platform<br />
              Squads
            </h1>
          </div>

          <div className="svc-hero-image-side">
            <div className="svc-image-box">
              <img
                src="https://liveimages.algoworks.com/new-algoworks/wp-content/uploads/2022/06/22140355/effective-product-team.gif"
                alt="Product Squads Illustration"
                className="hero-illustration ps-hero-illustration"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            Ecosystem Partner Professional Services as a Platform
          </p>
          <p className="intro-paragraph">
            Dedicated squads that operate as your extended product team. We embed
            certified specialists directly into your product org — operating as a
            seamless extension of your team with full accountability.
          </p>
        </div>
      </section>

      {/* Approach Section */}
      <section className="ps-approach-section">
        <div className="ps-approach-inner">
          <div className="ps-approach-label">
            <span className="ps-label-dot" />
            THE APPROACH
          </div>
          <h2 className="ps-approach-heading">
            We embed <span className="ps-accent">certified specialists</span> directly
            into your product org.
          </h2>
          <p className="ps-approach-text">
            We don&apos;t parachute in consultants and leave. We embed certified
            specialists directly into your product org — operating as a seamless
            extension of your team with full accountability for delivery, timelines,
            and outcomes. Every squad is purpose-built around your stack, your goals,
            and your velocity.
          </p>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="ps-capabilities-section">
        <div className="ps-capabilities-header">
          <h4 className="section-subtitle">_ Key Capabilities</h4>
          <h2 className="section-heading">
            What we <br />
            <span className="ps-accent">deliver</span>
          </h2>
        </div>

        <div className="ps-capabilities-grid">
          {capabilities.map((item, index) => (
            <div
              key={item.id}
              className={`ps-cap-card ps-cap-card-${index + 1} ${visibleCards.includes(index) ? 'ps-cap-visible' : ''}`}
              data-idx={index}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="ps-cap-card-top">
                <span className="ps-cap-num">{item.num}</span>
                <div className="ps-cap-icon">{item.icon}</div>
              </div>
              <h3 className="ps-cap-title">{item.title}</h3>
              <p className="ps-cap-desc">{item.desc}</p>
              <div className="ps-cap-line" />
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="ps-how-section">
        <div className="ps-how-inner">
          <div className="ps-how-left">
            <h4 className="section-subtitle">_ How We Work</h4>
            <h2 className="ps-how-heading">
              Embed &amp; <br />
              <span className="ps-accent-alt">Activate</span>
            </h2>
          </div>
          <div className="ps-how-right">
            <p className="ps-how-text">
              We don&apos;t parachute in consultants and leave. We embed certified
              specialists directly into your product org — operating as a seamless
              extension of your team with full accountability.
            </p>
            <div className="ps-how-steps">
              <div className="ps-how-step">
                <div className="ps-step-num">01</div>
                <div className="ps-step-content">
                  <h4>Squad Scoping</h4>
                  <p>We map your platform goals and define the exact squad composition — roles, tools, and engagement model tailored to your team.</p>
                </div>
              </div>
              <div className="ps-how-step">
                <div className="ps-step-num">02</div>
                <div className="ps-step-content">
                  <h4>Embed &amp; Activate</h4>
                  <p>Specialists plug into your existing workflows — standups, sprints, and communication channels — from week one.</p>
                </div>
              </div>
              <div className="ps-how-step">
                <div className="ps-step-num">03</div>
                <div className="ps-step-content">
                  <h4>Deliver &amp; Iterate</h4>
                  <p>We ship against your milestones with full transparency. Every sprint has a measurable output tied to platform or product value.</p>
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
            Ready to extend your <br />
            <span className="ps-accent">product team</span>?
          </h2>
          <a href="/contactus" className="cta-link">
            <div className="cta-inner">
              <h4 className="cta-text">
                Talk to a <br />
                Product Expert
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

export default ProductSquads
