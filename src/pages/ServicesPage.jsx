import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InfinityHub from '../components/InfinityHub'

function ServicesPage() {
  const [visibleSections, setVisibleSections] = useState({})
  const sectionRefs = useRef({})
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section')
            if (id) setVisibleSections((prev) => ({ ...prev, [id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el
  }

  return (
    <div className="wrapper-content">
            <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Services</span>
      </div>
      {/* Services Section */}
      <section
        id="services"
        className="svc-section"
        data-section="services"
        ref={setSectionRef('services')}
      >
        <div className={`svc-inner ${visibleSections.services ? 'svc-visible' : ''}`}>
          {/* Header */}
          <div className="svc-header">
            <span className="svc-header-sub">CAPABILITIES</span>
            <div className="svc-header-top">
              <span className="svc-header-label">SERVICES</span>
            </div>
            <InfinityHub />
            <h2 className="svc-title">
              We don&apos;t just advise.
              We <span className="svc-title-accent">architect</span>, <span className="svc-title-accent">build</span>, and <span className="svc-title-accent">run</span>.
            </h2>
          </div>

          {/* Service Cards Grid */}
          <div className="svc-grid">
            {/* Card 1 - Strategy */}
            <div className="svc-card svc-card-strategy">
              <div className="svc-card-top-bar" />
              <div className="svc-card-header">
                <span className="svc-card-num">01</span>
                <div className="svc-card-tags">
                  <span className="svc-card-tag">Digital Roadmap</span>
                  <span className="svc-card-tag">ROI Modeling</span>
                </div>
              </div>
              <h3 className="svc-card-title">Strategy</h3>
              <p className="svc-card-desc">
                We don&apos;t do 100-page decks. We do blueprints that compile.
              </p>
              <ul className="svc-card-list">
                <li>Digital Transformation Strategy</li>
                <li>Technology Due Diligence</li>
                <li>Architecture Assessment</li>
                <li>Cloud Migration Planning</li>
              </ul>
              <div className="svc-card-icon-float">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <Link to="/strategy" className="svc-card-explore" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>

            {/* Card 2 - Data & AI */}
            <div className="svc-card svc-card-data">
              <div className="svc-card-top-bar" />
              <div className="svc-card-header">
                <span className="svc-card-num">02</span>
                <div className="svc-card-tags">
                  <span className="svc-card-tag">Lakehouse</span>
                  <span className="svc-card-tag">GenAI Agents</span>
                </div>
              </div>
              <h3 className="svc-card-title">Data & AI</h3>
              <p className="svc-card-desc">
                Turning data lakes into prediction engines. LLMs that actually work.
              </p>
              <ul className="svc-card-list">
                <li>Data Platform Modernization</li>
                <li>GenAI & LLM Implementation</li>
                <li>ML Ops & Model Deployment</li>
                <li>Analytics & BI Platforms</li>
              </ul>
              <div className="svc-card-icon-float">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v4a4 4 0 0 0 8 0v-4h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
                </svg>
              </div>
              <Link to="/data-ai" className="svc-card-explore" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>

            {/* Card 3 - Engineering */}
            <div className="svc-card svc-card-eng">
              <div className="svc-card-top-bar" />
              <div className="svc-card-header">
                <span className="svc-card-num">03</span>
                <div className="svc-card-tags">
                  <span className="svc-card-tag">Microservices</span>
                  <span className="svc-card-tag">Cloud-Native</span>
                </div>
              </div>
              <h3 className="svc-card-title">Engineering</h3>
              <p className="svc-card-desc">
                Hardcore platform build. Microservices, cloud-native, high scale.
              </p>
              <ul className="svc-card-list">
                <li>Platform Engineering</li>
                <li>API & Integration Layer</li>
                <li>DevSecOps & SRE</li>
                <li>Cloud Infrastructure</li>
              </ul>
              <div className="svc-card-icon-float">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <Link to="/engineering" className="svc-card-explore" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>

            {/* Card 4 - Growth */}
            <div className="svc-card svc-card-growth">
              <div className="svc-card-top-bar" />
              <div className="svc-card-header">
                <span className="svc-card-num">04</span>
                <div className="svc-card-tags">
                  <span className="svc-card-tag">Squads</span>
                  <span className="svc-card-tag">GCC Build</span>
                </div>
              </div>
              <h3 className="svc-card-title">Growth</h3>
              <p className="svc-card-desc">
                White-labeled pods that extend your capability overnight.
              </p>
              <ul className="svc-card-list">
                <li>Engineering Team Augmentation</li>
                <li>Global Capability Centers</li>
                <li>Managed Services</li>
                <li>Technology Partnerships</li>
              </ul>
              <div className="svc-card-icon-float">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <Link to="/growth" className="svc-card-explore" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>

            {/* Card 5 - Product / Platform Squads */}
            <div className="svc-card svc-card-product">
              <div className="svc-card-top-bar" />
              <div className="svc-card-header">
                <span className="svc-card-num">05</span>
                <div className="svc-card-tags">
                  <span className="svc-card-tag">Partner Services</span>
                  <span className="svc-card-tag">Product Teams</span>
                </div>
              </div>
              <h3 className="svc-card-title">Product Squads</h3>
              <p className="svc-card-desc">
                Ecosystem partner professional services as a platform.
                Dedicated squads that operate as your extended product team.
              </p>
              <ul className="svc-card-list">
                <li>Dedicated Product Squads</li>
                <li>Snowflake Professional Services</li>
                <li>Databricks Implementation</li>
                <li>Google Cloud Partner Delivery</li>
              </ul>
              <div className="svc-card-icon-float">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <Link to="/product-squads" className="svc-card-explore" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>

            {/* Card 6 - Family Office */}
            <div className="svc-card svc-card-family">
              <div className="svc-card-top-bar" />
              <div className="svc-card-header">
                <span className="svc-card-num">06</span>
                <div className="svc-card-tags">
                  <span className="svc-card-tag">Wealth Tech</span>
                  <span className="svc-card-tag">Modernization</span>
                </div>
              </div>
              <h3 className="svc-card-title">Family Office</h3>
              <p className="svc-card-desc">
                Digital modernization for family offices.
                From legacy systems to unified wealth platforms.
              </p>
              <ul className="svc-card-list">
                <li>Unified Wealth Platforms</li>
                <li>Portfolio Management Systems</li>
                <li>Family Governance Portals</li>
                <li>Multi-entity Consolidation</li>
              </ul>
              <div className="svc-card-icon-float">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <Link to="/family-office" className="svc-card-explore" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How We Deliver */}
      <section
        className="svc-deliver"
        data-section="deliver"
        ref={setSectionRef('deliver')}
      >
        <div className={`svc-deliver-inner ${visibleSections.deliver ? 'svc-visible' : ''}`}>
          <div className="svc-deliver-header">
            <span className="svc-deliver-label">HOW WE DELIVER</span>
          </div>

          <div className="svc-deliver-grid">
            <div className="svc-deliver-step svc-step-1">
              <div className="svc-step-line" />
              <div className="svc-step-num">01</div>
              <h4 className="svc-step-title">Discover</h4>
              <p className="svc-step-desc">
                Deep-dive into your domain, tech stack, and pain points.
              </p>
            </div>

            <div className="svc-deliver-step svc-step-2">
              <div className="svc-step-line" />
              <div className="svc-step-num">02</div>
              <h4 className="svc-step-title">Architect</h4>
              <p className="svc-step-desc">
                Design systems that scale, not slide decks that gather dust.
              </p>
            </div>

            <div className="svc-deliver-step svc-step-3">
              <div className="svc-step-line" />
              <div className="svc-step-num">03</div>
              <h4 className="svc-step-title">Build</h4>
              <p className="svc-step-desc">
                Agile squads shipping production code in 2-week sprints.
              </p>
            </div>

            <div className="svc-deliver-step svc-step-4">
              <div className="svc-step-num">04</div>
              <h4 className="svc-step-title">Run</h4>
              <p className="svc-step-desc">
                We own the uptime. 24/7 SRE with outcome-based SLAs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
