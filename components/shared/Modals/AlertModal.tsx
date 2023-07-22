import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const AlertModal = ({
  children,
  open,
  setOpen,
  title,
  description,
  trigger,
  onCancel,
  onConfirm,
  confirmText,
}: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText: string;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="DialogOverlay z-[250] bg-black/50 fixed inset-0" />
        <AlertDialog.Content className="DialogContent z-[300] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {title && (
            <AlertDialog.Title className="m-0 text-base font-semibold mb-2 font-dm text-slate-800">
              {title}
            </AlertDialog.Title>
          )}
          <AlertDialog.Description className="text-slate-500 mt-2 mb-4 text-sm leading-normal font-dm">
            {description && description}
          </AlertDialog.Description>
          {children}
          <div className="flex justify-end gap-4">
            <AlertDialog.Cancel asChild onClick={() => onCancel()}>
              <button className="text-slate-600 text-sm font-dm bg-slate-200 hover:bg-slate-300 focus:outline-blue-500 inline-flex py-3 items-center justify-center rounded-md px-[15px] leading-none ">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => {
                  setLoading(true);
                  onConfirm();
                  setOpen(false);
                  setLoading(false);
                }}
                className="text-white text-sm font-dm min-w-[70px] bg-red-500 hover:bg-red-600 cursor-pointer inline-flex py-3 focus:outline-red-800 items-center justify-center rounded-md px-4 leading-none "
              >
                {loading ? (
                  <div className="bouncing-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  confirmText
                )}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AlertModal;
