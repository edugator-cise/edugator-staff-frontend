import React from "react";
import * as Switch from "@radix-ui/react-switch";

const SwitchToggle = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <Switch.Root
      className="w-11 h-6 cursor-pointer rounded-full relative border border-emerald-500/50 bg-gray-800 data-[state=checked]:bg-emerald-500 outline-none"
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-[1px] will-change-transform data-[state=checked]:translate-x-[21px]" />
    </Switch.Root>
  );
};

export default SwitchToggle;
