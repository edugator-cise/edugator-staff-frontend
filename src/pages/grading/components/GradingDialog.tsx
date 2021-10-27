import React from "react";
import { Stack, TextField } from "@mui/material";
import { IFeedback, AlertType } from "../../modules/types";
import { GradingDropArea } from "./GradingDropArea";
import Dialog from "./GenericDialog";

const noFeedback = { display: false, type: AlertType.info };

interface GradingDialogProps {
  open: boolean;
  problem_id: string;
  handleClose: () => void;
}

export function GradingDialog(props: GradingDialogProps) {
  const { open, problem_id, handleClose } = props;

  // set when file is uploaded, used if file is good
  const [fileToGrade, setFileToGrade] = React.useState<File>();

  // error alert status
  const [feedback, setFeedback] = React.useState<IFeedback>(noFeedback);

  // handler when clicking submit solutions
  const handleDialogSubmit = () => {
    // TODO:
    //  dont close before checking
    //  if action was successful
    // handleClose();
  };

  const FooterButtons = [
    {
      label: "Cancel",
      onClick: () => handleDialogSubmit(),
      variant: "contained",
      color: "error",
    },
    {
      label: "Submit solutions",
      onClick: () => handleDialogSubmit(),
      variant: "contained",
    },
  ];

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      title={`Currently grading Problem_ID: ${problem_id}`}
      handleClose={handleClose}
      footerContent={FooterButtons}
    >
      <Stack spacing={1}>
        <TextField />
        <GradingDropArea
          feedback={feedback}
          setFeedback={setFeedback}
          fileToGrade={fileToGrade}
          setFileToGrade={setFileToGrade}
        />
      </Stack>
    </Dialog>
  );
}
