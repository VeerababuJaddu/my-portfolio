import { useState, useEffect, useRef, useCallback } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const GitHubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
);
const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const EmailIcon = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />;
const PhoneIcon = () => <Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />;
const ChevronDown = () => <Icon d="M6 9l6 6 6-6" />;
const ExternalLink = () => <Icon d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6 M15 3h6v6 M10 14L21 3" size={16} />;
const ArrowUp = () => <Icon d="M18 15l-6-6-6 6" />;
const Download = () => <Icon d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3" />;
const MenuIcon = () => <Icon d="M3 12h18 M3 6h18 M3 18h18" />;
const XIcon = () => <Icon d="M18 6L6 18 M6 6l12 12" />;
const BrainIcon = () => <Icon d="M9.5 2A2.5 2.5 0 017 4.5v1A2.5 2.5 0 009.5 8h5A2.5 2.5 0 0017 5.5v-1A2.5 2.5 0 0014.5 2h-5z M7 8v1a4 4 0 004 4h2a4 4 0 004-4V8 M9 13v3 M15 13v3 M6 16h12" size={24} />;
const CodeIcon = () => <Icon d="M16 18l6-6-6-6 M8 6l-6 6 6 6" size={24} />;
const CloudIcon = () => <Icon d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" size={24} />;
const GlobeIcon = () => <Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" size={24} />;
const AwardIcon = () => <Icon d="M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12" size={24} />;
const SendIcon = () => <Icon d="M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z" />;

// ─── Neural Network Canvas ─────────────────────────────────────────────────
const NeuralCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(251,191,36,${(1 - dist / 130) * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251,191,36,0.55)";
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
};

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const skillGroups = [
  { label: "Programming Languages", Icon: CodeIcon, color: "#f59e0b", skills: ["Python", "JavaScript", "Node.js"] },
  { label: "AI / ML", Icon: BrainIcon, color: "#818cf8", skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "LLMs", "TensorFlow", "Keras", "OpenCV", "Hugging Face"] },
  { label: "Web Development", Icon: GlobeIcon, color: "#34d399", skills: ["HTML5", "CSS3", "React.js", "Django", "REST APIs"] },
  { label: "Cloud & Tools", Icon: CloudIcon, color: "#60a5fa", skills: ["AWS", "Git", "GitHub", "MySQL", "Power BI", "OpenAI API", "Gemini API", "Telegram Bot API"] },
];

const experiences = [
  {
    role: "Machine Learning Intern", company: "Indian Servers",
    period: "Jun 2023 – Jul 2023",
    bullets: [
      "Built an NLP-based Q&A chatbot using Python, Hugging Face Transformers, OpenAI API, and Telegram Bot API.",
      "Reduced manual query response time by 40%.",
      "Collaborated with stakeholders to deliver the solution end-to-end.",
    ],
  },
  {
    role: "Artificial Intelligence Intern", company: "AIMER Society",
    period: "Jan 2024 – Feb 2024",
    bullets: [
      "Trained AI models for computer vision, NLP, and medical image analysis.",
      "Improved model accuracy by 15% through iterative experimentation.",
      "Designed 5+ Power BI dashboards integrated with live AI insights.",
    ],
  },
];

const projects = [
  {
    title: "Crop Stress Detection",
    github: "https://github.com/VeerababuJaddu/Crop-Stress-Detection",
    tag: "Deep Learning",
    stack: ["Python", "TensorFlow", "Keras", "OpenCV", "Django"],
    color: "#34d399",
    desc: "CNN-based system for real-time crop disease detection deployed via Django, achieving a 20% improvement in prediction accuracy.",
    highlights: ["CNN architecture", "Real-time inference", "Django deployment", "+20% accuracy"],
  },
  {
    title: "Real-Time Traffic Sign Detection",
    tag: "Computer Vision",
    stack: ["Python", "YOLOv8", "OpenCV"],
    color: "#f59e0b",
    desc: "YOLOv8-powered model detecting and classifying 40+ traffic sign types with 92% accuracy in real-time video streams.",
    highlights: ["40+ sign classes", "92% accuracy", "Real-time video", "YOLOv8"],
  },
  {
    title: "Conversational Telegram Bot",
    tag: "NLP",
    stack: ["Python", "Gemini API", "Telegram Bot API"],
    color: "#818cf8",
    desc: "AI-powered chatbot leveraging Gemini API for natural conversation handling, automating 200+ user interactions.",
    highlights: ["Gemini AI core", "NLP dialogues", "200+ interactions", "Fully automated"],
  },
  {
    title: "Global Internet Usage Dashboard",
    tag: "Analytics",
    stack: ["Power BI"],
    color: "#60a5fa",
    desc: "Interactive analytics dashboard covering 50+ countries' internet usage trends, cutting stakeholder review time by 30%.",
    highlights: ["50+ countries", "Interactive filters", "Trend analysis", "-30% review time"],
  },
];

const certs = [
  { title: "Machine Learning Internship Certificate", issuer: "AIMER Society", color: "#818cf8" },
  { title: "Artificial Intelligence Internship Certificate", issuer: "Indian Servers", color: "#f59e0b" },
  { title: "Python Programming Certification", issuer: "AP-SSDC", color: "#34d399" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Portfolio() {
  // ↑ Entry point — imported by src/main.jsx
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [filter, setFilter] = useState("All");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 40); setShowTop(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const tags = ["All", ...new Set(projects.map(p => p.tag))];
  const filtered = filter === "All" ? projects : projects.filter(p => p.tag === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const navItems = ["About", "Skills", "Experience", "Projects", "Certifications", "Contact"];

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#0b0f1a", color: "#e2e8f0", overflowX: "hidden" }}>
      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: scrolled ? "blur(16px)" : "none", background: scrolled ? "rgba(11,15,26,0.88)" : "transparent", borderBottom: scrolled ? "1px solid rgba(251,191,36,0.12)" : "none", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(90deg,#f59e0b,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>JVB</span>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
            {navItems.map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 14, fontWeight: 500, letterSpacing: "0.03em", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fbbf24"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                {n}
              </button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(v => !v)} style={{ background: "none", border: "none", color: "#e2e8f0", cursor: "pointer", display: "none" }} className="mobile-menu-btn">
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "rgba(11,15,26,0.97)", borderTop: "1px solid rgba(251,191,36,0.1)", padding: "16px 24px 24px" }}>
            {navItems.map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 16, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {n}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #0b0f1a 0%, #111827 50%, #0f172a 100%)" }}>
        <NeuralCanvas />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(251,191,36,0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 999, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "inline-block" }} />
            <span style={{ fontSize: 13, color: "#fbbf24", fontWeight: 600, letterSpacing: "0.06em" }}>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.6rem,7vw,5rem)", fontWeight: 900, lineHeight: 1.07, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Jaddu<br />
            <span style={{ background: "linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fde68a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Veera Babu</span>
          </h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            {["AI & ML Engineer", "Python Developer", "Software Engineer"].map((t, i) => (
              <span key={i} style={{ fontSize: 14, fontWeight: 600, color: i === 0 ? "#fbbf24" : "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {i > 0 && <span style={{ marginRight: 12, color: "#334155" }}>·</span>}{t}
              </span>
            ))}
          </div>
          <p style={{ fontSize: "clamp(1rem,2.2vw,1.2rem)", color: "#94a3b8", maxWidth: 600, lineHeight: 1.75, marginBottom: 44 }}>
            AI & ML graduate with hands-on experience in Python, Machine Learning, NLP, Deep Learning, Computer Vision, and LLMs — building intelligent applications that solve real-world problems.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("projects")} style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", color: "#0b0f1a", border: "none", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 20px rgba(251,191,36,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 28px rgba(251,191,36,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 20px rgba(251,191,36,0.3)"; }}>
              View Projects
            </button>
            <a href="/resume.pdf" download="Jaddu_Veera_Babu_Resume.pdf" style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.15)", padding: "14px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: "pointer", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
              <Download /> Resume
            </a>
            <button onClick={() => scrollTo("contact")} style={{ background: "none", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.35)", padding: "14px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => e.target.style.background = "rgba(251,191,36,0.08)"}
              onMouseLeave={e => e.target.style.background = "none"}>
              Contact Me
            </button>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fbbf24"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}><GitHubIcon size={22} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fbbf24"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}><LinkedInIcon size={22} /></a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
          <button onClick={() => scrollTo("about")} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer" }}><ChevronDown /></button>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 24px", background: "#0d1120" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>About Me</SectionLabel>
            <h2 style={h2Style}>Passionate about <GoldText>Intelligent Systems</GoldText></h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 48, marginTop: 56, alignItems: "start" }}>
            <Reveal delay={100}>
              <p style={{ color: "#94a3b8", lineHeight: 1.85, fontSize: 16 }}>
                I'm an AI & Machine Learning engineer who loves turning complex data into intelligent, production-ready applications. My work spans Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, and Large Language Models.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.85, fontSize: 16, marginTop: 20 }}>
                I thrive at the intersection of research and engineering — taking state-of-the-art models and deploying them into real-world software that creates measurable impact.
              </p>
              <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <SocialBtn icon={<GitHubIcon size={18} />} label="GitHub" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <SocialBtn icon={<LinkedInIcon size={18} />} label="LinkedIn" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div style={glassCard}>
                <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fbbf24", marginBottom: 20, fontWeight: 700 }}>Education</p>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>B.Tech in AI & Machine Learning</h3>
                <p style={{ color: "#94a3b8", fontSize: 15 }}>Swarnandhra Institute of Engineering and Technology</p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div><p style={statLabel}>GPA</p><p style={statVal}>7.16</p></div>
                  <div><p style={statLabel}>Degree</p><p style={statVal}>B.Tech</p></div>
                  <div><p style={statLabel}>Field</p><p style={statVal}>AI & ML</p></div>
                </div>
              </div>
              <div style={{ ...glassCard, marginTop: 16, display: "flex", gap: 24, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <p style={statLabel}>Internships</p>
                  <p style={{ ...statVal, fontSize: 28 }}>2</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={statLabel}>Projects</p>
                  <p style={{ ...statVal, fontSize: 28 }}>4+</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={statLabel}>Skills</p>
                  <p style={{ ...statVal, fontSize: 28 }}>20+</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 24px", background: "#0b0f1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>Skills</SectionLabel>
            <h2 style={h2Style}>Technical <GoldText>Expertise</GoldText></h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, marginTop: 56 }}>
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 80}>
                <div style={{ ...glassCard, borderTop: `2px solid ${g.color}` }}>
                  <div style={{ color: g.color, marginBottom: 16 }}><g.Icon /></div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 20, letterSpacing: "0.03em" }}>{g.label}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {g.skills.map(s => (
                      <span key={s} style={{ fontSize: 12, fontWeight: 600, color: g.color, background: `${g.color}18`, border: `1px solid ${g.color}30`, borderRadius: 6, padding: "4px 10px" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "100px 24px", background: "#0d1120" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>Experience</SectionLabel>
            <h2 style={h2Style}>Internship <GoldText>Experience</GoldText></h2>
          </Reveal>
          <div style={{ position: "relative", marginTop: 56 }}>
            <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg,#f59e0b,rgba(251,191,36,0.1))" }} />
            {experiences.map((exp, i) => (
              <Reveal key={i} delay={i * 120}>
                <div style={{ display: "flex", gap: 32, marginBottom: 48, position: "relative" }}>
                  <div style={{ flexShrink: 0, width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#fbbf24)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#0b0f1a", fontSize: 15, zIndex: 1 }}>{i + 1}</div>
                  <div style={{ ...glassCard, flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                      <div>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9" }}>{exp.role}</h3>
                        <p style={{ color: "#fbbf24", fontWeight: 600, fontSize: 14 }}>{exp.company}</p>
                      </div>
                      <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{exp.period}</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} style={{ display: "flex", gap: 10, marginBottom: 10, color: "#94a3b8", fontSize: 14, lineHeight: 1.65 }}>
                          <span style={{ color: "#f59e0b", flexShrink: 0, marginTop: 3 }}>▸</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "100px 24px", background: "#0b0f1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>Projects</SectionLabel>
            <h2 style={h2Style}>Featured <GoldText>Work</GoldText></h2>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 36, marginBottom: 48 }}>
              {tags.map(t => (
                <button key={t} onClick={() => setFilter(t)} style={{ background: filter === t ? "linear-gradient(135deg,#f59e0b,#fbbf24)" : "rgba(255,255,255,0.05)", color: filter === t ? "#0b0f1a" : "#94a3b8", border: filter === t ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "8px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {filtered.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div style={{ ...glassCard, borderTop: `2px solid ${p.color}`, display: "flex", flexDirection: "column", height: "100%", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${p.color}25`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p.color, background: `${p.color}18`, borderRadius: 4, padding: "3px 8px" }}>{p.tag}</span>
                    {p.github && (
  <a
    href={p.github}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={Open ${p.title} on GitHub}
    style={{ color: p.color, display: "inline-flex", alignItems: "center" }}
  >
    <ExternalLink />
  </a>
)}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "16px 0" }}>
                    {p.highlights.map(h => (
                      <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#64748b", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "3px 8px" }}>{h}</span>
                    ))}
                  </div>
                  <div style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ fontSize: 11, fontWeight: 600, color: p.color, background: `${p.color}12`, borderRadius: 4, padding: "2px 7px" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" style={{ padding: "100px 24px", background: "#0d1120" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>Certifications</SectionLabel>
            <h2 style={h2Style}>Credentials & <GoldText>Recognition</GoldText></h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 24, marginTop: 56 }}>
            {certs.map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ ...glassCard, borderLeft: `3px solid ${c.color}`, display: "flex", gap: 16, alignItems: "flex-start", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}>
                  <div style={{ color: c.color, flexShrink: 0, marginTop: 2 }}><AwardIcon /></div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>{c.title}</h3>
                    <p style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{c.issuer}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 24px", background: "#0b0f1a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 style={h2Style}>Let's <GoldText>Connect</GoldText></h2>
            <p style={{ color: "#64748b", marginTop: 12, fontSize: 16 }}>Open to internships, full-time roles, and AI project collaborations.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 40, marginTop: 56 }}>
            <Reveal delay={100}>
              <div>
                <ContactItem icon={<EmailIcon />} label="Email" value="jadduveerababu333@gmail.com" href="mailto:jadduveerababu333@gmail.com" />
                <ContactItem icon={<PhoneIcon />} label="Phone" value="+91 7036620780" href="tel:+917036620780" />
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <a href="https://github.com" target="_blank" rel="noreferrer" style={socialBtnStyle("#24292e")}><GitHubIcon size={18} /><span>GitHub</span></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={socialBtnStyle("#0077b5")}><LinkedInIcon size={18} /><span>LinkedIn</span></a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[["name", "Your Name"], ["email", "Email Address"]].map(([k, pl]) => (
                  <input key={k} type={k === "email" ? "email" : "text"} placeholder={pl} required value={formData[k]}
                    onChange={e => setFormData(p => ({ ...p, [k]: e.target.value }))}
                    style={inputStyle} onFocus={e => e.target.style.borderColor = "#f59e0b"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                ))}
                <textarea placeholder="Your Message" required rows={4} value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "#f59e0b"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg,#f59e0b,#fbbf24)", color: "#0b0f1a", border: "none", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.9"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <SendIcon /> {formSent ? "Message Sent!" : "Send Message"}
                </button>
                {formSent && <p style={{ color: "#22c55e", textAlign: "center", fontSize: 14, fontWeight: 600 }}>✓ Thanks! I'll get back to you soon.</p>}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center", background: "#0b0f1a" }}>
        <p style={{ color: "#334155", fontSize: 14 }}>© 2026 <span style={{ color: "#fbbf24", fontWeight: 600 }}>Jaddu Veera Babu</span> · AI & Machine Learning Engineer</p>
      </footer>

      {/* ── BACK TO TOP ── */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ position: "fixed", bottom: 28, right: 28, width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#fbbf24)", border: "none", color: "#0b0f1a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(251,191,36,0.35)", zIndex: 200, transition: "transform 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = ""}>
          <ArrowUp />
        </button>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const GoldText = ({ children }) => (
  <span style={{ background: "linear-gradient(90deg,#f59e0b,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{children}</span>
);
const SectionLabel = ({ children }) => (
  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f59e0b", marginBottom: 12 }}>{children}</p>
);
const h2Style = { fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 };
const glassCard = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28, backdropFilter: "blur(8px)" };
const statLabel = { fontSize: 11, color: "#475569", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" };
const statVal = { fontSize: 22, fontWeight: 800, color: "#fbbf24", margin: 0 };
const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "13px 16px", color: "#e2e8f0", fontSize: 14, outline: "none", transition: "border-color 0.2s", fontFamily: "inherit" };
const socialBtnStyle = (bg) => ({ display: "inline-flex", alignItems: "center", gap: 8, background: bg, color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer", textDecoration: "none" });

const SocialBtn = ({ icon, label }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
    {icon}{label}
  </span>
);

const ContactItem = ({ icon, label, value, href }) => (
  <a href={href} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", color: "inherit", transition: "color 0.2s" }}
    onMouseEnter={e => e.currentTarget.style.color = "#fbbf24"} onMouseLeave={e => e.currentTarget.style.color = "inherit"}>
    <span style={{ color: "#f59e0b" }}>{icon}</span>
    <div>
      <p style={{ fontSize: 11, color: "#475569", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 2px" }}>{label}</p>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{value}</p>
    </div>
  </a>
);
