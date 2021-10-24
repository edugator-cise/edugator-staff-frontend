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
}));

interface GradingDialogProps {
  open: boolean;
  problem_id: string;
  handleClose: () => void;
}

export function GradingDialog(props: GradingDialogProps) {
  const { open, problem_id, handleClose } = props;

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

  const handleHover = () => {};

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      title={"Grading dialog"}
      handleClose={handleClose}
      footerContent={FooterButtons}
    >
      <>
        Currently grading Problem_ID: {problem_id}
        <label htmlFor="student-solutions-file">
          <Input accept=".zip" id="student-solutions-file" type="file" />

          <FileDropButton onMouseOver={handleHover}>
            Drag file here or click to begin
          </FileDropButton>
        </label>
      </>
    </Dialog>
  );
}
