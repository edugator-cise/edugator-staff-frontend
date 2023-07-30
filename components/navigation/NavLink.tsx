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
        className={`w-full border border-transparent h-[42px] transition rounded-[6px] overflow-hidden box-border flex items-center justify-start px-[10px] group space-x-4 ${
          active
            ? "bg-blue-300/20 text-white "
            : "text-nav-inactive-light hover:bg-blue-300/5"
        }`}
      >
        <div className="w-[20px] h-[20px] min-w-[20px]">{icon(active)}</div>
        <label
          className={`group-hover:text-white font-dm text-[13px] pointer-events-none transition text-ellipsis whitespace-nowrap ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {text}
        </label>
      </button>
    </NavLinkTooltip>
  );
};
