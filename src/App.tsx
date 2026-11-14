import { About } from "./sections/About";
import { Education } from "./sections/Education";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { BackToTop } from "./components/BackToTop";
import { CustomCursor } from "./components/CustomCursor";
import { IntroLoader } from "./components/IntroLoader";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { ThemeSettings } from "./theme/ThemeSettings";

export function App() {
  return (
    <>
      <IntroLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <ThemeSettings />
      <BackToTop />
    </>
  );
}
