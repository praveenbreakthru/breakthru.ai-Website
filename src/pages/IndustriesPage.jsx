import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function IndustriesPage() {
  const [visibleSections, setVisibleSections] = useState({})
  const [activeIndustry, setActiveIndustry] = useState(0)
  const sectionRefs = useRef({})
  const navigate = useNavigate()
  const totalIndustries = 6

  const nextIndustry = () => {
    setActiveIndustry((prev) => (prev + 1) % totalIndustries)
  }

  const prevIndustry = () => {
    setActiveIndustry((prev) => (prev - 1 + totalIndustries) % totalIndustries)
  }

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
      {/* Industries Section */}
      <section
        id="industries"
        className="ind-section"
        data-section="industries"
        ref={setSectionRef('industries')}
      >
        <div className={`ind-inner ${visibleSections.industries ? 'ind-visible' : ''}`}>
          <div className="ind-header">
            <span className="ind-header-sub">INDUSTRIES WE TRANSFORM</span>
            <h2 className="ind-header-label">INDUSTRIES</h2>
            <p className="ind-header-desc">
              Vertical expertise. Horizontal impact. We speak your domain language
              and write the code that moves it forward.
            </p>
          </div>

          {/* Industry Quick Nav Buttons */}
          <div className="ind-quicknav">
            {[
              { label: 'BFSI', index: 0 },
              { label: 'MANUFACTURING', index: 1 },
              { label: 'TELECOM', index: 2 },
              { label: 'RETAIL', index: 3 },
              { label: 'HEALTHCARE', index: 4 },
              { label: 'TRAVEL', index: 5 },
            ].map((item) => (
              <button
                key={item.index}
                className={`ind-quicknav-btn ${activeIndustry === item.index ? 'ind-quicknav-btn-active' : ''}`}
                onClick={() => setActiveIndustry(item.index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 3D Carousel Container */}
          <div className="ind-carousel-wrapper">
            <div className="ind-carousel-track">
              {/* BFSI */}
              <div className={`ind-card ind-card-bfsi ${activeIndustry === 0 ? 'ind-card-active' : ''}`} style={{ '--card-index': 0 }}>
                <div className="ind-card-left">
                  <div className="ind-card-badge">01</div>
                  <h3 className="ind-card-title">BFSI</h3>
                  <h4 className="ind-card-subtitle">Banking & Financial Services</h4>
                  <p className="ind-card-desc">
                    From neo-banking cores to real-time fraud detection. We build the
                    infrastructure that moves money at the speed of thought.
                  </p>
                  <div className="ind-card-tagline">Rewiring the Vault</div>
                </div>
                <div className="ind-card-center">
                  <div className="ind-stat-row">
                    <div className="ind-stat">
                      <span className="ind-stat-val">40<span className="ind-stat-unit">ms</span></span>
                      <span className="ind-stat-label">Transaction Latency</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">$2B<span className="ind-stat-unit">+</span></span>
                      <span className="ind-stat-label">Payments Processed</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">99.99<span className="ind-stat-unit">%</span></span>
                      <span className="ind-stat-label">Uptime Achieved</span>
                    </div>
                  </div>
                </div>
                <div className="ind-card-right">
                  <div className="ind-cap-header">CORE CAPABILITIES</div>
                  <ul className="ind-cap-list">
                    <li>Core Banking Modernization</li>
                    <li>Payment Rails & Gateways</li>
                    <li>Fraud Detection & AML</li>
                    <li>Wealth Management Platforms</li>
                    <li>Regulatory Compliance Automation</li>
                  </ul>
                  <div className="ind-use-header">USE CASES</div>
                  <ul className="ind-use-list">
                    <li>Digital-first neo-bank launch</li>
                    <li>Legacy core migration to cloud</li>
                    <li>AI-powered credit decisioning</li>
                    <li>Open banking API ecosystems</li>
                  </ul>
                </div>
              </div>

              {/* Manufacturing */}
              <div className={`ind-card ind-card-mfg ${activeIndustry === 1 ? 'ind-card-active' : ''}`} style={{ '--card-index': 1 }}>
                <div className="ind-card-left">
                  <div className="ind-card-badge">02</div>
                  <h3 className="ind-card-title">MANUFACTURING<br/>& INDUSTRY 4.0</h3>
                  <p className="ind-card-desc">
                    Smart factories that think. Predictive maintenance that sees the future.
                    Supply chains that self-optimize.
                  </p>
                  <div className="ind-card-tagline">Ghost in the Machine</div>
                </div>
                <div className="ind-card-center">
                  <div className="ind-stat-row">
                    <div className="ind-stat">
                      <span className="ind-stat-val">40<span className="ind-stat-unit">%</span></span>
                      <span className="ind-stat-label">Efficiency Gain</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">Zero</span>
                      <span className="ind-stat-label">Unplanned Downtime</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">100<span className="ind-stat-unit">%</span></span>
                      <span className="ind-stat-label">Traceability</span>
                    </div>
                  </div>
                </div>
                <div className="ind-card-right">
                  <div className="ind-cap-header">CORE CAPABILITIES</div>
                  <ul className="ind-cap-list">
                    <li>Digital Twin Implementation</li>
                    <li>Predictive Maintenance AI</li>
                    <li>Smart Factory Automation</li>
                    <li>Supply Chain Optimization</li>
                    <li>Quality Control Vision Systems</li>
                  </ul>
                  <div className="ind-use-header">USE CASES</div>
                  <ul className="ind-use-list">
                    <li>End-to-end MES implementation</li>
                    <li>IoT sensor network deployment</li>
                    <li>Computer vision quality inspection</li>
                    <li>Real-time OEE dashboards</li>
                  </ul>
                </div>
              </div>

              {/* Telecom */}
              <div className={`ind-card ind-card-telecom ${activeIndustry === 2 ? 'ind-card-active' : ''}`} style={{ '--card-index': 2 }}>
                <div className="ind-card-left">
                  <div className="ind-card-badge">03</div>
                  <h3 className="ind-card-title">TELECOMMUNICATION</h3>
                  <p className="ind-card-desc">
                    Networks that heal themselves. Assets managed from the cloud.
                    Customer experiences that just work.
                  </p>
                  <div className="ind-card-tagline">Signal vs. Noise</div>
                </div>
                <div className="ind-card-center">
                  <div className="ind-stat-row">
                    <div className="ind-stat">
                      <span className="ind-stat-val">99.99<span className="ind-stat-unit">%</span></span>
                      <span className="ind-stat-label">Network Uptime</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">-30<span className="ind-stat-unit">%</span></span>
                      <span className="ind-stat-label">Truck Rolls</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">40K</span>
                      <span className="ind-stat-label">Assets Managed</span>
                    </div>
                  </div>
                </div>
                <div className="ind-card-right">
                  <div className="ind-cap-header">CORE CAPABILITIES</div>
                  <ul className="ind-cap-list">
                    <li>Network Operations Center (NOC)</li>
                    <li>Remote Asset Management</li>
                    <li>Customer Experience Platforms</li>
                    <li>5G Infrastructure Enablement</li>
                    <li>Predictive Network Analytics</li>
                  </ul>
                  <div className="ind-use-header">USE CASES</div>
                  <ul className="ind-use-list">
                    <li>TRAMS platform deployment</li>
                    <li>AI-driven network optimization</li>
                    <li>Self-service customer portals</li>
                    <li>Drone-based asset inspection</li>
                  </ul>
                </div>
              </div>

              {/* Retail */}
              <div className={`ind-card ind-card-retail ${activeIndustry === 3 ? 'ind-card-active' : ''}`} style={{ '--card-index': 3 }}>
                <div className="ind-card-left">
                  <div className="ind-card-badge">04</div>
                  <h3 className="ind-card-title">RETAIL &<br/>E-COMMERCE</h3>
                  <p className="ind-card-desc">
                    Unified commerce that spans channels. Personalization engines that convert.
                    Logistics that deliver on promises.
                  </p>
                  <div className="ind-card-tagline">Commerce, Reimagined</div>
                </div>
                <div className="ind-card-center">
                  <div className="ind-stat-row">
                    <div className="ind-stat">
                      <span className="ind-stat-val">2.5<span className="ind-stat-unit">x</span></span>
                      <span className="ind-stat-label">Conversion Rate</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">45<span className="ind-stat-unit">%</span></span>
                      <span className="ind-stat-label">Cart Abandonment</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">Real-time</span>
                      <span className="ind-stat-label">Inventory Sync</span>
                    </div>
                  </div>
                </div>
                <div className="ind-card-right">
                  <div className="ind-cap-header">CORE CAPABILITIES</div>
                  <ul className="ind-cap-list">
                    <li>Unified Commerce Platforms</li>
                    <li>Personalization & Recommendation AI</li>
                    <li>Inventory & Fulfillment Optimization</li>
                    <li>Customer Data Platforms (CDP)</li>
                    <li>POS Modernization</li>
                  </ul>
                  <div className="ind-use-header">USE CASES</div>
                  <ul className="ind-use-list">
                    <li>Headless commerce implementation</li>
                    <li>AI-powered product recommendations</li>
                    <li>Omnichannel order management</li>
                    <li>Real-time pricing optimization</li>
                  </ul>
                </div>
              </div>

              {/* Healthcare */}
              <div className={`ind-card ind-card-health ${activeIndustry === 4 ? 'ind-card-active' : ''}`} style={{ '--card-index': 4 }}>
                <div className="ind-card-left">
                  <div className="ind-card-badge">05</div>
                  <h3 className="ind-card-title">HEALTHCARE &<br/>LIFE SCIENCES</h3>
                  <p className="ind-card-desc">
                    Interoperability that connects care. Analytics that predict outcomes.
                    Platforms that scale patient access.
                  </p>
                  <div className="ind-card-tagline">Code Saves Lives</div>
                </div>
                <div className="ind-card-center">
                  <div className="ind-stat-row">
                    <div className="ind-stat">
                      <span className="ind-stat-val">3<span className="ind-stat-unit">X</span></span>
                      <span className="ind-stat-label">Patient Throughput</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">50<span className="ind-stat-unit">%</span></span>
                      <span className="ind-stat-label">Reduced Wait Times</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">100<span className="ind-stat-unit">%</span></span>
                      <span className="ind-stat-label">HIPAA Compliant</span>
                    </div>
                  </div>
                </div>
                <div className="ind-card-right">
                  <div className="ind-cap-header">CORE CAPABILITIES</div>
                  <ul className="ind-cap-list">
                    <li>EHR Integration & Interoperability</li>
                    <li>Clinical Decision Support</li>
                    <li>Telemedicine Platforms</li>
                    <li>Medical Device Integration</li>
                    <li>Regulatory Compliance (HIPAA/GDPR)</li>
                  </ul>
                  <div className="ind-use-header">USE CASES</div>
                  <ul className="ind-use-list">
                    <li>Unified patient data platform</li>
                    <li>AI diagnostic assistants</li>
                    <li>Remote patient monitoring</li>
                    <li>Clinical trial management systems</li>
                  </ul>
                </div>
              </div>

              {/* Travel */}
              <div className={`ind-card ind-card-travel ${activeIndustry === 5 ? 'ind-card-active' : ''}`} style={{ '--card-index': 5 }}>
                <div className="ind-card-left">
                  <div className="ind-card-badge">06</div>
                  <h3 className="ind-card-title">TRAVEL &<br/>HOSPITALITY</h3>
                  <p className="ind-card-desc">
                    Booking engines that scale. Loyalty systems that engage.
                    Operations that anticipate.
                  </p>
                  <div className="ind-card-tagline">Experience Engineering</div>
                </div>
                <div className="ind-card-center">
                  <div className="ind-stat-row">
                    <div className="ind-stat">
                      <span className="ind-stat-val">25<span className="ind-stat-unit">%</span></span>
                      <span className="ind-stat-label">Revenue Uplift</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">4.8<span className="ind-stat-unit">★</span></span>
                      <span className="ind-stat-label">Guest Satisfaction</span>
                    </div>
                    <div className="ind-stat">
                      <span className="ind-stat-val">Millions</span>
                      <span className="ind-stat-label">Bookings/Day</span>
                    </div>
                  </div>
                </div>
                <div className="ind-card-right">
                  <div className="ind-cap-header">CORE CAPABILITIES</div>
                  <ul className="ind-cap-list">
                    <li>Booking & Reservation Systems</li>
                    <li>Revenue Management Platforms</li>
                    <li>Loyalty & Rewards Programs</li>
                    <li>Guest Experience Platforms</li>
                    <li>Operational Intelligence</li>
                  </ul>
                  <div className="ind-use-header">USE CASES</div>
                  <ul className="ind-use-list">
                    <li>Cloud-native booking platform</li>
                    <li>Dynamic pricing engines</li>
                    <li>Unified guest profiles</li>
                    <li>Mobile-first concierge apps</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button className="ind-carousel-arrow ind-carousel-prev" onClick={prevIndustry} aria-label="Previous industry">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="ind-carousel-arrow ind-carousel-next" onClick={nextIndustry} aria-label="Next industry">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="ind-carousel-dots">
              {[0,1,2,3,4,5].map((i) => (
                <button
                  key={i}
                  className={`ind-carousel-dot ${activeIndustry === i ? 'ind-carousel-dot-active' : ''}`}
                  onClick={() => setActiveIndustry(i)}
                  aria-label={`Go to industry ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IndustriesPage
