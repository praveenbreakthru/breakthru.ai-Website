import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const capabilities = [
  {
    id: 1,
    num: '01',
    title: 'CLOUD NATIVE BUILD',
    desc: 'Kubernetes, Serverless, and Microservices architectures on AWS/Azure/GCP.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    id: 2,
    num: '02',
    title: 'LEGACY MODERNIZATION',
    desc: 'Strangler fig pattern migration to decompose monoliths without business disruption.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 3,
    num: '03',
    title: 'DEVSECOPS',
    desc: 'Automated CI/CD pipelines with integrated security scanning and compliance.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 4,
    num: '04',
    title: 'QUALITY ENGINEERING',
    desc: 'Shift-left testing automation and performance engineering for high scale.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
]

function Engineering() {
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
        <span className="breadcrumb-current">Platform Engineering</span>
      </div>
      {/* Hero Section */}
      <section className="content-splits hero-section eng-hero-section">
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
            <div className="our-services-tag our-services-tag-eng">
              <img
                src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6804bfe11fa4a378b7321682_ai-idea.png"
                alt=""
                className="service-icon"
                loading="lazy"
              />
              <span className="service-label">Our Services</span>
            </div>

            <h1 className="hero-heading eng-hero-heading">
              Platform <br />
              Engineering
            </h1>
          </div>

          <div className="svc-hero-image-side">
            <div className="svc-image-box">
              <img
                src="/gifs/engineering-pixabay.gif"
                alt="Engineering Illustration"
                className="hero-illustration eng-hero-illustration"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            Hardcore Platform Built
          </p>
          <p className="intro-paragraph">
            The core of what we do. Building scalable, resilient, cloud-native
            platforms. We specialize in complex distributed systems, microservices
            migration, and high-performance computing.
          </p>
        </div>
      </section>

      {/* Approach Section */}
      <section className="eng-approach-section">
        <div className="eng-approach-inner">
          <div className="eng-approach-label">
            <span className="eng-label-dot" />
            THE APPROACH
          </div>
          <h2 className="eng-approach-heading">
            Building <span className="eng-accent">scalable, resilient</span>,
            cloud-native platforms.
          </h2>
          <p className="eng-approach-text">
            Engineering excellence is non-negotiable. We implement strict code quality
            gates, observability from day one, and chaos engineering practices to
            ensure resilience at every layer of your stack.
          </p>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="eng-capabilities-section">
        <div className="eng-capabilities-header">
          <h4 className="section-subtitle">_ Key Capabilities</h4>
          <h2 className="section-heading">
            What we <br />
            <span className="eng-accent">build</span>
          </h2>
        </div>

        <div className="eng-capabilities-grid">
          {capabilities.map((item, index) => (
            <div
              key={item.id}
              className={`eng-cap-card eng-cap-card-${index + 1} ${visibleCards.includes(index) ? 'eng-cap-visible' : ''}`}
              data-idx={index}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="eng-cap-card-top">
                <span className="eng-cap-num">{item.num}</span>
                <div className="eng-cap-icon">{item.icon}</div>
              </div>
              <h3 className="eng-cap-title">{item.title}</h3>
              <p className="eng-cap-desc">{item.desc}</p>
              <div className="eng-cap-line" />
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="eng-how-section">
        <div className="eng-how-inner">
          <div className="eng-how-left">
            <h4 className="section-subtitle">_ How We Work</h4>
            <h2 className="eng-how-heading">
              Engineering <br />
              <span className="eng-accent-alt">Excellence</span>
            </h2>
          </div>
          <div className="eng-how-right">
            <p className="eng-how-text">
              Engineering excellence is non-negotiable. We implement strict code
              quality gates, observability from day one, and chaos engineering
              practices to ensure resilience.
            </p>
            <div className="eng-how-steps">
              <div className="eng-how-step">
                <div className="eng-step-num">01</div>
                <div className="eng-step-content">
                  <h4>Architecture Review</h4>
                  <p>Deep-dive into system design with scalability and resilience as first-class concerns.</p>
                </div>
              </div>
              <div className="eng-how-step">
                <div className="eng-step-num">02</div>
                <div className="eng-step-content">
                  <h4>Build &amp; Automate</h4>
                  <p>CI/CD pipelines, infrastructure as code, and automated quality gates from day one.</p>
                </div>
              </div>
              <div className="eng-how-step">
                <div className="eng-step-num">03</div>
                <div className="eng-step-content">
                  <h4>Observe &amp; Harden</h4>
                  <p>Full observability stack with chaos engineering to validate production resilience.</p>
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
            Ready to build <br />
            <span className="eng-accent">production-grade platforms</span>?
          </h2>
          <a href="/contactus" className="cta-link">
            <div className="cta-inner">
              <h4 className="cta-text">
                Talk to an <br />
                Engineering Expert
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

export default Engineering
