import React, { useState, useEffect, useRef } from "react";
import {
  Instagram,
  Twitter,
  Youtube,
  Music2,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Mail,
} from "lucide-react";

/* ==========================================================================
   SEVVIN CO. — SEVER VINTAGE COMPANY
   Tek sayfalık marka vitrini / e-ticaret şablonu.
   Palet doğrudan logodan türetildi: şarap bordosu, hardal sarısı,
   antrasit siyah ve kirli beyaz. Y2K + eski okul hip-hop + grafiti ruhu,
   Inditex tarzı temiz/editoryal bir iskelet üzerine kuruldu.
   ========================================================================== */

const CSS = `
  :root{
    --maroon:#5c1220;
    --maroon-dark:#3a0a12;
    --maroon-deep:#220509;
    --mustard:#d9a441;
    --mustard-light:#eccb7c;
    --ink:#15100d;
    --bone:#f3ead9;
  }

  .sv-root{
    font-family:'Archivo',ui-sans-serif,system-ui,-apple-system,sans-serif;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  html{scroll-behavior:smooth;}

  .sv-root .font-display{font-family:'Anton',ui-sans-serif,sans-serif;letter-spacing:0.01em;}
  .sv-root .font-tag{font-family:'Permanent Marker',cursive;}

  .sv-root .bg-maroon{background-color:var(--maroon);}
  .sv-root .bg-maroon-dark{background-color:var(--maroon-dark);}
  .sv-root .bg-maroon-deep{background-color:var(--maroon-deep);}
  .sv-root .bg-mustard{background-color:var(--mustard);}
  .sv-root .bg-mustard-light{background-color:var(--mustard-light);}
  .sv-root .bg-ink{background-color:var(--ink);}
  .sv-root .bg-bone{background-color:var(--bone);}

  .sv-root .text-maroon{color:var(--maroon);}
  .sv-root .text-mustard{color:var(--mustard);}
  .sv-root .text-mustard-light{color:var(--mustard-light);}
  .sv-root .text-ink{color:var(--ink);}
  .sv-root .text-bone{color:var(--bone);}

  .sv-root .border-mustard{border-color:var(--mustard);}
  .sv-root .border-bone{border-color:var(--bone);}
  .sv-root .border-ink{border-color:var(--ink);}

  .sv-root .bg-ink-95{background-color:rgba(21,16,13,0.95);}
  .sv-root .bg-ink-40{background-color:rgba(21,16,13,0.45);}
  .sv-root .bg-bone-10{background-color:rgba(243,234,217,0.1);}
  .sv-root .border-mustard-30{border-color:rgba(217,164,65,0.3);}
  .sv-root .border-mustard-20{border-color:rgba(217,164,65,0.2);}
  .sv-root .border-ink-10{border-color:rgba(21,16,13,0.1);}
  .sv-root .text-bone-80{color:rgba(243,234,217,0.8);}
  .sv-root .text-bone-70{color:rgba(243,234,217,0.7);}
  .sv-root .text-bone-60{color:rgba(243,234,217,0.6);}
  .sv-root .text-ink-60{color:rgba(21,16,13,0.6);}
  .sv-root .placeholder-bone-60::placeholder{color:rgba(243,234,217,0.6);}

  .sv-root *:focus-visible{outline:2px solid var(--mustard);outline-offset:3px;}

  /* Grain / grunge texture overlay, echoes the eskitilmiş doku of the logo */
  .sv-grain{position:absolute;inset:0;pointer-events:none;opacity:0.35;mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  }

  /* Marquee ticker */
  .sv-marquee-track{display:flex;width:max-content;animation:sv-marquee 24s linear infinite;}
  @keyframes sv-marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

  /* Floating decorative elements */
  .sv-float{animation:sv-floaty 6s ease-in-out infinite;}
  .sv-float-slow{animation:sv-floaty 9s ease-in-out infinite;}
  @keyframes sv-floaty{0%,100%{transform:translateY(0) rotate(-8deg);}50%{transform:translateY(-16px) rotate(-3deg);}}
  .sv-spin-slow{animation:sv-spin 18s linear infinite;}
  @keyframes sv-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}

  /* Scroll reveal */
  .sv-reveal{opacity:0;transform:translateY(28px);transition:opacity 0.8s cubic-bezier(.21,.6,.35,1),transform 0.8s cubic-bezier(.21,.6,.35,1);}
  .sv-reveal.sv-in{opacity:1;transform:translateY(0);}
  .sv-reveal-delay-1{transition-delay:0.05s;}
  .sv-reveal-delay-2{transition-delay:0.15s;}
  .sv-reveal-delay-3{transition-delay:0.25s;}
  .sv-reveal-delay-4{transition-delay:0.35s;}

  /* Hero entrance "patlama" */
  .sv-pop{animation:sv-pop 1s cubic-bezier(.2,.9,.25,1) both;}
  @keyframes sv-pop{0%{opacity:0;transform:scale(1.1) translateY(18px);filter:blur(6px);}100%{opacity:1;transform:scale(1) translateY(0);filter:blur(0);}}

  /* Spray dots — stand in for the graffiti-being-sprayed motion */
  .sv-spray-dot{position:absolute;border-radius:9999px;background:var(--mustard);opacity:0;animation:sv-spray 2.8s ease-out infinite;}
  @keyframes sv-spray{0%{opacity:0;transform:scale(0.3);}15%{opacity:0.55;transform:scale(1);}100%{opacity:0;transform:scale(1.4);}}

  /* Y2K glitch button */
  .sv-btn-glitch{position:relative;isolation:isolate;}
  .sv-btn-glitch .sv-btn-txt{position:relative;z-index:2;}
  .sv-btn-glitch::before,.sv-btn-glitch::after{content:attr(data-text);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;z-index:1;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;font-size:0.875rem;}
  .sv-btn-glitch::before{color:var(--maroon);clip-path:inset(0 0 55% 0);}
  .sv-btn-glitch::after{color:var(--bone);clip-path:inset(55% 0 0 0);}
  .sv-btn-glitch:hover::before{opacity:0.9;animation:sv-glitch-a 0.5s steps(2,end) infinite;}
  .sv-btn-glitch:hover::after{opacity:0.9;animation:sv-glitch-b 0.5s steps(2,end) infinite;}
  @keyframes sv-glitch-a{0%{transform:translate(2px,-1px);}50%{transform:translate(-2px,1px);}100%{transform:translate(1px,-2px);}}
  @keyframes sv-glitch-b{0%{transform:translate(-2px,1px);}50%{transform:translate(2px,-1px);}100%{transform:translate(-1px,2px);}}

  /* Product card media crossfade (hover "photo swap") */
  .sv-media{position:relative;width:100%;padding-top:125%;overflow:hidden;}
  .sv-media-layer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:opacity 0.55s ease,transform 0.55s ease;}
  .sv-media-front{opacity:1;transform:scale(1);}
  .sv-media-back{opacity:0;transform:scale(1.06);}
  .sv-card:hover .sv-media-front{opacity:0;transform:scale(0.94);}
  .sv-card:hover .sv-media-back{opacity:1;transform:scale(1);}
  .sv-card:hover .sv-media-num{opacity:0.06;}
  .sv-card{transition:transform 0.4s ease;}
  .sv-card:hover{transform:translateY(-4px);}
  .sv-stripes{background-image:repeating-linear-gradient(45deg,currentColor 0,currentColor 2px,transparent 2px,transparent 14px);}

  /* Now-playing eq bars */
  .sv-eq{display:flex;align-items:flex-end;gap:3px;height:14px;}
  .sv-eq span{display:block;width:3px;background:var(--mustard);animation:sv-eq 1s ease-in-out infinite;border-radius:1px;}
  .sv-eq span:nth-child(1){animation-duration:0.8s;}
  .sv-eq span:nth-child(2){animation-duration:1.1s;}
  .sv-eq span:nth-child(3){animation-duration:0.65s;}
  .sv-eq span:nth-child(4){animation-duration:0.95s;}
  @keyframes sv-eq{0%,100%{height:3px;}50%{height:14px;}}

  @media (prefers-reduced-motion: reduce){
    .sv-marquee-track,.sv-float,.sv-float-slow,.sv-spin-slow,.sv-pop,.sv-spray-dot,
    .sv-btn-glitch::before,.sv-btn-glitch::after,.sv-eq span,.animate-bounce{
      animation:none !important;
    }
    .sv-reveal{transition:none !important;opacity:1 !important;transform:none !important;}
  }
`;

/* -------------------------------------------------------------------------
   Veri
------------------------------------------------------------------------- */

const NAV_LINKS = [
  { href: "#koleksiyon", label: "KOLEKSİYON" },
  { href: "#hikaye", label: "HİKAYE" },
  { href: "#iletisim", label: "İLETİŞİM" },
];

const PRODUCTS = [
  { id: 1, name: "GRAFFITI TAG HOODIE", price: "₺1.290", badge: "ÇOK SATAN", tone: "maroon", icon: "hoodie" },
  { id: 2, name: "VARSITY BOMBER CEKET", price: "₺2.450", badge: "SINIRLI ÜRETİM", tone: "ink", icon: "bomber" },
  { id: 3, name: "OLDSCHOOL CARGO PANT", price: "₺1.590", badge: "YENİ", tone: "mustard", icon: "cargo" },
  { id: 4, name: "SEVVIN TRUCKER CAP", price: "₺690", badge: "SON PARÇALAR", tone: "maroon", icon: "cap" },
];

const TONE_STYLES = {
  maroon: { frontBg: "bg-maroon", frontText: "text-bone", backBg: "bg-ink", backText: "text-mustard" },
  ink: { frontBg: "bg-ink", frontText: "text-mustard", backBg: "bg-mustard", backText: "text-ink" },
  mustard: { frontBg: "bg-mustard", frontText: "text-ink", backBg: "bg-maroon", backText: "text-bone" },
};

/* -------------------------------------------------------------------------
   İkonlar (orijinal, minimal çizgi ikonlar — telif konusu yok)
------------------------------------------------------------------------- */

function GarmentIcon({ type, className }) {
  const common = {
    viewBox: "0 0 100 100",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (type === "hoodie") {
    return (
      <svg {...common}>
        <path d="M35 18 Q50 6 65 18" />
        <path d="M35 18 L22 30 L16 46 L26 50 L32 40 L32 90 L68 90 L68 40 L74 50 L84 46 L78 30 L65 18" />
        <path d="M32 40 Q50 30 68 40" />
        <path d="M42 60 L58 60" />
        <circle cx="50" cy="12" r="3" />
      </svg>
    );
  }
  if (type === "bomber") {
    return (
      <svg {...common}>
        <path d="M30 20 L20 28 L14 50 L24 55 L30 44 L30 88 L70 88 L70 44 L76 55 L86 50 L80 28 L70 20" />
        <path d="M30 20 Q50 12 70 20" />
        <path d="M50 22 L50 86" strokeDasharray="3 5" />
        <path d="M30 30 L30 88 M70 30 L70 88" opacity="0.4" />
      </svg>
    );
  }
  if (type === "cargo") {
    return (
      <svg {...common}>
        <path d="M28 12 L72 12 L74 40 L62 92 L52 92 L50 45 L48 92 L38 92 L26 40 Z" />
        <rect x="58" y="46" width="16" height="18" rx="2" />
        <path d="M28 12 L28 22 L72 22 L72 12" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M20 55 Q50 22 80 55" />
      <path d="M14 58 Q50 30 86 58 Q70 66 50 66 Q30 66 14 58 Z" />
      <path d="M78 55 Q92 56 94 62 Q86 64 76 60" />
      <circle cx="50" cy="27" r="2.4" />
    </svg>
  );
}

function SparkleStar({ className, style }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="currentColor">
      <path d="M20 0 C21 12 22 19 34 20 C22 21 21 28 20 40 C19 28 18 21 6 20 C18 19 19 12 20 0Z" />
    </svg>
  );
}

function SkateIcon({ className, style }) {
  return (
    <svg viewBox="0 0 120 60" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M6 30 Q60 8 114 30" />
      <circle cx="28" cy="42" r="8" fill="currentColor" stroke="none" />
      <circle cx="92" cy="42" r="8" fill="currentColor" stroke="none" />
      <path d="M20 34 L36 34 M84 34 L100 34" />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Hooks
------------------------------------------------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const top = doc.scrollTop || document.body.scrollTop;
        const height = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
        setProgress(height > 0 ? (top / height) * 100 : 0);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/* -------------------------------------------------------------------------
   Bölümler
------------------------------------------------------------------------- */

function AnnouncementBar() {
  return (
    <div className="bg-mustard text-ink text-center text-xs sm:text-sm font-bold tracking-wide py-2 px-4">
      ÜCRETSİZ KARGO 2000₺ ÜZERİ &nbsp;✦&nbsp; SINIRLI SAYIDA ÜRETİM &nbsp;✦&nbsp; 14 GÜN KOŞULSUZ İADE
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-ink-95 border-b border-mustard-30" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#hero" className="font-display text-xl text-bone tracking-wide">
          SevVin <span className="text-mustard">co.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-bone-80 hover:text-mustard text-sm font-semibold tracking-widest transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 bg-mustard text-ink text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-full hover:bg-mustard-light transition-colors">
            <ShoppingBag className="w-4 h-4" /> Sepet
          </button>
          <button
            className="md:hidden text-bone"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-ink-95 border-t border-mustard-30 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-bone text-sm font-semibold tracking-widest"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const sprayDots = [
    { top: "18%", left: "22%", delay: "0s", size: 10 },
    { top: "30%", left: "64%", delay: "0.5s", size: 16 },
    { top: "58%", left: "34%", delay: "1s", size: 12 },
    { top: "70%", left: "72%", delay: "1.5s", size: 20 },
    { top: "44%", left: "50%", delay: "2s", size: 14 },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-maroon">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 25% 15%, rgba(217,164,65,0.20), transparent 55%), radial-gradient(circle at 80% 85%, rgba(217,164,65,0.14), transparent 50%)",
          }}
        />

        {/* Devasa arka plan yazısı — tam ekran grafiti/skate videosunun yerini
            tutan animasyonlu görsel katman (aşağıdaki not'a bakın). */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span
            className="font-tag text-mustard opacity-10"
            style={{ fontSize: "min(36vw, 400px)", transform: "rotate(-6deg)" }}
          >
            SevVin
          </span>
        </div>

        {sprayDots.map((s, i) => (
          <span
            key={i}
            className="sv-spray-dot"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
          />
        ))}

        <SkateIcon className="sv-float absolute text-mustard w-24 opacity-70" style={{ top: "14%", left: "6%" }} />
        <SparkleStar className="sv-float-slow absolute text-mustard w-8 opacity-80" style={{ top: "22%", right: "12%" }} />
        <SparkleStar className="sv-spin-slow absolute text-bone w-10 opacity-60" style={{ bottom: "20%", left: "10%" }} />
        <SparkleStar className="sv-float absolute text-mustard w-6 opacity-70" style={{ bottom: "30%", right: "18%" }} />

        <div className="sv-grain" />
        <div className="absolute inset-0 bg-ink-40" />
      </div>

      {/*
        GERÇEK VİDEO EKLEMEK İÇİN:
        Aşağıdaki <video> bloğunun yorumunu kaldırıp YOUR_VIDEO_URL.mp4 kısmını
        kendi barındırdığınız (S3 / Cloudinary / CDN) skate + grafiti loop
        videosuyla değiştirin. Üstteki katmanlar (overlay, grain, spray dots)
        videonun üzerinde otomatik olarak kalmaya devam eder.

        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="YOUR_VIDEO_URL.mp4" type="video/mp4" />
        </video>
      */}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="sv-pop inline-block bg-mustard text-ink text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
          Sever Vintage Company
        </span>
        <h1 className="font-display text-bone leading-none text-5xl sm:text-6xl md:text-8xl">
          <span className="sv-pop block" style={{ animationDelay: "0.1s" }}>
            PAST. PRESENT.
          </span>
          <span className="sv-pop block text-mustard" style={{ animationDelay: "0.25s" }}>
            FOREVER.
          </span>
        </h1>
        <p className="sv-pop mt-6 text-bone-80 text-lg sm:text-xl max-w-xl mx-auto" style={{ animationDelay: "0.4s" }}>
          Sokak unutmaz, tarz kalır. Y2K ruhu, sokak ritmiyle yeniden doğuyor.
        </p>
        <div
          className="sv-pop mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "0.55s" }}
        >
          <a
            href="#koleksiyon"
            data-text="SHOP THE CULTURE"
            className="sv-btn-glitch bg-mustard text-ink font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full inline-flex items-center gap-2"
          >
            <span className="sv-btn-txt flex items-center gap-2">
              Shop The Culture <ArrowRight className="w-4 h-4" />
            </span>
          </a>
          <a
            href="#hikaye"
            className="text-bone-80 hover:text-mustard text-sm font-semibold uppercase tracking-widest underline underline-offset-4 transition-colors"
          >
            Koleksiyonu Keşfet
          </a>
        </div>
      </div>

      <a
        href="#koleksiyon"
        className="relative z-10 mx-auto mt-16 mb-8 flex flex-col items-center gap-2 text-bone-60 hover:text-mustard transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}

function Ticker() {
  const base = ["PAST. PRESENT. FOREVER.", "BUILT ON STYLE. DRIVEN BY CULTURE.", "SEVER VINTAGE COMPANY"];
  const content = [...base, ...base, ...base, ...base];
  return (
    <div className="bg-mustard border-y-2 border-ink overflow-hidden py-3">
      <div className="sv-marquee-track">
        {content.map((t, i) => (
          <span
            key={i}
            className="font-display text-ink text-sm sm:text-base px-6 whitespace-nowrap flex items-center gap-6"
          >
            {t} <SparkleStar className="w-3 h-3 text-maroon" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Manifesto() {
  const [ref, visible] = useReveal();
  return (
    <section id="hikaye" className="bg-bone py-24 sm:py-32 px-6">
      <div ref={ref} className={`sv-reveal ${visible ? "sv-in" : ""} max-w-6xl mx-auto`}>
        <span className="block text-center text-xs font-bold uppercase tracking-widest text-maroon mb-6">
          Manifesto
        </span>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 text-center md:text-left">
          <h2 className="font-display text-ink text-4xl sm:text-5xl md:text-6xl leading-none">
            PAST.
            <br />
            PRESENT.
            <br />
            FOREVER.
          </h2>
          <h2 className="font-display text-maroon text-4xl sm:text-5xl md:text-6xl leading-none">
            BUILT ON STYLE.
            <br />
            DRIVEN BY
            <br />
            CULTURE.
          </h2>
        </div>
        <div className="mt-14 max-w-2xl mx-auto text-center">
          <p className="font-tag text-2xl sm:text-3xl text-ink mb-6">"Sokak unutmaz, tarz kalır."</p>
          <p className="text-ink-60 text-base sm:text-lg leading-relaxed">
            SevVin Co., eski okul hip-hop'ın özgüveninden, kaykay pistinin cesaretinden ve grafitinin sınır
            tanımaz enerjisinden besleniyor. Her parça bir arşiv, her koleksiyon bir manifesto — Y2K ruhu,
            sokağın ritmiyle yeniden doğuyor.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  const [ref, visible] = useReveal();
  const tones = TONE_STYLES[product.tone];
  return (
    <div ref={ref} className={`sv-reveal ${visible ? "sv-in" : ""} sv-reveal-delay-${(index % 4) + 1}`}>
      <div className="sv-card border border-ink-10 rounded-2xl overflow-hidden bg-bone">
        <div className="sv-media">
          <div className={`sv-media-layer sv-media-front ${tones.frontBg} ${tones.frontText}`}>
            <span className="sv-media-num absolute inset-0 flex items-center justify-center text-8xl font-display opacity-10 select-none">
              0{index + 1}
            </span>
            <GarmentIcon type={product.icon} className="w-24 h-24 relative z-10" />
          </div>
          <div className={`sv-media-layer sv-media-back ${tones.backBg} ${tones.backText} sv-stripes`}>
            <div className="flex flex-col items-center gap-2">
              <GarmentIcon type={product.icon} className="w-20 h-20" />
              <span className="font-tag text-lg">Hızlı Bakış</span>
            </div>
          </div>
          <span className="absolute top-3 left-3 bg-mustard text-ink text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full z-10">
            {product.badge}
          </span>
        </div>
        <div className="p-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-base leading-tight">{product.name}</h3>
            <p className="text-sm text-ink-60 mt-0.5">{product.price}</p>
          </div>
          <button
            className="shrink-0 bg-ink text-bone rounded-full p-2.5 hover:bg-maroon transition-colors"
            aria-label={`${product.name} sepete ekle`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductGrid() {
  const [headRef, headVisible] = useReveal();
  return (
    <section id="koleksiyon" className="bg-bone py-24 px-6 border-t border-ink-10">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headRef}
          className={`sv-reveal ${headVisible ? "sv-in" : ""} flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12`}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-maroon">Drop 01 — Yeni Koleksiyon</span>
            <h2 className="font-display text-ink text-4xl sm:text-5xl mt-2">VİTRİN</h2>
          </div>
          <p className="text-ink-60 max-w-sm text-sm sm:text-base">
            Sınırlı sayıda üretilen parçalar. Tükenmeden yerini al.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [ref, visible] = useReveal();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe() {
    if (email.trim().includes("@")) {
      setSubscribed(true);
    }
  }

  return (
    <footer id="iletisim" className="bg-maroon-deep">
      <div
        ref={ref}
        className={`sv-reveal ${visible ? "sv-in" : ""} text-center py-24 px-6 border-b border-mustard-20 relative overflow-hidden`}
      >
        <SparkleStar className="sv-float absolute w-10 text-mustard opacity-40" style={{ top: "12%", left: "8%" }} />
        <SparkleStar className="sv-float-slow absolute w-6 text-mustard opacity-40" style={{ bottom: "16%", right: "10%" }} />
        <span className="text-xs font-bold uppercase tracking-widest text-mustard">Kültüre Katıl</span>
        <h2 className="font-display text-bone text-4xl sm:text-5xl md:text-6xl mt-3">HAREKETE KATIL</h2>
        <p className="text-bone-70 mt-4 max-w-md mx-auto">
          Yeni dropları, sınırlı üretimleri ve arşiv indirimlerini ilk sen öğren.
        </p>

        {!subscribed ? (
          <div className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="mail@adresin.com"
              aria-label="E-posta adresin"
              className="flex-1 bg-bone-10 border border-mustard-30 text-bone placeholder-bone-60 rounded-full px-5 py-3 text-sm focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              data-text="ABONE OL"
              className="sv-btn-glitch bg-mustard text-ink font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-full inline-flex items-center justify-center gap-2"
            >
              <span className="sv-btn-txt flex items-center gap-2">
                <Mail className="w-4 h-4" /> Abone Ol
              </span>
            </button>
          </div>
        ) : (
          <p className="mt-8 font-tag text-mustard text-xl">Teşekkürler, kültüre hoş geldin ✦</p>
        )}
        <p className="text-bone-60 text-xs mt-4">Spam yok, sadece kültür. İstediğin an ayrılabilirsin.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <span className="font-display text-bone text-xl">
            SevVin <span className="text-mustard">co.</span>
          </span>
          <p className="text-bone-60 text-sm mt-3 leading-relaxed">
            Sever Vintage Company — 2000'lerin sokak ruhunu bugüne taşıyan bağımsız giyim markası.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="#" aria-label="Instagram" className="text-bone-70 hover:text-mustard transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="TikTok" className="text-bone-70 hover:text-mustard transition-colors">
              <Music2 className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter / X" className="text-bone-70 hover:text-mustard transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Youtube" className="text-bone-70 hover:text-mustard transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-mustard text-xs font-bold uppercase tracking-widest mb-4">Koleksiyon</h4>
          <ul className="space-y-2.5 text-bone-70 text-sm">
            <li>
              <a href="#koleksiyon" className="hover:text-mustard transition-colors">Yeni Gelenler</a>
            </li>
            <li>
              <a href="#koleksiyon" className="hover:text-mustard transition-colors">Sınırlı Üretim</a>
            </li>
            <li>
              <a href="#koleksiyon" className="hover:text-mustard transition-colors">Arşiv</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-mustard text-xs font-bold uppercase tracking-widest mb-4">Marka</h4>
          <ul className="space-y-2.5 text-bone-70 text-sm">
            <li>
              <a href="#hikaye" className="hover:text-mustard transition-colors">Hikayemiz</a>
            </li>
            <li>
              <a href="#" className="hover:text-mustard transition-colors">Sıkça Sorulanlar</a>
            </li>
            <li>
              <a href="#" className="hover:text-mustard transition-colors">Kargo &amp; İade</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-mustard text-xs font-bold uppercase tracking-widest mb-4">İletişim</h4>
          <ul className="space-y-2.5 text-bone-70 text-sm">
            <li>merhaba@sevvin.co</li>
            <li>İstanbul, Türkiye</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-mustard-20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-bone-60 text-xs text-center sm:text-left">
            © 2026 SevVin Co. — Sever Vintage Company. Tüm hakları saklıdır.
          </p>
          <p className="font-tag text-mustard text-base">Created by Eray Sever ✦</p>
        </div>
      </div>
    </footer>
  );
}

function SpotifyWidget() {
  const [open, setOpen] = useState(true);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="w-72 bg-ink border-2 border-mustard rounded-2xl overflow-hidden shadow-2xl sv-pop">
          <div className="flex items-center justify-between px-4 py-2.5 bg-maroon">
            <div className="flex items-center gap-2">
              <span className="sv-eq">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className="font-tag text-mustard text-sm">Günün Şarkısı</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Müzik oynatıcıyı kapat"
              className="text-bone-80 hover:text-mustard transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <iframe
            title="Spotify — Living in Pain, The Notorious B.I.G."
            src="https://open.spotify.com/embed/track/37ZBmAekfkMcg6TQSo1fkL?utm_source=generator&theme=0"
            width="100%"
            height="152"
            style={{ border: 0, display: "block" }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="sv-float-slow bg-mustard text-ink rounded-full p-3.5 shadow-2xl hover:bg-mustard-light transition-colors"
          aria-label="Günün şarkısını aç"
        >
          <Music2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   App
------------------------------------------------------------------------- */

export default function App() {
  const progress = useScrollProgress();
  return (
    <div className="sv-root relative bg-bone text-ink">
      <style>{CSS}</style>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Permanent+Marker&display=swap"
      />
      <AnnouncementBar />
      <Navbar />
      <div className="fixed top-0 left-0 h-1 bg-mustard z-50" style={{ width: `${progress}%` }} />
      <Hero />
      <Ticker />
      <Manifesto />
      <ProductGrid />
      <Footer />
      <SpotifyWidget />
    </div>
  );
}
