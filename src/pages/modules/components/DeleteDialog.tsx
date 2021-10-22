import React from "react";
import {
  Button,
  DialogTitle,
  Dialog,
  Paper,
  Divider,
  DialogContent,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../../app/common/hooks";
import { requestDeleteModule } from "../ModulesPage.slice";
import { IAdminModule } from "../types";
import { styled } from "@mui/material/styles";

const FooterButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const BulletList = styled("ul")(({ theme }) => ({
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(0),
  paddingLeft: theme.spacing(3),
}));

// weird workaround since header variants had different shades of black
const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
}));

const Warning = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.error.main,
}));

const Footer = styled("div")({
  float: "right",
});

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

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md">
      <Paper elevation={3}>
        <DialogTitle>Confirm Module Deletion</DialogTitle>
        <Divider />

        <DialogContent>
          <Text variant="h5" gutterBottom>
            Deleting: "Module {toDelete.number} - {toDelete.name}"
          </Text>

          {toDelete.problems.length > 0 ? (
            <>
              <Text variant="subtitle1">
                This action will also delete the following problems:
              </Text>

              <BulletList>
                {toDelete.problems.map((problem, i) => {
                  return (
                    <li key={i}>
                      <Text variant="subtitle1">
                        {`Problem ${i + 1}: ${problem.title}`}
                      </Text>
                    </li>
                  );
                })}
              </BulletList>
            </>
          ) : (
            <Text variant="subtitle1" gutterBottom>
              This module has no problems associated with it
            </Text>
          )}

          <Warning variant="body1">
            This an action that can't be undone. Are you sure?
          </Warning>
        </DialogContent>

        <Divider />

        <Footer>
          <FooterButton onClick={handleClose} variant="contained">
            Cancel
          </FooterButton>

          <FooterButton
            onClick={handleDialogSubmit}
            variant="contained"
            color="error"
          >
            Delete
          </FooterButton>
        </Footer>
      </Paper>
    </Dialog>
  );
}
