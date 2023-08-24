import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-xs font-dm rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-500 text-slate-50 shadow hover:bg-slate-500/80 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-900/80",
        secondary:
          "border-transparent bg-gray-500 text-gray-800 hover:bg-gray-500/80 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-600/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
        success:
          "border-transparent bg-emerald-500 text-slate-50 shadow hover:bg-emerald-500/80 dark:bg-emerald-900 dark:text-slate-50 dark:hover:bg-emerald-900/80",
        warning:
          "border-transparent bg-amber-500 text-slate-50 shadow hover:bg-amber-500/80 dark:bg-amber-900 dark:text-slate-50 dark:hover:bg-amber-900/80",
        outline: "text-slate-950 dark:text-slate-50",
        gray: "border-transparent bg-gray-500 text-gray-800 hover:bg-gray-500/80 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-600/80",
        zinc: "border-transparent bg-zinc-500 text-slate-50 shadow hover:bg-zinc-500/80 dark:bg-zinc-900 dark:text-slate-50 dark:hover:bg-zinc-900/80",
        neutral:
          "border-transparent bg-neutral-500 text-slate-50 shadow hover:bg-neutral-500/80 dark:bg-neutral-900 dark:text-slate-50 dark:hover:bg-neutral-900/80",
        stone:
          "border-transparent bg-stone-500 text-slate-50 shadow hover:bg-stone-500/80 dark:bg-stone-900 dark:text-slate-50 dark:hover:bg-stone-900/80",
        orange:
          "border-transparent bg-orange-500 text-slate-50 shadow hover:bg-orange-500/80 dark:bg-orange-900 dark:text-slate-50 dark:hover:bg-orange-900/80",
        amber:
          "border-transparent bg-amber-500 text-slate-50 shadow hover:bg-amber-500/80 dark:bg-amber-900 dark:text-slate-50 dark:hover:bg-amber-900/80",
        yellow:
          "border-transparent bg-yellow-500 text-slate-50 shadow hover:bg-yellow-500/80 dark:bg-yellow-900 dark:text-slate-50 dark:hover:bg-yellow-900/80",
        lime: "border-transparent bg-lime-500 text-slate-50 shadow hover:bg-lime-500/80 dark:bg-lime-900 dark:text-slate-50 dark:hover:bg-lime-900/80",
        green:
          "border-transparent bg-green-500 text-slate-50 shadow hover:bg-green-500/80 dark:bg-green-900 dark:text-slate-50 dark:hover:bg-green-900/80",
        emerald:
          "border-transparent bg-emerald-500 text-slate-50 shadow hover:bg-emerald-500/80 dark:bg-emerald-900 dark:text-slate-50 dark:hover:bg-emerald-900/80",
        teal: "border-transparent bg-teal-500 text-slate-50 shadow hover:bg-teal-500/80 dark:bg-teal-900 dark:text-slate-50 dark:hover:bg-teal-900/80",
        cyan: "border-transparent bg-cyan-500 text-slate-50 shadow hover:bg-cyan-500/80 dark:bg-cyan-900 dark:text-slate-50 dark:hover:bg-cyan-900/80",
        sky: "border-transparent bg-sky-500 text-slate-50 shadow hover:bg-sky-500/80 dark:bg-sky-900 dark:text-slate-50 dark:hover:bg-sky-900/80",
        blue: "border-transparent bg-blue-500 text-slate-50 shadow hover:bg-blue-500/80 dark:bg-blue-900 dark:text-slate-50 dark:hover:bg-blue-900/80",
        indigo:
          "border-transparent bg-indigo-500 text-slate-50 shadow hover:bg-indigo-500/80 dark:bg-indigo-900 dark:text-slate-50 dark:hover:bg-indigo-900/80",
        violet:
          "border-transparent bg-violet-500 text-slate-50 shadow hover:bg-violet-500/80 dark:bg-violet-900 dark:text-slate-50 dark:hover:bg-violet-900/80",
        purple:
          "border-transparent bg-purple-500 text-slate-50 shadow hover:bg-purple-500/80 dark:bg-purple-900 dark:text-slate-50 dark:hover:bg-purple-900/80",
        fuchsia:
          "border-transparent bg-fuchsia-500 text-slate-50 shadow hover:bg-fuchsia-500/80 dark:bg-fuchsia-900 dark:text-slate-50 dark:hover:bg-fuchsia-900/80",
        pink: "border-transparent bg-pink-500 text-slate-50 shadow hover:bg-pink-500/80 dark:bg-pink-900 dark:text-slate-50 dark:hover:bg-pink-900/80",
        rose: "border-transparent bg-rose-500 text-slate-50 shadow hover:bg-rose-500/80 dark:bg-rose-900 dark:text-slate-50 dark:hover:bg-rose-900/80",
        slate:
          "border-transparent bg-slate-500 text-slate-50 shadow hover:bg-slate-500/80 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-900/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
