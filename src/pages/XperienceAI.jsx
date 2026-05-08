import { useEffect, useRef, useState } from 'react'

const timelineItems = [
  {
    id: 1,
    title: 'Salesforce & Sitecore Implementation',
    colorClass: 'inncolor-xp-1',
  },
  {
    id: 2,
    title: 'Experience Platforms & Personalization at Scale',
    colorClass: 'inncolor-xp-2',
  },
  {
    id: 3,
    title: 'Conversational AI & Virtual Assistants',
    colorClass: 'inncolor-xp-3',
  },
  {
    id: 4,
    title: 'Journey Mapping & Intelligent Interfaces',
    colorClass: 'inncolor-xp-4',
  },
]

const outcomes = [
  'Increase in customer retention and Net Promoter Score (NPS)',
  'Reduced churn through tailored, timely interventions',
  'Faster time-to-market for experience-driven initiatives',
  'Enhanced customer lifetime value and engagement rates',
]

function XperienceAI() {
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
      <section className="content-splits hero-section xp-hero-section">
        <div className="top-bg-colors xp-top-bg">
          <img
            src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/68055f6d26cb673fc6b2f41d_Rectangle%2018.svg"
            alt=""
            className="hero-bg-image"
            loading="lazy"
          />
        </div>

        <div className="about-us">
          <div className="our-services-tag">
            <img
              src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6804bfe11fa4a378b7321682_ai-idea.png"
              alt=""
              className="service-icon"
              loading="lazy"
            />
            <span className="service-label">Our Services</span>
          </div>

          <h1 className="hero-heading">
            Future <br />
            of Xperience<sup>AI</sup>
          </h1>

          <div className="hero-image-wrap">
            <img
              src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/68055ee0f7bc963f035d8b5e_215190s8095%201.png"
              alt=""
              className="hero-illustration xp-hero-illustration"
              loading="lazy"
            />
          </div>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            Designing Experiences That Drive Outcomes
          </p>
          <p className="intro-paragraph">
            Customer Experience, Reimagined Through Intelligence
          </p>
          <p className="intro-paragraph">
            J2W&rsquo;s XperienceAI practice helps enterprises craft intelligent,
            personalized, and measurable digital experiences &mdash; powered by
            leading platforms and underpinned by AI-driven insights.
          </p>
          <p className="intro-paragraph">
            We collaborate with product owners, marketers, and transformation leads
            to unify customer data, streamline engagement journeys, and create
            seamless interactions across touchpoints.
          </p>
          <p className="intro-paragraph">
            The result: improved retention, higher lifetime value, and brand
            affinity at scale.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="what-we-offer">
        <div className="section-title-center">
          <h4 className="section-subtitle">_ What We Offer</h4>
          <h2 className="section-heading">
            Our <br />
            XperienceAI
            <br />
            expertise spans:
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
            src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6805674a8a90f9174d5a6f42_UX.svg"
            alt=""
            className="deliver-illustration"
            loading="lazy"
          />
        </div>
        <p className="deliver-text">
          We work across strategy, design, platform implementation, and measurement
          &mdash; ensuring each digital touchpoint is aligned to real business goals.
          <br />
          <br />
          Our delivery model blends creative thinking with platform depth, using
          agile pods that collaborate closely with internal marketing, product, and
          IT teams.
          <br />
          <br />
          We don&rsquo;t just improve design. We optimize experience performance.
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
            Every interaction is a decision point. Let&rsquo;s make yours
            intelligent, seamless, and scalable.
          </h2>
          <a href="/contactus" className="cta-link">
            <div className="cta-inner">
              <h4 className="cta-text">
                Design My CX
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

export default XperienceAI
