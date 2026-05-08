import { useEffect, useRef, useState } from 'react'

const timelineItems = [
  {
    id: 1,
    title: 'Platform & Product Engineering',
    colorClass: 'inncolor-ai-1',
  },
  {
    id: 2,
    title: 'DevOps, SRE & API Integration',
    colorClass: 'inncolor-ai-2',
  },
  {
    id: 3,
    title: 'Cloud-Native Development & Modernization',
    colorClass: 'inncolor-ai-3',
  },
  {
    id: 4,
    title: 'Data Engineering, MLOps & AI Ops',
    colorClass: 'inncolor-ai-4',
  },
]

const outcomes = [
  'Accelerated product delivery and release velocity',
  'Improved reliability and incident resolution',
  'Cost-effective scaling of cloud-native and hybrid environments',
  'Smarter, governed operations driven by AI-enabled insights',
]

function AIngineering() {
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
      <section className="content-splits hero-section ai-hero-section">
        <div className="top-bg-colors">
          <img
            src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/6803b4d2a77749c3dfcc4c71_Rectangle%2018%402x.png"
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
            of AIngineering
          </h1>

          <div className="hero-image-wrap">
            <img
              src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/680553faf7bc963f0356c0a7_J2W%E2%80%99s%20AIngineering.png"
              alt=""
              className="hero-illustration ai-hero-illustration"
              loading="lazy"
            />
          </div>
        </div>

        <div className="page-divider">
          <p className="intro-paragraph intro-paragraph-bold">
            From Legacy Systems to Scalable Platforms, Engineered for the Enterprise
          </p>
          <p className="intro-paragraph">
            J2W&rsquo;s AIngineering practice enables enterprises to modernize,
            automate, and scale their digital infrastructure through a unified blend
            of platform engineering, DevOps, automation frameworks, and AI-augmented
            operations.
          </p>
          <p className="intro-paragraph">
            We combine architectural discipline with agile execution, ensuring faster
            releases, better reliability, and long-term cost efficiency across your
            technology landscape.
          </p>
          <p className="intro-paragraph">
            Whether you&rsquo;re modernizing legacy stacks or building cloud-native
            systems from the ground up, AIngineering is your partner in scalable
            transformation.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="what-we-offer">
        <div className="section-title-center">
          <h4 className="section-subtitle">_ What We Offer</h4>
          <h2 className="section-heading">
            Our <br />
            AIngineering
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
            src="https://cdn.prod.website-files.com/6803179c51bf5b2151344c46/680555658e86bb681232b129_AI%20ENG.svg"
            alt=""
            className="deliver-illustration"
            loading="lazy"
          />
        </div>
        <p className="deliver-text">
          Our teams operate at the intersection of engineering, operations, and
          automation.
          <br />
          <br />
          We bring together platform architects, DevOps engineers, data specialists,
          and product owners in agile pods &mdash; aligned to your velocity,
          governance needs, and roadmap complexity.
          <br />
          <br />
          We engineer with a delivery mindset &mdash; balancing scale with
          sustainability.
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
            Transformation isn&rsquo;t just about speed &mdash; it&rsquo;s about
            smart, scalable engineering.
          </h2>
          <a href="#" className="cta-link">
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

export default AIngineering
