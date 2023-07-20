import * as Accordion from "@radix-ui/react-accordion";
import React from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon } from "@radix-ui/react-icons";

export const AccordionContent = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Accordion.Content
    className={
      "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden" +
      (className ? ` ${className}` : "")
    }
    {...props}
  >
    <div>{children}</div>
  </Accordion.Content>
);
