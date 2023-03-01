import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as Tooltip from "@radix-ui/react-tooltip";

interface Props {
  markdownString: string;
}

function Image(props: { alt: string } & any) {
  return (
    <img
      alt={props.alt}
      {...props}
      className="border rounded-md dark:border-slate-700"
      style={{ maxWidth: "100%" }}
    />
  );
}

function Code(props: any) {
  const triggerRef = useRef(null);
  const [copyText, setCopyText] = useState("Click to copy");

  const onCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopyText("Copied!");
    setTimeout(() => {
      setCopyText("Click to copy");
    }, 2000);
  };

  return (
    <Tooltip.Provider disableHoverableContent={true} delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger
          asChild
          ref={triggerRef}
          onClick={(event) => event.preventDefault()}
        >
          <code
            className="bg-slate-50 p-1 rounded-md text-slate-900"
            {...props}
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            onPointerDownOutside={(event) => {
              if (event.target === triggerRef.current) event.preventDefault();
              onCopy((props.children[0] && props.children[0]) || "");
            }}
            side="right"
            sideOffset={5}
            className={`TooltipContent data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade bg-white font-dm text-sm px-2 py-1 border rounded-md text-slate-700 ${
              copyText === "Copied!" ? "!text-slate-500" : ""
            }`}
          >
            {copyText}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export const Markdown = ({ markdownString }: Props) => (
  <div className="w-full">
    <ReactMarkdown
      className="text-slate-900 font-inter markdown !min-w-0"
      children={markdownString}
      components={{ img: Image, code: Code }}
      remarkPlugins={[remarkGfm]}
    />
  </div>
);
