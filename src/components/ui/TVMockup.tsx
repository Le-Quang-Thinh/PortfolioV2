/**
 * Decorative CRT-style TV mockup. Pure CSS — no images, no media.
 * Mirrors the markup of the source HTML's `.tv-outer` block.
 */

const speakerHeights = [13, 9, 13, 7, 13, 11, 13];

export function TVMockup() {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-full max-w-[430px] rounded-t-2xl rounded-b-[26px] px-[15px] pt-[11px] pb-[22px]"
        style={{
          background:
            "linear-gradient(170deg,#2e2e2e 0%,#1a1a1a 60%,#252525 100%)",
          boxShadow:
            "0 0 0 2px #333, 0 0 0 4px #1a1a1a, 0 12px 60px rgba(0,0,0,0.7), 0 0 80px rgba(200,100,58,0.04)",
        }}
      >
        <div className="flex justify-center gap-[56px] mb-1">
          <span className="w-[3px] h-5 rounded-[2px] -rotate-[8deg] bg-[linear-gradient(#555,#333)]" />
          <span className="w-[3px] h-5 rounded-[2px] rotate-[8deg] bg-[linear-gradient(#555,#333)]" />
        </div>

        <div
          className="bg-black rounded-[6px] overflow-hidden border-[3px] border-[#111]"
          style={{
            aspectRatio: "16 / 9.5",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.9)",
          }}
        >
          <div
            className="w-full h-full flex flex-col"
            style={{
              background: "linear-gradient(180deg,#080818 0%,#0c1830 100%)",
            }}
          >
            <div
              className="flex items-center gap-[10px] px-[10px] py-[7px]"
              style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.9),transparent)" }}
            >
              <span className="font-display text-[0.85rem] tracking-[0.1em] text-[#e50914]">
                CINEFLIX
              </span>
              <ul className="flex gap-2 list-none">
                {[
                  { label: "Home", on: true },
                  { label: "Movies" },
                  { label: "TV Shows" },
                  { label: "Live" },
                  { label: "My List" },
                ].map((l) => (
                  <li
                    key={l.label}
                    className={`text-[0.36rem] font-heading ${l.on ? "text-white underline" : "text-white/55"}`}
                  >
                    {l.label}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="flex-1 flex flex-col justify-end px-[10px] py-2"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)",
              }}
            >
              <div className="font-heading uppercase text-[0.34rem] tracking-[0.15em] text-white/50 mb-[2px]">
                Now Streaming
              </div>
              <div className="font-display text-[1.45rem] text-white leading-none mb-[3px]">
                THE BEYOND
              </div>
              <div className="text-[0.34rem] text-white/50 mb-[5px]">
                A space adventure beyond imagination.
              </div>
              <div className="flex gap-[5px]">
                <span className="bg-[#e50914] text-white px-[9px] py-[3px] text-[0.4rem] font-heading rounded-[2px] inline-flex items-center gap-[3px]">
                  ▶ Play
                </span>
                <span className="bg-white/10 border border-white/35 text-white px-[7px] py-[3px] text-[0.4rem] font-heading rounded-[2px]">
                  + My List
                </span>
              </div>
            </div>

            <div className="flex gap-1 px-[10px] py-1 bg-black/70">
              {[
                { label: "Last Journey", grad: "linear-gradient(135deg,#1a2a5a,#2d5a9a)" },
                { label: "Deep Ocean", grad: "linear-gradient(135deg,#0d4a3a,#1a7a5a)" },
                { label: "Secret Hours", grad: "linear-gradient(135deg,#4a1a1a,#8a2d2d)" },
                { label: "Wild Nature", grad: "linear-gradient(135deg,#3a2a1a,#7a5a2d)" },
              ].map((t) => (
                <span
                  key={t.label}
                  className="flex-1 rounded-[2px] flex items-end px-[3px] py-[2px] font-heading uppercase text-[0.28rem] text-white/80 font-semibold"
                  style={{ aspectRatio: "16 / 9", background: t.grad }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-[14px] pt-2">
          <div className="flex gap-[2px] items-end">
            {speakerHeights.map((h, i) => (
              <span
                key={i}
                className="w-[2px] rounded-[1px] bg-[#444]"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <div className="flex gap-[5px]">
            <span className="w-[17px] h-[17px] rounded-full border border-[#444] bg-[radial-gradient(circle_at_35%_35%,#555,#222)]" />
            <span className="w-[17px] h-[17px] rounded-full border border-[#444] bg-[radial-gradient(circle_at_35%_35%,#555,#222)]" />
          </div>
        </div>
      </div>

      <div className="w-[110px] h-[9px] rounded-b-[5px] bg-[linear-gradient(180deg,#2a2a2a,#1a1a1a)]" />
      <div className="w-[160px] h-[7px] rounded-[4px] bg-[#181818] border-t border-[#333]" />
    </div>
  );
}
