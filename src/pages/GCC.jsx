import { useEffect, useRef, useState } from 'react'

const timelineItems = [
  {
    id: 1,
    title: 'GCC Visioning & Setup Strategy',
    colorClass: 'inncolor-gcc-1',
  },
  {
    id: 2,
    title: 'Build-Operate-Transfer (BOT) & Captive-as-a-Service Models',
    colorClass: 'inncolor-gcc-2',
  },
  {
    id: 3,
    title: 'AI-Powered Service Delivery Hubs',
    colorClass: 'inncolor-gcc-3',
  },
  {
    id: 4,
    title: 'Domain-Aligned Centers of Excellence (CoEs)',
    colorClass: 'inncolor-gcc-4',
  },
  {
    id: 5,
    title: 'GCC Maturity Assessment & Operational Optimization',
    colorClass: 'inncolor-gcc-5',
  },
  {
    id: 6,
    title: 'Program Governance & PMO-as-a-Service',
    colorClass: 'inncolor-gcc-6',
  },
]

const outcomes = [
  '30\u201340% Cost Optimization Compared to Traditional ODC Models',
  '10x Faster Ramp-up of Engineering & Support Teams',
  'Increased Control, IP Ownership & Risk Mitigation',
  'Elevated NPS & Employee Retention in High-Skill Roles',
]

const deliveryPoints = [
  'Agile POD+ Delivery Models for rapid scale-up',
  'Cross-functional Teams Across Domains and Geographies',
  'Real-time Project Visibility & Reporting',
  'Integrated Talent + Tech Deployment for Faster Time-to-Impact',
  'Regulatory & Security Compliance by Design',
]

function GCC() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timelineRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target)
            if (idx !== -1) {
              setActiveIndex(idx)
            }
          }
        })
      },
      { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const progressPercent =
    ((activeIndex + 1) / timelineItems.length) * 100

  return (
    <div className="wrapper-content">
      {/* Hero Section */}
      <section className="content-splits hero-section gcc-hero-section">
        <div className="top-bg-colors">
          <img
            src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6803b4d2a77749c3dfcc4c71_Rectangle%2018%402x.png"
            alt=""
            className="hero-bg-image"
            loading="lazy"
          />
        </div>

        <div className="about-us gcc-about-us">
          <div className="gcc-hero-image-wrap">
            <img
              src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/680559326a590180bde17f57_2151908095%201.png"
              alt=""
              className="hero-illustration gcc-hero-illustration"
              loading="lazy"
            />
          </div>

          <h1 className="hero-heading">
            Future <br />
            of GCC<sup>AI</sup>
          </h1>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            Capability Centers That Think, Scale, and Deliver
          </p>
          <p className="intro-paragraph">
            J2W&rsquo;s GCC practice enables enterprises to design, build, and
            scale Global Capability Centers that go beyond cost arbitrage &mdash;
            delivering strategic value, innovation capacity, and operational
            resilience.
          </p>
          <p className="intro-paragraph">
            We combine architectural discipline with agile execution, ensuring
            faster releases, better reliability, and long-term cost efficiency
            across your technology landscape.
          </p>
          <p className="intro-paragraph">
            Whether you&rsquo;re establishing a new GCC or optimizing an existing
            one, J2W is your partner in building capability centers that lead.
          </p>

          <a href="/contactus" className="gcc-cta-button">
            <span>Let&rsquo;s Build the Future &ndash; Explore Our Solutions</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 15L15 5M15 5H7M15 5V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* What We Offer */}
      <section className="what-we-offer">
        <div className="section-title-center">
          <h4 className="section-subtitle">_ What We Offer</h4>
          <h2 className="section-heading">
            Powering Global Capability Centers with Intelligence
          </h2>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section" ref={timelineRef}>
        <div className="timeline-component">
          <div className="timeline-progress">
            <div
              className="timeline-progress-bar"
              style={{ height: `${progressPercent}%` }}
            />
          </div>

          {timelineItems.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item ${index <= activeIndex ? 'active' : ''}`}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className="timeline-center">
                <div
                  className={`timeline-circle ${index <= activeIndex ? 'active' : ''}`}
                >
                  <div className={item.colorClass} />
                </div>
              </div>
              <div className="timeline-right">
                <h3 className="timeline-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Deliver */}
      <section className="deliver-section">
        <h2 className="deliver-heading">How We Deliver</h2>
        <div className="deliver-image-wrap">
          <img
            src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6805596e35ad71863b16c773_GCCAI.svg"
            alt=""
            className="deliver-illustration"
            loading="lazy"
          />
        </div>
        <p className="deliver-text">
          Our GCC engagements are designed for end-to-end ownership &mdash;
          supported by cross-functional leadership, regional depth, and
          delivery-aligned KPIs.
          <br />
          <br />
          We combine J2W&rsquo;s core practices such as ConsultingAI,
          AIngineering, TalentAI, and XperienceAI, to build centers that are
          self-sustaining, business-integrated, and globally competitive.
        </p>
        <ul className="gcc-delivery-list">
          {deliveryPoints.map((point, index) => (
            <li key={index} className="gcc-delivery-item">
              {point}
            </li>
          ))}
        </ul>
        <p className="deliver-text gcc-deliver-closing">
          We don&rsquo;t just help you scale.
          <br />
          We help you build capability that lasts.
        </p>
      </section>

      {/* Outcomes We Drive */}
      <section className="outcomes-section">
        <h2 className="deliver-heading">Outcomes We Drive</h2>
        <div className="outcomes-grid">
          {outcomes.map((text, index) => (
            <div key={index} className="outcome-card">
              <div className="outcome-number">
                [{String(index + 1).padStart(2, '0')}]
              </div>
              <div className="outcome-text">{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="secondary-cta">
        <div className="section-title-center">
          <h2 className="section-heading">
            Let&rsquo;s build a capability center that evolves, adapts, and
            leads&mdash;not just delivers.
          </h2>
          <a href="/contactus" className="cta-link">
            <div className="cta-inner">
              <h4 className="cta-text">
                Talk to a <br />
                Global Delivery Expert
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

export default GCC
