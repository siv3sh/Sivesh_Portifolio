import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/effects/MarqueeStrip";
import TrustBar from "./components/TrustBar";
import About from "./components/About";
import Process from "./components/Process";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import CtaBand from "./components/CtaBand";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GlobalBackground from "./components/effects/GlobalBackground";
import DepthField from "./components/effects/DepthField";
import ScrollProgress from "./components/effects/ScrollProgress";
import SmoothScroll from "./providers/SmoothScroll";
import { useVisualBudget } from "./hooks/useVisualBudget";

const GlobalSwarmCanvas = lazy(() => import("./components/webgl/GlobalSwarmCanvas"));

export default function App() {
  const budget = useVisualBudget();

  return (
    <SmoothScroll>
      <div className={`${budget.grain ? "grain" : ""} relative min-h-screen`}>
        <ScrollProgress />
        <GlobalBackground />
        <DepthField />
        <Suspense fallback={null}>
          <GlobalSwarmCanvas />
        </Suspense>

        <div className="relative z-10">
          <Navbar />
          <main className="immersive-main">
            <Hero />
            <MarqueeStrip />
            <TrustBar />
            <About />
            <Process />
            <Skills />
            <Projects />
            <Experience />
            <CtaBand />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
