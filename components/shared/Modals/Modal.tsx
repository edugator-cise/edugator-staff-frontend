import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const Modal = ({
  children,
  open,
  setOpen,
  title,
  description,
  trigger,
  overlayClassName,
  contentClassName,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay
          className={`DialogOverlay z-[100] bg-black/50 fixed inset-0 ${
            overlayClassName && overlayClassName
          }`}
        />
        <Dialog.Content
          className={`DialogContent z-[200] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none ${
            contentClassName && contentClassName
          }`}
        >
          {title && (
            <Dialog.Title className="m-0 text-base font-bold mb-2 font-dm text-slate-800">
              {title}
            </Dialog.Title>
          )}
          <Dialog.Description className="text-slate-500 mt-2 mb-4 text-sm leading-normal font-dm">
            {description && description}
          </Dialog.Description>
          {children}

          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 inline-flex h-6 w-6 !text-slate-800 appearance-none items-center justify-center rounded-full focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
