import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const manifestoItems = [
  { icon: 'M9 12l2 2 4-4', label: 'No slides without code.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Outcome over output.' },
  { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'We own the crash.' },
  { icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a2 2 0 110 4 2 2 0 010-4zm-4 8a2 2 0 012-2h4a2 2 0 012 2v2H8v-2z', label: 'AI-Native from Day 0.' },
]

const coreValues = [
  {
    num: '01',
    title: 'Code > Slides',
    desc: 'We ship working software, not PowerPoint decks. Every engagement results in production-ready code.',
    color: '#6c5ce7',
  },
  {
    num: '02',
    title: 'Extreme Ownership',
    desc: 'We treat your platform as if it were our own. On-call, accountable, and invested in outcomes.',
    color: '#00b894',
  },
  {
    num: '03',
    title: 'Engineer-to-Engineer',
    desc: 'No account managers or intermediaries. You work directly with the engineers building your system.',
    color: '#0984e3',
  },
  {
    num: '04',
    title: 'Radical Transparency',
    desc: 'Open access to our code, our roadmaps, and our honest assessment of project risks.',
    color: '#e84393',
  },
]

const hubs = [
  {
    region: 'Engineering HQ',
    location: 'India',
    cities: ['Bengaluru', 'Mumbai', 'Hyderabad'],
    icon: 'M3 21V3h18v18H3z',
    gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
  },
  {
    region: 'Client Engagement',
    location: 'GCC',
    cities: ['Dubai', 'Riyadh'],
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
    gradient: 'linear-gradient(135deg, #00b894, #55efc4)',
  },
  {
    region: 'Regional Ops',
    location: 'Southeast Asia',
    cities: ['Kuala Lumpur', 'Manila'],
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    gradient: 'linear-gradient(135deg, #0984e3, #74b9ff)',
  },
]

const pillars = [
  { label: 'Autonomy', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { label: 'Mastery', icon: 'M12 15l-3-3h2V8h2v4h2l-3 3z' },
  { label: 'Purpose', icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' },
  { label: 'Speed', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
]

function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, ...options }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

function OurStory() {
  const [aboutRef, aboutVisible] = useIntersection()
  const [manifestoRef, manifestoVisible] = useIntersection()
  const [visionRef, visionVisible] = useIntersection()
  const [missionRef, missionVisible] = useIntersection()
  const [valuesRef, valuesVisible] = useIntersection()
  const [hubsRef, hubsVisible] = useIntersection()
  const [pillarsRef, pillarsVisible] = useIntersection()
  const [officeRef, officeVisible] = useIntersection()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="wrapper-content">
            <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">About Us</span>
      </div>
      {/* ======================== */}
      {/* ABOUT - Since 2023       */}
      {/* ======================== */}
      <section
        ref={aboutRef}
        className={`about-hero-section ${aboutVisible ? 'about-visible' : ''}`}
      >
        <div className="about-hero-inner">
          <div className="about-since-badge">
            <span className="about-since-year">SINCE 2023</span>
            <div className="about-since-line" />
          </div>
          <h2 className="about-digital-title">
            THE DIGITAL<br />FABRIC
          </h2>
          <p className="about-digital-desc">
            We exist in the gap between the slide-deck consultants and the body-shop system integrators.
          </p>
          <div className="about-verb-row">
            <span className="about-verb about-verb-1">We architect.</span>
            <span className="about-verb about-verb-2">We build.</span>
            <span className="about-verb about-verb-3">We run.</span>
          </div>
        </div>
        <div className="about-hero-orb about-hero-orb-1" />
        <div className="about-hero-orb about-hero-orb-2" />
        <div className="about-hero-orb about-hero-orb-3" />
      </section>

      {/* ======================== */}
      {/* OUR MANIFESTO            */}
      {/* ======================== */}
      <section
        ref={manifestoRef}
        className={`manifesto-section ${manifestoVisible ? 'manifesto-visible' : ''}`}
      >
        <div className="manifesto-inner">
          <div className="manifesto-header">
            <span className="manifesto-tag">OUR MANIFESTO</span>
            <h2 className="manifesto-heading">
              Principles That<br />Define Us
            </h2>
          </div>
          <div className="manifesto-grid">
            {manifestoItems.map((item, i) => (
              <div
                key={i}
                className={`manifesto-card manifesto-card-${i + 1}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="manifesto-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div className="manifesto-check">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="#00b894" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="manifesto-text">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* VISION & MISSION         */}
      {/* ======================== */}
      <section
        ref={visionRef}
        className={`vision-section ${visionVisible ? 'vision-visible' : ''}`}
      >
        <div className="vision-inner">
          <div className="vision-card vision-card-main">
            <div className="vision-card-glow" />
            <div className="vision-card-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <span>OUR VISION</span>
            </div>
            <p className="vision-card-text">
              To become the definitive Digital Fabric for enterprises seeking transformation&mdash;not through PowerPoint, but through production-grade engineering that ships.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={missionRef}
        className={`mission-section ${missionVisible ? 'mission-visible' : ''}`}
      >
        <div className="mission-inner">
          <div className="mission-card">
            <div className="mission-card-glow" />
            <div className="mission-card-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>OUR MISSION</span>
            </div>
            <p className="mission-card-text">
              Bridge the gap between strategy and execution. Combine consulting-grade domain expertise with engineering-grade delivery. Own outcomes, not just outputs.
            </p>
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* CORE VALUES              */}
      {/* ======================== */}
      <section
        ref={valuesRef}
        className={`values-section ${valuesVisible ? 'values-visible' : ''}`}
      >
        <div className="values-inner">
          <div className="values-header">
            <span className="values-tag">OUR VALUES</span>
            <h2 className="values-heading">What We Stand For</h2>
          </div>
          <div className="values-grid">
            {coreValues.map((val, i) => (
              <div
                key={i}
                className={`values-card values-card-${i + 1}`}
                style={{ '--val-color': val.color, animationDelay: `${i * 0.12}s` }}
              >
                <div className="values-card-num">{val.num}</div>
                <div className="values-card-bar" />
                <h3 className="values-card-title">{val.title}</h3>
                <p className="values-card-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* GLOBAL FOOTPRINT         */}
      {/* ======================== */}
      <section
        ref={hubsRef}
        className={`hubs-section ${hubsVisible ? 'hubs-visible' : ''}`}
      >
        <div className="hubs-inner">
          <div className="hubs-header">
            <span className="hubs-tag">GLOBAL FOOTPRINT</span>
            <h2 className="hubs-heading">3 Hubs &middot; 200+ Engineers</h2>
          </div>
          <div className="hubs-grid">
            {hubs.map((hub, i) => (
              <div
                key={i}
                className={`hub-card hub-card-${i + 1}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="hub-card-icon" style={{ background: hub.gradient }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={hub.icon} />
                  </svg>
                </div>
                <div className="hub-card-content">
                  <h3 className="hub-card-region">{hub.region}</h3>
                  <span className="hub-card-location">{hub.location}</span>
                  <div className="hub-card-cities">
                    {hub.cities.map((city, j) => (
                      <span key={j} className="hub-city-tag">{city}</span>
                    ))}
                  </div>
                </div>
                <div className="hub-card-line" style={{ background: hub.gradient }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* BUILT BY ENGINEERS       */}
      {/* ======================== */}
      <section
        ref={pillarsRef}
        className={`pillars-section ${pillarsVisible ? 'pillars-visible' : ''}`}
      >
        <div className="pillars-inner">
          <div className="pillars-header">
            <span className="pillars-tag">BUILT BY ENGINEERS, FOR ENGINEERS</span>
            <h2 className="pillars-heading">
              We operate in Pods &amp; Squads.<br />
              Small, autonomous teams with full ownership.
            </h2>
          </div>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div
                key={i}
                className={`pillar-card pillar-card-${i + 1}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="pillar-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={p.icon} />
                  </svg>
                </div>
                <h3 className="pillar-label">{p.label}</h3>
                <div className="pillar-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* CORPORATE OFFICE         */}
      {/* ======================== */}
      <section
        ref={officeRef}
        className={`office-section ${officeVisible ? 'office-visible' : ''}`}
      >
        <div className="office-inner">
          <div className="office-card">
            <div className="office-card-border" />
            <div className="office-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h3 className="office-card-title">Corporate Office</h3>
            <p className="office-card-address">
              Breakthru Enterprise Solutions Private Limited,<br />
              1292 - 1293, Trichy Rd, Nadar Colony,<br />
              Race Course, Coimbatore,<br />
              Tamil Nadu 641018
            </p>
            <span className="office-card-cin">CIN: U72900KA2023PTC178945</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurStory
