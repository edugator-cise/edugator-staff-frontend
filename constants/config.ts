//export const baseAPIURL = "http://localhost:8080/";
export const baseAPIURL = "https://edugator-admin.com/"; // For local testing with backend running, use "http://localhost:8080/"
//
export const unauthorizedErrorMessage =
  "You are not authorized to perform this action currently. Please log out and log back in.";

export const colors = {
  lightGray: "#f0f0f0",
  borderGray: "#e2e2e2",
  lightPink: "#fce4ec",
  redText: "#d81b60",
  navIconGray: "#969696",
};

export const adminPathRegex = /\/admin\/code*/;

export const dotGridStyle = {
  WebkitMaskImage:
    "linear-gradient(175deg, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
  backgroundImage: "radial-gradient(#79a1f940 1px, transparent 0)",
  backgroundSize: "30px 30px",
  backgroundPosition: "-7px -7px",
};
