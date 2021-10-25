import React from "react";
import { Button, ButtonProps, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadIcon from "../../../assets/folder_upload.svg";
import Dialog from "./GenericDialog";

interface DropAreaButtonProps extends ButtonProps {
  hoverDragging?: boolean;
}

const FileDropButton = styled(Button)<DropAreaButtonProps>(
  ({ hoverDragging, theme }) => ({
    width: "100%",
    height: "100%",
    minHeight: "30vh",
    marginTop: theme.spacing(1),
    borderRadius: 0,
    border: "dashed",
    // styles for the svg image
    "& img": {
      transition: "all 0.2s",
    },
    "&:hover": {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      "& img": {
        // to go from black to current theme.primary.main
        filter:
          "invert(47%) sepia(99%) saturate(2049%) hue-rotate(184deg) brightness(97%) contrast(97%)",
      },
    },
    // styles when hovering with file
    // "&:hoverDragging": (pretend)
    ...(hoverDragging && {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      "& img": {
        transition: "all 0.2s",
        filter:
          "invert(47%) sepia(99%) saturate(2049%) hue-rotate(184deg) brightness(97%) contrast(97%)",
      },
    }),
  })
);

interface GradingDialogProps {
  open: boolean;
  problem_id: string;
  handleClose: () => void;
}

export function GradingDialog(props: GradingDialogProps) {
  const { open, problem_id, handleClose } = props;

  const preventDefaults = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const onFileCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    /*Selected files data can be collected here.*/
    console.log(event.target.files);
  };

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

  const [hoverDragging, setHoverDragging] = React.useState(false);
  const setHoverStyles = () => {
    setHoverDragging(true);
  };
  const resetStyles = () => {
    setHoverDragging(false);
  };

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
            onDragOver={(event) => {
              preventDefaults(event);
              console.log("dragging over?");
            }}
            onDragEnter={setHoverStyles}
            onDragExit={resetStyles}
            onDrop={(event) => {
              preventDefaults(event);
              //console.log(event);
              console.log("did you just drop soemthing?");
            }}
            onClick={() => {
              // trigger file input dialog
              fileInputRef.current?.click();
            }}
            hoverDragging={hoverDragging}
          >
            <Stack alignItems="center" justifyContent="center">
              <p>Drag file here or click to begin</p>
              <img
                src={UploadIcon}
                alt="Upload .zip file"
                style={{ width: "40%" }}
              />
            </Stack>
          </FileDropButton>
        </label>
      </Stack>
    </Dialog>
  );
}
