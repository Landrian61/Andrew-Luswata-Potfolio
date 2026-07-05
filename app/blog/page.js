import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { PostCard } from "../components/sections/writing";

export const metadata = {
  title: "Writing — Andrew Luswata",
  description: "Articles and notes by Andrew Luswata.",
};

async function getBlogs() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter((item) => item?.cover_image);
  } catch {
    return [];
  }
}

async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="px-6 sm:px-10 lg:px-16 pt-36 pb-24 min-h-screen">
      <div className="flex items-end gap-5 sm:gap-8">
        <span className="font-mono text-accent text-sm sm:text-base pb-2 sm:pb-3">/✦</span>
        <h1 className="font-display font-bold uppercase leading-none text-[clamp(2.2rem,6vw,4.5rem)] tracking-tight">
          Writing
        </h1>
        <div className="flex-1 h-px bg-line mb-3 sm:mb-5" />
      </div>

      {blogs.length ? (
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <PostCard key={blog.id} blog={blog} index={i % 3} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <p className="font-mono text-sm text-muted">
            Nothing published yet — the workshop is busy.
          </p>
          <Link
            href="/"
            className="link-lined inline-block mt-6 font-mono text-xs uppercase tracking-[0.18em] text-accent"
          >
            ← Back home
          </Link>
        </div>
      )}
    </div>
  );
}

export default BlogPage;
