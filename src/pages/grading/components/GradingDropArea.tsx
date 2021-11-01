import React from "react";
import { styled } from "@mui/material/styles";
import { Icon, Stack, Button, ButtonProps, Typography } from "@mui/material";
import { IFeedback, AlertType } from "../../../shared/types";

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

const preventDefaults = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
};

const noFeedback = { display: false, type: AlertType.info };

interface GradingDropAreaProps {
  setFeedback: (feedback: IFeedback) => void;
  fileToGrade?: File;
  setFileToGrade: (toGrade?: File) => void;
  error: boolean;
  setError: (error: boolean) => void;
}

export function GradingDropArea(props: GradingDropAreaProps) {
  const { setFeedback, fileToGrade, setFileToGrade, error, setError } = props;

  const [hoverDragging, setHoverDragging] = React.useState(false);
  const setHoverStyles = () => setHoverDragging(true);
  const resetHoverStyles = () => setHoverDragging(false);

  // handler for clicking the drop area
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const clickInputRef = () => fileInputRef.current?.click();

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files !== null) {
      handleFiles(event.target.files);
    }
    resetHoverStyles();
  };

  // handler for dropping in the drop area
  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    preventDefaults(event);

    handleFiles(event.dataTransfer.files);

    resetHoverStyles();
  };

  // error handlers
  const handleFiles = (files: FileList) => {
    let checkFeedback = checkFiles(files);
    setFeedback(checkFeedback);

    if (checkFeedback.type === AlertType.success) {
      setFileToGrade(files[0]);
    } else {
      setFileToGrade(undefined);
    }
  };

  const checkFiles = (dropped_items: FileList) => {
    // reset feedback, set it at the end
    setFeedback(noFeedback);

    let newFeedback: IFeedback = {
      display: true,
      type: AlertType.error,
    };

    if (dropped_items.length > 1) {
      newFeedback.message = "Please only drop one file";
      setError(true);
    } else if (dropped_items[0].name.split(".").pop() !== "zip") {
      newFeedback.message = "Please drop a .zip file";
      setError(true);
    } else {
      newFeedback.type = AlertType.success;
      newFeedback.message = "File selected without issues";
      setError(false);
    }

    return newFeedback;
  };

  // drop area title handler
  const dropAreaTitle = (filename?: string) => {
    if (hoverDragging) {
      return "Drop a .zip file here to grade solutions";
    } else if (!error && filename) {
      return "File uploaded: " + filename;
    } else {
      return "Click or Drag file here to begin";
    }
  };

  return (
    <label htmlFor="student-solutions-file">
      <input
        id="student-solutions-file"
        type="file"
        accept=".zip"
        ref={fileInputRef}
        onChange={onFileSelect}
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
  );
}
