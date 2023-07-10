import { AdminNavLinkText, NavLinkText } from "./navigationData";
import { NavLinkTooltip } from "./NavLinkTooltip";

export const NavLink = ({
  icon,
  text,
  open,
  active,
  onClick,
}: {
  icon: (active: boolean) => React.ReactNode;
  text: NavLinkText | AdminNavLinkText;
  open: boolean;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <NavLinkTooltip text={text} disabled={open}>
      <button
        onClick={() => {
          onClick();
        }}
        className={`w-full h-12 rounded-md overflow-hidden box-border flex items-center justify-start px-[14px] group space-x-4 ${
          active
            ? "bg-emerald-500/10 ring-emerald-500/40 ring-2 text-white"
            : "text-nav-inactive-light hover:bg-emerald-500/5"
        }`}
      >
        <div className="w-5 h-5 min-w-[20px]">{icon(active)}</div>
        <label
          className={`text-sm group-hover:text-white pointer-events-none transition text-ellipsis whitespace-nowrap ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {text}
        </label>
      </button>
    </NavLinkTooltip>
  );
};
