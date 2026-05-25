import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const jobsData = {
  'data-engineer': {
    title: 'Senior Data Engineer',
    dept: 'Data & AI',
    location: 'Bengaluru / Remote',
    type: 'Full-time',
    description: 'We are seeking an elite Senior Data Engineer to architect, build, and optimize our enterprise-scale data infrastructure. In this role, you will lead the design of robust data pipelines and lakes using modern cloud data platforms like Snowflake and Databricks. You will collaborate closely with machine learning engineers and data scientists to ensure that our data ecosystems are not only accessible and reliable but also performant enough to train complex AI models. Your work will directly empower our Fortune 500 clients to unlock transformative business value from their data assets.',
    requirements: [
      '7+ years of hands-on experience in data engineering, data warehousing, and big data architecture.',
      'Expert-level proficiency in Python, SQL, and PySpark.',
      'Extensive experience with modern data platforms: Snowflake, Databricks, and Apache Spark.',
      'Deep understanding of ETL/ELT processes and data orchestration tools (e.g., Airflow, dbt, Prefect).',
      'Strong knowledge of cloud platforms (AWS, GCP, or Azure) and infrastructure as code (Terraform).',
      'Demonstrated experience in mentoring junior engineers and leading technical architecture discussions.'
    ]
  },
  'platform-engineer': {
    title: 'Platform Engineer',
    dept: 'Engineering',
    location: 'Bengaluru',
    type: 'Full-time',
    description: 'As a Platform Engineer, you will be the backbone of our software delivery lifecycle, building and maintaining the scalable, resilient infrastructure that our product squads rely on. You will leverage Kubernetes, Terraform, and Go to create a robust Internal Developer Platform (IDP) that abstracts away infrastructure complexity and empowers engineers with automated, self-service capabilities. You will also be responsible for maintaining our global cloud environments, ensuring high availability, security, and performance for mission-critical applications.',
    requirements: [
      '5+ years of experience in platform engineering, DevOps, or SRE roles.',
      'Strong expertise in containerization and orchestration (Docker, Kubernetes, Helm).',
      'Extensive experience with Infrastructure as Code (Terraform, CloudFormation, or Pulumi).',
      'Proficiency in systems programming languages, ideally Go, Python, or Rust.',
      'Deep experience designing and managing advanced CI/CD pipelines (GitHub Actions, ArgoCD, Jenkins).',
      'Strong understanding of observability tools (Prometheus, Grafana, Datadog, ELK stack).'
    ]
  },
  'genai-architect': {
    title: 'GenAI Solutions Architect',
    dept: 'Data & AI',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for a visionary GenAI Solutions Architect to lead the design and implementation of cutting-edge Generative AI solutions for our enterprise clients. You will navigate the rapidly evolving AI landscape, utilizing foundation models (LLMs), RAG (Retrieval-Augmented Generation) architectures, and agentic frameworks (LangChain, LlamaIndex) to solve complex, real-world business problems. You will serve as a strategic technical advisor to client CXOs, translating business objectives into scalable, secure AI architectures.',
    requirements: [
      'Proven track record of architecting and deploying enterprise-grade AI/ML or Generative AI solutions.',
      'Deep technical understanding of foundation models (GPT-4, Claude, Llama, Mistral) and their underlying architectures.',
      'Hands-on experience building complex RAG pipelines, vector databases (Pinecone, Weaviate, Milvus), and semantic search.',
      'Strong background in distributed software architecture, API design, and cloud infrastructure.',
      'Excellent client-facing communication and presentation skills, with the ability to articulate complex AI concepts to non-technical stakeholders.',
      'Experience evaluating AI model performance, security, and safety guardrails.'
    ]
  },
  'full-stack-developer': {
    title: 'Full Stack Developer',
    dept: 'Product Squads',
    location: 'Bengaluru / Hyderabad',
    type: 'Full-time',
    description: 'We are seeking a talented and versatile Full Stack Developer to build modern, highly-responsive web applications for our core platforms. You will be an integral part of an agile, cross-functional product squad, taking ownership of features from ideation through to deployment. Utilizing React, Node.js, and TypeScript, you will craft intuitive user interfaces and scalable backend services, ensuring a seamless and performant experience for our end-users.',
    requirements: [
      '4+ years of professional full-stack web development experience.',
      'Deep expertise in modern JavaScript/TypeScript and the React ecosystem (Next.js, Redux, Context API).',
      'Strong experience building robust, scalable RESTful APIs and GraphQL services using Node.js (Express, NestJS).',
      'Proficiency in modern CSS, UI frameworks (Tailwind, Material UI), and responsive design principles.',
      'Solid experience with relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases.',
      'Familiarity with cloud deployments, containerization, and basic CI/CD practices.'
    ]
  },
  'devops-engineer': {
    title: 'DevOps Engineer',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our dynamic engineering team as a DevOps Engineer to streamline our software delivery processes and ensure unparalleled system reliability. You will manage our extensive AWS infrastructure, implement state-of-the-art CI/CD pipelines, and proactively monitor application performance. Your mission is to automate away manual toil, enhance our deployment velocity, and maintain a highly secure and scalable cloud environment.',
    requirements: [
      '4+ years of dedicated experience as a DevOps or Cloud Engineer.',
      'Deep hands-on experience managing complex infrastructure on AWS (EC2, EKS, S3, RDS, Lambda, IAM).',
      'Expertise in designing and managing CI/CD pipelines (GitHub Actions, GitLab CI, CircleCI).',
      'Strong experience with containerization (Docker) and Kubernetes administration.',
      'Solid scripting and automation skills (Bash, Python, Go).',
      'Experience with security and compliance best practices in the cloud (DevSecOps).'
    ]
  },
  'technical-consultant': {
    title: 'Technical Consultant',
    dept: 'Strategy',
    location: 'Dubai / Riyadh',
    type: 'Full-time',
    description: 'Act as a trusted advisor to our key BFSI (Banking, Financial Services, and Insurance) clients, guiding them through complex, multi-year digital transformations. You will bridge the critical gap between high-level business strategy and deep technology execution. By analyzing existing enterprise architectures and business processes, you will design innovative technological roadmaps that drive efficiency, compliance, and competitive advantage in the digital era.',
    requirements: [
      '6+ years of experience in technical consulting, enterprise architecture, or IT strategy consulting.',
      'Deep domain expertise in the BFSI sector, understanding regulatory constraints, market dynamics, and technological trends.',
      'Proven experience leading large-scale digital transformation or cloud migration initiatives.',
      'Exceptional ability to synthesize complex technical details into clear, actionable business strategies for C-level executives.',
      'Strong analytical and problem-solving skills with a framework-driven approach.',
      'Willingness to travel globally as required to meet client engagements.'
    ]
  }
}

function JobPage() {
  const { jobId } = useParams()
  const job = jobsData[jobId]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [jobId])

  if (!job) {
    return (
      <div className="wrapper-content" style={{ backgroundColor: '#0f0f23', minHeight: '100vh', padding: '120px 20px', textAlign: 'center', color: '#fff' }}>
        <h2>Job not found</h2>
        <p>The position you are looking for does not exist or has been closed.</p>
        <Link to="/careers" style={{ color: '#00BFFF', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>Return to Careers</Link>
      </div>
    )
  }

  return (
    <div className="wrapper-content" style={{ backgroundColor: '#0f0f23', minHeight: '100vh' }}>
      <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <Link to="/careers" className="breadcrumb-link">Careers</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">{job.title}</span>
      </div>

      <section className="job-page-section" style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
        <div style={{ marginBottom: '40px' }}>
          <span className="careers-pos-type" style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px' }}>{job.type}</span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' }}>{job.title}</h1>
          <div style={{ display: 'flex', gap: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600' }}>
            <span>{job.dept}</span>
            <span>&bull;</span>
            <span>{job.location}</span>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>About the Role</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>{job.description}</p>
          
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Requirements</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            {job.requirements.map((req, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>{req}</li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a 
            href={`mailto:contact@breakthru.ai?subject=Application for ${job.title}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="careers-cta-button"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px 32px', background: '#fff', color: '#000', borderRadius: '30px', fontWeight: '700', textDecoration: 'none', transition: 'all 0.3s ease' }}
          >
            <span>Apply with your Profile</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}

export default JobPage
