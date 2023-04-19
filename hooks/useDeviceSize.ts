import { useEffect, useState } from "react";
import useWindowWidth from "./useWindowSize";

export const useDeviceSize = () => {
  const [mobileView, setMobileView] = useState(false);
  const [tabletView, setTabletView] = useState(false);
  const [laptopView, setLaptopView] = useState(false);

  const windowWidth = useWindowWidth();
  useEffect(() => {
    if (!windowWidth) return;
    if (windowWidth < 800) {
      setMobileView(true);
      setTabletView(false);
      setLaptopView(false);
      return;
    } else if (windowWidth < 1024) {
      setMobileView(false);
      setTabletView(true);
      setLaptopView(false);
    } else if (windowWidth < 1420) {
      setMobileView(false);
      setTabletView(false);
      setLaptopView(true);
    } else {
      setTabletView(false);
      setMobileView(false);
      setLaptopView(false);
    }
  }, [windowWidth]);

  return { mobileView, tabletView, laptopView };
};
