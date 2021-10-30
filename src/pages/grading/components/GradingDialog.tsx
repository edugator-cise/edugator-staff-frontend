import React from "react";
import {
  Alert,
  Stack,
  Collapse,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IFeedback, AlertType, IProblemBase } from "../../../shared/types";
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
  problem: IProblemBase;
  handleClose: () => void;
}

export function GradingDialog(props: GradingDialogProps) {
  const { open, problem, handleClose } = props;

  // email validation status
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  // set when file is uploaded, used if file is good
  const [fileToGrade, setFileToGrade] = React.useState<File>();
  const [fileError, setFileError] = React.useState<boolean>(false);

  // feedback status
  const [feedback, setFeedback] = React.useState<IFeedback>(noFeedback);

  const errorHelperText = "Please enter a valid email";
  const defaultHelperText =
    "Please enter an email to receive the graded solutions";

  // handler when clicking submit solutions
  const handleDialogSubmit = () => {
    // TODO:
    //  dont close before checking
    //  if action was successful

    let newFeedback: IFeedback = {
      display: true,
      type: AlertType.error,
      message: "Some fields were incomplete",
    };

    if (error) {
      newFeedback.message = "There an error in the email field";
    } else if (!email) {
      newFeedback.message = "Please enter an email to get the results back";
      setError(true);
    } else if (fileError) {
      newFeedback.message = "There is error with the file selected";
    } else if (!fileToGrade) {
      newFeedback.message = "Please select a .zip file";
    } else {
      newFeedback.type = AlertType.success;
      newFeedback.message = "All checks passed";
      // create dispatch for when eveything is fine
    }

    setFeedback(newFeedback);

    //close after dispatch response
    //handleDialogClose();
  };

  const handleDialogClose = () => {
    setEmail("");
    setError(false);
    setFileToGrade(undefined);
    setFileError(false);
    setFeedback(noFeedback);
    handleClose();
  };

  const validateEmail = (email: string) => {
    setError(false);
    setEmail(email);
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
      title={`Grading: "${problem.title}"`}
      handleClose={handleDialogClose}
      footerContent={FooterButtons}
    >
      <Stack spacing={1}>
        <EmailField
          label="Email"
          variant="filled"
          required
          helperText={error ? errorHelperText : defaultHelperText}
          onChange={(event) => validateEmail(event.target.value)}
          error={error}
        />

        <GradingDropArea
          setFeedback={setFeedback}
          fileToGrade={fileToGrade}
          setFileToGrade={setFileToGrade}
          error={fileError}
          setError={setFileError}
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
