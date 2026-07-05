import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "../site/reveal";
import SectionHeading from "../site/section-heading";

export function PostCard({ blog, index = 0 }) {
  return (
    <Reveal delay={0.08 * index}>
      <a
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border border-line rounded-xl overflow-hidden bg-surface/50 hover:border-accent/50 transition-colors duration-500"
      >
        <div className="relative overflow-hidden aspect-[16/9]">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <span>{new Date(blog.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span className="text-accent">✦</span>
            <span>{blog.reading_time_minutes} min read</span>
          </div>
          <h3 className="mt-3 font-display font-bold text-lg sm:text-xl leading-snug group-hover:text-accent transition-colors duration-300">
            {blog.title}
          </h3>
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted group-hover:text-paper transition-colors duration-300">
            Read on dev.to <FiArrowUpRight />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

function WritingSection({ blogs }) {
  if (!blogs?.length) return null;

  return (
    <section id="writing" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32 scroll-mt-20">
      <SectionHeading number="✦" title="Writing" hint="Notes from the workshop" />

      <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((blog, i) => (
          <PostCard key={blog.id} blog={blog} index={i} />
        ))}
      </div>

      {blogs.length > 3 ? (
        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="link-lined font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-accent transition-colors duration-300"
          >
            All posts →
          </Link>
        </div>
      ) : null}
    </section>
  );
}

export default WritingSection;
