/**
 * These are the svg paths that are shown when a module dropdown is opened
 */

export const ModulePath = ({ moduleOpen }: { moduleOpen: boolean }) => (
  <svg
    width="12"
    height="120"
    viewBox="0 0 18 218"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.7619 1.5791V204.575C1.7619 209.416 5.58548 216.34 16.1739 216.34"
      stroke="#42454F"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray={moduleOpen ? "1000" : "0"}
      strokeDashoffset={moduleOpen ? "1000" : "0"}
      style={
        moduleOpen
          ? {
              animationName: "dash",
              animationDuration: "1s",
              animationTimingFunction: "ease-in",
              animationFillMode: "forwards",
              animationDelay: `0`,
              animationDirection: "normal",
            }
          : {}
      }
      className={`transition-colors duration-300 ${
        moduleOpen ? "stroke-slate-700" : "stroke-nav-dark"
      }`}
    />
  </svg>
);

export const ItemPath = ({
  moduleOpen,
  index,
}: {
  moduleOpen: boolean;
  index: number;
}) => (
  <svg
    width="12"
    height="120"
    viewBox="0 0 18 218"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="curved-path"
      d="M1.7619 1.5791V204.575C1.7619 209.416 5.58548 216.34 16.1739 216.34"
      stroke="#42454F"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="1000"
      strokeDashoffset="1000"
      style={{
        animationName: "dash",
        animationDuration: "4s",
        animationTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
        animationFillMode: "forwards",
        animationDelay: `${index * 0.2 - 0.05}s`,
        animationDirection: "normal",
        animationIterationCount: "1",
      }}
      className={`transition-all duration-300  path ${
        moduleOpen ? "stroke-slate-700" : "stroke-nav-dark"
      }`}
    />
  </svg>
);
