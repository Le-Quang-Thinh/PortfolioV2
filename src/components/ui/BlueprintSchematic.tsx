import type { ProjectThumbType } from "@/data/portfolio";

interface BlueprintSchematicProps {
  thumbType: ProjectThumbType;
  className?: string;
}

export function BlueprintSchematic({ thumbType, className = "" }: BlueprintSchematicProps) {
  return (
    <svg
      viewBox="0 0 420 260"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id={`grid-${thumbType}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="#C8643A"
            strokeWidth="0.4"
            opacity="0.5"
          />
        </pattern>
      </defs>

      {/* Blueprint grid background */}
      <rect width="420" height="260" fill={`url(#grid-${thumbType})`} />

      {/* Corner registration marks */}
      <g stroke="#C8643A" strokeWidth="0.75" opacity="0.6">
        <line x1="8" y1="14" x2="18" y2="14" />
        <line x1="14" y1="8" x2="14" y2="18" />
        <line x1="402" y1="14" x2="412" y2="14" />
        <line x1="406" y1="8" x2="406" y2="18" />
        <line x1="8" y1="246" x2="18" y2="246" />
        <line x1="14" y1="240" x2="14" y2="252" />
        <line x1="402" y1="246" x2="412" y2="246" />
        <line x1="406" y1="240" x2="406" y2="252" />
      </g>

      {/* Scale label */}
      <text
        x="28"
        y="254"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="6"
        fill="#C8643A"
        opacity="0.5"
        letterSpacing="0.08em"
      >
        SCALE 1:1 · REF-{thumbType.toUpperCase()}
      </text>

      {thumbType === "tv" && <TvSchematic />}
      {thumbType === "web" && <WebSchematic />}
      {thumbType === "cms" && <CmsSchematic />}
      {thumbType === "cast" && <CastSchematic />}
    </svg>
  );
}

function TvSchematic() {
  return (
    <g>
      {/* TV outer frame */}
      <rect x="60" y="24" width="260" height="170" rx="8" fill="none" stroke="#0D5666" strokeWidth="1.5" />
      {/* TV screen bezel */}
      <rect x="72" y="34" width="236" height="148" rx="4" fill="none" stroke="#0D5666" strokeWidth="1" opacity="0.7" />
      {/* TV stand neck */}
      <rect x="172" y="194" width="36" height="16" rx="2" fill="none" stroke="#0D5666" strokeWidth="1" />
      {/* TV stand base */}
      <rect x="148" y="210" width="84" height="8" rx="3" fill="none" stroke="#0D5666" strokeWidth="1" />

      {/* Screen content — play button */}
      <circle cx="190" cy="108" r="22" fill="none" stroke="#0D5666" strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
      <polygon points="184,98 184,118 204,108" fill="none" stroke="#C8643A" strokeWidth="1.25" opacity="0.7" />

      {/* Progress bar */}
      <rect x="84" y="156" width="212" height="4" rx="2" fill="none" stroke="#0D5666" strokeWidth="0.75" opacity="0.5" />
      <rect x="84" y="156" width="90" height="4" rx="2" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.6" />
      <circle cx="174" cy="158" r="3" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.7" />

      {/* Remote control */}
      <rect x="342" y="60" width="40" height="100" rx="12" fill="none" stroke="#C8643A" strokeWidth="1.25" />
      <circle cx="362" cy="92" r="8" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.7" />
      <line x1="362" y1="86" x2="362" y2="98" stroke="#C8643A" strokeWidth="0.75" opacity="0.7" />
      <line x1="356" y1="92" x2="368" y2="92" stroke="#C8643A" strokeWidth="0.75" opacity="0.7" />
      <rect x="354" y="108" width="16" height="8" rx="2" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.6" />
      <rect x="354" y="122" width="16" height="8" rx="2" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.6" />
      <rect x="354" y="136" width="16" height="8" rx="2" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.6" />

      {/* Signal lines to remote */}
      <path d="M 320 100 Q 332 92 342 88" fill="none" stroke="#C8643A" strokeWidth="0.75" strokeDasharray="4 3" opacity="0.5" />
      <path d="M 320 108 Q 332 102 342 100" fill="none" stroke="#C8643A" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.35" />

      {/* Platform label */}
      <text x="100" y="46" fontFamily="'IBM Plex Mono', monospace" fontSize="5.5" fill="#0D5666" opacity="0.5" letterSpacing="0.12em">SMART TV ECOSYSTEM</text>
    </g>
  );
}

function WebSchematic() {
  return (
    <g>
      {/* Browser window */}
      <rect x="28" y="18" width="240" height="200" rx="6" fill="none" stroke="#0D5666" strokeWidth="1.5" />
      {/* Browser top bar */}
      <rect x="28" y="18" width="240" height="32" rx="6" fill="none" stroke="#0D5666" strokeWidth="1.5" />
      <line x1="28" y1="50" x2="268" y2="50" stroke="#0D5666" strokeWidth="0.75" opacity="0.5" />

      {/* Traffic lights */}
      <circle cx="46" cy="34" r="4" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.7" />
      <circle cx="60" cy="34" r="4" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.7" />
      <circle cx="74" cy="34" r="4" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.7" />

      {/* URL bar */}
      <rect x="88" y="26" width="162" height="16" rx="8" fill="none" stroke="#0D5666" strokeWidth="0.75" opacity="0.6" />
      <text x="96" y="37" fontFamily="'IBM Plex Mono', monospace" fontSize="5" fill="#0D5666" opacity="0.5">https://ottplatform.com</text>

      {/* Hero banner in content */}
      <rect x="38" y="60" width="220" height="60" rx="3" fill="none" stroke="#0D5666" strokeWidth="0.75" opacity="0.5" />
      <text x="100" y="95" fontFamily="'IBM Plex Mono', monospace" fontSize="6" fill="#0D5666" opacity="0.4">HERO BANNER</text>

      {/* Content rows */}
      <rect x="38" y="132" width="100" height="40" rx="2" fill="none" stroke="#0D5666" strokeWidth="0.5" opacity="0.4" />
      <rect x="146" y="132" width="112" height="40" rx="2" fill="none" stroke="#0D5666" strokeWidth="0.5" opacity="0.4" />
      <rect x="38" y="180" width="220" height="8" rx="2" fill="none" stroke="#0D5666" strokeWidth="0.5" opacity="0.3" />
      <rect x="38" y="196" width="160" height="8" rx="2" fill="none" stroke="#0D5666" strokeWidth="0.5" opacity="0.25" />

      {/* Mobile phone — right side */}
      <rect x="290" y="48" width="90" height="164" rx="12" fill="none" stroke="#C8643A" strokeWidth="1.5" />
      <rect x="300" y="62" width="70" height="126" rx="4" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.6" />
      <circle cx="335" cy="200" r="5" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.6" />
      {/* Phone notch */}
      <rect x="320" y="50" width="30" height="8" rx="4" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.5" />
      {/* Phone content lines */}
      <rect x="306" y="72" width="58" height="30" rx="2" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.4" />
      <rect x="306" y="110" width="58" height="6" rx="1" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.35" />
      <rect x="306" y="122" width="40" height="6" rx="1" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.3" />

      {/* Connection arrow */}
      <path d="M 268 118 L 286 118" fill="none" stroke="#C8643A" strokeWidth="0.75" strokeDasharray="4 3" opacity="0.5" />
      <polygon points="284,115 290,118 284,121" fill="#C8643A" opacity="0.4" />

      <text x="38" y="14" fontFamily="'IBM Plex Mono', monospace" fontSize="5.5" fill="#0D5666" opacity="0.5" letterSpacing="0.12em">OTT WEB PLATFORM</text>
    </g>
  );
}

function CmsSchematic() {
  return (
    <g>
      {/* Dashboard outer frame */}
      <rect x="18" y="18" width="384" height="220" rx="6" fill="none" stroke="#0D5666" strokeWidth="1.5" />
      {/* Top navigation bar */}
      <rect x="18" y="18" width="384" height="28" rx="6" fill="none" stroke="#0D5666" strokeWidth="1.5" />
      <line x1="18" y1="46" x2="402" y2="46" stroke="#0D5666" strokeWidth="0.75" opacity="0.4" />

      {/* Nav bar items */}
      <rect x="28" y="25" width="40" height="14" rx="3" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.7" />
      <rect x="76" y="28" width="28" height="8" rx="2" fill="none" stroke="#0D5666" strokeWidth="0.5" opacity="0.4" />
      <rect x="112" y="28" width="28" height="8" rx="2" fill="none" stroke="#0D5666" strokeWidth="0.5" opacity="0.4" />
      <circle cx="382" cy="32" r="8" fill="none" stroke="#0D5666" strokeWidth="0.75" opacity="0.4" />

      {/* Left sidebar */}
      <rect x="18" y="46" width="86" height="192" fill="none" stroke="#0D5666" strokeWidth="0.75" opacity="0.5" />
      <line x1="104" y1="46" x2="104" y2="238" stroke="#0D5666" strokeWidth="0.75" opacity="0.4" />

      {/* Sidebar nav items */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="26" y={56 + i * 22} width="68" height="14" rx="3" fill="none"
          stroke={i === 0 ? "#C8643A" : "#0D5666"}
          strokeWidth={i === 0 ? "1" : "0.5"}
          opacity={i === 0 ? 0.8 : 0.4}
        />
      ))}

      {/* Main area: stat cards row */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={116 + i * 96} y="56" width="82" height="44" rx="3" fill="none" stroke="#0D5666" strokeWidth="0.75" opacity="0.5" />
      ))}

      {/* Table area */}
      <rect x="116" y="112" width="276" height="118" rx="3" fill="none" stroke="#0D5666" strokeWidth="0.75" opacity="0.5" />
      {/* Table header row */}
      <rect x="116" y="112" width="276" height="18" rx="3" fill="none" stroke="#0D5666" strokeWidth="0.75" opacity="0.5" />
      <line x1="116" y1="130" x2="392" y2="130" stroke="#0D5666" strokeWidth="0.5" opacity="0.4" />
      {/* Table rows */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="116" y1={148 + i * 16} x2="392" y2={148 + i * 16} stroke="#0D5666" strokeWidth="0.4" opacity="0.3" />
      ))}
      {/* Table col dividers */}
      <line x1="220" y1="112" x2="220" y2="230" stroke="#0D5666" strokeWidth="0.4" opacity="0.3" />
      <line x1="310" y1="112" x2="310" y2="230" stroke="#0D5666" strokeWidth="0.4" opacity="0.3" />

      {/* RBAC badge */}
      <rect x="328" y="56" width="60" height="18" rx="9" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.6" />
      <text x="336" y="67" fontFamily="'IBM Plex Mono', monospace" fontSize="5" fill="#C8643A" opacity="0.6">RBAC</text>

      <text x="26" y="14" fontFamily="'IBM Plex Mono', monospace" fontSize="5.5" fill="#0D5666" opacity="0.5" letterSpacing="0.12em">CONTENT MANAGEMENT SYSTEM</text>
    </g>
  );
}

function CastSchematic() {
  return (
    <g>
      {/* Phone sender — left */}
      <rect x="20" y="50" width="86" height="155" rx="12" fill="none" stroke="#C8643A" strokeWidth="1.5" />
      <rect x="30" y="66" width="66" height="118" rx="4" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.6" />
      <circle cx="63" cy="196" r="5" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.6" />
      <rect x="46" y="53" width="34" height="8" rx="4" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.5" />

      {/* Phone screen content */}
      <rect x="34" y="74" width="58" height="36" rx="2" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.4" />
      <circle cx="63" cy="92" r="10" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.5" strokeDasharray="3 2" />
      <polygon points="59,87 59,97 70,92" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.6" />
      <rect x="34" y="118" width="58" height="5" rx="1" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.4" />
      <rect x="34" y="130" width="40" height="5" rx="1" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.35" />

      {/* Cast button on phone */}
      <rect x="78" y="148" width="14" height="12" rx="2" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.7" />
      <path d="M 80 158 Q 80 152 86 152" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.6" />
      <path d="M 80 156 Q 82 152 86 152" fill="none" stroke="#C8643A" strokeWidth="0.5" opacity="0.4" />

      {/* Casting arc signals */}
      <path d="M 110 128 Q 175 60 250 78" fill="none" stroke="#C8643A" strokeWidth="1.25" strokeDasharray="7 4" opacity="0.6" />
      <path d="M 110 138 Q 175 75 250 90" fill="none" stroke="#C8643A" strokeWidth="0.75" strokeDasharray="5 5" opacity="0.45" />
      <path d="M 110 148 Q 175 90 250 102" fill="none" stroke="#C8643A" strokeWidth="0.5" strokeDasharray="4 5" opacity="0.3" />

      {/* Signal nodes */}
      <circle cx="182" cy="90" r="5" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.6" />
      <circle cx="182" cy="90" r="2" fill="#C8643A" opacity="0.4" />

      {/* TV receiver — right */}
      <rect x="252" y="26" width="158" height="108" rx="6" fill="none" stroke="#0D5666" strokeWidth="1.5" />
      <rect x="262" y="36" width="138" height="86" rx="4" fill="none" stroke="#0D5666" strokeWidth="0.75" opacity="0.7" />
      {/* TV screen content */}
      <rect x="268" y="46" width="126" height="66" rx="2" fill="none" stroke="#0D5666" strokeWidth="0.5" opacity="0.4" />
      {/* Cast icon on TV */}
      <path d="M 270 108 Q 270 96 282 96" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.7" />
      <path d="M 270 104 Q 272 96 282 96" fill="none" stroke="#C8643A" strokeWidth="0.75" opacity="0.5" />
      <circle cx="270" cy="108" r="2" fill="#C8643A" opacity="0.6" />
      {/* TV stand */}
      <rect x="308" y="134" width="44" height="12" rx="2" fill="none" stroke="#0D5666" strokeWidth="1" />
      <rect x="290" y="146" width="80" height="6" rx="2" fill="none" stroke="#0D5666" strokeWidth="1" />

      {/* Analytics pulse on right */}
      <path d="M 310 180 L 324 180 L 330 168 L 338 192 L 346 172 L 352 180 L 366 180" fill="none" stroke="#C8643A" strokeWidth="1" opacity="0.5" />

      <text x="20" y="14" fontFamily="'IBM Plex Mono', monospace" fontSize="5.5" fill="#0D5666" opacity="0.5" letterSpacing="0.12em">CHROMECAST RECEIVER SYSTEM</text>
    </g>
  );
}
