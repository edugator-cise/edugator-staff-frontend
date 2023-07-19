import React, { ButtonHTMLAttributes } from "react";

// an action button is a button that is used to perform an action (duh)
// it can be red, green, or blue

type CustomButtonProps = {
  color: "red" | "green" | "blue" | "gray";
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
} & Partial<ButtonHTMLAttributes<HTMLButtonElement>>;

const ActionButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  containerClassName,
  color = "blue",
  ...rest
}: {
  color?: "red" | "green" | "blue" | "gray";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) => {
  const outerClassName = () => {
    if (color === "blue")
      return "bg-gradient-to-b from-[#648AE8] via-[#648AE8] to-[#2458F2] shadow-[#2458F2]/10";
    if (color === "green")
      return "bg-gradient-to-b from-emerald-200 via-emerald-200 to-emerald-500 shadow-emerald-500/10";
    if (color === "red")
      return "bg-gradient-to-b from-red-300 via-red-300 to-red-500 shadow-red-500/10 hover:shadow-red-500/10";
    if (color === "gray")
      return "bg-gradient-to-b from-gray-300 via-gray-300 to-gray-400 shadow-gray-500/10 hover:shadow-gray-500/10";
  };

  const innerClassName = () => {
    if (color === "blue") return "bg-[#2458F2]";
    if (color === "green") return "bg-emerald-500";
    if (color === "red") return "bg-red-500";
    if (color === "gray") return "bg-gray-400";
  };

  return (
    <button
      {...rest}
      className={`p-px flex items-center group justify-center disabled:from-white disabled:opacity-50 disabled:to-gray-400 enabled:hover:brightness-110 cursor-pointer rounded-md group shadow-lg disabled:cursor-not-allowed enabled:hover:shadow-xl transition duration-200 ease-in-out ${
        outerClassName() || ""
      } ${containerClassName || ""}`}
    >
      <div
        className={`w-full h-full group-disabled:bg-gray-400 rounded-[5px] flex items-center space-x-2 px-3 py-2 text-xs text-white font-dm ${
          innerClassName() || ""
        } ${className || ""}`}
      >
        {children}
      </div>
    </button>
  );
};

export default ActionButton;
