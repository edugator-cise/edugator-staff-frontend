import React from "react";
import {
  Button,
  DialogTitle,
  Dialog,
  Paper,
  Divider,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const DialogContent = styled(DialogContentText)(({ theme }) => ({
  margin: theme.spacing(1),
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
}));

const Input = styled("input")({
  display: "none",
});

const GradeButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Footer = styled("div")({
  float: "right",
});

interface GradingDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function GradingDialog(props: GradingDialogProps) {
  const { open, handleClose } = props;

  const handleDialogSubmit = () => {
    // TODO:
    //  dont close before checking
    //  if action was successful
    // handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <Paper elevation={3}>
        <DialogTitle>Grading dialog</DialogTitle>
        <Divider />
        <DialogContent>
          To grade student submissions, drag and drop them into the box below.
        </DialogContent>

        <label htmlFor="student-solutions-file">
          <Input
            accept=".zip"
            id="student-solutions-file"
            type="file"
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>

        <Footer>
          <GradeButton onClick={() => handleDialogSubmit()} variant="outlined">
            Grade
          </GradeButton>
        </Footer>
      </Paper>
    </Dialog>
  );
}
