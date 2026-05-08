import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const capabilities = [
  {
    id: 1,
    num: '01',
    title: 'UNIFIED WEALTH PLATFORMS',
    desc: 'Single-pane visibility across all asset classes, custodians, and entities — replacing disconnected spreadsheets and legacy portals with one source of truth.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 2,
    num: '02',
    title: 'PORTFOLIO MANAGEMENT SYSTEMS',
    desc: 'Real-time performance tracking, risk analytics, and rebalancing tools purpose-built for complex, illiquid, and alternative-heavy portfolios.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 5-9" />
      </svg>
    ),
  },
  {
    id: 3,
    num: '03',
    title: 'FAMILY GOVERNANCE PORTALS',
    desc: 'Secure, structured environments for document management, beneficiary reporting, trustee communications, and inter-generational knowledge transfer.',
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
    title: 'MULTI-ENTITY CONSOLIDATION',
    desc: 'Unified reporting across holding companies, trusts, LLCs, and partnerships — eliminating reconciliation overhead and giving principals a clear consolidated view.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

function FamilyOffice() {
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
        <span className="breadcrumb-current">Family Office</span>
      </div>
      {/* Hero Section */}
      <section className="content-splits hero-section fo-hero-section">
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
            <div className="our-services-tag our-services-tag-fo">
              <img
                src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6804bfe11fa4a378b7321682_ai-idea.png"
                alt=""
                className="service-icon"
                loading="lazy"
              />
              <span className="service-label">Our Services</span>
            </div>

            <h1 className="hero-heading fo-hero-heading">
              Family Office <br />
              Transformations
            </h1>
          </div>

          <div className="svc-hero-image-side">
            <div className="svc-image-box">
              <img
                src="https://cdn.dribbble.com/userupload/29647510/file/original-6c41bc159984aa848eec332e1d774c8d.gif"
                alt="Family Office Illustration"
                className="hero-illustration fo-hero-illustration"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            Digital Modernization for Family Offices
          </p>
          <p className="intro-paragraph">
            From legacy systems to unified wealth platforms. We replace
            operational friction with institutional-grade technology built
            specifically for multi-generational wealth.
          </p>
        </div>
      </section>

      {/* Approach Section */}
      <section className="fo-approach-section">
        <div className="fo-approach-inner">
          <div className="fo-approach-label">
            <span className="fo-label-dot" />
            THE APPROACH
          </div>
          <h2 className="fo-approach-heading">
            Institutional-grade technology for{' '}
            <span className="fo-accent">multi-generational wealth</span>.
          </h2>
          <p className="fo-approach-text">
            Family offices carry decades of operational complexity — fragmented
            systems, siloed data, and manual workflows that don&apos;t scale. We
            replace that friction with institutional-grade technology built
            specifically for multi-generational wealth. Our approach preserves what
            matters — control, privacy, and governance — while eliminating
            everything that slows you down.
          </p>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="fo-capabilities-section">
        <div className="fo-capabilities-header">
          <h4 className="section-subtitle">_ Key Capabilities</h4>
          <h2 className="section-heading">
            What we <br />
            <span className="fo-accent">modernize</span>
          </h2>
        </div>

        <div className="fo-capabilities-grid">
          {capabilities.map((item, index) => (
            <div
              key={item.id}
              className={`fo-cap-card fo-cap-card-${index + 1} ${visibleCards.includes(index) ? 'fo-cap-visible' : ''}`}
              data-idx={index}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="fo-cap-card-top">
                <span className="fo-cap-num">{item.num}</span>
                <div className="fo-cap-icon">{item.icon}</div>
              </div>
              <h3 className="fo-cap-title">{item.title}</h3>
              <p className="fo-cap-desc">{item.desc}</p>
              <div className="fo-cap-line" />
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="fo-how-section">
        <div className="fo-how-inner">
          <div className="fo-how-left">
            <h4 className="section-subtitle">_ How We Work</h4>
            <h2 className="fo-how-heading">
              Migrate &amp; <br />
              <span className="fo-accent-alt">Modernize</span>
            </h2>
          </div>
          <div className="fo-how-right">
            <p className="fo-how-text">
              Phased rollout with zero disruption to operations. Data integrity,
              security, and continuity are non-negotiable at every stage.
            </p>
            <div className="fo-how-steps">
              <div className="fo-how-step">
                <div className="fo-step-num">01</div>
                <div className="fo-step-content">
                  <h4>Legacy Audit</h4>
                  <p>We map your current systems, data flows, and pain points — identifying what to retire, what to migrate, and what to build.</p>
                </div>
              </div>
              <div className="fo-how-step">
                <div className="fo-step-num">02</div>
                <div className="fo-step-content">
                  <h4>Platform Design</h4>
                  <p>We architect a unified stack aligned to your governance model, reporting needs, and long-term wealth structure — no off-the-shelf compromises.</p>
                </div>
              </div>
              <div className="fo-how-step">
                <div className="fo-step-num">03</div>
                <div className="fo-step-content">
                  <h4>Migrate &amp; Modernize</h4>
                  <p>Phased rollout with zero disruption to operations. Data integrity, security, and continuity are non-negotiable at every stage.</p>
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
            Ready to modernize your <br />
            <span className="fo-accent">family office</span>?
          </h2>
          <a href="/contactus" className="cta-link">
            <div className="cta-inner">
              <h4 className="cta-text">
                Talk to a <br />
                Wealth Tech Expert
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

export default FamilyOffice
