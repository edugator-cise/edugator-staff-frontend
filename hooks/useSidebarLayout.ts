import { useState, useEffect } from "react";
import { useDeviceSize } from "hooks/useDeviceSize";
import { useDispatch } from "react-redux";

interface Props {
  mainSidebarHidden: boolean;
  contentSidebarHidden: boolean;
  setMainSidebarHidden: (value: boolean) => void;
  setContentSidebarHidden: (value: boolean) => void;
  mainSidebarWidth: number;
  mainSidebarExpandedWidth: number;
  contentSidebarWidth: number;
}

interface Return {
  contentMargin: () => number;
  contentSidebarOffset: () => number;
  dividerOffset: () => number | undefined;
  laptopContentMargin: () => number;
  mobileView: boolean;
  tabletView: boolean;
  laptopView: boolean;
  setMobileNavOpen: (value: boolean) => void;
  mobileNavOpen: boolean;
}

export const useSidebarLayout = ({
  mainSidebarHidden,
  contentSidebarHidden,
  setMainSidebarHidden,
  setContentSidebarHidden,
  mainSidebarWidth,
  mainSidebarExpandedWidth,
  contentSidebarWidth,
}: Props): Return => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { mobileView, tabletView, laptopView } = useDeviceSize();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!mobileView && !tabletView && !laptopView) {
      dispatch(setContentSidebarHidden(false));
      dispatch(setMainSidebarHidden(mainSidebarHidden));
    } else {
      setMobileNavOpen(false);
      dispatch(setContentSidebarHidden(true));
      dispatch(setMainSidebarHidden(true));
    }
  }, [mobileView, tabletView, laptopView]);

  const contentMargin = () => {
    if (contentSidebarHidden && mainSidebarHidden) {
      return mainSidebarWidth;
    } else if (contentSidebarHidden && !mainSidebarHidden) {
      return mainSidebarExpandedWidth;
    } else if (!contentSidebarHidden && mainSidebarHidden) {
      return contentSidebarWidth + mainSidebarWidth;
    } else {
      return contentSidebarWidth + mainSidebarExpandedWidth;
    }
  };

  const contentSidebarOffset = () => {
    if (contentSidebarHidden && mainSidebarHidden) {
      return -contentSidebarWidth + mainSidebarWidth;
    } else if (contentSidebarHidden && !mainSidebarHidden) {
      return -contentSidebarWidth + mainSidebarExpandedWidth;
    } else if (!contentSidebarHidden && mainSidebarHidden) {
      return mainSidebarWidth;
    } else {
      return mainSidebarExpandedWidth;
    }
  };

  const dividerOffset = () => {
    if (mainSidebarHidden) {
      return mainSidebarWidth;
    } else if (!mainSidebarHidden) {
      return mainSidebarExpandedWidth;
    }
  };

  const laptopContentMargin = () => {
    if (mainSidebarHidden) {
      return mainSidebarWidth;
    } else {
      return mainSidebarExpandedWidth;
    }
  };

  return {
    contentMargin,
    contentSidebarOffset,
    dividerOffset,
    laptopContentMargin,
    mobileView,
    tabletView,
    laptopView,
    setMobileNavOpen,
    mobileNavOpen,
  };
};
