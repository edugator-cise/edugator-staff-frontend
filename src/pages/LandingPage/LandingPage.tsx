<<<<<<< HEAD
import React from 'react'
=======
import React from "react";
>>>>>>> dba071fb153b726e2055a0b7ca8c584ce5841249
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
    )
}

export default LandingPage
