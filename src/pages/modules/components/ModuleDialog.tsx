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
import { useAppDispatch } from "../../../app/common/hooks";
import { requestNewModule } from "../ModulesPage.slice";

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
  dialogOperation: DialogStatus;
  handleClose: () => void;
}

export function ModuleDialog(props: ModuleDialogProps) {
  const { open, dialogOperation, handleClose } = props;

  const [moduleInput, setModuleInput] = React.useState<INewModule>({
    numberInput: 0,
    nameInput: "",
  });

  const dispatch = useAppDispatch();

  const handleDialogSubmit = () => {
    if (dialogOperation === DialogStatus.CREATE) {
      dispatch(
        requestNewModule({
          moduleName: moduleInput.nameInput,
          moduleNum: moduleInput.numberInput,
        })
      );
    } else if (dialogOperation === DialogStatus.EDIT) {
      // dispatch rename module
    }

    // TODO:
    //  dont close before checking
    //  if action was successful
    handleClose();
  };

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
              setModuleInput({
                ...moduleInput,
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
              setModuleInput({
                ...moduleInput,
                nameInput: event.target.value,
              });
            }}
            fullWidth
            focused
          />
        </Form>

        <Footer>
          <AddButton onClick={() => handleDialogSubmit()} variant="outlined">
            Add module
          </AddButton>
        </Footer>
      </Paper>
    </Dialog>
  );
}
