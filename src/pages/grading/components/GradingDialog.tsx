import React from "react";
import {
  Alert,
  Stack,
  Collapse,
  TextField,
  TextFieldProps,
  LinearProgress,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IFeedback, AlertType, IProblemBase } from "../../../shared/types";
import { useAppDispatch, useAppSelector } from "../../../app/common/hooks";
import { GradingDropArea } from "./GradingDropArea";
import Dialog from "../../../shared/GenericDialog";
import {
  requestGrading,
  resetGradingState,
  setFeedback,
} from "../GradingDialog.slice";
import { IGradeRequest } from "../types";

const errorHelperText = "Please enter a valid email";
const helperText = "Please enter an email to receive the graded solutions";

const EmailField = styled(TextField)<TextFieldProps>({
  minWidth: "21rem",
  maxWidth: "45%",
});

const UploadAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(1),
  transitionProperty: "all",
  transitionDuration: "400ms",
}));

const ProgressHolder = styled("div")({
  display: "flex",
});

const UploadProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  width: "100%",
  margin: theme.spacing(1),
  marginTop: "auto",
  marginBottom: "auto",
}));

interface GradingDialogProps {
  open: boolean;
  problem: IProblemBase;
  handleClose: () => void;
}

export function GradingDialog(props: GradingDialogProps) {
  const { open, problem, handleClose } = props;
  const uploading = useAppSelector((state) => state.grading.uploading);
  const uploadState = useAppSelector((state) => state.grading.uploadState);
  const feedback = useAppSelector((state) => state.grading.feedback);

  const dispatch = useAppDispatch();

  // email validation status
  const [email, setEmail] = React.useState<string>("");
  const [touched, setTouched] = React.useState<boolean>(false);

  // email textfiel ref
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const validEmail = emailInputRef.current?.validity.valid;

  // set when file is uploaded, used if file is good
  const [fileToGrade, setFileToGrade] = React.useState<File>();
  const [fileError, setFileError] = React.useState<boolean>(false);

  const updateEmail = (email: string) => {
    setTouched(true);
    setEmail(email);
  };

  const handleDialogSubmit = () => {
    const newFeedback: IFeedback = {
      display: true,
      type: AlertType.error,
      message: "Something went wrong",
    };

    if (!validEmail) {
      newFeedback.message = "There an error in the email field";
    } else if (!email) {
      newFeedback.message = "Please enter an email to get the results back";
    } else if (fileError) {
      newFeedback.message = "There is error with the file selected";
    } else if (!fileToGrade) {
      newFeedback.message = "Please select a .zip file";
    } else {
      newFeedback.type = AlertType.info;
      newFeedback.message = "Uploading student submissions to the grader";

      const payload: IGradeRequest = {
        email: email,
        toGrade: fileToGrade,
        problemID: problem._id ?? "",
      };
      dispatch(requestGrading(payload));
    }

    dispatch(setFeedback(newFeedback));
  };

  const handleDialogClose = () => {
    setEmail("");
    setTouched(false);
    setFileToGrade(undefined);
    setFileError(false);
    dispatch(resetGradingState());
    handleClose();
  };

  const FooterButtons = [
    {
      label: "Cancel",
      onClick: handleDialogClose,
      variant: "contained",
      color: "error",
    },
    {
      label: "Submit solutions",
      onClick: handleDialogSubmit,
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
          type="email"
          label="Email"
          variant="filled"
          error={!validEmail && touched}
          helperText={!validEmail && touched ? errorHelperText : helperText}
          onChange={(event) => updateEmail(event.target.value)}
          inputRef={emailInputRef}
          required
        />

        <GradingDropArea
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

        <Collapse in={uploadState.display}>
          <Divider />
          <ProgressHolder>
            <Typography>{uploading ? "In-Progress:" : "Done!"}</Typography>

            <UploadProgress
              variant="determinate"
              value={uploadState.progress}
            />

            <Typography>{`${uploadState.progress}%`}</Typography>
          </ProgressHolder>
        </Collapse>
      </Stack>
    </Dialog>
  );
}
