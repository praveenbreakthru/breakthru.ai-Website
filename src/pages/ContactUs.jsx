import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: 'contact@breakthru.ai',
    admin: 'admin@breakthru.ai',
    mission: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [focusedField, setFocusedField] = useState(null)
  const [formVisible, setFormVisible] = useState(false)
  const formRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFormVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!formData.name.trim() || !formData.email.trim() || !formData.mission.trim()) {
      setErrorMsg('All fields are required. Please fill in your name, email, and mission.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('sending')

    try {
      await emailjs.send(
        'service_554m6ea',
        'template_vnjeuyd',
        {
          from_name: formData.name,
          from_email: formData.email,
          to_email: 'contact@breakthru.ai',
          message: formData.mission,
        },
        '50i6bsqtAkW3WSyRF'
      )

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: 'contact@breakthru.ai',
        admin: 'admin@breakthru.ai',
        mission: '',
      })
    } catch (error) {
      console.error('Email send error:', error)
      setStatus('error')
      setErrorMsg('Transmission failed. Please try again or reach us directly at contact@breakthru.ai')
    }
  }

  const fields = [
    {
      num: '01',
      label: 'Identity',
      color: '#6c5ce7',
      type: 'input',
      name: 'name',
      placeholder: 'Your Name',
      autoComplete: 'name',
    },
    {
      num: '02',
      label: 'Coordinate',
      color: '#00b894',
      type: 'input',
      name: 'email',
      placeholder: 'your@gmail.com',
      autoComplete: 'email',
      inputType: 'email',
    },
    {
      num: '03',
      label: 'Schedule Meeting',
      color: '#a29bfe',
      type: 'buttons',
      buttons: [
        { label: 'Quick Schedule Meeting', link: 'https://outlook.office.com/book/BreakthrusPurpleFabric@breakthru.ai/' },
      ]
    },
    {
      num: '04',
      label: 'The Mission',
      color: '#fdcb6e',
      type: 'textarea',
      name: 'mission',
      placeholder: 'Tell us about your project...',
    },
  ]

  return (
    <div className="contact-page">
            <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Contact Us</span>
      </div>
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <div className="contact-hero-grid" />
          <div className="contact-hero-orb contact-hero-orb-1" />
          <div className="contact-hero-orb contact-hero-orb-2" />
          <div className="contact-hero-orb contact-hero-orb-3" />
          <div className="contact-hero-scan" />
        </div>

        <div className="contact-hero-content">
          <div className="contact-hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Contact</span>
          </div>

          <h1 className="contact-hero-title">
            LET'S BUILD
          </h1>

          <p className="contact-hero-sub">
            Initialize a direct channel to our team.<br />
            Tell us about your project and we'll architect the path forward.
          </p>

          <div className="contact-hero-stats">
            <div className="contact-stat">
              <span className="contact-stat-num">24h</span>
              <span className="contact-stat-label">Response Time</span>
            </div>
            <div className="contact-stat-divider" />
            <div className="contact-stat">
              <span className="contact-stat-num">2</span>
              <span className="contact-stat-label">Direct Channels</span>
            </div>
            <div className="contact-stat-divider" />
            <div className="contact-stat">
              <span className="contact-stat-num">100%</span>
              <span className="contact-stat-label">Confidential</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-body" ref={sectionRef}>
        <div className={`contact-body-inner ${formVisible ? 'contact-body-visible' : ''}`}>
          <div className="contact-form-area">
            <div className="contact-form-header">
              <span className="contact-form-tag">TRANSMISSION PROTOCOL</span>
              <h2 className="contact-form-title">Initialize Sequence</h2>
              <p className="contact-form-desc">
                Fill in your details below. Your message will be transmitted to our business development team and admin simultaneously.
              </p>
            </div>

            <form ref={formRef} className="contact-fields" onSubmit={handleSubmit}>
              {fields.map((field, i) => (
                <div
                  key={field.num}
                  className={`contact-field-card ${focusedField === field.name ? 'contact-field-focused' : ''} ${formVisible ? 'contact-field-visible' : ''}`}
                  style={{
                    '--field-color': field.color,
                    animationDelay: `${i * 0.1 + 0.2}s`,
                  }}
                >
                  <div className="contact-field-left">
                    <span className="contact-field-num">{field.num}</span>
                    <div className="contact-field-bar" />
                  </div>
                  <div className="contact-field-right">
                    <label className="contact-field-label">{field.label}</label>
                    {field.type === 'input' && (
                      <input
                        type={field.inputType || 'text'}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.placeholder}
                        className="contact-field-input"
                        autoComplete={field.autoComplete}
                      />
                    )}
                    {field.type === 'readonly' && (
                      <div className="contact-field-locked">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>{field.value}</span>
                      </div>
                    )}
                    {field.type === 'buttons' && (
                      <div className="contact-field-buttons">
                        {field.buttons.map((btn, idx) => (
                          <a
                            key={idx}
                            href={btn.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-schedule-btn"
                          >
                            <span>{btn.label}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    )}
                    {field.type === 'textarea' && (
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.placeholder}
                        className="contact-field-textarea"
                        rows={5}
                      />
                    )}
                  </div>
                </div>
              ))}

              {errorMsg && (
                <div className="contact-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  {errorMsg}
                </div>
              )}

              <div className="contact-submit-area">
                {status === 'success' ? (
                  <div className="contact-success">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div>
                      <strong>Sequence initialized.</strong>
                      <span> Transmission complete.</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="contact-submit"
                    disabled={status === 'sending'}
                  >
                    <span className="contact-submit-bg" />
                    <span className="contact-submit-inner">
                      <span className="contact-submit-text">
                        {status === 'sending' ? 'Initializing Sequence...' : 'Initialize Sequence'}
                      </span>
                      <svg className="contact-submit-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            </form>
          </div>


        </div>
      </section>
    </div>
  )
}

export default ContactUs
