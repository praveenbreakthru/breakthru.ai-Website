import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const capabilities = [
  {
    id: 1,
    num: '01',
    title: 'PRODUCT SQUADS',
    desc: 'Autonomous, cross-functional teams (PM + Eng + Design) that own a product vertical.',
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
    title: 'GCC BUILD-OUT',
    desc: 'Setting up your offshore engineering center in India/Philippines. Legal, HR, and Real Estate included.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 3,
    num: '03',
    title: 'PLATFORM-AS-A-SERVICE',
    desc: 'Ecosystem partner professional services delivered as a managed platform.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 4,
    num: '04',
    title: 'STAFF AUGMENTATION',
    desc: 'High-end specialized talent injection for critical sprint goals.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M16 11l2 2 4-4" />
      </svg>
    ),
  },
]

function Growth() {
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
        <span className="breadcrumb-current">Growth</span>
      </div>
      {/* Hero Section */}
      <section className="content-splits hero-section growth-hero-section">
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
            <div className="our-services-tag our-services-tag-growth">
              <img
                src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6804bfe11fa4a378b7321682_ai-idea.png"
                alt=""
                className="service-icon"
                loading="lazy"
              />
              <span className="service-label">Our Services</span>
            </div>

            <h1 className="hero-heading growth-hero-heading">
              Growth &amp;<br />
              Ecosystem
            </h1>
          </div>

          <div className="svc-hero-image-side">
            <div className="svc-image-box">
              <img
                src="/gifs/main_animation_dan.gif"
                alt="Growth Illustration"
                className="hero-illustration growth-hero-illustration"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            Scale on Demand
          </p>
          <p className="intro-paragraph">
            Accelerate your capacity to deliver. We provide white-labeled
            engineering squads and build-operate-transfer (BOT) models to set up
            your own Global Capability Centers (GCC).
          </p>
        </div>
      </section>

      {/* Approach Section */}
      <section className="growth-approach-section">
        <div className="growth-approach-inner">
          <div className="growth-approach-label">
            <span className="growth-label-dot" />
            THE APPROACH
          </div>
          <h2 className="growth-approach-heading">
            Accelerate your capacity to{' '}
            <span className="growth-accent">deliver</span>.
          </h2>
          <p className="growth-approach-text">
            We don&apos;t just &apos;staff bodies&apos;. We deploy culture. Our pods come with
            our engineering DNA, ensuring they integrate and elevate your existing
            teams from day one.
          </p>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="growth-capabilities-section">
        <div className="growth-capabilities-header">
          <h4 className="section-subtitle">_ Key Capabilities</h4>
          <h2 className="section-heading">
            How we <br />
            <span className="growth-accent">scale</span>
          </h2>
        </div>

        <div className="growth-capabilities-grid">
          {capabilities.map((item, index) => (
            <div
              key={item.id}
              className={`growth-cap-card growth-cap-card-${index + 1} ${visibleCards.includes(index) ? 'growth-cap-visible' : ''}`}
              data-idx={index}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="growth-cap-card-top">
                <span className="growth-cap-num">{item.num}</span>
                <div className="growth-cap-icon">{item.icon}</div>
              </div>
              <h3 className="growth-cap-title">{item.title}</h3>
              <p className="growth-cap-desc">{item.desc}</p>
              <div className="growth-cap-line" />
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="growth-how-section">
        <div className="growth-how-inner">
          <div className="growth-how-left">
            <h4 className="section-subtitle">_ How We Work</h4>
            <h2 className="growth-how-heading">
              Deploy <br />
              <span className="growth-accent-alt">Culture</span>, Not Just People
            </h2>
          </div>
          <div className="growth-how-right">
            <p className="growth-how-text">
              We don&apos;t just &apos;staff bodies&apos;. We deploy culture. Our pods come with
              our engineering DNA, ensuring they integrate and elevate your
              existing teams.
            </p>
            <div className="growth-how-steps">
              <div className="growth-how-step">
                <div className="growth-step-num">01</div>
                <div className="growth-step-content">
                  <h4>Assess &amp; Align</h4>
                  <p>Understand your tech stack, culture, and delivery gaps to build the right team composition.</p>
                </div>
              </div>
              <div className="growth-how-step">
                <div className="growth-step-num">02</div>
                <div className="growth-step-content">
                  <h4>Deploy &amp; Integrate</h4>
                  <p>Embed squads with your engineering DNA, tooling, and rituals from day one.</p>
                </div>
              </div>
              <div className="growth-how-step">
                <div className="growth-step-num">03</div>
                <div className="growth-step-content">
                  <h4>Scale &amp; Transfer</h4>
                  <p>Build sustainable capacity with knowledge transfer and BOT models for long-term ownership.</p>
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
            Ready to scale your <br />
            <span className="growth-accent">engineering capacity</span>?
          </h2>
          <a href="/contactus" className="cta-link">
            <div className="cta-inner">
              <h4 className="cta-text">
                Talk to a <br />
                Growth Expert
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

export default Growth
