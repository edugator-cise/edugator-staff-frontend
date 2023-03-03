import React from "react";
import { TextField, Typography, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  DialogStatus,
  IAdminModule,
  NullModule,
} from "components/Modules/types";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDialog,
  requestNewModuleSuccess,
  requestModifyModuleSuccess,
} from "state/ModulesSlice";
import { IModuleBase } from "lib/shared/types";
import Dialog from "components/shared/GenericDialog";
import { isBlank } from "utils/CodeEditorUtils";
import { RootState } from "lib/store/store";
import apiClient from "lib/api/apiClient";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

const NumberField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: "22%",
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

const NameTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  maxWidth: "70%",
  marginTop: theme.spacing(2),
}));

function isInvalidNum(num: number) {
  return isNaN(num) || num < 0 || num > 1000000;
}

export function ModuleDialog() {
  const dispatch = useDispatch();
  const { open, action, module } = useSelector(
    (state: RootState) => state.modules.dialogState
  );

  const [numError, setNumError] = React.useState<boolean>(false);
  const [nameError, setNameError] = React.useState<boolean>(false);

  const [dialogInput, setDialogInput] = React.useState<IModuleBase>(NullModule);

  React.useEffect(() => {
    if (action === DialogStatus.EDIT) {
      setDialogInput(module);
    } else {
      setDialogInput(NullModule);
    }
  }, [action, module]);

  const createModule = (payload: IAdminModule) => {
    return {
      name: payload.name,
      number: payload.number,
      problems: [],
      lessons: [],
      _id: payload._id,
    };
  };

  const addEditModulesRequest = async (
    payload: IModuleBase,
    type: "add" | "edit"
  ) => {
    const body = {
      name: payload.name,
      number: payload.number,
    };

    try {
      const response: AxiosResponse<IAdminModule> =
        type === "add"
          ? await apiClient.post("/v1/module", body)
          : await apiClient.put(`/v1/module/${payload._id}`, body);
      if (type === "add") {
        toast.success(`${body.name} Module created successfully`);
        dispatch(
          requestNewModuleSuccess(createModule({ ...response.data, ...body }))
        );
      } else {
        toast.success(`${body.name} Module updated successfully`);
        dispatch(requestModifyModuleSuccess(response.data));
      }
      dispatch(closeDialog());
    } catch (e) {
      if (type === "add") {
        toast.error(`${body.name} Module failed to create`);
      } else {
        toast.error(`${body.name} Module failed to update`);
      }
    }
  };

  const handleDialogSubmit = async () => {
    const { name, number } = dialogInput;

    setNameError(isBlank(name));
    setNumError(isInvalidNum(number));

    if (isBlank(name) || isInvalidNum(number)) {
      return;
    } else if (action === DialogStatus.CREATE) {
      await addEditModulesRequest(dialogInput, "add");
    } else if (action === DialogStatus.EDIT) {
      await addEditModulesRequest(dialogInput, "edit");
    }
  };

  const handleDialogClose = () => {
    setNumError(false);
    setNameError(false);
    dispatch(closeDialog());
  };

  const FooterButtons = [
    {
      label: "Cancel",
      onClick: handleDialogClose,
      variant: "contained",
      color: "error",
    },
    {
      label: action === DialogStatus.CREATE ? "Add Module" : "Edit Module",
      onClick: handleDialogSubmit,
      variant: "contained",
      disabled: numError || nameError,
    },
  ];

  const DialogTitle = (status: DialogStatus) => {
    if (status === DialogStatus.CREATE) {
      const { name, number } = dialogInput;

      const display = {
        number: !isInvalidNum(number) ? dialogInput.number : "",
        name: !isBlank(name) ? dialogInput.name : "",
      };

      let newModuleTitle: string;

      if (display.name && display.number) {
        newModuleTitle = `Module ${display.number} - ${display.name}`;
      } else {
        newModuleTitle = "New Module";
      }

      return (
        <>
          <Typography variant="button" fontSize="subtitle2" color="primary">
            Creating a new module
          </Typography>

          <Typography variant="h5" component="div" fontWeight="bold">
            {newModuleTitle}
          </Typography>
        </>
      );
    } else if (status === DialogStatus.EDIT) {
      return (
        <>
          <Typography variant="button" fontSize="subtitle2" color="primary">
            Editing an existing module
          </Typography>

          <Typography variant="h5" component="div" fontWeight="bold">
            {`Module ${module.number} - ${module.name}`}
          </Typography>
        </>
      );
    } else {
      return (
        <Typography variant="h5" component="div" fontWeight="bold">
          Closing this dialog
        </Typography>
      );
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      title={DialogTitle(action)}
      handleClose={handleDialogClose}
      footerContent={FooterButtons}
    >
      <>
        <Typography>
          To add a new module, or to modify a module's name and number, please
          use the form below.
        </Typography>

        <NumberField
          error={numError}
          label="Number"
          id="standard-error-helper-text"
          variant="filled"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(event) => {
            const num = parseInt(event.target.value);
            setDialogInput({
              ...dialogInput,
              number: num,
            });
            setNumError(isInvalidNum(num));
          }}
          defaultValue={
            action === DialogStatus.EDIT ? module.number : undefined
          }
          fullWidth
          required
          focused
          helperText={!numError ? "" : "Invalid Number"}
        />

        <NameTextField
          error={nameError}
          label="Module Name"
          id="standard-error-helper-text"
          variant="filled"
          onChange={(event) => {
            const name = event.target.value;
            setDialogInput({
              ...dialogInput,
              name: name,
            });
            setNameError(isBlank(name));
          }}
          defaultValue={action === DialogStatus.EDIT ? module.name : undefined}
          fullWidth
          required
          focused
          helperText={!nameError ? "" : "Please enter a valid module name"}
        />
      </>
    </Dialog>
  );
}
