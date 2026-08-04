import { GoogleTagManager } from "@next/third-parties/google";
import { IBM_Plex_Mono, Space_Grotesk, Syne } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/site/footer";
import Navbar from "./components/site/navbar";
import "./css/globals.scss";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-grotesk",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Andrew Luswata · Software Engineer · AI Engineer · Project Manager",
  description:
    "Portfolio of Andrew Luswata, a software engineer, AI engineer and project manager from Kampala, Uganda. Frontend developer to Frontend Lead to Project Manager at AIBOS in under two years, shipping production systems and AI features for enterprise clients and leading teams across time zones.",
  keywords: [
    "Andrew Luswata",
    "software engineer",
    "AI engineer",
    "project manager",
    "frontend lead",
    "full-stack",
    "LLM integration",
    "Kampala",
    "Uganda",
  ],
  openGraph: {
    title: "Andrew Luswata · Software Engineer · AI Engineer · Project Manager",
    description:
      "Frontend developer to Frontend Lead to Project Manager at AIBOS in under two years. Shipped production systems and AI features, and led teams across time zones.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${grotesk.variable} ${plexMono.variable}`}>
      <body className="font-sans bg-ink text-paper">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <ToastContainer theme="dark" position="bottom-right" />
      </body>
      {process.env.NEXT_PUBLIC_GTM ? (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      ) : null}
    </html>
  );
}
