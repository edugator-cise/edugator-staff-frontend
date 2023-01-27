import LandingFeatures from "components/LandingPage/LandingFeatures";
import LandingHome from "components/LandingPage/LandingHome";
import LandingTopics from "components/LandingPage/LandingTopics";
import VerticalNavigation from "../src/shared/VerticalNavigation";

export default function LandingPage() {
  return (
    <>
      <VerticalNavigation light></VerticalNavigation>
      <LandingHome />
      <LandingFeatures />
      <LandingTopics />
    </>
  );
}
