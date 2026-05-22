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
  const [activeMode, setActiveMode] = useState('virtual')
  
  const [physicalStep, setPhysicalStep] = useState(1)
  const [bookingDate, setBookingDate] = useState(null)
  const [bookingTime, setBookingTime] = useState('')
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    requests: ''
  })

  const [termsExpanded, setTermsExpanded] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [termsError, setTermsError] = useState('')

  const [physicalData, setPhysicalData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    company: '',
    visitorType: '',
    purpose: '',
    host: '',
    idProofType: '',
    idNumber: '',
    visitorPhoto: null
  })

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

  const handlePhysicalChange = (e) => {
    const { name, value } = e.target

    if (name === 'idNumber') {
      const idType = physicalData.idProofType
      if (idType === 'Aadhar') {
        // Only allow numbers for Aadhar
        if (value && !/^\d*$/.test(value)) return;
      }
      
      let maxLen = 20;
      if (idType === 'Aadhar') maxLen = 12;
      else if (idType === 'Pancard') maxLen = 10;
      else if (idType === 'Voter ID') maxLen = 10;
      else if (idType === 'Passport') maxLen = 9;
      else if (idType === 'Driving License') maxLen = 16;
      
      if (value.length > maxLen) return;
    }

    if (name === 'idProofType') {
      // Clear ID number if proof type changes
      setPhysicalData(prev => ({ ...prev, idProofType: value, idNumber: '' }))
      return;
    }

    setPhysicalData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhysicalData(prev => ({ ...prev, visitorPhoto: file }))
    }
  }

  const handlePhysicalSubmit = (e) => {
    e.preventDefault()
    
    if (!agreedToTerms) {
      setTermsError('You must check the box to agree to our terms and conditions before continuing.')
      setTermsExpanded(true)
      return
    }

    setBookingDetails({
      name: physicalData.fullName || '',
      email: physicalData.email || '',
      address: '',
      phone: physicalData.mobile || '',
      requests: ''
    })
    setPhysicalStep(2)
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

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!bookingDate || !bookingTime) {
      alert("Please select a date and time for your meeting.")
      return
    }
    console.log("Booking submitted", { date: bookingDate, time: bookingTime, details: bookingDetails })
    alert("Meeting booked successfully!")
    setPhysicalStep(1)
  }

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ padding: '10px' }}></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isPast = date < new Date(today.setHours(0,0,0,0));
      const disabled = isWeekend || isPast;
      
      const isSelected = bookingDate && bookingDate.getDate() === i && bookingDate.getMonth() === currentMonth;
      
      days.push(
        <div 
          key={i} 
          onClick={() => !disabled && setBookingDate(date)}
          style={{
            padding: '10px',
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            background: isSelected ? 'linear-gradient(135deg, #0984e3 0%, #00a8ff 100%)' : 'transparent',
            color: isSelected ? '#fff' : (disabled ? 'rgba(255,255,255,0.2)' : '#fff'),
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: '14px',
            fontWeight: isSelected ? 'bold' : 'normal',
            border: 'none',
            boxShadow: isSelected ? '0 4px 12px rgba(9, 132, 227, 0.4)' : 'none'
          }}
          onMouseOver={(e) => { if (!disabled && !isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
          onMouseOut={(e) => { if (!disabled && !isSelected) e.currentTarget.style.background = 'transparent' }}
        >
          {i}
        </div>
      );
    }
    
    return (
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '25px', gap: '20px' }}>
          <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>&lt;</button>
          <strong style={{ fontSize: '16px', fontWeight: '500', color: '#fff' }}>{today.toLocaleString('default', { month: 'long' })} {currentYear}</strong>
          <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>&gt;</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>
          <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
          {days}
        </div>
      </div>
    );
  }

  const renderTimeSlots = () => {
    const times = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', 
      '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
    ];
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', alignContent: 'start', maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
        {times.map(time => (
          <button
            key={time}
            type="button"
            onClick={() => setBookingTime(time)}
            style={{
              padding: '12px',
              border: bookingTime === time ? 'none' : '1px solid rgba(255,255,255,0.1)',
              background: bookingTime === time ? 'linear-gradient(135deg, #0984e3 0%, #00a8ff 100%)' : 'rgba(255,255,255,0.03)',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: bookingTime === time ? '600' : 'normal',
              transition: 'all 0.2s',
              boxShadow: bookingTime === time ? '0 4px 12px rgba(9, 132, 227, 0.4)' : 'none'
            }}
            onMouseOver={(e) => { if (bookingTime !== time) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onMouseOut={(e) => { if (bookingTime !== time) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
          >
            {time}
          </button>
        ))}
      </div>
    );
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

          <div className="contact-mode-toggle" style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '40px 0' }}>
            <button 
              onClick={() => setActiveMode('virtual')}
              style={{
                padding: '12px 36px',
                borderRadius: '100px',
                background: activeMode === 'virtual' ? 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)' : 'rgba(255, 255, 255, 0.05)',
                color: activeMode === 'virtual' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                border: `1px solid ${activeMode === 'virtual' ? 'transparent' : 'rgba(255, 255, 255, 0.1)'}`,
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeMode === 'virtual' ? '0 8px 24px rgba(108, 92, 231, 0.35)' : 'none',
              }}
            >
              Virtual
            </button>
            <button 
              onClick={() => setActiveMode('physical')}
              style={{
                padding: '12px 36px',
                borderRadius: '100px',
                background: activeMode === 'physical' ? 'linear-gradient(135deg, #00b894 0%, #55efc4 100%)' : 'rgba(255, 255, 255, 0.05)',
                color: activeMode === 'physical' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                border: `1px solid ${activeMode === 'physical' ? 'transparent' : 'rgba(255, 255, 255, 0.1)'}`,
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeMode === 'physical' ? '0 8px 24px rgba(0, 184, 148, 0.35)' : 'none',
              }}
            >
              Physical
            </button>
          </div>

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
        {activeMode === 'virtual' && (
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
        )}

        {activeMode === 'physical' && (
          <div className={`contact-body-inner ${formVisible ? 'contact-body-visible' : ''}`}>
            {physicalStep === 1 && (
            <div className="contact-form-area">
              <div className="contact-form-header">
                <span className="contact-form-tag" style={{ color: '#00b894' }}>VISITOR PROTOCOL</span>
                <h2 className="contact-form-title">Physical Access</h2>
                <p className="contact-form-desc">
                  Register your physical visit details below. Please upload a clear photo for your visitor badge.
                </p>
              </div>

              <form className="contact-fields" onSubmit={handlePhysicalSubmit} style={{ background: 'rgba(20,20,40,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '30px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                  
                  {/* LEFT COLUMN */}
                  <div style={{ flex: '2 1 400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="contact-field-label" style={{ marginBottom: '8px', display: 'block', fontSize: '13px' }}>Full Name <span style={{ color: '#ff7675' }}>*</span></label>
                      <input type="text" name="fullName" value={physicalData.fullName} onChange={handlePhysicalChange} placeholder="e.g. Maha Lakshmi" className="contact-field-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: '#fff' }} />
                    </div>

                    <div>
                      <label className="contact-field-label" style={{ marginBottom: '8px', display: 'block', fontSize: '13px' }}>Company <span style={{ color: '#ff7675' }}>*</span></label>
                      <input type="text" name="company" value={physicalData.company} onChange={handlePhysicalChange} placeholder="e.g. Infosys Ltd." className="contact-field-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: '#fff' }} />
                    </div>

                    <div>
                      <label className="contact-field-label" style={{ marginBottom: '8px', display: 'block', fontSize: '13px' }}>Visitor Type <span style={{ color: '#ff7675' }}>*</span></label>
                      <select name="visitorType" value={physicalData.visitorType} onChange={handlePhysicalChange} className="contact-field-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: physicalData.visitorType ? '#fff' : 'rgba(255,255,255,0.4)', appearance: 'none', backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPositionX: 'calc(100% - 12px)', backgroundPositionY: '50%' }}>
                        <option value="" disabled>Individual</option>
                        <option value="Individual" style={{background: '#0f0f23', color: '#fff'}}>Individual</option>
                        <option value="Group" style={{background: '#0f0f23', color: '#fff'}}>Group</option>
                      </select>
                    </div>

                    <div>
                      <label className="contact-field-label" style={{ marginBottom: '8px', display: 'block', fontSize: '13px' }}>Mobile <span style={{ color: '#ff7675' }}>*</span></label>
                      <input type="tel" name="mobile" value={physicalData.mobile} onChange={handlePhysicalChange} placeholder="10-digit" className="contact-field-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: '#fff' }} />
                    </div>

                    <div>
                      <label className="contact-field-label" style={{ marginBottom: '8px', display: 'block', fontSize: '13px' }}>Email <span style={{ color: 'rgba(255,255,255,0.4)' }}>(opt.)</span></label>
                      <input type="email" name="email" value={physicalData.email} onChange={handlePhysicalChange} placeholder="you@company.com" className="contact-field-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: '#fff' }} />
                    </div>

                    <div>
                      <label className="contact-field-label" style={{ marginBottom: '8px', display: 'block', fontSize: '13px' }}>Purpose <span style={{ color: '#ff7675' }}>*</span></label>
                      <select name="purpose" value={physicalData.purpose} onChange={handlePhysicalChange} className="contact-field-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: physicalData.purpose ? '#fff' : 'rgba(255,255,255,0.4)', appearance: 'none', backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPositionX: 'calc(100% - 12px)', backgroundPositionY: '50%' }}>
                        <option value="" disabled>Select...</option>
                        <option value="Meeting" style={{background: '#0f0f23', color: '#fff'}}>Meeting</option>
                        <option value="Interview" style={{background: '#0f0f23', color: '#fff'}}>Interview</option>
                        <option value="Delivery" style={{background: '#0f0f23', color: '#fff'}}>Delivery</option>
                        <option value="Other" style={{background: '#0f0f23', color: '#fff'}}>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="contact-field-label" style={{ marginBottom: '8px', display: 'block', fontSize: '13px' }}>ID Proof Type <span style={{ color: '#ff7675' }}>*</span></label>
                      <select name="idProofType" value={physicalData.idProofType} onChange={handlePhysicalChange} className="contact-field-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: physicalData.idProofType ? '#fff' : 'rgba(255,255,255,0.4)', appearance: 'none', backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPositionX: 'calc(100% - 12px)', backgroundPositionY: '50%' }}>
                        <option value="" disabled>Select ID...</option>
                        <option value="Aadhar" style={{background: '#0f0f23', color: '#fff'}}>Aadhar</option>
                        <option value="Passport" style={{background: '#0f0f23', color: '#fff'}}>Passport</option>
                        <option value="Driving License" style={{background: '#0f0f23', color: '#fff'}}>Driving License</option>
                        <option value="Voter ID" style={{background: '#0f0f23', color: '#fff'}}>Voter ID</option>
                        <option value="Pancard" style={{background: '#0f0f23', color: '#fff'}}>Pancard</option>
                      </select>
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="contact-field-label" style={{ marginBottom: '8px', display: 'block', fontSize: '13px' }}>ID Number <span style={{ color: '#ff7675' }}>*</span></label>
                      <input type="text" name="idNumber" value={physicalData.idNumber} onChange={handlePhysicalChange} placeholder={physicalData.idProofType ? `Enter ${physicalData.idProofType} Number` : "ⓘ Select an ID type first."} disabled={!physicalData.idProofType} className="contact-field-input" style={{ width: '100%', background: physicalData.idProofType ? 'rgba(255,255,255,0.03)' : 'rgba(108, 92, 231, 0.1)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: physicalData.idProofType ? '#fff' : '#a29bfe' }} />
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="contact-field-label" style={{ marginBottom: '8px', display: 'block', fontSize: '13px' }}>Host <span style={{ color: '#ff7675' }}>*</span></label>
                      <select name="host" value={physicalData.host} onChange={handlePhysicalChange} className="contact-field-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: physicalData.host ? '#fff' : 'rgba(255,255,255,0.4)', appearance: 'none', backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPositionX: 'calc(100% - 12px)', backgroundPositionY: '50%' }}>
                        <option value="" disabled>Who are you visiting?</option>
                        <option value="Admin" style={{background: '#0f0f23', color: '#fff'}}>Admin</option>
                        <option value="HR" style={{background: '#0f0f23', color: '#fff'}}>HR</option>
                      </select>
                    </div>

                    <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => setTermsExpanded(!termsExpanded)}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          padding: '16px',
                          borderRadius: '8px',
                          color: '#fff',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        <span>Terms & Conditions <span style={{ color: '#ff7675' }}>*</span></span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: termsExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      
                      {termsExpanded && (
                        <div style={{
                          background: 'rgba(0,0,0,0.2)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          borderTop: 'none',
                          borderBottomLeftRadius: '8px',
                          borderBottomRightRadius: '8px',
                          padding: '20px',
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.7)',
                          lineHeight: '1.6',
                          maxHeight: '250px',
                          overflowY: 'auto',
                          marginTop: '-4px'
                        }}>
                          <p style={{ marginTop: 0 }}>By entering Breakthru.ai premises, you (the "Visitor") agree to the following terms:</p>
                          
                          <p><strong style={{color:'#fff'}}>1. Confidentiality</strong><br/>
                          You may be exposed to proprietary information, technology, or conversations. You agree not to disclose, reproduce, or use any such information without written consent from management.</p>

                          <p><strong style={{color:'#fff'}}>2. Conduct & Safety</strong><br/>
                          You agree to comply with all health, safety, and security policies. Behaviour that disrupts operations may result in removal and notification of authorities.</p>

                          <p><strong style={{color:'#fff'}}>3. Recording & Photography</strong><br/>
                          Photography, video, or audio recording is strictly prohibited without prior written authorisation.</p>

                          <p><strong style={{color:'#fff'}}>4. CCTV Surveillance</strong><br/>
                          Premises are monitored by CCTV cameras 24/7. Footage is retained for 30 days per local law.</p>

                          <p><strong style={{color:'#fff'}}>5. Data Processing</strong><br/>
                          Your name, company, contact details, photo, and visit record are stored securely and retained for 12 months.</p>

                          <p><strong style={{color:'#fff'}}>6. Escorted Access</strong><br/>
                          Visitors must be escorted at all times. Unescorted access to restricted zones may trigger a security response.</p>

                          <p style={{ marginBottom: 0 }}><strong style={{color:'#fff'}}>7. RFID Tag</strong><br/>
                          You will be issued a physical RFID card. Wear it visibly at all times and return it at checkout.</p>
                        </div>
                      )}
                      
                      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                          type="checkbox" 
                          id="agreeTerms" 
                          checked={agreedToTerms} 
                          onChange={(e) => {
                            setAgreedToTerms(e.target.checked);
                            if (e.target.checked) setTermsError('');
                          }}
                          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#0984e3' }}
                        />
                        <label htmlFor="agreeTerms" style={{ fontSize: '14px', color: '#fff', cursor: 'pointer' }}>I agree to the Terms & Conditions</label>
                      </div>
                      {termsError && (
                        <div style={{ color: '#ff7675', fontSize: '13px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          {termsError}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label className="contact-field-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      Visitor Photo <span style={{ color: '#ff7675' }}>*</span>
                    </label>

                    <div 
                      style={{
                        flex: 1,
                        background: physicalData.visitorPhoto ? `url(${URL.createObjectURL(physicalData.visitorPhoto)}) center/cover no-repeat` : 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '220px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {!physicalData.visitorPhoto && (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      )}
                    </div>

                    <input 
                      type="file" 
                      id="photo-upload-physical" 
                      style={{ display: 'none' }} 
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                    
                    <button 
                      type="button" 
                      onClick={() => document.getElementById('photo-upload-physical').click()}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-12.28l5.58 5.58"/></svg>
                      {physicalData.visitorPhoto ? 'Retake Photo' : 'Upload Photo'}
                    </button>

                    {physicalData.visitorPhoto && (
                      <div style={{
                        padding: '12px',
                        background: 'rgba(0, 184, 148, 0.1)',
                        border: '1px solid rgba(0, 184, 148, 0.3)',
                        borderRadius: '8px',
                        color: '#00b894',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Photo captured successfully
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                  <button 
                    type="button" 
                    onClick={() => setActiveMode('virtual')}
                    style={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>

                  <button 
                    type="submit" 
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #0984e3 0%, #00a8ff 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      padding: '14px'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(9, 132, 227, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    Continue → Agreement
                  </button>
                </div>
              </form>
            </div>
            )}

            {physicalStep === 2 && (
              <div className="contact-form-area" style={{ background: 'rgba(20,20,40,0.4)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 30px 0', letterSpacing: '1px' }}>Breakthru's Purple Fabric</h2>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '12px', 
                      padding: '24px', 
                      maxWidth: '400px', 
                      margin: '0 auto',
                      textAlign: 'left',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <strong style={{ fontSize: '18px', color: '#fff' }}>15-min meeting</strong>
                        <div style={{ width: '24px', height: '24px', background: '#0984e3', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(9, 132, 227, 0.5)' }}>✓</div>
                      </div>
                      <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Grab some time with us for an appointment <a href="#" style={{ color: '#00a8ff', textDecoration: 'none' }}>Read more</a></p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        15 minutes
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.5px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    SELECT STAFF (OPTIONAL)
                  </div>
                  <select style={{ width: '100%', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '50px', fontSize: '15px', background: 'rgba(255,255,255,0.03)', color: '#fff', appearance: 'none', backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPositionX: 'calc(100% - 16px)', backgroundPositionY: '50%' }}>
                    <option style={{background: '#0f0f23', color: '#fff'}}>Anyone</option>
                  </select>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', marginBottom: '40px' }}>
                    <div style={{ flex: '1 1 300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', fontWeight: '600', color: '#fff', fontSize: '15px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        DATE
                      </div>
                      {renderCalendar()}
                    </div>
                    <div style={{ flex: '1 1 300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', fontWeight: '600', color: '#fff', fontSize: '15px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        TIME
                      </div>
                      {renderTimeSlots()}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button 
                        type="button" 
                        onClick={() => setPhysicalStep(1)}
                        style={{
                          width: '48px',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                      </button>

                      <button 
                        type="button" 
                        onClick={handleBookingSubmit} 
                        style={{ 
                          background: 'linear-gradient(135deg, #0984e3 0%, #00a8ff 100%)', 
                          color: '#fff', 
                          border: 'none', 
                          padding: '14px 60px', 
                          borderRadius: '8px', 
                          fontSize: '16px', 
                          fontWeight: '700', 
                          cursor: 'pointer', 
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }} 
                        onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(9, 132, 227, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }} 
                        onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
                      >
                        Book Meeting
                      </button>
                    </div>
                    <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                      The Policies and Practices of Breakthru's Purple Fabric apply to the use of your data
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default ContactUs
