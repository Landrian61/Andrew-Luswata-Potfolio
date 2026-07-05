import { personalData } from "@/utils/data/personal-data";
import { FiGithub, FiMapPin, FiPhone } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Reveal from "../site/reveal";
import SectionHeading from "../site/section-heading";
import ContactForm from "./contact-form";

function ContactSection() {
  return (
    <section id="contact" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32 scroll-mt-20">
      <SectionHeading number="06" title="Contact" hint="Say hello" />

      <Reveal delay={0.1}>
        <h3 className="mt-14 sm:mt-20 font-display font-bold tracking-tight leading-[1.05] text-[clamp(2rem,5.5vw,4.5rem)] max-w-5xl">
          Have an idea that feels{" "}
          <span className="text-outline-accent">impossible</span>? Those are my
          favorite.
        </h3>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Reveal delay={0.15}>
          <div className="flex flex-col gap-8">
            <a
              href={`mailto:${personalData.email}`}
              className="link-lined font-display font-semibold text-xl sm:text-2xl break-all hover:text-accent transition-colors duration-300"
            >
              {personalData.email}
            </a>

            <div className="space-y-4 font-mono text-sm text-muted">
              <p className="flex items-center gap-3">
                <FiPhone className="text-accent" /> {personalData.phone}
              </p>
              <p className="flex items-center gap-3">
                <FiMapPin className="text-accent" /> {personalData.address}
              </p>
            </div>

            <div className="flex items-center gap-5 pt-2">
              {personalData.github && (
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-12 h-12 rounded-full border border-paper/20 flex items-center justify-center text-muted hover:text-ink hover:bg-accent hover:border-accent transition-colors duration-300"
                >
                  <FiGithub size={18} />
                </a>
              )}
              {personalData.twitter && (
                <a
                  href={personalData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-12 h-12 rounded-full border border-paper/20 flex items-center justify-center text-muted hover:text-ink hover:bg-accent hover:border-accent transition-colors duration-300"
                >
                  <FaXTwitter size={18} />
                </a>
              )}
            </div>

            <p className="text-sm text-muted leading-relaxed max-w-md mt-2">
              Whether it&apos;s a full product build, a wild interactive idea, or a
              team that needs an extra pair of hands — my inbox is open.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

export default ContactSection;
