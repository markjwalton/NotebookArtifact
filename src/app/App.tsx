import { useState, useEffect, useRef } from "react";
import { SturijNotebook } from "./components/SturijNotebook";

// ── COLOUR TOKENS ──────────────────────────────────────────────────────────────
const C = {
  sage: "#4a5d4e",
  sageL: "#6b9970",
  sagePale: "#1a241b",
  gold: "#d4a574",
  goldD: "#8a6644",
  white: "#f0ede6",
  whiteD: "#9fa89f",
  bg: "#111614",
  bg2: "#171d18",
  bg3: "#1e2620",
  border: "#2a352b",
  coral: "#e07555",
  green: "#72b87a",
};

// ── SHARED STYLES ──────────────────────────────────────────────────────────────
const s = {
  sectionEyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    color: C.gold,
    marginBottom: 16,
  } as React.CSSProperties,
  sectionH2: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(28px,4vw,44px)",
    color: C.white,
    lineHeight: 1.15,
    marginBottom: 20,
  } as React.CSSProperties,
  bodyText: {
    color: C.whiteD,
    fontSize: 16,
    lineHeight: 1.7,
    marginBottom: 16,
  } as React.CSSProperties,
};

// ── GOLD RULE ──────────────────────────────────────────────────────────────────
function GoldRule() {
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${C.goldD}, transparent)`,
        margin: "0 40px",
      }}
    />
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((sec) => {
        const el = sec as HTMLElement;
        if (window.scrollY >= el.offsetTop - 100) current = el.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#problem", label: "The problem" },
    { href: "#pipeline", label: "The pipeline" },
    { href: "#economics", label: "The numbers" },
    { href: "#built", label: "What's built" },
    { href: "#ai-ops", label: "Mission Control" },
    { href: "#founder", label: "About us" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(17,22,20,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: 60,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: C.white,
        }}
      >
        sturij{" "}
        <span style={{ color: C.gold, fontStyle: "italic" }}>TradeAI</span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 32 }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              color:
                activeSection === l.href.slice(1) ? C.white : C.whiteD,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.15s",
            }}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#register"
        style={{
          background: C.sage,
          color: "white",
          border: "none",
          padding: "8px 20px",
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: "inherit",
          textDecoration: "none",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = C.sageL)
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = C.sage)
        }
      >
        Register interest
      </a>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 80,
        paddingBottom: 60,
        maxWidth: "none",
        background: `radial-gradient(ellipse at 60% 40%, rgba(74,93,78,0.15) 0%, transparent 60%)`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 40px",
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: C.gold,
            marginBottom: 24,
          }}
        >
          TradeAI by Sturij &nbsp;·&nbsp; Now recruiting founding joiners
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(42px,6vw,80px)",
            lineHeight: 1.05,
            color: C.white,
            marginBottom: 28,
            margin: "0 0 28px",
          }}
        >
          The nationals charge £8,000.
          <br />
          <em style={{ color: C.gold, fontStyle: "italic" }}>
            You can deliver better
          </em>
          <br />
          for £1,500.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 20,
            color: C.whiteD,
            maxWidth: 640,
            marginBottom: 48,
            lineHeight: 1.6,
          }}
        >
          TradeAI gives independent joiners the design tools, buying power, and
          manufacturing network to compete with any national company. Free to
          use. No catch.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
          <a
            href="#register"
            style={{
              background: C.sage,
              color: "white",
              border: "none",
              padding: "14px 32px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              textDecoration: "none",
              transition: "all 0.15s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = C.sageL;
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = C.sage;
              el.style.transform = "";
            }}
          >
            Register your interest
          </a>
          <a
            href="#how"
            style={{
              background: "transparent",
              color: C.white,
              border: `1px solid ${C.border}`,
              padding: "14px 32px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              textDecoration: "none",
              transition: "all 0.15s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = C.sageL;
              el.style.color = C.sageL;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = C.border;
              el.style.color = C.white;
            }}
          >
            See how it works
          </a>
        </div>

        {/* Trust bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
            paddingTop: 32,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          {[
            {
              score: "4.9",
              stars: "★★★★★",
              label: "97 reviews\non Trustpilot",
            },
            null,
            {
              score: "£1,500",
              label: "total delivered cost\n3m fitted wardrobe",
            },
            null,
            {
              score: "£3,500+",
              label: "what your customer\nhappily pays",
            },
            null,
            {
              score: "Free",
              label: "platform access\nno subscription",
            },
          ].map((item, i) =>
            item === null ? (
              <div
                key={i}
                style={{
                  width: 1,
                  height: 40,
                  background: C.border,
                }}
              />
            ) : (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      color: C.white,
                    }}
                  >
                    {item.score}
                  </div>
                  {item.stars && (
                    <div
                      style={{
                        color: C.gold,
                        fontSize: 16,
                        letterSpacing: 2,
                      }}
                    >
                      {item.stars}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: C.whiteD,
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.label}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ── PROBLEM ───────────────────────────────────────────────────────────────────
function Problem() {
  const issues = [
    "No professional customer-facing design tools",
    "No instant quoting — days or weeks to respond",
    "No buying power — paying retail on materials",
    "No workshop — manufacturing eats your time",
    "No consumer finance to offer customers",
    "No business automation — admin kills evenings",
    "No brand presence to compete online",
    "No support when things go wrong on site",
  ];

  return (
    <section
      id="problem"
      style={{
        padding: "100px 40px",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "start",
        }}
      >
        {/* Left */}
        <div>
          <div style={s.sectionEyebrow}>The problem</div>
          <h2 style={s.sectionH2}>
            You have the skill.
            <br />
            They have the{" "}
            <em style={{ color: C.gold, fontStyle: "italic" }}>
              infrastructure.
            </em>
          </h2>
          <p style={s.bodyText}>
            The nationals spend millions on showrooms, software, and marketing.
            Not because their product is better — it isn't. But because you
            don't have the tools to show a customer what you can do, quote it
            instantly, and deliver it seamlessly.
          </p>
          <p style={s.bodyText}>
            So they win jobs they don't deserve. And you undercharge for jobs
            you've already earned.
          </p>
        </div>

        {/* Right — problem card */}
        <div
          style={{
            background: C.bg3,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 28,
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: C.coral,
              marginBottom: 12,
            }}
          >
            What holds independent joiners back
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {issues.map((item, i) => (
              <li
                key={i}
                style={{
                  color: C.whiteD,
                  fontSize: 14,
                  padding: "8px 0",
                  borderBottom:
                    i < issues.length - 1 ? `1px solid ${C.border}` : "none",
                  display: "flex",
                  gap: 10,
                }}
              >
                <span style={{ color: C.coral, flexShrink: 0 }}>✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: "01",
      numColor: "rgba(74,93,78,0.3)",
      topColor: C.sage,
      title: "Your customer designs it in a conversation",
      body: "They tell the AI their room, their style, their colours. The AI guides them through every choice. They see a render of the finished wardrobe. You get a complete specification, a floor plan, and a quote. No site visit needed to start.",
    },
    {
      num: "02",
      numColor: "rgba(212,165,116,0.3)",
      topColor: C.gold,
      title: "Deposit paid. Materials ordered. Workshop scheduled.",
      body: "When your customer pays a deposit, TradeAI orders materials automatically — at buying group prices, better than your trade account. They arrive next day. Our workshop cuts and prepares everything to a precision cut file. You collect a crate.",
    },
    {
      num: "03",
      numColor: "rgba(107,153,112,0.3)",
      topColor: C.sageL,
      title: "You install. One day. Premium result.",
      body: "Everything arrives ready to assemble. Panels cut to ±1mm. Edge banded. Hardware included. One day on site. Your customer gets a premium bespoke product. You earn more than you would charging twice as long for a basic job.",
    },
  ];

  return (
    <section
      id="how"
      style={{
        background: C.bg2,
        maxWidth: "none",
        padding: "100px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}
      >
        <div style={{ ...s.sectionEyebrow, textAlign: "center" }}>
          How TradeAI works
        </div>
        <h2
          style={{
            ...s.sectionH2,
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          Quote it. Build it.
          <br />
          <em style={{ color: C.gold, fontStyle: "italic" }}>
            Install it. Get paid.
          </em>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 24,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: C.bg3,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 28,
                borderTop: `3px solid ${step.topColor}`,
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  color: step.numColor,
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: C.white,
                  marginBottom: 10,
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: C.whiteD, lineHeight: 1.6 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FEATURES GRID ─────────────────────────────────────────────────────────────
function Features() {
  const items = [
    {
      icon: "◈",
      title: "AI wardrobe configurator",
      body: "Chat-based design tool your customers use themselves. Any dimension, any finish, any colour. Produces a specification and render automatically.",
    },
    {
      icon: "◉",
      title: "Buying group materials",
      body: "Access to trade materials at volume discount prices. Frequently better than your existing trade account — after our margin.",
    },
    {
      icon: "⊞",
      title: "Workshop manufacture",
      body: "CNC-precise panels, edge banded, hardware included. Flat-rate £800 per job. Ready to collect next day. No workshop needed.",
    },
    {
      icon: "◎",
      title: "Instant quoting",
      body: "Quote generated from the specification automatically. Customer sees the price during the design conversation. No back and forth.",
    },
    {
      icon: "⊡",
      title: "Consumer finance",
      body: "Offer your customers monthly payment options. Powered by Ideal4Finance. You get paid immediately. They get what they want.",
    },
    {
      icon: "◐",
      title: "Business automation",
      body: "Quotes, invoices, scheduling, tax returns. Xero integrated. The system handles the admin that kills your evenings and weekends.",
    },
    {
      icon: "◑",
      title: "AI playground",
      body: "Customer sends a photo of a wardrobe they love. AI deconstructs it into a specification you can manufacture. Any inspiration, any source.",
    },
    {
      icon: "◫",
      title: "Parametric furniture",
      body: "Bedside tables, drawer units, occasional furniture — all parametrically sized. Manufactured from offcuts at near-zero materials cost.",
    },
  ];

  return (
    <section
      id="features"
      style={{
        padding: "100px 40px",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={s.sectionEyebrow}>The platform</div>
      <h2 style={{ ...s.sectionH2, marginBottom: 40 }}>
        Everything you need.
        <br />
        <em style={{ color: C.gold, fontStyle: "italic" }}>
          Nothing you don't.
        </em>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 16,
        }}
      >
        {items.map((item) => (
          <div
            key={item.title}
            style={{
              background: C.bg3,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: 24,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: C.sagePale,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                marginBottom: 14,
                border: `1px solid ${C.border}`,
                color: C.sageL,
              }}
            >
              {item.icon}
            </div>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: C.white,
                marginBottom: 8,
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: 13, color: C.whiteD, lineHeight: 1.5 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── PIPELINE ──────────────────────────────────────────────────────────────────
function Pipeline() {
  const steps = [
    {
      num: "1",
      gold: false,
      title: "Room Survey Tool",
      body: "Browser-based floorplan capture: walls, doors, windows, radiators, electrical points, measurements.",
      impact: "→ Eliminates return site visits",
    },
    {
      num: "2",
      gold: false,
      title: "Wardrobe Configurator",
      body: "Room dimensions + customer preferences → construction rulebook → 4 synchronised views: plan, elevation, 3D, panel schedule.",
      impact: "→ Quote in 10 minutes vs. 24 hours",
    },
    {
      num: "3",
      gold: true,
      title: "AI Image Generation",
      body: "Photorealistic lifestyle renders from configurator output. Customer sees their wardrobe in their room before committing.",
      impact: "→ Marketing-quality visuals at point of sale",
    },
    {
      num: "4",
      gold: false,
      title: "Nesting Engine",
      body: "2D guillotine bin-packing with grain constraints. Board optimisation. Offcut tracking.",
      impact: "→ Target: 0% material waste",
    },
    {
      num: "5",
      gold: false,
      title: "G-code Generator",
      body: "Direct CNC machine output from panel schedule. Verified against real production files.",
      impact: "→ Design-to-machine in one pipeline",
    },
    {
      num: "6",
      gold: true,
      title: "Manufacturing Intelligence",
      body: "Panel damage logging, offcut QR tracking, pre-job risk scoring, continuous improvement dashboard.",
      impact: "→ Every cut logged. Data compounds. Waste eliminated.",
    },
  ];

  const targets = [
    { val: "< 10 min", label: "Pre-sale design time\n(from 24+ hours)" },
    { val: "70%+", label: "Quote conversion rate\n(from ~50%)" },
    { val: "< 2%", label: "Material waste rate\n(from untracked)" },
    { val: "3×", label: "Quotes per week\n(from 3–4 to 10–12)" },
  ];

  return (
    <section
      id="pipeline"
      style={{
        background: C.bg2,
        maxWidth: "none",
        padding: "100px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}
      >
        <div style={{ ...s.sectionEyebrow, textAlign: "center" }}>
          The intelligence pipeline
        </div>
        <h2
          style={{
            ...s.sectionH2,
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          Room survey to{" "}
          <em style={{ color: C.gold, fontStyle: "italic" }}>
            machine output.
          </em>
          <br />
          One pipeline. One data source.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
          }}
        >
          {/* Left — pipeline steps */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              position: "relative",
            }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 20,
                top: 36,
                bottom: 36,
                width: 2,
                background: `linear-gradient(to bottom, ${C.sage}, ${C.gold}, ${C.sageL})`,
              }}
            />
            {steps.map((step) => (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "flex-start",
                  position: "relative",
                  padding: "16px 0",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    zIndex: 1,
                    background: C.bg3,
                    border: `2px solid ${step.gold ? C.gold : C.sage}`,
                    color: step.gold ? C.gold : C.sageL,
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: C.white,
                      marginBottom: 4,
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      color: C.whiteD,
                      lineHeight: 1.5,
                    }}
                  >
                    {step.body}
                  </p>
                  <div
                    style={{
                      fontSize: 12,
                      color: C.sageL,
                      fontWeight: 500,
                      marginTop: 4,
                    }}
                  >
                    {step.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — pull quote + stats */}
          <div>
            <div
              style={{
                borderLeft: `4px solid ${C.gold}`,
                padding: "24px 32px",
                background: C.bg3,
                borderRadius: "0 12px 12px 0",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(18px,2.5vw,26px)",
                  color: C.white,
                  lineHeight: 1.4,
                  fontStyle: "italic",
                }}
              >
                "Not a configurator. Not a CNC plugin. A complete manufacturing
                intelligence platform that connects every stage of the workflow."
              </p>
            </div>
            <p style={{ ...s.bodyText, marginTop: 32 }}>
              Every view — plan, elevation, 3D, panel schedule — renders from
              the same data object. Change the input once, all four views update.
              One source of truth from room survey to machine output.
            </p>
            <p style={s.bodyText}>
              100+ curated Egger decors with Lawcris trade pricing. 220+
              seamless tileable textures. 228 complementary decor pairings from
              Egger's own recommendation data. All codified into the platform.
            </p>

            {/* 12-month targets */}
            <div
              style={{
                marginTop: 32,
                padding: 20,
                background: C.bg3,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: C.gold,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                12-Month targets
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {targets.map((t) => (
                  <div key={t.val}>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: C.white,
                      }}
                    >
                      {t.val}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: C.whiteD,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {t.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MOAT ──────────────────────────────────────────────────────────────────────
function Moat() {
  const cards = [
    {
      title: "The Data Flywheel",
      body: "Every board cut is training data. Every damaged panel is a data point. Every offcut tracked is waste measured. The manufacturing intelligence layer gets smarter with every job. After 6 months, the system predicts panel movement risk before the machine runs. No competitor has this dataset because no competitor is collecting it.",
    },
    {
      title: "The Material Library",
      body: "100+ curated Egger decors with Lawcris trade pricing. 220+ seamless tileable textures. 228 complementary decor pairings from Egger's own recommendation data. This is codified material intelligence that takes years to build and cannot be replicated by plugging in a catalogue.",
    },
    {
      title: "The Construction Rulebook",
      body: "20+ years of fitted furniture knowledge encoded as deterministic manufacturing rules — not approximations. Every dimension, tolerance, and assembly constraint matches what gets cut on the CNC. This is IP that no software vendor has because no software vendor has built fitted furniture.",
    },
  ];

  return (
    <section
      id="moat"
      style={{
        padding: "100px 40px",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ ...s.sectionEyebrow, textAlign: "center" }}>
        Why this can't be copied
      </div>
      <h2
        style={{
          ...s.sectionH2,
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        Three advantages that{" "}
        <em style={{ color: C.gold, fontStyle: "italic" }}>
          compound over time.
        </em>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: C.bg3,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 28,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${C.sage}, ${C.gold})`,
              }}
            />
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: C.gold,
                marginBottom: 10,
              }}
            >
              {card.title}
            </h3>
            <p style={{ fontSize: 14, color: C.whiteD, lineHeight: 1.6 }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── ECONOMICS ─────────────────────────────────────────────────────────────────
function Economics() {
  const rows = [
    {
      item: "Materials (3m wardrobe)",
      without: "£600 (trade account)",
      with: "Under £550 (buying group)",
      withStyle: { color: C.green, fontWeight: 600 },
    },
    {
      item: "Manufacture / cutting",
      without: "1-2 days of your time",
      with: "£800 flat — your time freed",
      withStyle: { color: C.gold, fontWeight: 600 },
    },
    {
      item: "Installation",
      without: "1 day",
      with: "1 day",
      withStyle: {},
    },
    {
      item: "Total cost to you",
      without: "£600 + 2-3 days labour",
      with: "Under £1,500 total",
      withStyle: { color: C.gold, fontWeight: 600 },
    },
    {
      item: "Realistic customer price",
      without: "£2,500–£3,000",
      with: "£3,000–£4,500",
      withStyle: { color: C.green, fontWeight: 600 },
    },
  ];

  return (
    <section
      id="economics"
      style={{
        background: C.bg2,
        maxWidth: "none",
        padding: "100px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}
      >
        <div style={s.sectionEyebrow}>The numbers</div>
        <h2 style={{ ...s.sectionH2, marginBottom: 16 }}>
          The economics that{" "}
          <em style={{ color: C.gold, fontStyle: "italic" }}>
            change your business
          </em>
        </h2>
        <p style={{ ...s.bodyText, maxWidth: 600, marginBottom: 40 }}>
          A single wardrobe job. What it costs. What you charge. What you keep.
          Compared to doing it alone — and compared to what the nationals charge.
        </p>

        {/* Pull quote */}
        <div
          style={{
            borderLeft: `4px solid ${C.gold}`,
            padding: "24px 32px",
            margin: "40px 0",
            background: C.bg3,
            borderRadius: "0 12px 12px 0",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(18px,2.5vw,26px)",
              color: C.white,
              lineHeight: 1.4,
              fontStyle: "italic",
            }}
          >
            "A premium bespoke wardrobe. Quoted in a conversation. Manufactured
            overnight. Ready to install tomorrow. Under £1,500 all in. You sell
            it for £3,500. The nationals charge £8,000 for less."
          </p>
        </div>

        {/* Table */}
        <table
          style={{ width: "100%", borderCollapse: "collapse", marginTop: 32 }}
        >
          <thead>
            <tr>
              {["Item", "Without TradeAI", "With TradeAI"].map((h) => (
                <th
                  key={h}
                  style={{
                    background: C.bg3,
                    color: C.whiteD,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    padding: "12px 16px",
                    textAlign: "left",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: `1px solid ${C.border}`,
                    fontSize: 14,
                    color: C.white,
                    fontWeight: 500,
                  }}
                >
                  {row.item}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: `1px solid ${C.border}`,
                    fontSize: 14,
                    color: C.whiteD,
                  }}
                >
                  {row.without}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: `1px solid ${C.border}`,
                    fontSize: 14,
                    color: C.whiteD,
                    ...row.withStyle,
                  }}
                >
                  {row.with}
                </td>
              </tr>
            ))}
            <tr>
              <td
                style={{
                  padding: "14px 16px",
                  fontSize: 14,
                  color: C.white,
                  fontWeight: 500,
                }}
              >
                Nationals charge
              </td>
              <td
                colSpan={2}
                style={{
                  padding: "14px 16px",
                  fontSize: 14,
                  color: C.coral,
                  fontWeight: 600,
                }}
              >
                £5,000–£8,000. For a lesser product.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ── SOCIAL PROOF ──────────────────────────────────────────────────────────────
function SocialProof() {
  const reviews = [
    {
      text: '"We are thrilled with our new wardrobes and cabinets. The colour and build are perfect. Will worked like a machine — a fantastic job completed on time. Would not hesitate to recommend."',
      author: "Tynegirl",
      source: "Verified Trustpilot review · March 2026",
    },
    {
      text: '"An overall great experience, from Will coming out several times to design exactly what we wanted, to Dave who came to build it all and make our dream become a reality. Nothing is too much for the Sturij team."',
      author: "Sue Weatherdon",
      source: "Verified Trustpilot review · October 2025",
    },
    {
      text: '"Really pleased with the job Dave did for us, transforming a room with basic wooden shelving into proper storage. It was a fiddly job and the result is fantastic. Quality craftsmanship throughout."',
      author: "Gillian",
      source: "Verified Trustpilot review · November 2025",
    },
  ];

  return (
    <section
      id="reviews"
      style={{
        padding: "100px 40px",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={s.sectionEyebrow}>Social proof</div>
      <h2 style={{ ...s.sectionH2, marginBottom: 8 }}>
        4.9 stars. 97 reviews.
        <br />
        <em style={{ color: C.gold, fontStyle: "italic" }}>
          Real customers. Real results.
        </em>
      </h2>
      <p style={{ ...s.bodyText, marginBottom: 40 }}>
        Every process and tool in TradeAI has been built inside a real furniture
        business — not from a product manager's imagination. These are our
        customers.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: 16,
        }}
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            style={{
              background: C.bg3,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: 20,
            }}
          >
            <div
              style={{ color: C.gold, fontSize: 14, marginBottom: 10 }}
            >
              ★★★★★
            </div>
            <p
              style={{
                fontSize: 14,
                color: C.whiteD,
                lineHeight: 1.6,
                marginBottom: 12,
                fontStyle: "italic",
              }}
            >
              {r.text}
            </p>
            <div style={{ fontSize: 12, color: C.white, fontWeight: 500 }}>
              {r.author}
            </div>
            <div style={{ fontSize: 11, color: C.whiteD }}>{r.source}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <a
          href="https://www.trustpilot.com/review/sturij.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: C.gold, fontSize: 14, textDecoration: "none" }}
        >
          Read all 97 reviews on Trustpilot →
        </a>
      </div>
    </section>
  );
}

// ── WHAT'S BUILT ──────────────────────────────────────────────────────────────
function WhatBuilt() {
  const items = [
    { status: "done", label: "Construction rulebook", detail: "all 5 section types" },
    { status: "done", label: "Panel generation", detail: "deterministic, tested" },
    { status: "done", label: "Bin-packing nesting", detail: "grain constraints" },
    { status: "done", label: "Material library", detail: "100+ Egger decors" },
    { status: "done", label: "4 synchronised views", detail: "plan, elevation, 3D, schedule" },
    { status: "done", label: "AI image generation", detail: "prompt pipeline" },
    { status: "done", label: "3D texture mapping", detail: "real Egger textures" },
    { status: "done", label: "Production time calc", detail: "board-by-board" },
    { status: "done", label: "CNC post-processor", detail: "Fanuc gcode confirmed" },
    { status: "done", label: "Fittings catalogue", detail: "Blum hardware + pricing" },
    { status: "ready", label: "G-code generator", detail: "specified, ready to build" },
    { status: "ready", label: "Egger product DB", detail: "429 products, schema ready" },
  ];

  const dotColor: Record<string, string> = {
    done: C.green,
    ready: C.gold,
    planned: C.whiteD,
  };

  return (
    <section
      id="built"
      style={{
        background: C.bg2,
        maxWidth: "none",
        padding: "100px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}
      >
        <div style={{ ...s.sectionEyebrow, textAlign: "center" }}>
          Not a concept
        </div>
        <h2
          style={{ ...s.sectionH2, textAlign: "center", marginBottom: 16 }}
        >
          This is built.{" "}
          <em style={{ color: C.gold, fontStyle: "italic" }}>
            This is real.
          </em>
        </h2>
        <p
          style={{
            ...s.bodyText,
            textAlign: "center",
            maxWidth: 600,
            margin: "0 auto 40px",
          }}
        >
          The core engine is complete and producing verified output. Every green
          dot below is working in production today.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: 12,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: C.bg3,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                fontSize: 13,
                color: C.whiteD,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: dotColor[item.status],
                  boxShadow:
                    item.status === "done"
                      ? `0 0 6px rgba(114,184,122,0.4)`
                      : item.status === "ready"
                      ? `0 0 6px rgba(212,165,116,0.4)`
                      : "none",
                }}
              />
              <span style={{ color: C.white, fontWeight: 500 }}>
                {item.label}
              </span>{" "}
              — {item.detail}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WORKSHOP TOOLS ────────────────────────────────────────────────────────────
function WorkshopTools() {
  const tools = [
    {
      num: "Tool 01",
      title: "Nesting Visualiser",
      body: "See the board layout before you cut. Every panel labelled, cut sequence numbered, grain direction marked. After cutting, compare planned vs actual.",
      detail: "Board outline to scale · Part labels · Cut sequence · Grain arrows",
    },
    {
      num: "Tool 02",
      title: "Damage Logger",
      body: "Panel moved or damaged? Three taps: tap the panel, select the type, select severity. No forms. No typing. Optionally snap a photo. The system spots patterns over time.",
      detail: "3 seconds to log · Predicts risk after 6 months of data",
    },
    {
      num: "Tool 03",
      title: "Offcut Scanner",
      body: "Every usable offcut gets a QR code. Scan to see dimensions, material, status. When a new job can use an existing offcut, the system flags it. Walk-and-scan audits.",
      detail: "QR tracking · Available / Reserved / Used / Disposed",
    },
  ];

  return (
    <section
      id="workshop"
      style={{
        padding: "100px 40px",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ ...s.sectionEyebrow, textAlign: "center" }}>
        Workshop intelligence
      </div>
      <h2
        style={{ ...s.sectionH2, textAlign: "center", marginBottom: 16 }}
      >
        Three tools.{" "}
        <em style={{ color: C.gold, fontStyle: "italic" }}>
          Built for the machine.
        </em>
      </h2>
      <p
        style={{
          ...s.bodyText,
          textAlign: "center",
          maxWidth: 600,
          margin: "0 auto 48px",
        }}
      >
        Big tap targets, no typing, works on your phone. Nothing replaces your
        skill — these give you better information and learn from what happens.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
        }}
      >
        {tools.map((tool) => (
          <div
            key={tool.num}
            style={{
              background: C.bg3,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 28,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: C.sageL,
                marginBottom: 12,
              }}
            >
              {tool.num}
            </div>
            <h3
              style={{
                fontSize: 17,
                fontWeight: 600,
                color: C.white,
                marginBottom: 10,
              }}
            >
              {tool.title}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: C.whiteD,
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              {tool.body}
            </p>
            <div
              style={{
                fontSize: 12,
                color: C.gold,
                fontWeight: 500,
                paddingTop: 12,
                borderTop: `1px solid ${C.border}`,
              }}
            >
              {tool.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FOUNDER ───────────────────────────────────────────────────────────────────
function Founder() {
  const stats = [
    { num: "£7.1M", label: "Previous agency exit\nsold to Unrvld" },
    { num: "25+", label: "Years building\ndigital businesses" },
    { num: "4.9★", label: "Trustpilot score\n97 verified reviews" },
    { num: "£0", label: "Workshop debt.\nBuilt the right way." },
  ];

  const creds = [
    "Delete Agency — founded, built, sold to Unrvld for £7.1M",
    "ByteMinds — digital marketing, 25+ years",
    "Harrogate apartment development — 8 units, conservation area, complex planning",
    "Sturij — founded 2020, debt-free, 4.9 stars, 97 reviews",
    "TradeAI — AI platform for the independent joinery trade",
  ];

  return (
    <section
      id="founder"
      style={{
        background: C.bg2,
        maxWidth: "none",
        padding: "100px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}
      >
        <div style={s.sectionEyebrow}>Who we are</div>
        <h2 style={{ ...s.sectionH2, marginBottom: 40 }}>
          Built from the inside of a{" "}
          <em style={{ color: C.gold, fontStyle: "italic" }}>
            real furniture business.
          </em>
        </h2>

        <div
          style={{
            background: C.bg3,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: 48,
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Stats */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 40,
                    color: C.gold,
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: C.whiteD,
                    marginTop: 4,
                    whiteSpace: "pre-line",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div>
            <p style={s.bodyText}>
              The founder of Sturij spent twenty-five years building Delete
              Agency — one of the UK's most respected independent digital
              businesses — and sold it for £7.1 million. Before that: financial
              services. Between that: a property development in Harrogate,
              working on site for a year, fitting every wardrobe and kitchen
              personally.
            </p>
            <p style={s.bodyText}>
              That combination — commercial discipline, digital experience,
              hands-on trade knowledge — is exactly why TradeAI is different. It
              wasn't designed by a product manager who's never held a panel saw.
              It was built by someone who has been on both sides of the problem:
              as a customer paying national prices and wondering why, and as a
              manufacturer knowing exactly what it actually costs.
            </p>
            <p style={s.bodyText}>
              One million pounds of personal capital invested. A debt-free
              workshop. A team of four including three qualified joiners. Four
              years of learning. TradeAI is the result.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}
            >
              {creds.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 14,
                    color: C.whiteD,
                  }}
                >
                  <span style={{ color: C.gold, flexShrink: 0, marginTop: 2 }}>
                    →
                  </span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── AI OPERATIONS ─────────────────────────────────────────────────────────────
function AIOperations() {
  const items = [
    {
      icon: "◉",
      title: "Agent health monitoring",
      body: "Which agents are running, their status, error rates, current tasks. Green/amber/red at a glance. Automatic pause on failures.",
    },
    {
      icon: "◈",
      title: "LLM cost tracking",
      body: "Token usage per agent, per model, per day. Budget gauges with threshold alerts. Route cheap tasks to cheap models automatically.",
    },
    {
      icon: "⊞",
      title: "Code & deployment",
      body: "Active branches, open PRs, build status, test results, deployment state. All from GitHub and Vercel APIs in real time.",
    },
    {
      icon: "◎",
      title: "Autonomous workflows",
      body: "Morning briefings at 7:30am. Enquiry auto-capture from Gmail. Deposit alerts from Xero. Weekly conformance audits. No prompting required.",
    },
    {
      icon: "◐",
      title: "Multi-model routing",
      body: "Haiku for chat. Sonnet for coding. Opus for architecture. Qwen 3 locally for private data. Gemini for images. Right model, right task, right cost.",
    },
    {
      icon: "◑",
      title: "Knowledge health",
      body: "Document freshness monitoring. Coverage gap analysis. Decision log growth. Memory file health. The knowledge base stays current automatically.",
    },
  ];

  return (
    <section
      id="ai-ops"
      style={{
        padding: "100px 40px",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ ...s.sectionEyebrow, textAlign: "center" }}>
        AI operations
      </div>
      <h2
        style={{ ...s.sectionH2, textAlign: "center", marginBottom: 16 }}
      >
        Mission Control.{" "}
        <em style={{ color: C.gold, fontStyle: "italic" }}>
          The all-seeing eye.
        </em>
      </h2>
      <p
        style={{
          ...s.bodyText,
          textAlign: "center",
          maxWidth: 640,
          margin: "0 auto 48px",
        }}
      >
        A live operations dashboard that monitors agents, costs, code, customers,
        and manufacturing. It acts without you prompting it.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 16,
        }}
      >
        {items.map((item) => (
          <div
            key={item.title}
            style={{
              background: C.bg3,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: 24,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: C.sagePale,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                marginBottom: 14,
                border: `1px solid ${C.border}`,
                color: C.sageL,
              }}
            >
              {item.icon}
            </div>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: C.white,
                marginBottom: 8,
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: 13, color: C.whiteD, lineHeight: 1.5 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  const steps = [
    {
      num: "01",
      numColor: "rgba(74,93,78,0.3)",
      topColor: C.sage,
      title: "Foundation skills",
      body: "Memory architecture, agent guardrails, cost monitoring. The bedrock that makes everything else work. Install day one.",
    },
    {
      num: "02",
      numColor: "rgba(212,165,116,0.3)",
      topColor: C.gold,
      title: "Engineering skills",
      body: "Senior architect, senior frontend, code reviewer, security auditor, QA engineer. Production-grade expertise as executable instructions.",
    },
    {
      num: "03",
      numColor: "rgba(107,153,112,0.3)",
      topColor: C.sageL,
      title: "Business skills",
      body: "Investment advisor, SaaS metrics coach, financial analyst. Plus custom personas: manufacturing engineer, investor relations, startup CTO.",
    },
  ];

  return (
    <section
      id="skills"
      style={{
        background: C.bg2,
        maxWidth: "none",
        padding: "100px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}
      >
        <div style={{ ...s.sectionEyebrow, textAlign: "center" }}>
          Skills ecosystem
        </div>
        <h2
          style={{ ...s.sectionH2, textAlign: "center", marginBottom: 48 }}
        >
          220+ production skills.{" "}
          <em style={{ color: C.gold, fontStyle: "italic" }}>
            Curated for Sturij.
          </em>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 24,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: C.bg3,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 28,
                borderTop: `3px solid ${step.topColor}`,
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  color: step.numColor,
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: C.white,
                  marginBottom: 10,
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: C.whiteD, lineHeight: 1.6 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div
          style={{
            borderLeft: `4px solid ${C.gold}`,
            padding: "24px 32px",
            marginTop: 40,
            background: C.bg3,
            borderRadius: "0 12px 12px 0",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(18px,2.5vw,26px)",
              color: C.white,
              lineHeight: 1.4,
              fontStyle: "italic",
            }}
          >
            "Skills are executable standards. They're the checks and balances
            missing when agents self-configure. Not code — not documentation —
            executable instructions."
          </p>
        </div>
      </div>
    </section>
  );
}

// ── REGISTER FORM ─────────────────────────────────────────────────────────────
function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    business: "",
    location: "",
    jobs: "",
    workshop: "",
    message: "",
  });

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: C.bg3,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: "11px 14px",
    fontSize: 14,
    color: C.white,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: C.whiteD,
    marginBottom: 7,
    letterSpacing: 0.3,
  };

  return (
    <section
      id="register"
      style={{
        background: `linear-gradient(135deg, rgba(74,93,78,0.15) 0%, transparent 50%)`,
        borderTop: `1px solid ${C.border}`,
        padding: "100px 40px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          background: C.bg2,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: 48,
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 32,
            color: C.white,
            marginBottom: 8,
          }}
        >
          Register your interest
        </h2>
        <p style={{ fontSize: 15, color: C.whiteD, marginBottom: 36 }}>
          We are launching TradeAI to a founding cohort of joiners in Yorkshire
          and the North of England. Register now to be considered for early
          access and the best terms we will ever offer.
        </p>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {/* Name row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div>
                <label style={labelStyle}>First name</label>
                <input
                  type="text"
                  placeholder="John"
                  required
                  style={inputStyle}
                  value={form.fname}
                  onChange={(e) =>
                    setForm({ ...form, fname: e.target.value })
                  }
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = C.sageL)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = C.border)
                  }
                />
              </div>
              <div>
                <label style={labelStyle}>Last name</label>
                <input
                  type="text"
                  placeholder="Smith"
                  required
                  style={inputStyle}
                  value={form.lname}
                  onChange={(e) =>
                    setForm({ ...form, lname: e.target.value })
                  }
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = C.sageL)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = C.border)
                  }
                />
              </div>
            </div>

            {[
              { label: "Email address", key: "email", type: "email", placeholder: "john@smithjoinery.co.uk", required: true },
              { label: "Mobile number", key: "phone", type: "tel", placeholder: "07700 000000" },
              { label: "Business name (if trading)", key: "business", type: "text", placeholder: "Smith Joinery" },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  required={f.required}
                  style={inputStyle}
                  value={(form as any)[f.key]}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = C.sageL)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = C.border)
                  }
                />
              </div>
            ))}

            {/* Location + jobs row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div>
                <label style={labelStyle}>Your location</label>
                <input
                  type="text"
                  placeholder="Leeds, Yorkshire"
                  required
                  style={inputStyle}
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = C.sageL)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = C.border)
                  }
                />
              </div>
              <div>
                <label style={labelStyle}>Fitted furniture jobs per month</label>
                <select
                  style={{ ...inputStyle, appearance: "none" }}
                  value={form.jobs}
                  onChange={(e) =>
                    setForm({ ...form, jobs: e.target.value })
                  }
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = C.sageL)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = C.border)
                  }
                >
                  <option value="">Select...</option>
                  <option>1–2 jobs</option>
                  <option>3–5 jobs</option>
                  <option>6–10 jobs</option>
                  <option>10+ jobs</option>
                  <option>None yet — interested to start</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Do you have your own workshop?</label>
              <select
                style={{ ...inputStyle, appearance: "none" }}
                value={form.workshop}
                onChange={(e) =>
                  setForm({ ...form, workshop: e.target.value })
                }
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = C.sageL)
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = C.border)
                }
              >
                <option value="">Select...</option>
                <option>Yes — full workshop with machinery</option>
                <option>Yes — basic workshop / garage</option>
                <option>No — I work on site only</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>
                Anything else you'd like us to know?
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your business, what you're looking for, or any questions..."
                style={{ ...inputStyle, resize: "vertical" }}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = C.sageL)
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = C.border)
                }
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                background: C.sage,
                color: "white",
                border: "none",
                padding: 14,
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 8,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = C.sageL)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = C.sage)
              }
            >
              Register my interest →
            </button>
            <p
              style={{
                fontSize: 12,
                color: C.whiteD,
                textAlign: "center",
                marginTop: 14,
              }}
            >
              No commitment. No spam. We will be in touch personally within 48
              hours.
            </p>
          </form>
        ) : (
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 32, marginBottom: 12, color: C.green }}>
              ✓
            </div>
            <div style={{ color: C.green, fontSize: 16, fontWeight: 500 }}>
              Thank you. We will be in touch within 48 hours.
            </div>
            <div
              style={{
                fontSize: 13,
                color: C.whiteD,
                marginTop: 8,
              }}
            >
              Check your email — including spam — for a confirmation.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: C.bg2,
        borderTop: `1px solid ${C.border}`,
        padding: "32px 40px",
        textAlign: "center",
        fontSize: 13,
        color: C.whiteD,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div>
        <strong style={{ color: C.white }}>Sturij</strong> · Storage Innovation
        Limited · Registered in England
      </div>
      <div style={{ marginTop: 6, color: C.whiteD, fontSize: 12 }}>
        TradeAI is a platform operated by Sturij. Sturij is a registered
        trademark.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          marginTop: 12,
          flexWrap: "wrap",
        }}
      >
        {[
          { href: "https://sturij.com", label: "sturij.com" },
          {
            href: "https://www.trustpilot.com/review/sturij.com",
            label: "Trustpilot reviews",
          },
          { href: "mailto:hello@sturij.com", label: "hello@sturij.com" },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{ color: C.whiteD, textDecoration: "none", fontSize: 12 }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = C.gold)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = C.whiteD)
            }
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      style={{
        background: C.bg,
        color: C.white,
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 16,
        lineHeight: 1.7,
      }}
    >
      <Nav />
      <Hero />
      <GoldRule />
      <Problem />
      <GoldRule />
      <HowItWorks />
      <GoldRule />
      <Features />
      <GoldRule />
      <Pipeline />
      <GoldRule />
      <Moat />
      <GoldRule />
      <Economics />
      <GoldRule />
      <SocialProof />
      <GoldRule />
      <WhatBuilt />
      <GoldRule />
      <WorkshopTools />
      <GoldRule />
      <Founder />
      <GoldRule />
      <AIOperations />
      <GoldRule />
      <Skills />
      <GoldRule />
      <Register />
      <Footer />
      {/* Floating notebook widget */}
      <SturijNotebook />
    </div>
  );
}
