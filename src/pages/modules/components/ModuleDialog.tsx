import React from "react";
import {
  Button,
  TextField,
  TextFieldProps,
  DialogTitle,
  Dialog,
  Paper,
  Divider,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { INewModule, DialogStatus } from "../types";

const Form = styled("div")({
  display: "flex",
});

const NumberField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  minWidth: "11%",
  maxWidth: "13%",
  margin: theme.spacing(1),
  marginLeft: theme.spacing(3),
}));

const NameTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  margin: theme.spacing(1),
  maxWidth: "70%",
}));

const DialogContent = styled(DialogContentText)(({ theme }) => ({
  margin: theme.spacing(1),
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
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
    return "Closing this dialog";
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
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <Paper elevation={3}>
        <DialogTitle id="module-title-dialog">
          {dialogTitle(dialogOperation)}
        </DialogTitle>
        <Divider />
        <DialogContent>
          To add a new module, or to modify a module's name and number, please
          use the form below.
        </DialogContent>
        <Form>
          <NumberField
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
