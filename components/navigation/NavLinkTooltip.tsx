import { useEffect, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

export const NavLinkTooltip = ({
  text,
  children,
  disabled,
}: {
  text: string;
  children: React.ReactNode;
  disabled: boolean;
}) => {
  const [open, setOpen] = useState(false);

  // hide tooltip on sidebar collapse
  useEffect(() => {
    if (!disabled) setOpen(false);
  }, [disabled]);

  return (
    <Tooltip.Provider disableHoverableContent={disabled} delayDuration={150}>
      <Tooltip.Root open={disabled ? false : open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            className="TooltipContent z-[100] data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade text-sm font-dm select-none rounded-[4px] bg-nav-darker border border-slate-700 text-slate-300 px-3 py-2 leading-none will-change-[transform,opacity]"
            sideOffset={10}
          >
            {text}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
