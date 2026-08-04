// Work section content, two tiers: case-study depth up top, compact cards below.
// No screenshots anywhere — the EMS is under NDA and the rest lead with the
// engineering story, so each entry carries an abstract typographic mark instead.
export const selectedWork = [
  {
    id: "ems",
    name: "Employee Management System",
    org: "AIBOS Uganda",
    role: "Project Manager",
    period: "June 2025 – July 2026",
    monogram: "EMS",
    nda: true,
    body: [
      "Most engineering contribution is invisible. Mentoring, architecture and documentation never show up in commit counts, so the people doing that work get overlooked when teams are staffed. The EMS captured that work and used it to match engineers to projects.",
      "I owned the platform end to end: authored the governing product document defining the architecture, phased roadmap and design principles the team built against, translated ambiguous direction from Japanese leadership into a four-pillar architecture and a sequenced six-phase delivery plan, and led a multidisciplinary team through discovery, sprints and delivery. I shipped the Employee Profile pillar myself: data model, capability decay and confidence modelling, LLM-assisted CV extraction with human-in-the-loop review, and visibility controls.",
      "It was built remotely with Japanese stakeholders six hours ahead, most of whom spoke limited English. Every decision had to survive being read rather than explained, so I kept bilingual documentation for every meeting and translated recorded transcripts so both sides worked from one written record. The design documents and operations runbook I wrote let the project pause and restart without losing knowledge.",
    ],
    tools: ["Next.js", "TypeScript", "Convex", "WorkOS", "MUI", "Tailwind CSS"],
    code: "",
    demo: "",
  },
  {
    id: "docgen",
    name: "DocGen",
    org: "Personal project · MVP",
    role: "Builder",
    period: "",
    monogram: "DG",
    nda: false,
    body: [
      "Documentation tooling that interviews you section by section and assembles the document live from your answers, instead of handing you an empty template. The first supported type is a Software Requirements Specification structured on the IEEE 830 template, so a completed interview produces a correctly structured document by construction.",
      "The app owns the cover page, table of contents, section and requirement numbering, revision history and every export format. The model writes only the prose, so the document's structure never depends on the model behaving.",
      "Generation runs server side. A worker owns the section loop, persists each section as it completes and streams progress over SSE, so a run survives the browser that started it. Close the tab and the link reattaches to the run in progress. An isomorphic packages/core domain layer is shared by the frontend and backend, so the document logic has one implementation rather than two.",
    ],
    tools: [
      "TypeScript",
      "Next.js (App Router)",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "pnpm workspace",
    ],
    code: "https://github.com/Landrian61/docgen",
    demo: "",
  },
  {
    id: "repo-analyzer",
    name: "Repo Analyzer",
    org: "Personal project",
    role: "Builder",
    period: "",
    monogram: "RA",
    nda: false,
    body: [
      "An AI analysis layer over the GitHub API. Add a repository, then ask questions about it in a chat interface: who the top contributors are, what issues are open, how activity compares between two people.",
      "The interesting problem was interaction design rather than LLM plumbing: responses are typed, not plain text. The model can return text, charts, tables or code diffs, and the UI renders whichever type comes back, so a question about commit activity gets answered with a chart instead of a paragraph describing one.",
    ],
    tools: [
      "Next.js 14",
      "TypeScript",
      "Convex",
      "Gemini 1.5 Flash",
      "MUI",
      "Recharts",
    ],
    code: "https://github.com/Landrian61/repo-analyzer",
    demo: "",
  },
];

export const alsoBuilt = [
  {
    id: "the-arcade",
    name: "The Arcade",
    description:
      "A shared frontend sandbox for my team: a Next.js monorepo where each developer gets their own route to experiment in, with a documented design system, folder conventions, a page template and shared Zustand state.",
    tools: ["Next.js 14", "TypeScript", "MUI", "Tailwind", "Zustand"],
    code: "https://github.com/Landrian61/The-Arcade",
  },
  {
    id: "cyber-church",
    name: "Cyber Church App",
    description:
      "Multi-role community platform with 22+ roles and 500+ catalogued functionalities.",
    tools: ["React Native", "Next.js", "PostgreSQL"],
    code: "",
  },
];
