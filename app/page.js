import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/sections/about";
import ContactSection from "./components/sections/contact";
import CraftSection from "./components/sections/craft";
import HeroSection from "./components/sections/hero";
import JourneySection from "./components/sections/journey";
import PlaygroundCta from "./components/sections/playground-cta";
import ResourcesSection from "./components/sections/resources";
import WorkSection from "./components/sections/work";
import WritingSection from "./components/sections/writing";

// The site must never fail to render because dev.to is down or empty.
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

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CraftSection />
      <WorkSection />
      <PlaygroundCta />
      <JourneySection />
      <ResourcesSection />
      <WritingSection blogs={blogs} />
      <ContactSection />
    </>
  );
}
