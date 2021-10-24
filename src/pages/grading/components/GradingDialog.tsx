import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "./GenericDialog";

const Input = styled("input")({
  display: "none",
});

const FileDropButton = styled(Button)(({ theme }) => ({
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
  "&:dragOver": { // doesnt do anything, find working solution
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}));

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
      label: "Add Module",
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
      <>
        <label htmlFor="student-solutions-file">
          <Input
            id="student-solutions-file"
            type="file"
            accept=".zip"
            ref={fileInputRef}
            onChangeCapture={onFileCapture}
          />

          <FileDropButton
            onDragOver={(event) => {
              preventDefaults(event);
              console.log("dragging over?");
            }}
            onDrop={(event) => {
              preventDefaults(event);
              console.log("did you just drop soemthing?");
            }}
            onClick={() => {
              // trigger file input dialog
              fileInputRef.current?.click();
            }}
          >
            Drag file here or click to begin
          </FileDropButton>
        </label>
      </>
    </Dialog>
  );
}
