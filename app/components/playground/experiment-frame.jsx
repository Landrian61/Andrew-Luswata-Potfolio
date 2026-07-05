import Reveal from "../site/reveal";

// Consistent shell for each lab experiment: index, title, tech tags, canvas well.
function ExperimentFrame({ number, title, blurb, tech = [], hint, children }) {
  return (
    <Reveal>
      <article className="border border-line rounded-2xl overflow-hidden bg-surface/40">
        <header className="p-6 sm:p-8 flex flex-col md:flex-row md:items-end gap-4 justify-between border-b border-line">
          <div>
            <p className="font-mono text-sm text-accent">EXP/{number}</p>
            <h2 className="mt-2 font-display font-bold text-2xl sm:text-4xl tracking-tight uppercase">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted leading-relaxed">{blurb}</p>
          </div>
          <div className="flex flex-wrap md:justify-end gap-2 md:max-w-[16rem]">
            {tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60 border border-line rounded-full px-3 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="relative">{children}</div>

        {hint ? (
          <footer className="px-6 sm:px-8 py-4 border-t border-line">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              ⌘ {hint}
            </p>
          </footer>
        ) : null}
      </article>
    </Reveal>
  );
}

export default ExperimentFrame;
