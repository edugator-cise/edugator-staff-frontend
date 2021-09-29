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

export interface NewModuleDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (moduleInput: INewModule) => void;
}

interface INewModule {
  nameInput: string;
  numberInput: number;
}

export default function NewModuleDialog(props: NewModuleDialogProps) {
  const { open, handleClose, handleSubmit } = props;

  const [moduleValues, setModuleValues] = React.useState<INewModule>({
    numberInput: 0,
    nameInput: "",
  });

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="new-module-dialog"
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <Paper elevation={3}>
        <DialogTitle id="module-title-dialog">Add a new module</DialogTitle>
        <Divider />
        <Form>
          <NumberField
            id="outlined-new-module"
            label="Number"
            variant="filled"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(event) => {
              setModuleValues({
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
              setModuleValues({
                ...moduleValues,
                nameInput: event.target.value,
              });
            }}
            fullWidth
            focused
          />
        </Form>

        <Footer>
          <AddButton
            onClick={() => handleSubmit(moduleValues)}
            variant="outlined"
          >
            Add module
          </AddButton>
        </Footer>
      </Paper>
    </Dialog>
  );
}
