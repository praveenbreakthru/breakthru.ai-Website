import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ScrambleText from '../components/ScrambleText'

const knowledgeBase = [
  {
    category: 'company',
    keywords: ['who are you', 'what is breakthru', 'about', 'company', 'what do you do', 'tell me about', 'your company', 'breakthru ai', 'breakthru.ai', 'digital fabric'],
    answer: 'We are breakthru.ai — the Digital Fabric. A hybrid of high-end consulting and deep engineering. We Architect, Build, and Run. No slide decks, just shipped code. We help enterprises transform through production-grade engineering.'
  },
  {
    category: 'services',
    keywords: ['services', 'what services', 'offerings', 'capabilities', 'what you offer', 'what do you provide', 'solutions', 'offer', 'capabilities'],
    answer: 'Our services include 6 main areas: 1) Strategy — Digital Transformation & ROI Modeling, 2) Data & AI — Lakehouse & GenAI Agents, 3) Engineering — Platform Engineering & DevSecOps, 4) Growth — Team Augmentation & GCC Build, 5) Product Squads — Dedicated teams & Partner Services, 6) Family Office — Wealth platform modernization.'
  },
  {
    category: 'strategy',
    keywords: ['strategy', 'digital transformation', 'roi modeling', 'digital roadmap', 'technology due diligence', 'architecture assessment', 'cloud migration'],
    answer: 'Our Strategy service helps enterprises with Digital Transformation Strategy, Technology Due Diligence, Architecture Assessment, and Cloud Migration Planning. We dont do 100-page decks — we do blueprints that compile into working software.'
  },
  {
    category: 'data-ai',
    keywords: ['data ai', 'data & ai', 'data and ai', 'lakehouse', 'genai', 'gen ai', 'llm', 'machine learning', 'mlops', 'ml ops', 'analytics', 'bi', 'business intelligence', 'artificial intelligence'],
    answer: 'Data & AI is our practice for building modern data stacks and AI solutions. We offer Data Platform Modernization, GenAI & LLM Implementation, ML Ops & Model Deployment, and Analytics & BI Platforms. We transform data lakes into prediction engines with LLMs that actually work.'
  },
  {
    category: 'engineering',
    keywords: ['engineering', 'platform engineering', 'devsecops', 'sre', 'microservices', 'cloud native', 'api', 'integration', 'cloud infrastructure', 'infrastructure'],
    answer: 'Engineering is our deep engineering practice. We build production-grade AI/ML systems, platform engineering, cloud infrastructure, and high-scale microservices architectures. Our services include Platform Engineering, API & Integration Layer, DevSecOps & SRE, and Cloud Infrastructure.'
  },
  {
    category: 'growth',
    keywords: ['growth', 'team augmentation', 'gcc', 'global capability center', 'captive', 'capability center', 'team', 'engineers', 'staffing', 'resource'],
    answer: 'Our Growth service helps enterprises scale through Team Augmentation and GCC (Global Capability Centers). We provide white-labeled engineering pods that extend your capability overnight. Services include Engineering Team Augmentation, Global Capability Centers, Managed Services, and Technology Partnerships.'
  },
  {
    category: 'product-squads',
    keywords: ['product squads', 'product team', 'dedicated team', 'partner services', 'snowflake', 'databricks', 'google cloud', 'implementation'],
    answer: 'Product Squads provides dedicated teams that operate as your extended product team. As ecosystem partner professionals, we deliver Snowflake Professional Services, Databricks Implementation, and Google Cloud Partner Delivery. We operate as your extended product team with full ownership.'
  },
  {
    category: 'family-office',
    keywords: ['family office', 'wealth', 'portfolio', 'investment', 'governance'],
    answer: 'Family Office service offers Digital modernization for family offices. From legacy systems to unified wealth platforms, we deliver Unified Wealth Platforms, Portfolio Management Systems, Family Governance Portals, and Multi-entity Consolidation.'
  },
  {
    category: 'consulting',
    keywords: ['consulting', 'consulting ai', 'what is consulting', 'advisory'],
    answer: 'ConsultingAI helps enterprises align business ambition with technological direction. We work with CXOs and transformation leaders to architect intelligent strategies that are actionable, scalable, and aligned to real-world outcomes.'
  },
  {
    category: 'ainingineering',
    keywords: ['aingineering', 'engineering', 'what is aingineering'],
    answer: 'AIngineering is our deep engineering practice. We build production-grade AI/ML systems, platform engineering, cloud infrastructure, and high-scale microservices architectures. We operate at the intersection of engineering, operations, and automation.'
  },
  {
    category: 'xperience-ai',
    keywords: ['xperienceai', 'experience', 'xperience', 'customer experience', 'cx', 'personalization', 'recommendation'],
    answer: 'XperienceAI focuses on transforming customer and user experiences through AI-driven personalization, recommendation engines, and intelligent interfaces. We help enterprises craft intelligent, personalized, and measurable digital experiences.'
  },
  {
    category: 'talent-ai',
    keywords: ['talentai', 'talent', 'hiring', 'recruitment', 'workforce', 'staffing', 'ld'],
    answer: 'TalentAI is our AI-powered talent transformation practice. We help organizations build, upskill, and transform their engineering teams with AI capabilities. Services include AI-Augmented Sourcing & L&D, Talent Cloud & On-Demand Models, and Leadership Skilling.'
  },
  {
    category: 'gcc',
    keywords: ['gcc', 'global capability', 'captive', 'capability center', 'global center'],
    answer: 'Our GCC practice helps enterprises set up and scale Global Capability Centers. We offer white-labeled engineering pods that extend your capability overnight. Whether establishing a new GCC or optimizing an existing one, we help you scale with dedicated engineering teams.'
  },
  {
    category: 'industries',
    keywords: ['industries', 'sectors', 'domains', 'verticals', 'what industries', 'which industries'],
    answer: 'We transform 6 industries: 1) BFSI — Banking & Financial Services, 2) Manufacturing & Industry 4.0, 3) Telecommunication, 4) Retail & E-Commerce, 5) Healthcare & Life Sciences, 6) Travel & Hospitality.'
  },
  {
    category: 'fintech',
    keywords: ['fintech', 'banking', 'financial', 'finance', 'neobank', 'neo bank'],
    answer: 'In Fintech, we built a parallel core using Event-Driven Architecture for real-time ledgers. Results: 2.5x user acquisition, 40ms transaction latency, $0 fraud loss in Q4. We specialize in building modern banking infrastructure.'
  },
  {
    category: 'manufacturing',
    keywords: ['manufacturing', 'factory', 'industry 4.0', 'smart factory', 'industrial'],
    answer: 'In Manufacturing, we deliver Digital Twin implementation, Predictive Maintenance AI, Smart Factory Automation, and Supply Chain Optimization. Results: 40% efficiency gain, Zero unplanned downtime, 100% traceability.'
  },
  {
    category: 'telecom',
    keywords: ['telecom', 'telecommunication', 'network', 'tower', 'telecommunications'],
    answer: 'In Telecom, we built TRAMS (Total Remote Asset Management System) — an AI brain that predicts tower failures 48 hours in advance. We managed 40,000 assets virtually. Results: 99.99% network uptime, -30% truck rolls, real-time visibility.'
  },
  {
    category: 'retail',
    keywords: ['retail', 'ecommerce', 'e-commerce', 'commerce', 'shopping', 'e commerce'],
    answer: 'In Retail & E-Commerce, we build unified commerce platforms, personalization engines, and inventory optimization. Results: 2.5x conversion rate, 45% reduced cart abandonment, real-time inventory sync.'
  },
  {
    category: 'healthcare',
    keywords: ['healthcare', 'health', 'medical', 'hospital', 'hipaa', 'ehr', 'clinical'],
    answer: 'In Healthcare, we deliver EHR integration, clinical decision support, telemedicine platforms, and regulatory compliance. Results: 3X patient throughput, 50% reduced wait times, 100% HIPAA compliant.'
  },
  {
    category: 'travel',
    keywords: ['travel', 'hospitality', 'hotel', 'booking', 'tourism'],
    answer: 'In Travel & Hospitality, we build booking engines, revenue management, loyalty programs, and guest experience platforms. Results: 25% revenue uplift, 4.8★ guest satisfaction, millions of bookings/day.'
  },
  {
    category: 'ecosystem',
    keywords: ['ecosystem', 'partners', 'partnership', 'alliance', 'partner'],
    answer: 'Our Strategic Alliances include: Databricks (Data & AI), Snowflake (Data Cloud), Google Cloud (AI Infrastructure), and Intellect Design (Digital Banking). We have 200+ certified engineers and 50+ joint customers.'
  },
  {
    category: 'databricks',
    keywords: ['databricks', 'lakehouse', 'spark', 'delta lake', 'mlflow'],
    answer: 'Databricks is our Data & AI Platform partner. We deliver Lakehouse Architecture, Delta Lake Implementation, MLflow & ML Ops, and Spark Optimization. We help enterprises build unified analytics platforms for data engineering, data science, and machine learning.'
  },
  {
    category: 'snowflake',
    keywords: ['snowflake', 'data warehouse', 'snowpark', 'data mesh'],
    answer: 'Snowflake is our Data Cloud partner. We deliver Data Warehouse Modernization, Data Mesh Implementation, Snowpark Development, and Data Sharing & Marketplace. We help modernize your data infrastructure.'
  },
  {
    category: 'google-cloud',
    keywords: ['google cloud', 'gcp', 'vertex', 'bigquery', 'anthos'],
    answer: 'Google Cloud is our AI Infrastructure partner. We deliver Vertex AI & GenAI, BigQuery Analytics, Cloud Infrastructure, and Anthos Multi-cloud. We help enterprises leverage leading AI/ML capabilities and global infrastructure.'
  },
  {
    category: 'labs',
    keywords: ['labs', 'breakthru labs', 'nexus', 'agent lenz', 'experimental', 'products'],
    answer: 'Breakthru Labs is our Experimental Division with two products: 1) Nexus BD — AI-powered Business Development automation with dual AI research (Gemini + Deepseek). 2) Agent Lenz — AIOps incident management that reduces downtime by 60%.'
  },
  {
    category: 'nexus',
    keywords: ['nexus', 'nexus bd', 'business development', 'bd'],
    answer: 'Nexus BD is our Autonomous Growth Engine — an AI-powered Business Development platform with Dual AI Research Engine, Auto-Personalized Landing Pages, Sentiment Analysis on Replies, and Workflow Automation. Currently in Beta Access.'
  },
  {
    category: 'agent-lenz',
    keywords: ['agent lenz', 'lenz', 'aiops', 'ai ops', 'incident', 'sre', 'alert'],
    answer: 'Agent Lenz is our AIOps Sentinel — comprehensive AI-powered incident management and SRE platform. Features: Intelligent Alert Correlation, Real-time SLA Compliance, Automated War Rooms, and Predictive Breach Detection. Live V1.0.'
  },
  {
    category: 'delivery',
    keywords: ['how we deliver', 'process', 'methodology', 'approach', 'deliver', 'sprint', 'agile'],
    answer: 'How We Deliver: 1) Discover — Deep-dive into your domain, tech stack, and pain points. 2) Architect — Design systems that scale, not slide decks that gather dust. 3) Build — Agile squads shipping production code in 2-week sprints. 4) Run — We own the uptime with 24/7 SRE and outcome-based SLAs.'
  },
  {
    category: 'team',
    keywords: ['team', 'people', 'engineers', 'staff', 'how many', 'employees', 'size', 'certified'],
    answer: 'We have 200+ certified engineers across all partner platforms, 50+ joint enterprise customers, with an average 12-week implementation time and 4.9/5 customer satisfaction score. Our engineers are certified across Databricks, Snowflake, Google Cloud, and more.'
  },
  {
    category: 'contact',
    keywords: ['contact', 'reach', 'email', 'talk', 'call', 'get in touch', 'reach out'],
    answer: 'You can reach us by clicking the "Talk to us!" button in the navigation bar or email us at bd@breakthru.ai. Wed love to discuss how we can help transform your business.'
  },
  {
    category: 'story',
    keywords: ['our story', 'history', 'founded', 'background', 'journey', 'who started'],
    answer: 'Visit the "Our Story" page from the "Who We Are" dropdown in the navigation to learn about our journey, leadership team, and the network of partners and clients weve built. We were founded in 2023 with a mission to bridge consulting and engineering.'
  },
  {
    category: 'vision',
    keywords: ['vision', 'mission', 'purpose', 'goal', 'why'],
    answer: 'Our Vision: To become the definitive Digital Fabric for enterprises seeking transformation—not through PowerPoint, but through production-grade engineering that ships. Our Mission: Bridge the gap between strategy and execution. Combine consulting-grade domain expertise with engineering-grade delivery. Own outcomes, not just outputs.'
  },
  {
    category: 'values',
    keywords: ['values', 'principles', 'beliefs', 'culture', 'manifesto'],
    answer: 'Our core values: 1) Code > Slides — We ship working software, not PowerPoint decks. 2) Extreme Ownership — We treat your platform as if it were our own. 3) Engineer-to-Engineer — No account managers. You work directly with engineers. 4) Radical Transparency — Open access to our code and roadmaps.'
  },
  {
    category: 'locations',
    keywords: ['location', 'office', 'address', 'where', 'headquarters', 'hub', 'city'],
    answer: 'Our Engineering HQ is in India with cities: Bengaluru, Mumbai, Hyderabad. Client Engagement in GCC: Dubai, Riyadh. Regional Ops in Southeast Asia: Kuala Lumpur, Manila. Corporate Office: Breakthru Enterprise Solutions Private Limited, 1292-1293 Trichy Rd, Nadar Colony, Race Course, Coimbatore, Tamil Nadu 641018.'
  },
  {
    category: 'pricing',
    keywords: ['pricing', 'cost', 'price', 'fee', 'charge', 'estimate', 'quote'],
    answer: 'Our pricing is outcome-based rather than time-and-materials. We work with enterprises to define measurable outcomes and align our delivery with your success metrics. Contact us to discuss your specific requirements.'
  },
  {
    category: 'careers',
    keywords: ['careers', 'jobs', 'hiring', 'job opening', 'work with', 'join'],
    answer: 'Were always looking for talented engineers! Visit our Careers page to see current openings. We hire skilled engineers across platform engineering, data & AI, and cloud infrastructure. Join our team of 200+ certified professionals.'
  }
]

const relevantKeywords = [
  'breakthru', 'breakthru.ai', 'service', 'services', 'industry', 'industries', 'partner', 'partners', 'labs', 
  'consult', 'consulting', 'engineer', 'engineering', 'fintech', 'manufactur', 'manufacturing', 'telecom', 
  'telecommunication', 'retail', 'health', 'healthcare', 'travel', 'hospitality', 'databricks', 'snowflake', 
  'google', 'gcp', 'cloud', 'intellect', 'nexus', 'lenz', 'gcc', 'talent', 'xperience', 'ai', 'data', 'strategy',
  'growth', 'product', 'squad', 'platform', 'team', 'company', 'about', 'who', 'what', 'how', 'where', 'when',
  'digital', 'transformation', 'automation', 'devops', 'sre', 'microservices', 'genai', 'llm', 'ml', 'machine learning',
  'price', 'cost', 'estimate', 'quote', 'fee', 'payment', 'billing', 'budget', 'invest', 'roi',
  'career', 'job', 'hire', 'hiring', 'recruit', 'recruitment', 'openings', 'vacancy', 'apply', 'interview',
  'office', 'location', 'address', 'headquarters', 'hub', 'city', 'bangalore', 'mumbai', 'hyderabad', 'dubai', 'riyadh',
  'vision', 'mission', 'purpose', 'goal', 'values', 'principles', 'culture', 'manifesto', 'story', 'history', 'founded',
  'delivery', 'process', 'methodology', 'approach', 'sprint', 'agile', 'project', 'implementation',
  'capability', 'center', 'global', 'captive', 'team augmentation', 'resource', 'staffing',
  'wealth', 'portfolio', 'investment', 'family office', 'governance',
  'neobank', 'banking', 'financial', 'finance', 'payment', 'transaction', 'fraud',
  'factory', 'smart factory', 'industry 4.0', 'digital twin', 'predictive maintenance', 'supply chain',
  'network', 'tower', 'telecom', 'asset management', 'trams',
  'ecommerce', 'e-commerce', 'commerce', 'shopping', 'cart', 'inventory',
  'hospital', 'medical', 'ehr', 'clinical', 'telemedicine', 'hipaa', 'patient',
  'hotel', 'booking', 'tourism', 'hospitality', 'revenue', 'loyalty',
  'lakehouse', 'data warehouse', 'analytics', 'bi', 'business intelligence', 'spark', 'delta lake', 'mlflow', 'snowpark', 'data mesh',
  'vertex', 'bigquery', 'anthos', 'infrastructure',
  'bd', 'business development', 'sales', 'marketing',
  'contact', 'reach', 'email', 'phone', 'call'
]

function HeroBotAvatar({ size = 'md' }) {
  const sizeClass = size === 'sm' ? 'cb-avatar-sm' : 'cb-avatar-md'
  return (
    <div className={`cb-avatar ${sizeClass}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="32" width="20" height="36" rx="10" fill="#f4f7f8"/>
        <rect x="70" y="32" width="20" height="36" rx="10" fill="#f4f7f8"/>
        <rect x="18" y="12" width="64" height="76" rx="32" fill="#f4f7f8"/>
        <rect x="14" y="38" width="10" height="24" rx="5" fill="#4d7df6"/>
        <rect x="76" y="38" width="10" height="24" rx="5" fill="#4d7df6"/>
        <rect x="25" y="28" width="50" height="36" rx="16" fill="#141c2f"/>
        <path d="M 34 44 Q 39 37 44 44" stroke="#00bcd4" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path d="M 56 44 Q 61 37 66 44" stroke="#00bcd4" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
  )
}

function calculateSimilarity(str1, str2) {
  const words1 = str1.toLowerCase().split(' ')
  const words2 = str2.toLowerCase().split(' ')
  let matchCount = 0
  for (const w1 of words1) {
    for (const w2 of words2) {
      if (w2.includes(w1) || w1.includes(w2)) {
        matchCount++
        break
      }
    }
  }
  return matchCount / Math.max(words1.length, words2.length)
}

function findBestMatch(question) {
  const lower = question.toLowerCase().trim()
  if (!lower || lower.length < 2) return null

  let bestMatch = null
  let bestScore = 0

  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      const similarity = calculateSimilarity(lower, keyword)
      if (similarity > bestScore) {
        bestScore = similarity
        bestMatch = item
      }

      const lowerKeywords = keyword.toLowerCase()
      const lowerQuestion = lower
      
      if (lowerQuestion.includes(lowerKeywords) || lowerKeywords.split(' ').some(w => lowerQuestion.includes(w))) {
        const score = lowerKeywords.length / 10
        if (score > bestScore) {
          bestScore = score
          bestMatch = item
        }
      }
    }
  }

  return bestScore >= 0.2 ? bestMatch : null
}

function isRelevantQuestion(question) {
  const lower = question.toLowerCase()
  return relevantKeywords.some(keyword => lower.includes(keyword.toLowerCase()))
}

export function HeroChatbot({ onClose }) {
  const defaultIntro = 'Hi! Im the breakthru.ai assistant. We are the Digital Fabric—a hybrid of high-end consulting and deep engineering. We Architect, Build, and Run. Ask me anything about our services, industries, products, or how we can help transform your business!'
  const [messages, setMessages] = useState([
    { role: 'bot', text: defaultIntro }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const chatEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const chatbotRef = useRef(null)
  const isMutedRef = useRef(false)
  const hasSpokenIntroRef = useRef(false)

  useEffect(() => {
    if (chatbotRef.current) {
      chatbotRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [])

  useEffect(() => {
    isMutedRef.current = isMuted
    if (isMuted) window.speechSynthesis.cancel()
  }, [isMuted])

  const speak = (text) => {
    if (isMutedRef.current) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1
    const voices = window.speechSynthesis.getVoices()
    const englishVoice = voices.find(v => v.lang.startsWith('en'))
    if (englishVoice) utterance.voice = englishVoice
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1]
      if (lastMsg.role === 'bot') {
        speak(lastMsg.text)
        if (messages.length === 1) hasSpokenIntroRef.current = true
      }
    }
  }, [messages])

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasSpokenIntroRef.current && messages.length === 1) {
        speak(defaultIntro)
        hasSpokenIntroRef.current = true
      }
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }

    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
      window.speechSynthesis.cancel()
    }
  }, [])

  const findAnswer = (question) => {
    if (!isRelevantQuestion(question)) {
      return 'I can only answer questions about breakthru.ai — our services, industries, products, ecosystem partners, careers, and how we work. Please ask about something related to our company or services.'
    }

    const match = findBestMatch(question)
    
    if (match) {
      return match.answer
    }

    const lower = question.toLowerCase()
    
    if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
      const priceMatch = findBestMatch('pricing')
      if (priceMatch) return priceMatch.answer
    }
    
    if (lower.includes('job') || lower.includes('career') || lower.includes('hire')) {
      const careerMatch = findBestMatch('careers')
      if (careerMatch) return careerMatch.answer
    }

    return 'I understand you\'re asking about breakthru.ai, but I want to give you the most accurate answer. Try asking about our services (Strategy, Data & AI, Engineering, Growth, Product Squads, Family Office), industries (BFSI, Manufacturing, Telecom, Retail, Healthcare, Travel), ecosystem partners (Databricks, Snowflake, Google Cloud), or products (Nexus BD, Agent Lenz).'
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const answer = findAnswer(text)
      setMessages(prev => [...prev, { role: 'bot', text: answer }])
      setIsTyping(false)
    }, 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNewChat = () => {
    setMessages([{ role: 'bot', text: 'Hi! Im the breakthru.ai assistant. We are the Digital Fabric—a hybrid of high-end consulting and deep engineering. We Architect, Build, and Run. Ask me anything about our services or industries!' }])
    setInput('')
    setIsTyping(false)
  }

  return (
    <div className="cb-card cb-card-inline" ref={chatbotRef}>
      <header className="cb-header">
        <div className="cb-header-left">
          <HeroBotAvatar size="md" />
          <div className="cb-header-info">
            <span className="cb-title">AI Assistant</span>
            <span className="cb-status">
              <span className="cb-status-dot" />
              Online
            </span>
          </div>
        </div>

        <div className="cb-header-actions">
          <button
            onClick={() => setIsMuted(p => !p)}
            className={`cb-icon-btn ${isMuted ? 'cb-icon-btn-danger' : ''}`}
            title={isMuted ? 'Unmute voice' : 'Mute voice'}
          >
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 010 14.14" />
                <path d="M15.54 8.46a5 5 0 010 7.07" />
              </svg>
            )}
          </button>

          <button onClick={handleNewChat} className="cb-icon-btn" title="New chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" />
              <path d="M3 3v9h9" />
            </svg>
          </button>

          {onClose && (
            <button onClick={onClose} className="cb-icon-btn" title="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <div className="cb-messages" ref={messagesContainerRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`cb-msg cb-msg-${msg.role}`} style={{ animationDelay: `${i * 0.04}s` }}>
            {msg.role === 'bot' && <HeroBotAvatar size="sm" />}
            <div className={`cb-bubble cb-bubble-${msg.role}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="cb-msg cb-msg-bot">
            <HeroBotAvatar size="sm" />
            <div className="cb-bubble cb-bubble-bot cb-typing">
              <span className="cb-dot" />
              <span className="cb-dot" />
              <span className="cb-dot" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="cb-input-area">
        <div className="cb-input-wrap">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about our services..."
            className="cb-input"
          />
          <button onClick={handleSend} className="cb-send" title="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function Home({ chatbotOpen, onCloseChatbot }) {
  const [visibleSections, setVisibleSections] = useState({})
  const [activeIndustry, setActiveIndustry] = useState(0)
  const sectionRefs = useRef({})
  const location = useLocation()
  const totalIndustries = 6

  const nextIndustry = () => {
    setActiveIndustry((prev) => (prev + 1) % totalIndustries)
  }

  const prevIndustry = () => {
    setActiveIndustry((prev) => (prev - 1 + totalIndustries) % totalIndustries)
  }

  useEffect(() => {
    const hash = location.hash.slice(1)
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.hash])

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
      <section className="home-hero">
        <div className="home-hero-left">
          <h1 className="home-hero-heading">
            <span className="hero-line hero-line-dark">ARCHITECT.</span>
            <span className="hero-line hero-line-accent">BUILD.</span>
            <span className="hero-line hero-line-dark">RUN.</span>
          </h1>
          <div className="hero-tagline-box">
            <p><ScrambleText text="We build intelligent systems that don't just support — they execute." delay={100} speed={30} /></p>
          </div>
        </div>

        <div className="home-hero-right">
          <div className="story-cards-stack">
            <Link to="/story/fintech" className="story-card story-card-1">
              <div className="story-card-bg-gif" />
              <div className="story-card-accent" />
              <div className="story-card-inner">
                <span className="story-card-number">STORY 01</span>
                <h3 className="story-card-title">Fintech</h3>
                <div className="story-card-line" />
              </div>
              <div className="story-card-glow" />
            </Link>
            <Link to="/story/manufacturing" className="story-card story-card-2">
              <div className="story-card-bg-gif" />
              <div className="story-card-accent" />
              <div className="story-card-inner">
                <span className="story-card-number">STORY 02</span>
                <h3 className="story-card-title">Manufacturing</h3>
                <div className="story-card-line" />
              </div>
              <div className="story-card-glow" />
            </Link>
            <Link to="/story/telecom" className="story-card story-card-3">
              <div className="story-card-bg-gif" />
              <div className="story-card-accent" />
              <div className="story-card-inner">
                <span className="story-card-number">STORY 03</span>
                <h3 className="story-card-title">Telecom</h3>
                <div className="story-card-line" />
              </div>
              <div className="story-card-glow" />
            </Link>
            <Link to="/story/breakthru-labs" className="story-card story-card-4">
              <div className="story-card-bg-gif" />
              <div className="story-card-accent" />
              <div className="story-card-inner">
                <span className="story-card-number">STORY 04</span>
                <h3 className="story-card-title">Breakthru Labs</h3>
                <div className="story-card-line" />
              </div>
              <div className="story-card-glow" />
            </Link>
          </div>
        </div>
      </section>

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
              { label: 'BFSI', index: 0, theme: 'btn-bfsi' },
              { label: 'MANUFACTURING', index: 1, theme: 'btn-mfg' },
              { label: 'TELECOM', index: 2, theme: 'btn-telecom' },
              { label: 'RETAIL', index: 3, theme: 'btn-retail' },
              { label: 'HEALTHCARE', index: 4, theme: 'btn-healthcare' },
              { label: 'TRAVEL', index: 5, theme: 'btn-travel' },
            ].map((item) => (
              <button
                key={item.index}
                className={`ind-quicknav-btn ${item.theme} ${activeIndustry === item.index ? 'ind-quicknav-btn-active' : ''}`}
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

export default Home
