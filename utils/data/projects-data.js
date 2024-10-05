import ayla from "/public/image/ayla.jpg";
import crefin from "/public/image/crefin.jpg";
import realEstate from "/public/image/real-estate.jpg";
import travel from "/public/image/travel.jpg";

export const projectsData = [
  {
    id: 1,
    name: "Argon Dashboard Flask",
    description:
      "An admin dashboard coded in Flask, utilizing SCSS, SQLite, PostgreSQL, SQLAlchemy ORM, and Alembic. It includes session-based authentication with Flask-Login, Gulp-based SCSS compilation, and Docker deployment.",
    tools: [
      "Flask",
      "SQLAlchemy",
      "Alembic",
      "Docker",
      "Gunicorn",
      "Nginx",
      "Heroku"
    ],
    role: "Full Stack Developer",
    code: "https://github.com/app-generator/argon-dashboard-flask",
    demo: "",
    image: crefin
  },
  {
    id: 2,
    name: "Next.js Starter Template",
    description:
      "A starter template for Next.js App Router with a dashboard application. Features include automatic Google font loading, rapid development setup with npm, yarn, pnpm, or bun, and deployment via Vercel.",
    tools: ["Next.js", "TypeScript", "Inter Font", "Vercel"],
    role: "Frontend Developer",
    code: "",
    demo: "",
    image: ayla
  },
  {
    id: 3,
    name: "Create T3 App",
    description:
      "A project bootstrapped with the T3 Stack (Next.js, NextAuth.js, Prisma, Drizzle, Tailwind CSS, tRPC). It is designed to provide simple scaffolding for building web applications.",
    tools: [
      "Next.js",
      "NextAuth.js",
      "Prisma",
      "Drizzle",
      "Tailwind CSS",
      "tRPC"
    ],
    role: "Full Stack Developer",
    code: "",
    demo: "",
    image: realEstate
  },
  {
    id: 4,
    name: "ATM Machine Operations",
    description:
      "This JDBC-based project allows a customer to log into their account and perform ATM operations such as depositing, withdrawing money, and viewing their account balance.",
    tools: ["JDBC", "Java"],
    role: "Backend Developer",
    code: "",
    demo: "",
    image: travel
  }
];
