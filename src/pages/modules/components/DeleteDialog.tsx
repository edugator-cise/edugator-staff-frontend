import React from "react";
import { Stack, Alert, AlertTitle, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch } from "../../../app/common/hooks";
import { requestDeleteModule } from "../ModulesPage.slice";
import Dialog from "../../../shared/GenericDialog";
import { IAdminModule } from "../types";

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

  const dispatch = useAppDispatch();

  const handleDialogSubmit = () => {
    dispatch(requestDeleteModule(toDelete._id));
    // TODO:
    //  dont close before checking
    //  if action was successful
    handleClose();
  };

  const FooterButtons = [
    {
      label: "Cancel",
      onClick: () => handleClose(),
      variant: "contained",
    },
    {
      label: "Confirm Delete",
      onClick: () => handleDialogSubmit(),
      variant: "contained",
      color: "error",
    },
  ];

  const dialogTitle = `Confirm Delete: "Module ${toDelete.number} - ${toDelete.name}"`;

  return (
    <Dialog
      open={open}
      maxWidth="md"
      handleClose={handleClose}
      title={dialogTitle}
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
