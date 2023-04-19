import About from "components/LandingPage/About/About";
import Hero from "components/LandingPage/Hero";
import Instructors from "components/LandingPage/Instructors/Instructors";
import Students from "components/LandingPage/Students/Students";
import AI from "components/LandingPage/AI";
import Footer from "components/LandingPage/Footer";
import CTA from "components/LandingPage/CTA";
import Header from "components/LandingPage/Header";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col relative bg-nav-darkest">
      <Header />
      <main className="flex flex-col bg-nav-darkest overflow-x-hidden">
        <Hero />
        <About />
        <Students />
        <Instructors />
        <AI />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
