import { NextRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

export const useNavigationConfirmation = (
  unsavedChanges: boolean,
  router: NextRouter
) => {
  const [nextUrl, setNextUrl] = useState("");
  const eventListenerActive = useRef(true);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const nextNavigationHandler = (url: string) => {
    if (unsavedChanges && eventListenerActive.current) {
      setConfirmModalOpen(true);
      setNextUrl(url);
      router.events.emit("routeChangeError");
      throw "Abort route change by user confirmation";
    }
  };

  useEffect(() => {
    router.events.on("routeChangeStart", nextNavigationHandler);

    return () => {
      router.events.off("routeChangeStart", nextNavigationHandler);
    };
  }, [unsavedChanges, router.events]);

  const handleModalClose = (shouldNavigate: boolean) => {
    setConfirmModalOpen(false);
    if (shouldNavigate && nextUrl) {
      eventListenerActive.current = false;

      router
        .push(nextUrl)
        .then(() => {
          eventListenerActive.current = true;
        })
        .catch(() => {
          eventListenerActive.current = true;
        });
    }
  };

  return { confirmModalOpen, handleModalClose, setConfirmModalOpen };
};
