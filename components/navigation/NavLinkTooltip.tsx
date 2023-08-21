import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <Tooltip
      open={disabled ? false : open}
      onOpenChange={setOpen}
      disableHoverableContent={disabled}
      delayDuration={150}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={10}>
        {text}
      </TooltipContent>
    </Tooltip>
  );
};
