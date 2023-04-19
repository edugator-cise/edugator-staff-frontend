import { Stack, Alert, AlertTitle, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { requestDeleteModuleSuccess } from "state/ModulesSlice";
import Dialog from "components/shared/GenericDialog";
import { IAdminModule } from "components/Modules/types";
import { useDispatch } from "react-redux";
import apiClient from "lib/api/apiClient";
import { IRequestMessage } from "lib/shared/types";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

const BulletList = styled("ul")(({ theme }) => ({
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(0),
  paddingLeft: theme.spacing(2),
}));

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  toDelete: IAdminModule;
}

export function DeleteDialog(props: DeleteDialogProps) {
  const { open, handleClose, toDelete } = props;

  const dispatch = useDispatch();

  const deleteModule = async () => {
    try {
      if (!toDelete._id) {
        throw "DeleteDialog: module id does not exist in delete";
      }
      const response: AxiosResponse<IRequestMessage> = await apiClient.delete(
        "/v1/module/" + toDelete._id
      );
      toast.success("Module deleted");
      const payload = {
        response: response.data,
        id: toDelete._id,
      };
      dispatch(requestDeleteModuleSuccess(payload));
    } catch (e) {
      toast.error("Module failed to delete");
    }

    handleClose();
  };

  const FooterButtons = [
    {
      label: "Cancel",
      onClick: handleClose,
      variant: "contained",
    },
    {
      label: "Confirm Delete",
      onClick: deleteModule,
      variant: "contained",
      color: "error",
    },
  ];

  const DialogTitle = (
    <>
      <Typography variant="button" fontSize="subtitle2" color="error">
        Confirm Delete
      </Typography>

      <Typography variant="h5" component="div" fontWeight="bold">
        {`Module ${toDelete.number} - ${toDelete.name}`}
      </Typography>
    </>
  );

  return (
    <Dialog
      open={open}
      maxWidth="md"
      handleClose={handleClose}
      title={DialogTitle}
      footerContent={FooterButtons}
    >
      <Stack spacing={2}>
        {toDelete.problems.length > 0 ? (
          <>
            <Typography>
              This action will also delete the following problems:
            </Typography>

            <BulletList>
              <Typography>
                {toDelete.problems.map((problem, i) => {
                  return (
                    <li key={i}>
                      {`Problem ${toDelete.number}.${i + 1}: ${problem.title}`}
                    </li>
                  );
                })}
              </Typography>
            </BulletList>
          </>
        ) : (
          <Typography gutterBottom>
            This module has no problems associated with it
          </Typography>
        )}

        <Alert severity="error">
          <AlertTitle>Warning</AlertTitle>
          This an action that can't be undone. Are you sure?
        </Alert>
      </Stack>
    </Dialog>
  );
}
