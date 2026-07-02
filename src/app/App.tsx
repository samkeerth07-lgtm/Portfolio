import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, Download, ExternalLink, ChevronDown, Menu, X, Award, Code2, Palette, Wrench, MessageSquare, Globe } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import swiggyPreview from "@/imports/WhatsApp_Image_2026-06-23_at_9.57.29_PM.jpeg";
const resumeLink = "https://drive.google.com/file/d/1YeT-mZEvll0JWtQDG1qml10sspTqeYFy/view?usp=drivesdk";

const NAV_LINKS = ["About", "Projects", "Skills", "Certifications", "Contact"];

const PROJECTS = [
  {
    title: "EVENTLY",
    subtitle: "Event Registration & Management App",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#009B4D",
    icon: "📅",
    description:
      "A comprehensive web-based platform streamlining event organization and attendee registration, with an intuitive UI focused on minimizing user friction during sign-ups.",
    highlights: ["End-to-end event management flow", "Frictionless attendee registration UX"],
    demo: "https://eeventlyy.netlify.app/auth.html",
  },
  {
    title: "Swiggy UI/UX Redesign",
    subtitle: "Product Design Case Study",
    tags: ["UI/UX Design", "Figma"],
    color: "#FFCC00",
    icon: "🎨",
    description:
      "A modern UX redesign of the popular delivery application incorporating accessibility standards and an innovative engagement-focused feature to improve user retention.",
    highlights: ["Accessibility-first design system", "Reduced conversion drop-offs"],
    demo: "swiggy-preview",
  },
  {
    title: "Internship Credibility Verifier",
    subtitle: "Security Web Application",
    tags: ["Web App Development"],
    color: "#009B4D",
    icon: "🔐",
    description:
      "A security-oriented web app evaluating internship postings to help students identify genuine vs. fraudulent opportunities, improving digital safety awareness.",
    highlights: ["Fraudulent posting detection", "Career-search reliability for students"],
    demo: "https://internship-verifierzip--saisamkeerthred.replit.app",
  },
];

const SKILLS = [
  {
    category: "Programming Languages",
    icon: <Code2 size={20} />,
    items: ["Python", "Java", "C", "HTML", "CSS", "JavaScript"],
  },
  {
    category: "Design & Development",
    icon: <Palette size={20} />,
    items: ["UI/UX Design", "Web App Development", "Mobile App Development", "Figma"],
  },
  {
    category: "Tools & Productivity",
    icon: <Wrench size={20} />,
    items: ["Git", "Microsoft Word", "Excel", "PowerPoint"],
  },
  {
    category: "Soft Skills",
    icon: <MessageSquare size={20} />,
    items: ["Active Collaboration", "Leadership", "Agile Problem Solving", "Adaptive Learning"],
  },
  {
    category: "Languages",
    icon: <Globe size={20} />,
    items: ["Telugu (Native)", "English (Professional)", "Hindi (Conversational)"],
  },
];

const CERTS = [
  { title: "Agentic AI Hands-on Learning Path", issuer: "IBM Skills Network" },
  { title: "Generative AI Certification", issuer: "IBM" },
  { title: "GenAI Powered Data Analytics Job Simulation", issuer: "Tata Group (Forage)" },
  { title: "Introduction to Subagents", issuer: "Anthropic Claude" },
];

function useScrollSpy() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120;
      for (const id of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(id.toLowerCase());
        if (el && el.offsetTop <= scrollY) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-primary opacity-70">{children}</span>
      <div className="flex-1 h-px bg-primary opacity-20" />
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [swiggyOpen, setSwiggyOpen] = useState(false);
  const [imgZoomed, setImgZoomed] = useState(false);
  const active = useScrollSpy();

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Scrollbar hide */}
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #009B4D44; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #009B4D99; }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold text-lg tracking-tight text-primary hover:opacity-80 transition-opacity"
          >
            SSR
          </button>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === link
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link}
              </button>
            ))}
            <a
              href="mailto:samkeerth07@gmail.com"
              className="ml-3 px-4 py-1.5 rounded-full text-sm font-semibold bg-accent text-accent-foreground hover:brightness-105 transition-all duration-200"
            >
              Hire Me
            </a>
          </div>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-secondary transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#009B4D 1px, transparent 1px), linear-gradient(90deg, #009B4D 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Accent blob */}
        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #009B4D, transparent)" }}
        />
        <div
          className="absolute bottom-1/3 left-0 w-72 h-72 rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #FFCC00, transparent)" }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-8 border"
              style={{ borderColor: "#009B4D44", color: "#009B4D", background: "#e8f5ee" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </div>

            <h1
              className="font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#1a2e1a" }}
            >
              Murikinati Sai<br />
              <span style={{ color: "#009B4D" }}>Samkeerth Reddy</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
              AI & Data Science student building intelligent systems and human-centered interfaces. Turning complex problems into elegant, accessible solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:samkeerth07@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "#FFCC00", color: "#1a2e1a" }}
              >
                <Mail size={16} />
                Get in Touch
              </a>
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download size={16} />
                View Resume
              </a>
              <a
                href="https://linkedin.com/in/sai-samkeerth-reddy-2ab76b270"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200 hover:scale-[1.02]"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Stats card */}
          <div className="hidden md:grid grid-cols-1 gap-3 w-52">
            {[
              { value: "8.4", label: "CGPA", unit: "/10" },
              { value: "3", label: "Projects", unit: "+" },
              { value: "4", label: "Certifications", unit: "" },
            ].map(({ value, label, unit }) => (
              <div
                key={label}
                className="bg-card border border-border rounded-2xl p-5 text-center shadow-sm"
              >
                <div className="font-extrabold text-3xl" style={{ color: "#009B4D" }}>
                  {value}<span className="text-lg font-semibold text-muted-foreground">{unit}</span>
                </div>
                <div className="text-xs font-medium text-muted-foreground mt-1 tracking-wide uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollTo("About")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>About Me</SectionLabel>
          </FadeIn>
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
                Building the future with{" "}
                <span style={{ color: "#009B4D" }}>AI & thoughtful design</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-5">
                <p className="text-base leading-relaxed text-muted-foreground">
                  I'm a second-year B.Tech student in Artificial Intelligence & Data Science at Vasireddy Venkatadri Institute of Technology, Andhra Pradesh — maintaining a CGPA of 8.4/10 while actively building real-world applications.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  My work sits at the intersection of AI, web development, and UX design. I'm drawn to problems involving trust, misinformation, and digital safety — and I bring both technical and design thinking to every project.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Outside of code, I participated in the Adobe India Hackathon 2026, completing Round 1 with its MCQ and Coding Challenge — demonstrating adaptability under competitive constraints.
                </p>
                <div className="pt-4 border-t border-border grid grid-cols-3 gap-4">
                  {[
                    { label: "Location", value: "Andhra Pradesh, India" },
                    { label: "Degree", value: "B.Tech AI & DS" },
                    { label: "Graduating", value: "2028" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
                      <div className="text-sm font-semibold text-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Projects</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-14">
              Things I've built
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.1}>
                <div
                  className={`group bg-card border border-border rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${project.demo ? "cursor-pointer" : "cursor-default"}`}
                  onClick={() => {
                    if (project.demo === "swiggy-preview") setSwiggyOpen(true);
                    else if (project.demo) window.open(project.demo, "_blank", "noopener,noreferrer");
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = project.color + "66")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: project.color + "18" }}
                    >
                      {project.icon}
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                    />
                  </div>

                  <h3 className="font-bold text-xl text-foreground mb-1">{project.title}</h3>
                  <p className="text-xs font-medium text-muted-foreground mb-4 font-mono">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{project.description}</p>

                  <div className="space-y-2 mb-6">
                    {project.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-foreground/80">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: project.color + "18", color: project.color === "#FFCC00" ? "#8a6d00" : project.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Skills</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-14">
              My toolkit
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((skill, i) => (
              <FadeIn key={skill.category} delay={i * 0.08}>
                <div className="bg-background border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary">
                      {skill.icon}
                    </div>
                    <span className="font-semibold text-sm text-foreground">{skill.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-150 cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Certifications</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-14">
              Credentials
            </h2>
          </FadeIn>

          {/* Hackathon highlight */}
          <FadeIn delay={0.05}>
            <div
              className="rounded-3xl p-8 mb-8 flex flex-col md:flex-row md:items-center gap-6"
              style={{ background: "linear-gradient(135deg, #009B4D12, #FFCC0012)", border: "1px solid #009B4D22" }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "#FFCC0022" }}>
                🏆
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-foreground">Adobe India Hackathon 2026</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#009B4D18", color: "#009B4D" }}>
                    Completed
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Successfully completed Round 1 — Online MCQ Assessment & Coding Challenge. Demonstrated algorithmic problem-solving and technical adaptability under competitive constraints.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {CERTS.map((cert, i) => (
              <FadeIn key={cert.title} delay={0.1 + i * 0.07}>
                <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 transition-colors duration-200 group">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground leading-tight">{cert.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 font-mono">{cert.issuer}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28" style={{ background: "#009B4D" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-8 border border-white/20 text-white/70">
              Let's work together
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              Open to opportunities
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-12">
              Whether it's an internship, collaboration, or just a chat about AI — my inbox is always open.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a
                href="mailto:samkeerth07@gmail.com"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: "#FFCC00", color: "#1a2e1a" }}
              >
                <Mail size={18} />
                samkeerth07@gmail.com
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <a
                href="https://linkedin.com/in/sai-samkeerth-reddy-2ab76b270"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
              >
                <Linkedin size={16} />
                LinkedIn Profile
              </a>
              <span className="text-white/20">·</span>
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
              >
                <Download size={16} />
                View Resume
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SWIGGY LIGHTBOX */}
      {swiggyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
          onClick={() => setSwiggyOpen(false)}
        >
          <div
            className="relative w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{ maxWidth: "900px", maxHeight: "92vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-card border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "#FFCC0022" }}>🎨</div>
                <div>
                  <h3 className="font-bold text-base text-foreground">Swiggy UI/UX Redesign</h3>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">Product Design Case Study · Figma</p>
                </div>
              </div>
              <button
                onClick={() => setSwiggyOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body — scrollable */}
            <div className="overflow-y-auto bg-card flex-1">
              {/* Image */}
              <div
                className="bg-secondary/30 flex items-center justify-center p-4 cursor-zoom-in"
                onClick={() => setImgZoomed(true)}
                title="Click to zoom"
              >
                <div className="relative group">
                  <ImageWithFallback
                    src={swiggyPreview}
                    alt="Swiggy Native feature UI/UX concept — hyperlocal food discovery interface"
                    className="max-h-72 w-auto object-contain rounded-2xl shadow-md transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(0,0,0,0.25)" }}>
                    <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">🔍 Click to zoom</span>
                  </div>
                </div>
              </div>

              {/* Concept writeup */}
              <div className="px-8 py-8 space-y-7">
                {/* Concept title */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3" style={{ background: "#FFCC0022", color: "#8a6d00" }}>
                    🚀 Concept Feature
                  </div>
                  <h4 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">
                    "Native" — Hyperlocal Food Discovery
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    What if food delivery apps could help people experience the <em>true taste of a locality</em> instead of just ordering random food? Native is a feature concept integrated into Swiggy's bottom navigation bar that transforms the app from an ordering platform into a local cultural food discovery experience.
                  </p>
                </div>

                {/* Core idea */}
                <div className="rounded-2xl p-5 border" style={{ background: "#009B4D08", borderColor: "#009B4D22" }}>
                  <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary mb-3">The Idea</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    When a user visits a new area, the app automatically surfaces hyperlocal recommendations — specific to that locality, not just the city or state.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      { icon: "🍛", text: "Most loved local dishes" },
                      { icon: "⭐", text: "Top-rated authentic restaurants" },
                      { icon: "📊", text: "Region-specific specialties based on orders & ratings" },
                      { icon: "❤️", text: "Hidden gems loved by locals" },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <span className="text-base leading-tight">{icon}</span>
                        <span className="leading-snug">{text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: "#009B4D20" }}>
                    <p className="text-xs font-mono text-muted-foreground">
                      📍 Example: <span className="text-foreground font-medium">Jubilee Hills</span> → Paradise Biryani, Pista House Haleem, Irani Chai…
                    </p>
                  </div>
                </div>

                {/* Additional features */}
                <div>
                  <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary mb-4">Additional Features</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { num: "01", icon: "🗺️", title: "Food Passport", desc: "Track dishes tried across different cities & regions." },
                      { num: "02", icon: "🔊", title: "Audio Pronunciation", desc: "Helps tourists pronounce local dish names correctly." },
                      { num: "03", icon: "📖", title: "Story Mode", desc: "Discover the cultural history behind famous dishes." },
                      { num: "04", icon: "🎉", title: "Festival Specials", desc: "Special local dishes shown during regional festivals." },
                    ].map(({ num, icon, title, desc }) => (
                      <div key={title} className="flex gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors duration-200">
                        <div className="text-xl flex-shrink-0">{icon}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">{num}</span>
                            <span className="font-semibold text-sm text-foreground">{title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Design principles */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {["User-first UX", "Hyperlocal Recommendations", "Cultural Storytelling", "Discovery-focused Interface"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: "#FFCC0022", color: "#8a6d00" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* IMAGE ZOOM OVERLAY */}
      {imgZoomed && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center cursor-zoom-out"
          style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(10px)" }}
          onClick={() => setImgZoomed(false)}
        >
          <button
            onClick={() => setImgZoomed(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>
          <ImageWithFallback
            src={swiggyPreview}
            alt="Swiggy Native feature UI/UX concept — full view"
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-6 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground font-mono">© 2024 Murikinati Sai Samkeerth Reddy</span>
          <span className="text-xs text-muted-foreground">B.Tech AI & Data Science · VVIT Andhra Pradesh</span>
        </div>
      </footer>
    </div>
  );
}
