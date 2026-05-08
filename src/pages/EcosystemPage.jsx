import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function EcosystemPage() {
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
        <span className="breadcrumb-current">Solutions</span>
      </div>
      {/* Ecosystem Section */}
      <section
        id="ecosystem"
        className="eco-section"
        data-section="ecosystem"
        ref={setSectionRef('ecosystem')}
      >
        <div className={`eco-inner ${visibleSections.ecosystem ? 'eco-visible' : ''}`}>
          {/* Header */}
          <div className="eco-header">
            <span className="eco-header-sub">THE CONSTELLATION</span>
            <h2 className="eco-header-label">ECOSYSTEM</h2>
            <p className="eco-header-desc">
              We don&apos;t go alone. We integrate with the giants to deliver
              the holistic &quot;Digital Fabric&quot;.
            </p>
          </div>

          {/* Strategic Alliances Title */}
          <div className="eco-section-title">
            <h3 className="eco-section-heading">Strategic Alliances</h3>
            <p className="eco-section-desc">
              Deep engineering partnerships where we don&apos;t just implement tools,
              we build on top of them.
            </p>
          </div>

          {/* Partner Cards Stack - Hero Style */}
          <div className="eco-cards-row">
            {/* Databricks */}
            <div className="eco-card eco-card-1">
              <div className="eco-card-accent" />
              <img src="/data.png" alt="Databricks" className="eco-card-logo" />
              <div className="eco-card-inner">
                <span className="eco-card-number">PARTNER 01</span>
                <h3 className="eco-card-title">Databricks</h3>
                <span className="eco-card-sub">Data & AI Platform</span>
                <div className="eco-card-line" />
                <p className="eco-card-desc">
                  Unified analytics platform for data engineering, data science, and machine learning.
                </p>
                <ul className="eco-card-list">
                  <li>Lakehouse Architecture</li>
                  <li>Delta Lake Implementation</li>
                  <li>MLflow & ML Ops</li>
                  <li>Spark Optimization</li>
                </ul>
              </div>
              <div className="eco-card-glow" />
            </div>

            {/* Snowflake */}
            <div className="eco-card eco-card-2">
              <div className="eco-card-accent" />
              <img src="/snow.png" alt="Snowflake" className="eco-card-logo" />
              <div className="eco-card-inner">
                <span className="eco-card-number">PARTNER 02</span>
                <h3 className="eco-card-title">Snowflake</h3>
                <span className="eco-card-sub">Data Cloud</span>
                <div className="eco-card-line" />
                <p className="eco-card-desc">
                  Cloud-native data warehouse with near-infinite scalability and data sharing.
                </p>
                <ul className="eco-card-list">
                  <li>Data Warehouse Modernization</li>
                  <li>Data Mesh Implementation</li>
                  <li>Snowpark Development</li>
                  <li>Data Sharing & Marketplace</li>
                </ul>
              </div>
              <div className="eco-card-glow" />
            </div>

            {/* Google Cloud */}
            <div className="eco-card eco-card-3">
              <div className="eco-card-accent" />
              <img src="/GC.png" alt="Google Cloud" className="eco-card-logo" />
              <div className="eco-card-inner">
                <span className="eco-card-number">PARTNER 03</span>
                <h3 className="eco-card-title">Google Cloud</h3>
                <span className="eco-card-sub">AI Infrastructure</span>
                <div className="eco-card-line" />
                <p className="eco-card-desc">
                  Enterprise cloud platform with leading AI/ML capabilities and global infrastructure.
                </p>
                <ul className="eco-card-list">
                  <li>Vertex AI & GenAI</li>
                  <li>BigQuery Analytics</li>
                  <li>Cloud Infrastructure</li>
                  <li>Anthos Multi-cloud</li>
                </ul>
              </div>
              <div className="eco-card-glow" />
            </div>

            {/* Intellect Design */}
            <div className="eco-card eco-card-4">
              <div className="eco-card-accent" />
              <img src="/ID.png" alt="Intellect Design" className="eco-card-logo" />
              <div className="eco-card-inner">
                <span className="eco-card-number">PARTNER 04</span>
                <h3 className="eco-card-title">Intellect Design</h3>
                <span className="eco-card-sub">Digital Banking</span>
                <div className="eco-card-line" />
                <p className="eco-card-desc">
                  Global leader in financial technology for banking, insurance, and capital markets.
                </p>
                <ul className="eco-card-list">
                  <li>Core Banking Implementation</li>
                  <li>Digital Lending Platforms</li>
                  <li>Wealth Management</li>
                  <li>Payment Solutions</li>
                </ul>
              </div>
              <div className="eco-card-glow" />
            </div>
          </div>

          {/* How We Partner */}
          <div className="eco-partner-section">
            <h3 className="eco-partner-heading">How We Partner</h3>
            <div className="eco-partner-grid">
              <div className="eco-partner-step">
                <div className="eco-step-num">01</div>
                <h4 className="eco-step-title">Co-Engineering</h4>
                <p className="eco-step-desc">Joint IP development on partner platforms</p>
              </div>
              <div className="eco-partner-step">
                <div className="eco-step-num">02</div>
                <h4 className="eco-step-title">Implementation</h4>
                <p className="eco-step-desc">Certified last-mile delivery specialists</p>
              </div>
              <div className="eco-partner-step">
                <div className="eco-step-num">03</div>
                <h4 className="eco-step-title">White-Label</h4>
                <p className="eco-step-desc">Extended specialist pods for partner customers</p>
              </div>
            </div>
          </div>

          {/* Technology Categories */}
          <div className="eco-tech-section">
            <h3 className="eco-partner-heading">Technology Categories</h3>
            <div className="eco-tech-grid">
              <div className="eco-tech-card">
                <div className="eco-tech-header">Cloud Infrastructure</div>
                <div className="eco-tech-items">
                  <span>Google Cloud</span>
                  <span>AWS</span>
                  <span>Azure</span>
                </div>
              </div>
              <div className="eco-tech-card">
                <div className="eco-tech-header">Data Platforms</div>
                <div className="eco-tech-items">
                  <span>Snowflake</span>
                  <span>Databricks</span>
                  <span>Confluent</span>
                </div>
              </div>
              <div className="eco-tech-card">
                <div className="eco-tech-header">AI/ML Platforms</div>
                <div className="eco-tech-items">
                  <span>NVIDIA</span>
                  <span>OpenAI</span>
                  <span>Anthropic</span>
                </div>
              </div>
              <div className="eco-tech-card">
                <div className="eco-tech-header">Industry Solutions</div>
                <div className="eco-tech-items">
                  <span>Intellect Design</span>
                  <span>Mahat.ai</span>
                  <span>Temenos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EcosystemPage
