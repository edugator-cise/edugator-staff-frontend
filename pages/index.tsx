import About from "components/landing/About/About";
import Hero from "components/landing/Hero";
import Instructors from "components/landing/Instructors/Instructors";
import Students from "components/landing/Students/Students";
import AI from "components/landing/AI";
import Footer from "components/landing/Footer";
import CTA from "components/landing/CTA";
import Header from "components/landing/Header";

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
