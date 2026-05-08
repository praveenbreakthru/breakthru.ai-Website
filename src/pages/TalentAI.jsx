import { useEffect, useRef, useState } from 'react'

const timelineItems = [
  {
    id: 1,
    title: 'AI-Augmented Sourcing & L&D',
    colorClass: 'inncolor-ta-1',
  },
  {
    id: 2,
    title: 'Talent Cloud & On-Demand Models',
    colorClass: 'inncolor-ta-2',
  },
  {
    id: 3,
    title: 'PremierLounge Platform for Smart Deployment',
    colorClass: 'inncolor-ta-3',
  },
  {
    id: 4,
    title: 'Leadership Skilling & Workforce AI Tools',
    colorClass: 'inncolor-ta-4',
  },
]

const outcomes = [
  'Reduced hiring cycles and improved retention',
  'Accelerated onboarding into project-ready roles',
  'Internal capability growth across key business functions',
  'Transition from reactive hiring to strategic workforce planning',
]

function TalentAI() {
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
      <section className="content-splits hero-section ta-hero-section">
        <div className="top-bg-colors">
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
            of Talent<sup>AI</sup>
          </h1>

          <div className="hero-image-wrap">
            <img
              src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/68056c0b56a6e7c27792b4f8_215190841095%201.png"
              alt=""
              className="hero-illustration ta-hero-illustration"
              loading="lazy"
            />
          </div>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            Empowering Workforces Through Intelligent Talent Strategy
          </p>
          <p className="intro-paragraph">
            J2W&rsquo;s TalentAI practice helps enterprises build, scale, and
            future-proof their workforce through AI-driven talent acquisition,
            learning ecosystems, and strategic capability development.
          </p>
          <p className="intro-paragraph">
            We partner with CHROs, talent leaders, and business unit heads to
            design talent operating models that align with growth mandates,
            digital transformation goals, and evolving skill demands.
          </p>
          <p className="intro-paragraph">
            Whether you&rsquo;re structuring your talent supply chain,
            deploying on-demand expertise, or embedding AI into L&amp;D &mdash;
            TalentAI is your workforce transformation partner.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="what-we-offer">
        <div className="section-title-center">
          <h4 className="section-subtitle">_ What We Offer</h4>
          <h2 className="section-heading">
            Our <br />
            TalentAI
            <br />
            capabilities include:
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
            src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/68056d61ac7691cd07be9c11_talent.png"
            alt=""
            className="deliver-illustration"
            loading="lazy"
          />
        </div>
        <p className="deliver-text">
          Our approach blends AI-enabled sourcing with human judgment and domain
          context.
          <br />
          <br />
          We work as a long-term capability partner, not just to deploy talent,
          but to mature your workforce model.
          <br />
          <br />
          Our talent pods integrate with delivery teams, and our platforms ensure
          visibility, performance tracking, and workforce adaptability across
          engagements.
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
            The right talent isn&rsquo;t found &mdash; it&rsquo;s built,
            nurtured, and retained. We help you do all three.
          </h2>
          <a href="/contactus" className="cta-link">
            <div className="cta-inner">
              <h4 className="cta-text">
                Explore <br />
                Talent Ecosystems
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

export default TalentAI
