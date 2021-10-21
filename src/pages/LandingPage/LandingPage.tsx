import React from "react";
import VerticalNavigation from "../../shared/VerticalNavigation";
import LandingHome from "./LandingHome";
import LandingFeatures from "./LandingFeatures";
import LandingTopics from "./LandingTopics";
import Footer from "../../shared/Footer";

function LandingPage() {
  return (
    <>
      <VerticalNavigation />
      <LandingHome />
      <LandingFeatures />
      <LandingTopics />
      <Footer />
    </>
  );
}

export default LandingPage;
