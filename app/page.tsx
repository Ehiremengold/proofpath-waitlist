"use client";

import { useState, useRef, useEffect } from "react";

// ─── Colour tokens (100% blue — no amber/yellow anywhere) ───────────────────
const C = {
  primary:      "#6366f1",   // indigo-500
  primaryHover: "#4f46e5",   // indigo-600
  primaryLight: "#818cf8",   // indigo-400
  primaryDim:   "rgba(99,102,241,0.15)",
  primaryBorder:"rgba(99,102,241,0.22)",
  blue:         "#93c5fd",   // blue-300 accent
  white:        "#ffffff",
  text:         "#e2e8f0",   // slate-200
  textMuted:    "#94a3b8",   // slate-400
  textDim:      "#64748b",   // slate-500
  textFaint:    "#475569",   // slate-600
  border:       "rgba(255,255,255,0.07)",
  borderHover:  "rgba(99,102,241,0.22)",
  glass:        "rgba(255,255,255,0.04)",
  glassMid:     "rgba(255,255,255,0.06)",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: "01", tag: "For job seekers",
    title: "Solve real problems",
    desc: "Browse challenges across marketing, sales, ops, tech and more. Pick what you're good at and solve it.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    step: "02", tag: "Automatic",
    title: "Portfolio builds itself",
    desc: "Every problem you solve is logged, categorised, and added to your living portfolio — no manual updates.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    step: "03", tag: "One-click apply",
    title: "Apply in seconds",
    desc: "See a role you want? One click sends your entire track record to the recruiter. No CV. No cover letter.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    step: "04", tag: "For recruiters",
    title: "See proof, not paper",
    desc: "Review applications in minutes. See what candidates have actually done — no inbox chaos, no CV stacks.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
];

const PAIN_POINTS = [
  { label: "Sending CVs into the void",           emoji: "📄" },
  { label: "Rewriting LinkedIn every 6 months",   emoji: "🔄" },
  { label: "'Entry-level' needing 5 yrs XP",      emoji: "🚪" },
  { label: "Ghosted after 3 interview rounds",    emoji: "👻" },
  { label: "Real skills invisible on paper",      emoji: "🙈" },
  { label: "Interviews ≠ actual job skills",       emoji: "🎭" },
];

const OLD_WAY = [
  "Write a CV. Update it constantly.",
  "Keyword-stuff your LinkedIn",
  "Apply to 200 jobs, hear from 2",
  "Explain experience in every interview",
  "Recruiters sift through 500 emails",
];

const NEW_WAY = [
  "Solve problems. Portfolio builds itself.",
  "Your work history IS your profile",
  "Apply once. Let your proof do the talking.",
  "Show, don't tell — every time",
  "Recruiters see proof in seconds, not days",
];

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 32 }: { size?: number }) {
  const s = size * 0.5;
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.3, background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={s} height={s} fill="none" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ─── Waitlist form ────────────────────────────────────────────────────────────
function WaitlistForm() {
  const [email, setEmail]       = useState("");
  const [role, setRole]         = useState<"seeker" | "recruiter" | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) { setError("Please pick your role first."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass animate-fade-up opacity-0" style={{ animationFillMode: "forwards", borderRadius: 20, padding: "2rem", textAlign: "center", maxWidth: 400, margin: "0 auto" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p style={{ fontWeight: 700, fontSize: "1.1rem", color: C.white, marginBottom: "0.5rem" }}>You&apos;re on the list!</p>
        <p style={{ fontSize: "0.875rem", color: C.textMuted, lineHeight: 1.6 }}>We&apos;ll reach out as soon as we're live. Your proof is coming, sit tight.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
      {/* Role toggle */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14 }}>
        {(["seeker", "recruiter"] as const).map((r) => (
          <button
            key={r} type="button" onClick={() => { setRole(r); setError(""); }}
            style={{
              padding: "8px 20px", borderRadius: 999, fontSize: "0.85rem", cursor: "pointer",
              fontWeight: role === r ? 600 : 400, transition: "all 0.2s ease",
              background: role === r ? C.primary : C.glass,
              color: role === r ? C.white : C.textMuted,
              border: role === r ? "none" : `1px solid ${C.border}`,
            }}
          >
            {r === "seeker" ? "I'm a job seeker" : "I'm a recruiter"}
          </button>
        ))}
      </div>

      {/* Email row — stacks on mobile */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="input-glow"
          style={{
            width: "100%", padding: "14px 18px", borderRadius: 14, fontSize: "0.95rem",
            background: C.glass, border: `1px solid ${C.border}`,
            color: C.white, outline: "none",
          }}
        />
        <button
          type="submit" disabled={loading}
          className="btn-primary"
          style={{
            width: "100%", padding: "14px", borderRadius: 14, fontSize: "0.95rem",
            fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading
            ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Joining…
              </span>
            : "Get Early Access →"
          }
        </button>
      </div>

      {error && (
        <p style={{ fontSize: "0.8rem", color: "#f87171", marginTop: 8, textAlign: "center" }}>{error}</p>
      )}
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [count, setCount] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    let cur = 0; const target = 847;
    const id = setInterval(() => {
      cur += target / (1800 / 16);
      if (cur >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <main className="noise-bg" style={{ minHeight: "100vh", overflowX: "hidden", position: "relative", fontFamily: "var(--font-work-sans),'Work Sans',sans-serif" }}>

      {/* Orbs */}
      <div className="orb" style={{ width: 600, height: 600, top: -180, left: -160, background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }}/>
      <div className="orb" style={{ width: 480, height: 480, top: "35%", right: -120, background: "radial-gradient(circle, rgba(147,197,253,0.12) 0%, transparent 70%)" }}/>
      <div className="orb" style={{ width: 420, height: 420, bottom: -80, left: "28%", background: "radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 70%)" }}/>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Nav ── */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={32}/>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: C.white }}>ProofPath</span>
          </div>
          <button onClick={scrollToForm} className="btn-primary" style={{ padding: "10px 20px", borderRadius: 999, fontSize: "0.85rem", fontWeight: 600 }}>
            Join Waitlist
          </button>
        </nav>

        {/* ── Hero ── */}
        <section style={{ paddingTop: "clamp(40px,8vw,80px)", paddingBottom: "clamp(60px,10vw,100px)", textAlign: "center" }}>

          {/* Badge */}
          <div className="glass animate-fade-up opacity-0" style={{ animationFillMode: "forwards", display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "7px 16px", marginBottom: 32 }}>
            <span className="animate-pulse-glow" style={{ width: 7, height: 7, borderRadius: "50%", background: C.primaryLight, display: "inline-block" }}/>
            <span style={{ fontSize: "0.78rem", fontWeight: 500, color: C.textMuted }}>Early access — limited spots</span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up opacity-0 delay-100"
            style={{ animationFillMode: "forwards", fontWeight: 800, fontSize: "clamp(2.4rem,7vw,5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 24 }}
          >
            Your work should<br/>
            <span className="gradient-text">speak for itself.</span>
          </h1>

          {/* Sub */}
          <p
            className="animate-fade-up opacity-0 delay-200"
            style={{ animationFillMode: "forwards", fontSize: "clamp(1rem,2.5vw,1.2rem)", color: C.textDim, maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.7 }}
          >
            Solve real problems across marketing, sales, ops &amp; tech. Portfolio builds automatically. Apply to jobs in one click — no CV, no LinkedIn.
          </p>

          {/* Form */}
          <div ref={formRef} className="animate-fade-up opacity-0 delay-300" style={{ animationFillMode: "forwards" }}>
            <WaitlistForm/>
            <p style={{ fontSize: "0.78rem", color: C.textFaint, marginTop: 12 }}>
              No spam, ever. &nbsp;
              <span style={{ color: C.textDim }}>{count.toLocaleString()} people already waiting.</span>
            </p>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-up opacity-0 delay-400"
            style={{ animationFillMode: "forwards", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 56 }}
          >
            {[
              { val: "1-click", lbl: "to apply" },
              { val: "0",       lbl: "CVs needed" },
              { val: "∞",       lbl: "problems to solve" },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="glass" style={{ borderRadius: 16, padding: "16px 28px", textAlign: "center", minWidth: 110 }}>
                <div className="gradient-text" style={{ fontWeight: 800, fontSize: "1.4rem" }}>{val}</div>
                <div style={{ fontSize: "0.75rem", color: C.textFaint, marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Problem ── */}
        <section style={{ padding: "80px 0", borderTop: `1px solid ${C.border}` }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: C.primaryLight, marginBottom: 12 }}>The problem</p>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(1.7rem,4vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Hiring is broken.<br/>
              <span style={{ color: C.textDim }}>Everyone knows it.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,220px),1fr))", gap: 12, maxWidth: 780, margin: "0 auto" }}>
            {PAIN_POINTS.map(({ label, emoji }) => (
              <div key={label} className="glass glass-hover" style={{ borderRadius: 18, padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 12, transition: "all 0.25s" }}>
                <span style={{ fontSize: "1.3rem", lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{emoji}</span>
                <span style={{ fontSize: "0.875rem", color: C.textDim, lineHeight: 1.5 }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tweet card ── */}
        <section style={{ padding: "20px 0 80px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div className="glass" style={{ borderRadius: 24, padding: "clamp(24px,5vw,40px)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, opacity: 0.04 }}/>
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div className="glass" style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.primaryLight, flexShrink: 0 }}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.845L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem", color: C.white }}>The tweet that started it all</p>
                    <p style={{ fontSize: "0.78rem", color: C.textFaint }}>The frustration is real</p>
                  </div>
                </div>
                <blockquote style={{ fontSize: "clamp(0.9rem,2.5vw,1.05rem)", color: C.text, lineHeight: 1.7, fontStyle: "italic", borderLeft: `2px solid ${C.primaryBorder}`, paddingLeft: 20, margin: 0 }}>
                  &ldquo;What if instead of a CV, you just showed what you&apos;ve actually done? Real problems. Real solutions. That&apos;s the interview.&rdquo;
                </blockquote>
                <p style={{ marginTop: 20, fontSize: "0.9rem", color: C.textDim }}>
                  We read that tweet and thought: <span style={{ color: C.text, fontWeight: 500 }}>let&apos;s just build it.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={{ padding: "80px 0", borderTop: `1px solid ${C.border}` }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: C.primaryLight, marginBottom: 12 }}>How it works</p>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(1.7rem,4vw,2.4rem)", letterSpacing: "-0.02em" }}>Simple by design.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ maxWidth: 1100, margin: "0 auto" }}>
            {HOW_IT_WORKS.map(({ step, tag, title, desc, icon }) => (
              <div key={step} className="glass glass-hover" style={{ borderRadius: 24, padding: "28px 26px", transition: "all 0.25s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: C.primaryDim, color: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {icon}
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.12)", letterSpacing: "0.05em" }}>{step}</span>
                </div>
                <span style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 600, color: C.primaryLight, background: C.primaryDim, padding: "4px 12px", borderRadius: 999, marginBottom: 12 }}>{tag}</span>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: C.white, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: "0.875rem", color: C.textDim, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── vs ── */}
        <section style={{ padding: "80px 0", borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: C.primaryLight, marginBottom: 12 }}>ProofPath vs. the old way</p>
              <h2 style={{ fontWeight: 700, fontSize: "clamp(1.7rem,4vw,2.4rem)", letterSpacing: "-0.02em" }}>No more paper trails.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,320px),1fr))", gap: 14 }}>
              {/* old */}
              <div className="glass" style={{ borderRadius: 24, padding: "28px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.textFaint }}/>
                  <span style={{ fontWeight: 600, fontSize: "0.875rem", color: C.textDim }}>The old way</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {OLD_WAY.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.875rem", color: C.textFaint }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2, color: "rgba(255,255,255,0.15)" }}>
                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* new */}
              <div style={{ borderRadius: 24, padding: "28px 26px", background: `linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(129,140,248,0.06) 100%)`, border: `1px solid ${C.primaryBorder}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.primaryLight }}/>
                  <span style={{ fontWeight: 600, fontSize: "0.875rem", color: C.primaryLight }}>ProofPath</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {NEW_WAY.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.875rem", color: C.text }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2, color: C.primaryLight }}>
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding: "clamp(60px,10vw,100px) 0", textAlign: "center" }}>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem,6vw,3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            Ready to let your<br/>
            <span className="gradient-text">work speak?</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: C.textDim, marginBottom: 40 }}>
            Join the waitlist. Be first in when we open the doors.
          </p>
          <WaitlistForm/>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 0 36px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size={26}/>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: C.white }}>ProofPath</span>
          </div>
          <p style={{ fontSize: "0.78rem", color: C.textFaint }}>© {year} ProofPath. All rights reserved.</p>
          <p style={{ fontSize: "0.78rem", color: C.textFaint }}>Built for the ones who actually do the work.</p>
        </footer>

      </div>
    </main>
  );
}
