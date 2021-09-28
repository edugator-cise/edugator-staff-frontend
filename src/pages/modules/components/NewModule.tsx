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

const NameTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  display: "block",
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
  handleSubmit: (name: string) => void;
}

export default function NewModuleDialog(props: NewModuleDialogProps) {
  const { open, handleClose, handleSubmit } = props;
  const [moduleName, setModuleName] = React.useState("");

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
        <NameTextField
          id="outlined-new-module"
          label="Module Name"
          variant="outlined"
          onChange={(event) => {
            setModuleName(event.target.value);
          }}
          placeholder="Module X: Sorting Algorithms"
          fullWidth
          autoFocus
        />

        <Footer>
          <AddButton
            onClick={() => handleSubmit(moduleName)}
            variant="outlined"
          >
            Add module
          </AddButton>
        </Footer>
      </Paper>
    </Dialog>
  );
}
