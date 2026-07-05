"use client";

import { personalData } from "@/utils/data/personal-data";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "./magnetic";

const NAV_LINKS = [
  { id: "about", label: "About", number: "01" },
  { id: "craft", label: "Craft", number: "02" },
  { id: "work", label: "Work", number: "03" },
  { id: "journey", label: "Journey", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "bg-ink/75 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* reading progress */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
          style={{ scaleX: progress }}
        />

        <div className="flex items-center justify-between h-16 sm:h-20 px-6 sm:px-10 lg:px-16">
          <Link
            href="/#"
            onClick={() => setOpen(false)}
            className="font-display font-bold text-2xl tracking-tight z-50"
            aria-label="Andrew Luswata — home"
          >
            AL<span className="text-accent">.</span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  active === link.id ? "text-accent" : "text-muted hover:text-paper"
                }`}
              >
                <span className="text-accent/70 mr-1">{link.number}</span>
                {link.label}
              </Link>
            ))}
            <Magnetic>
              <a
                href={personalData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.18em] border border-paper/25 rounded-full px-5 py-2.5 hover:bg-accent hover:text-ink hover:border-accent transition-colors duration-300"
              >
                Résumé
              </a>
            </Magnetic>
          </nav>

          {/* mobile burger */}
          <button
            className="md:hidden z-50 flex flex-col justify-center items-end gap-[7px] w-10 h-10"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4.5, width: 28 } : { rotate: 0, y: 0, width: 28 }}
              className="block h-[2px] w-7 bg-paper origin-center"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4.5, width: 28 } : { rotate: 0, y: 0, width: 20 }}
              className="block h-[2px] w-5 bg-paper origin-center"
            />
          </button>
        </div>
      </header>

      {/* full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-4%" }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col justify-between px-6 sm:px-10 pt-28 pb-10"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                >
                  <Link
                    href={`/#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="font-mono text-xs text-accent">{link.number}</span>
                    <span className="font-display font-bold uppercase text-5xl sm:text-6xl tracking-tight text-paper group-hover:text-accent transition-colors duration-300">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col gap-3 border-t border-line pt-6"
            >
              <a
                href={`mailto:${personalData.email}`}
                className="font-mono text-sm text-muted hover:text-accent transition-colors"
              >
                {personalData.email}
              </a>
              <div className="flex gap-6 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {personalData.github && (
                  <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    GitHub
                  </a>
                )}
                {personalData.twitter && (
                  <a href={personalData.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    Twitter
                  </a>
                )}
                <a href={personalData.resume} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  Résumé
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
