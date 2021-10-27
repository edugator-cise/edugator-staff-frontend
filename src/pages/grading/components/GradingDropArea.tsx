import React from "react";
import {
  Icon,
  Stack,
  Alert,
  Button,
  ButtonProps,
  Typography,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IFeedback, AlertType } from "../../modules/types";

const UploadAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

interface DropAreaButtonProps extends ButtonProps {
  hover_dragging?: boolean;
}

const FileDropButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "hover_dragging",
})<DropAreaButtonProps>(({ hover_dragging, theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "30vh",
  marginTop: theme.spacing(1),
  borderRadius: 0,
  border: "dashed",
  "&:hover": {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  // styles when hovering with file
  // "&:hoverDragging": (pretend)
  ...(hover_dragging && {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  }),
}));

const noFeedback = { display: false, type: AlertType.info };

interface GradingDropAreaProps {
  feedback: IFeedback;
  setFeedback: (feedback: IFeedback) => void;
  fileToGrade?: File;
  setFileToGrade: (toGrade: File) => void;
}

export function GradingDropArea(props: GradingDropAreaProps) {
  const { feedback, setFeedback, fileToGrade, setFileToGrade } = props;

  const [hoverDragging, setHoverDragging] = React.useState(false);

  const preventDefaults = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // handler for clicking the drop area
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const clickInputRef = () => {
    fileInputRef.current?.click();
  };
  const onFileCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    /*Selected files data can be collected here.*/
    console.log(event.target.files);
  };

  // handler for dropping in the drop area

  const setHoverStyles = () => {
    setHoverDragging(true);
  };

  const resetHoverStyles = () => {
    setHoverDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    preventDefaults(event);

    let checkFeedback = checkFiles(event.dataTransfer.files);
    setFeedback(checkFeedback);

    if (checkFeedback.type === AlertType.success) {
      setFileToGrade(event.dataTransfer.files[0]);
    }

    resetHoverStyles();
  };

  // error handlers

  const checkFiles = (dropped_items: FileList) => {
    // reset feedback, set it at the end
    setFeedback(noFeedback);

    let newFeedback: IFeedback = {
      display: true,
      message: "File uploaded without issues",
      type: AlertType.success,
    };

    // check

    if (dropped_items.length > 1) {
      newFeedback.type = AlertType.error;
      newFeedback.message = "Please only drop one file";
    } else {
      let extension = dropped_items[0].name.split(".").pop();

      // just checking if the extension is .zip,
      // maybe its not secure enough?
      if (extension !== "zip") {
        newFeedback.type = AlertType.error;
        newFeedback.message = "Please drop a .zip file";
      }
    }

    return newFeedback;
  };

  // drop area title handler

  const dropAreaTitle = (filename?: string) => {
    if (hoverDragging) {
      return "Drop a .zip file here to grade solutions";
    } else if (feedback.display) {
      if (feedback.type === AlertType.success) {
        return "File uploaded: " + filename;
      }
      if (feedback.type === AlertType.error) {
        return "Something went wrong";
      }
    } else {
      return "Click or Drag file here to begin";
    }
  };

  return (
    <>
      <label htmlFor="student-solutions-file">
        <input
          id="student-solutions-file"
          type="file"
          accept=".zip"
          ref={fileInputRef}
          onChangeCapture={onFileCapture}
          style={{ display: "none" }}
        />

        <FileDropButton
          onDragEnter={setHoverStyles}
          onDragExit={resetHoverStyles}
          onDragOver={preventDefaults} // necessary
          onDrop={handleDrop}
          onClick={clickInputRef}
          hover_dragging={hoverDragging}
        >
          <Stack alignItems="center" justifyContent="center">
            <Typography>{dropAreaTitle(fileToGrade?.name)}</Typography>
            <Icon style={{ fontSize: "6rem" }}>drive_folder_upload</Icon>
          </Stack>
        </FileDropButton>
      </label>

      <Collapse in={feedback.display}>
        <UploadAlert variant="filled" severity={feedback.type}>
          {feedback.message}
        </UploadAlert>
      </Collapse>
    </>
  );
}
