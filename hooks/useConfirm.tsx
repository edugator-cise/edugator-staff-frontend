import AlertModal from "components/shared/Modals/AlertModal";
import { useState } from "react";

const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<boolean>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = (): Promise<boolean> =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };
  // You could replace the Dialog with your library's version
  const ConfirmationDialog = () => (
    <AlertModal
      open={promise !== null}
      setOpen={handleClose}
      title={title}
      description={message}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      confirmText="Yes"
    />
  );
  return [ConfirmationDialog, confirm];
};

export default useConfirm;
