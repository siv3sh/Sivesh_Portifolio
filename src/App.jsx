import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/effects/MarqueeStrip";
import TrustBar from "./components/TrustBar";
import About from "./components/About";
import Process from "./components/Process";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Faq from "./components/Faq";
import CtaBand from "./components/CtaBand";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import { ToastProvider } from "./components/Toast";
import GlobalBackground from "./components/effects/GlobalBackground";
import ScrollProgress from "./components/effects/ScrollProgress";
import CursorField from "./components/effects/CursorField";
import SystemBoot from "./components/effects/SystemBoot";
import KineticWall from "./components/effects/KineticWall";
import SmoothScroll from "./providers/SmoothScroll";

export default function App() {
  return (
    <SmoothScroll>
      <ToastProvider>
        <div className="relative min-h-screen bg-ink">
          <SystemBoot />
          <ScrollProgress />
          <GlobalBackground />
          <CursorField />
          <CommandPalette />

          <div className="relative z-10">
            <Navbar />
            <main className="immersive-main">
              <Hero />
              <MarqueeStrip />
              <TrustBar />
              <About />
              <KineticWall />
              <Process />
              <Skills />
              <Projects />
              <Experience />
              <Faq />
              <CtaBand />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </ToastProvider>
    </SmoothScroll>
  );
}
