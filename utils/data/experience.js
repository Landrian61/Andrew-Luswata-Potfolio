// Experience grouped by company — progression inside one company is the story,
// so roles nest under a company block instead of being flattened into entries.
export const experiences = [
  {
    id: 1,
    company: "AIBOS Uganda",
    location: "Kampala, Uganda · Served clients in Japan",
    duration: "September 2024 – July 2026",
    // The PM and Frontend Lead roles ran concurrently — the dates are correct.
    roles: [
      {
        title: "Project Manager, Employee Management System",
        duration: "June 2025 – July 2026",
        summary:
          "Owned the EMS end to end: architecture, roadmap and delivery for a multidisciplinary team, working across a six-hour time-zone gap.",
      },
      {
        title: "Frontend Lead",
        duration: "July 2025 – July 2026",
        summary:
          "Authored the company-wide frontend standards adopted by every AIBOS team: component conventions, project structure, code review expectations, UI consistency rules.",
      },
      {
        title: "Software Engineer & AI Engineer",
        duration: "September 2024 – July 2026",
        summary:
          "Built and shipped an AI phone agent, integrated LLM capability into production systems, and delivered full-stack applications for enterprise Japanese clients. Selected for a company working visit to Japan.",
      },
    ],
  },
  {
    id: 2,
    company: "Nova Generation Ltd.",
    location: "",
    duration: "May 2024 – July 2024",
    roles: [
      {
        title: "Software Engineering Intern",
        duration: "May 2024 – July 2024",
        summary: "",
      },
    ],
  },
  {
    id: 3,
    company: "Independent Projects",
    location: "",
    duration: "2023 – Present",
    roles: [
      {
        title: "",
        duration: "",
        summary:
          "Designing and shipping my own tools end to end, most recently DocGen and Repo Analyzer.",
      },
    ],
  },
];
