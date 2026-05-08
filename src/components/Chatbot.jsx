import { useEffect, useRef, useState } from 'react'
import { pipeline, env } from '@xenova/transformers'

env.allowLocalModels = false; // Pull models from HuggingFace Hub
env.useBrowserCache = true;

// Global singletons for ML feature extraction
let embedderPipeline = null;
let databaseEmbeddings = null;
let isModelInitializing = false;

const knowledgeBase = [

  // ===== ABOUT =====
  {
    q: ['who are you', 'what is breakthru', 'about company'],
    a: 'We are breakthru.ai — the Digital Fabric. A hybrid of high-end consulting and deep engineering. We architect, build, and run enterprise systems. No slide decks, just shipped code.'
  },

  {
    q: ['vision', 'mission', 'why breakthru'],
    a: 'Our mission is to bridge the gap between strategy and execution by combining consulting-grade thinking with engineering-grade delivery. We own outcomes, not just outputs.'
  },

  {
    q: ['values', 'principles', 'manifesto'],
    a: 'Our principles: Code > Slides, Extreme Ownership, Engineer-to-Engineer collaboration, and Radical Transparency. Every engagement results in production-ready systems.'
  },

  // ===== SERVICES =====
  {
    q: ['services', 'offerings', 'what do you offer'],
    a: 'We offer 6 core capabilities: 1) Strategy & ROI Engineering, 2) Data & AI (Lakehouse + GenAI), 3) Platform Engineering (Cloud-native systems), 4) Growth (GCC & squads), 5) Product Squads, and 6) Family Office Transformation.'
  },

  {
    q: ['strategy', 'consulting'],
    a: 'We deliver actionable digital roadmaps, ROI models, and architecture blueprints. No 100-page decks — only executable strategies aligned to business outcomes.'
  },

  {
    q: ['data ai', 'ai services', 'machine learning'],
    a: 'We build modern data platforms, lakehouses, and GenAI systems including LLMs, RAG pipelines, predictive analytics, and data governance frameworks.'
  },

  {
    q: ['engineering', 'platform', 'devops'],
    a: 'We build scalable cloud-native systems using microservices, Kubernetes, serverless, and DevSecOps. We modernize legacy systems without disrupting business.'
  },

  {
    q: ['growth', 'gcc', 'team'],
    a: 'We provide white-labeled engineering squads and build Global Capability Centers (GCCs) with full setup — talent, infra, legal, and operations.'
  },

  {
    q: ['family office', 'wealth'],
    a: 'We modernize family offices with unified wealth platforms, portfolio dashboards, secure data vaults, and multi-entity consolidation systems.'
  },

  // ===== INDUSTRIES =====
  {
    q: ['industries', 'domains'],
    a: 'We specialize in BFSI, Manufacturing, Telecom, Retail, Healthcare, Travel & Hospitality, and Family Office transformation.'
  },

  {
    q: ['banking', 'fintech'],
    a: 'We build digital banking platforms with real-time ledgers, payment orchestration, KYC/AML automation, and fraud detection. Results include 40ms latency, 99.99% uptime, and 2.5x user growth.'
  },

  {
    q: ['manufacturing', 'factory'],
    a: 'We deliver Digital Twins, IoT-enabled smart factories, predictive maintenance AI, and computer vision quality systems. Results: 40% efficiency gain and zero downtime.'
  },

  {
    q: ['telecom'],
    a: 'We built TRAMS — an AI-powered network brain predicting failures 48 hours early. Results: 99.99% uptime, 30% fewer truck rolls, and real-time asset visibility.'
  },

  {
    q: ['retail', 'ecommerce'],
    a: 'We build unified commerce platforms, personalization engines, and real-time inventory systems. Results: 2.5x conversions and 45% reduced cart abandonment.'
  },

  {
    q: ['healthcare'],
    a: 'We build interoperable healthcare systems, AI diagnostics, and telemedicine platforms. Results: 3x patient throughput and 50% reduced wait times.'
  },

  {
    q: ['travel', 'hospitality'],
    a: 'We build booking engines, revenue optimization platforms, and loyalty systems delivering 25% revenue uplift and high customer satisfaction.'
  },

  // ===== STORIES / CASE STUDIES =====
  {
    q: ['case study', 'projects', 'stories'],
    a: 'We have delivered flagship transformations across banking (neo-bank platforms), manufacturing (smart factories), and telecom (self-healing networks with AI).'
  },

  {
    q: ['neo bank', 'bank project'],
    a: 'We built a cloud-native neo-bank platform with real-time ledgers, multi-currency support, and compliance automation. Achieved 60% faster onboarding and 40% cost reduction.'
  },

  {
    q: ['smart factory'],
    a: 'We implemented IoT sensors, Digital Twins, and Edge AI to create self-optimizing factories with zero unplanned downtime and full traceability.'
  },

  {
    q: ['trams'],
    a: 'TRAMS is our AI-powered telecom platform that predicts failures, manages 40,000+ assets, and enables self-healing networks.'
  },

  // ===== ECOSYSTEM =====
  {
    q: ['partners', 'ecosystem'],
    a: 'We partner with Databricks, Snowflake, Google Cloud, and Intellect Design to deliver enterprise-grade AI, data, and cloud solutions.'
  },

  {
    q: ['databricks'],
    a: 'We implement Lakehouse architecture, Delta Lake, MLflow, and large-scale data engineering on Databricks.'
  },

  {
    q: ['snowflake'],
    a: 'We modernize data warehouses, implement data mesh, and build scalable analytics platforms on Snowflake.'
  },

  {
    q: ['google cloud'],
    a: 'We build AI and cloud solutions using Vertex AI, BigQuery, and scalable GCP infrastructure.'
  },

  // ===== LABS =====
  {
    q: ['labs', 'breakthru labs'],
    a: 'Breakthru Labs is our experimental AI division building next-gen products and platforms at the edge of innovation.'
  },

  {
    q: ['nexus', 'nexus bd'],
    a: 'Nexus BD is an AI-powered business development engine with dual AI research, personalized outreach, and automated workflows.'
  },

  {
    q: ['agent lenz'],
    a: 'Agent Lenz is an AIOps platform for incident management with alert correlation, SLA monitoring, and predictive failure detection.'
  },

  // ===== DELIVERY =====
  {
    q: ['process', 'how you work'],
    a: 'Our model: Discover → Architect → Build → Run. We design, ship, and operate systems with full ownership and 24/7 SRE.'
  },

  // ===== TEAM =====
  {
    q: ['team', 'engineers'],
    a: 'We are 200+ engineers across global hubs with 50+ enterprise clients, delivering solutions in ~12 weeks with 4.9/5 satisfaction.'
  },

  // ===== CAREERS =====
  {
    q: ['jobs', 'careers'],
    a: 'We are hiring across Data Engineering, Platform Engineering, GenAI, Full Stack, and DevOps roles. Work on real systems, not presentations.'
  },

  // ===== CONTACT =====
  {
    q: ['contact', 'email', 'phone'],
    a: 'Reach us via the “Let’s Build” section on the website or email hello@breakthru.ai to start your transformation journey.'
  }

];
function BotAvatar({ size = 'md' }) {
  const sizeClass = size === 'sm' ? 'cb-avatar-sm' : 'cb-avatar-md'
  return (
    <div className={`cb-avatar ${sizeClass}`}>
      <img src="https://giffiles.alphacoders.com/112/11291.gif" alt="AI Robot" />
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="cb-msg cb-msg-bot">
      <BotAvatar size="sm" />
      <div className="cb-bubble cb-bubble-bot cb-typing">
        <span className="cb-dot" />
        <span className="cb-dot" />
        <span className="cb-dot" />
      </div>
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
      const lowerKeywords = keyword.toLowerCase()
      const lowerQuestion = lower
      
      // Exact match - highest priority
      if (lowerQuestion === lowerKeywords && lowerKeywords.length > 0) {
        const score = 1.0
        if (score > bestScore) {
          bestScore = score
          bestMatch = item
        }
        continue
      }
      
      // Keyword is subset of question - high priority
      if (lowerQuestion.includes(lowerKeywords) && lowerKeywords.length > 3) {
        const score = 0.95
        if (score > bestScore) {
          bestScore = score
          bestMatch = item
        }
        continue
      }
      
      // Question contains keyword words - medium priority
      const questionWords = lowerQuestion.split(/[\s,\-\?\.!]+/).filter(w => w.length > 2)
      const keywordWords = lowerKeywords.split(/[\s,\-\?\.!]+/).filter(w => w.length > 2)
      
      if (keywordWords.length > 0) {
        let matchCount = 0
        for (const qw of questionWords) {
          for (const kw of keywordWords) {
            if (qw.includes(kw) || kw.includes(qw)) {
              matchCount++
              break
            }
          }
        }
        
        if (matchCount > 0) {
          // Require at least 50% word match for relevance
          const wordMatchRatio = matchCount / keywordWords.length
          if (wordMatchRatio >= 0.5) {
            const score = wordMatchRatio * 0.85
            if (score > bestScore) {
              bestScore = score
              bestMatch = item
            }
          }
        }
      }
    }
  }

  // Only return match if score is high enough
  return bestScore >= 0.5 ? bestMatch : null
}

function isRelevantQuestion(question) {
  const lower = question.toLowerCase()
  return relevantKeywords.some(keyword => lower.includes(keyword.toLowerCase()))
}

export default function Chatbot({ onClose, variant = 'floating' }) {
  const defaultIntro = 'Hi! Im the breakthru.ai assistant. We are the Digital Fabric—a hybrid of high-end consulting and deep engineering. We Architect, Build, and Run. Ask me anything about our services, industries, products, or how we can help transform your business!'
  const [messages, setMessages] = useState([
    { role: 'bot', text: defaultIntro }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  
  // Model state tracker
  const [modelReady, setModelReady] = useState(!!embedderPipeline);
  
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const isMutedRef = useRef(false)
  const hasSpokenIntroRef = useRef(false)

  // Initialize the ML Engine on component mount
  useEffect(() => {
    const initModel = async () => {
      if (embedderPipeline || isModelInitializing) return;
      isModelInitializing = true;
      try {
        console.log("Loading ML Semantic Model...");
        embedderPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        console.log("Model loaded locally, generating Knowledge Base vectors...");
        
        databaseEmbeddings = [];
        for (const item of knowledgeBase) {
          for (const q of item.q) {
            const output = await embedderPipeline(q, { pooling: 'mean', normalize: true });
            databaseEmbeddings.push({ embedding: Array.from(output.data), a: item.a, sourceQ: q });
          }
        }
        console.log("Knowledge Base vector generation complete.");
        setModelReady(true);
      } catch (error) {
        console.error("Failed to load embedded ML model:", error);
      } finally {
        isModelInitializing = false;
      }
    };
    initModel();
  }, []);

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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
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

  const getAIResponse = async (text) => {
    // ----------------------------------------------------
    // 1. SEMANTIC SEARCH (PRIMARY ML ROUTE)
    // ----------------------------------------------------
    if (embedderPipeline && databaseEmbeddings && databaseEmbeddings.length > 0) {
      try {
        const output = await embedderPipeline(text, { pooling: 'mean', normalize: true });
        const queryVec = Array.from(output.data);
        
        let matches = [];
        for (const entry of databaseEmbeddings) {
          let dotProduct = 0;
          for (let i = 0; i < queryVec.length; i++) {
            dotProduct += queryVec[i] * entry.embedding[i];
          }
          matches.push({ score: dotProduct, a: entry.a });
        }
        
        matches.sort((a, b) => b.score - a.score);
        
        // Deduplicate answers since distinct 'q' questions can point to the same 'a'
        const uniqueMatches = [];
        for (const m of matches) {
          if (!uniqueMatches.find(u => u.a === m.a)) uniqueMatches.push(m);
        }
        
        const bestScore = uniqueMatches[0].score;
        if (bestScore > 0.45) { 
          // Similar to keyword mixed logic: only bundle highly overlapping semantic distances
          const validMatches = uniqueMatches.filter(m => m.score >= bestScore * 0.85).slice(0, 3);
          if (validMatches.length === 1) {
            return validMatches[0].a;
          } else {
            return validMatches.map(m => `• ${m.a}`).join('\n\n');
          }
        }
        
        return "I'm sorry, my ML algorithms don't indicate that I have that information. Can you try rephrasing your question about Breakthru.ai?";
      } catch (error) {
        console.error("Semantic ML search failed, executing fallback...", error);
      }
    }

    // ----------------------------------------------------
    // 2. STRING MATCHING (FALLBACK IF ML MODULE DID NOT LOAD)
    // ----------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => {
        const query = text.toLowerCase();
        const queryWords = query.split(/[^\w]+/);
        let matches = [];
        const stopWords = ['what', 'when', 'where', 'which', 'who', 'how', 'why', 'this', 'that', 'with', 'about', 'from', 'have', 'does', 'tell', 'company', 'breakthru', 'your', 'need', 'know', 'some', 'they', 'them', 'then', 'than'];
        
        for (const item of knowledgeBase) {
          let score = 0;
          for (const q of item.q) {
            const keyword = q.toLowerCase();
            
            // Reward exact full sentences uniquely
            if (keyword === query) {
               score += 50;
            } else if (keyword.includes(query) || query.includes(keyword)) {
               score += 15;
            }
            
            // Reward individual meaningful word overlaps heavily
            const keywordWords = keyword.split(/[^\w]+/);
            for (const word of queryWords) {
              if (word.length > 3 && !stopWords.includes(word) && keywordWords.includes(word)) { 
                score += word.length * 2; 
              }
            }
          }
          if (score > 5) {
            matches.push({ score, text: item.a });
          }
        }
        
        if (matches.length > 0) {
          matches.sort((a, b) => b.score - a.score);
          const bestScore = matches[0].score;
          const validMatches = matches.filter(m => m.score >= bestScore * 0.85).slice(0, 3);
          
          if (validMatches.length === 1) {
            resolve(validMatches[0].text);
          } else {
            const combinedAnswers = validMatches.map(m => `• ${m.text}`).join('\n\n');
            resolve(combinedAnswers);
          }
        } else {
          resolve("I'm sorry, I primarily help with Breakthru.ai services and information. Could you rephrase your question?");
        }
      }, 300);
    });
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    const answer = await getAIResponse(text);

    setMessages(prev => [...prev, { role: 'bot', text: answer }]);
    setIsTyping(false);
  };

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

  const [activeTab, setActiveTab] = useState('default')

  const isSidebar = variant === 'sidebar'

  return (
    <div className={isSidebar ? 'cb-sidebar' : 'cb-shell'}>
      {!isSidebar && <div className="cb-glow" />}

      <div className={`cb-card ${isSidebar ? 'cb-card-sidebar' : ''}`}>
        <header className="cb-header">
          <div className="cb-header-left">
            <BotAvatar size="md" />
            <div className="cb-header-info">
              <span className="cb-title">Bro</span>
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
          </div>
        </header>

        <div className="cb-tabs">
          <button
            className={`cb-tab ${activeTab === 'default' ? 'active' : ''}`}
            onClick={() => setActiveTab('default')}
          >
            Chat Bot
          </button>
          <button
            className={`cb-tab ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
        </div>

        {activeTab === 'default' ? (
          <>
            <div className="cb-messages" ref={messagesContainerRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`cb-msg cb-msg-${msg.role}`} style={{ animationDelay: `${i * 0.04}s` }}>
                  {msg.role === 'bot' && <BotAvatar size="sm" />}
                  <div className={`cb-bubble cb-bubble-${msg.role}`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
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
              <div className="cb-powered">Powered by breakthru.ai</div>
            </div>
          </>
        ) : (
          <div className="cb-experience-placeholder">
            <div className="cb-exp-icon">🚀</div>
            <h3 className="cb-exp-title">Experience Bot is under development</h3>
            <p className="cb-exp-desc">
              We're building something exciting. Stay tuned!
            </p>
            <button className="cb-exp-btn" disabled>Coming Soon</button>
          </div>
        )}
      </div>
    </div>
  )
}
