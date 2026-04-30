interface StickyNoteProps {
  children: string;
  className?: string;
}

export function StickyNote({ children, className = "" }: StickyNoteProps) {
  return (
    <div
      className={`absolute -top-5 -right-2 z-10 max-w-[160px] px-[14px] py-[10px] bg-[#f9f3c0] border-t-[3px] border-[#e8d84a] shadow-[2px_4px_12px_rgba(0,0,0,0.2)] rotate-[2.5deg] ${className}`}
    >
      <p className="font-serif italic text-[0.7rem] text-[#333] leading-[1.5]">
        {children}
      </p>
    </div>
  );
}
