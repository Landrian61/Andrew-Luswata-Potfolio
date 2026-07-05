import Reveal from "./reveal";

// Editorial section header: mono index number, display title, trailing hairline.
function SectionHeading({ number, title, hint }) {
  return (
    <Reveal>
      <div className="flex items-end gap-5 sm:gap-8">
        <span className="font-mono text-accent text-sm sm:text-base pb-2 sm:pb-3">
          /{number}
        </span>
        <h2 className="font-display font-bold uppercase leading-none text-[clamp(2.2rem,6vw,4.5rem)] tracking-tight">
          {title}
        </h2>
        <div className="flex-1 h-px bg-line mb-3 sm:mb-5" />
        {hint ? (
          <span className="hidden md:block font-mono text-xs text-muted pb-4 whitespace-nowrap">
            {hint}
          </span>
        ) : null}
      </div>
    </Reveal>
  );
}

export default SectionHeading;
