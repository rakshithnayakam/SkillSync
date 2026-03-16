import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Animated floating orbs ────────────────────────────────────────────────
const Orb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-30 ${className}`} />
);

// ── Navbar ────────────────────────────────────────────────────────────────
const Navbar = ({ onLogin, onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-white font-black text-sm">S</span>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            SkillSync
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Skills", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLogin}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Login
          </button>
          <button
            onClick={onGetStarted}
            className="px-4 py-2 text-sm font-semibold text-primary rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-lg shadow-emerald-500/25"
          >
            Get Started →
          </button>
        </div>
      </div>
    </nav>
  );
};

// ── Skill Tag ─────────────────────────────────────────────────────────────
const SkillTag = ({ name, color }) => (
  <span
    className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${color}`}
  >
    {name}
  </span>
);

// ── Feature Card ──────────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, glow }) => (
  <div
    className={`group relative p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden`}
  >
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${glow}`}
    />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ── Step ──────────────────────────────────────────────────────────────────
const Step = ({ number, title, desc }) => (
  <div className="flex gap-4 group">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
      {number}
    </div>
    <div className="pt-1">
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ── Stat ──────────────────────────────────────────────────────────────────
const Stat = ({ value, label }) => (
  <div className="text-center p-6 rounded-2xl bg-gray-900 border border-white/5">
    <p className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">
      {value}
    </p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────
const LandingPage = () => {
  const navigate = useNavigate();
  const loggedIn = Boolean(localStorage.getItem("accessToken"));
  const handleGetStarted = () => navigate(loggedIn ? "/dashboard" : "/signup");
  const handleLogin = () => navigate("/login");

  const skills = [
    {
      name: "JavaScript",
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
    {
      name: "Python",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    { name: "React", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
    {
      name: "Node.js",
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      name: "UI/UX Design",
      color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    },
    {
      name: "Machine Learning",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
    { name: "Docker", color: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
    {
      name: "MongoDB",
      color: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    {
      name: "Flutter",
      color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    },
    {
      name: "AWS",
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    },
    {
      name: "Figma",
      color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    },
    {
      name: "TypeScript",
      color: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    },
    { name: "Rust", color: "bg-red-500/10 text-red-400 border-red-500/20" },
    { name: "Go", color: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar onLogin={handleLogin} onGetStarted={handleGetStarted} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background orbs */}
        <Orb className="w-[600px] h-[600px] bg-emerald-500 -top-40 -left-40 animate-pulse" />
        <Orb
          className="w-[500px] h-[500px] bg-cyan-500 bottom-0 right-0 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <Orb className="w-96 h-96 bg-teal-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Peer-to-Peer Skill Exchange Platform
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] mb-6 tracking-tight">
            Learn by{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Teaching.
            </span>
            <br />
            Teach by{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Learning.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            SkillSync connects people who have the skills you want — and want
            the skills you have. Exchange knowledge, earn tokens, and grow
            together.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={handleGetStarted}
              className="group px-8 py-4 text-primary font-bold rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-2xl shadow-emerald-500/25 text-lg flex items-center gap-2"
            >
              Start Exchanging Skills
              <span className="group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-4 text-white font-bold rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white dark:bg-gray-800/5 transition-all text-lg backdrop-blur-sm"
            >
              Sign In
            </button>
          </div>

          {/* Skill tags */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {skills.map((skill) => (
              <SkillTag key={skill.name} {...skill} />
            ))}
          </div>
        </div>

        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="83+" label="Skills Available" />
          <Stat value="JWT" label="Secure Auth" />
          <Stat value="100%" label="Free to Use" />
          <Stat value="∞" label="Knowledge" />
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              grow your skills
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A complete platform for skill exchange, session management, and
            learning progress tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard
            icon="🎯"
            title="Smart Matchmaking"
            desc="Our algorithm matches you with users who want what you offer and offer what you want. Perfect skill exchanges, every time."
            glow="bg-gradient-to-br from-emerald-500/5 to-transparent"
          />
          <FeatureCard
            icon="📅"
            title="Session Scheduling"
            desc="Schedule 1-on-1 learning sessions, track their status, and manage your teaching calendar seamlessly."
            glow="bg-gradient-to-br from-cyan-500/5 to-transparent"
          />
          <FeatureCard
            icon="🪙"
            title="Token Economy"
            desc="Earn tokens by teaching skills, spend them to learn. A fair exchange system that rewards knowledge sharing."
            glow="bg-gradient-to-br from-yellow-500/5 to-transparent"
          />
          <FeatureCard
            icon="🏆"
            title="Badges & XP"
            desc="Level up as you learn and teach. Earn badges, gain XP, and showcase your expertise on your profile."
            glow="bg-gradient-to-br from-purple-500/5 to-transparent"
          />
          <FeatureCard
            icon="🔐"
            title="Secure Auth"
            desc="JWT-based auth with refresh tokens, email verification, and password reset. Your account is always safe."
            glow="bg-gradient-to-br from-red-500/5 to-transparent"
          />
          <FeatureCard
            icon="⭐"
            title="Feedback & Ratings"
            desc="Rate your sessions, leave feedback for mentors, and build your reputation as a trusted teacher."
            glow="bg-gradient-to-br from-orange-500/5 to-transparent"
          />
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Process
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400">Get started in minutes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Step
                number="1"
                title="Create Your Profile"
                desc="Sign up and tell us what skills you can teach and what you want to learn."
              />
              <Step
                number="2"
                title="Get Matched"
                desc="Our smart algorithm finds users whose skills perfectly complement yours."
              />
              <Step
                number="3"
                title="Send a Request"
                desc="Reach out to your matches and propose a skill exchange session."
              />
              <Step
                number="4"
                title="Learn & Earn"
                desc="Complete sessions, earn tokens, gain XP, and level up your profile."
              />
            </div>

            {/* Demo card */}
            <div className="bg-gray-900 rounded-3xl border border-white/5 p-8 shadow-2xl">
              <p className="text-xs text-muted uppercase tracking-widest mb-6 font-medium">
                Live Match Example
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold flex items-center justify-center text-sm">
                    M
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">Ben</p>
                    <p className="text-xs text-gray-400 truncate">
                      Teaches: Node.js • Wants: Python
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-semibold border border-emerald-500/20 flex-shrink-0">
                    95%
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <div className="w-8 h-px bg-gray-700" />
                    <span className="text-emerald-400 font-semibold">
                      Perfect Match ✨
                    </span>
                    <div className="w-8 h-px bg-gray-700" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold flex items-center justify-center text-sm">
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">Aisha</p>
                    <p className="text-xs text-gray-400 truncate">
                      Teaches: Python • Wants: Node.js
                    </p>
                  </div>
                  <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full font-semibold border border-cyan-500/20 flex-shrink-0">
                    95%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-gray-800 rounded-xl text-center">
                  <p className="text-lg font-black text-emerald-400">+50</p>
                  <p className="text-xs text-muted">XP each</p>
                </div>
                <div className="p-3 bg-gray-800 rounded-xl text-center">
                  <p className="text-lg font-black text-cyan-400">🪙 10</p>
                  <p className="text-xs text-muted">Tokens</p>
                </div>
                <div className="p-3 bg-gray-800 rounded-xl text-center">
                  <p className="text-lg font-black text-yellow-400">⭐ +1</p>
                  <p className="text-xs text-muted">Badge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS SECTION ───────────────────────────────────────────────── */}
      <section id="skills" className="py-24 max-w-5xl mx-auto px-6 text-center">
        <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-3">
          Skills
        </p>
        <h2 className="text-4xl font-black text-white mb-4">
          83+ Skills to Exchange
        </h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          From programming to design, from soft skills to AI — find what you
          need and share what you know.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {skills.map((skill) => (
            <SkillTag key={skill.name} {...skill} />
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden p-16 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.15) 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Orb className="w-64 h-64 bg-emerald-500 top-0 right-0" />
          <Orb className="w-48 h-48 bg-cyan-500 bottom-0 left-0" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Ready to start your
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                skill exchange journey?
              </span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join SkillSync today. It's completely free.
            </p>
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 text-primary font-bold rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-2xl shadow-emerald-500/25 text-lg"
            >
              Get Started for Free →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-black text-xs">S</span>
            </div>
            <span className="font-bold text-gray-300">SkillSync</span>
          </div>
          <p className="text-sm text-muted">
            Built with ❤️ using React, Node.js, Express & MongoDB
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <a href="/login" className="hover:text-white transition">
              Login
            </a>
            <a href="/signup" className="hover:text-white transition">
              Sign Up
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
