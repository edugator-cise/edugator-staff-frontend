import React from "react";
import {
  Button,
  TextField,
  TextFieldProps,
  DialogTitle,
  Dialog,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { INewModule, DialogStatus } from "../types";

const Form = styled("div")({
  display: "flex",
});

const NumberField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  marginLeft: theme.spacing(3),
  marginTop: theme.spacing(2),
  margin: theme.spacing(1),
  minWidth: "11%",
  maxWidth: "13%",
}));

const NameTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  marginLeft: theme.spacing(3),
  marginTop: theme.spacing(2),
  margin: theme.spacing(1),
  maxWidth: "70%",
}));

const AddButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Footer = styled("div")({
  float: "right",
});

const dialogTitle = (status: DialogStatus) => {
  if (status === DialogStatus.CREATE) {
    return "Creating a new module";
  } else if (status === DialogStatus.EDIT) {
    return "Editing an existing module";
  } else {
    return "This dialog should not be here";
  }
};

export interface ModuleDialogProps {
  open: boolean;
  moduleValues: INewModule;
  dialogOperation: DialogStatus;
  handleClose: () => void;
  handleSubmit: () => void;
  moduleValuesInput: (input: INewModule) => void;
}

export function ModuleDialog(props: ModuleDialogProps) {
  const {
    open,
    moduleValues,
    dialogOperation,
    handleClose,
    handleSubmit,
    moduleValuesInput,
  } = props;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="new-module-dialog"
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <Paper elevation={3}>
        <DialogTitle id="module-title-dialog">
          {dialogTitle(dialogOperation)}
        </DialogTitle>
        <Divider />
        <Form>
          <NumberField
            id="outlined-module-number"
            label="Number"
            variant="filled"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(event) => {
              moduleValuesInput({
                ...moduleValues,
                numberInput: parseInt(event.target.value),
              });
            }}
            fullWidth
            focused
          />
          <NameTextField
            id="outlined-new-module"
            label="Module Name"
            variant="filled"
            onChange={(event) => {
              moduleValuesInput({
                ...moduleValues,
                nameInput: event.target.value,
              });
            }}
            fullWidth
            focused
          />
        </Form>

        <Footer>
          <AddButton onClick={() => handleSubmit()} variant="outlined">
            Add module
          </AddButton>
        </Footer>
      </Paper>
    </Dialog>
  );
}
