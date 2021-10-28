import React from "react";
import {
  Alert,
  Stack,
  Collapse,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IFeedback, AlertType } from "../../../shared/types";
import { GradingDropArea } from "./GradingDropArea";
import Dialog from "../../../shared/GenericDialog";

const EmailField = styled(TextField)<TextFieldProps>({
  minWidth: "21rem",
  maxWidth: "45%",
});

const UploadAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

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
    handleClose();
  };

  const FooterButtons = [
    {
      label: "Cancel",
      onClick: () => handleClose(),
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
        <EmailField
          label="Email"
          variant="filled"
          required
          helperText="Please enter an email to receive the graded solutions"
        />

        <GradingDropArea
          feedback={feedback}
          setFeedback={setFeedback}
          fileToGrade={fileToGrade}
          setFileToGrade={setFileToGrade}
        />

        <Collapse in={feedback.display}>
          <UploadAlert variant="filled" severity={feedback.type}>
            {feedback.message}
          </UploadAlert>
        </Collapse>
      </Stack>
    </Dialog>
  );
}
