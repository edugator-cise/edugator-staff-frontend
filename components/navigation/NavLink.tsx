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
        className={`font-sans w-full p-px transition rounded-lg ${
          active
            ? "!bg-[#22403C] dark:!bg-[#2F4E4C]  from-[#22403C] via-[#19292E] to-[#19292E] dark:from-[#2F4E4C] dark:via-[#283A42] dark:to-[#283A42]" //add in 'bg-gradient-t-b' for depth
            : ""
        }`}
      >
        <div
          className={`w-full h-[40px] transition rounded-[7px] overflow-hidden box-border flex items-center justify-start px-[15px] group space-x-4 ${
            active
              ? "bg-[#19292E] dark:bg-[#283A42] text-white"
              : "text-nav-inactive-light hover:bg-emerald-500/5"
          }`}
        >
          <div className="w-4 h-4 min-w-[16px]">{icon(active)}</div>
          <label
            className={`group-hover:text-white text-[13px] pointer-events-none transition text-ellipsis whitespace-nowrap ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {text}
          </label>
        </div>
      </button>
    </NavLinkTooltip>
  );
};
