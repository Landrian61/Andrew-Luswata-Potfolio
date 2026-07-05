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
  title: "Andrew Luswata — Software Developer & Creative Technologist",
  description:
    "Portfolio of Andrew Luswata — a software developer and creative technologist from Kampala, Uganda, building AI-powered products where engineering meets art. Full-stack development, prompt engineering, project leadership and UI/UX design.",
  keywords: [
    "Andrew Luswata",
    "software developer",
    "creative technologist",
    "full-stack",
    "AI",
    "prompt engineering",
    "UI/UX",
    "Kampala",
    "Uganda",
  ],
  openGraph: {
    title: "Andrew Luswata — Software Developer & Creative Technologist",
    description:
      "Building AI-powered products where engineering meets art.",
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
