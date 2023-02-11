//https://javascript.plainenglish.io/creating-a-confirm-dialog-in-react-and-material-ui-3d7aaea1d799
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "./ConfirmationDialog";
import { useState } from "react";

const ConfirmDelete = (props: {
  title: string;
  body: string;
  onConfirm: any;
  disabled?: boolean;
}) => {
  const { title, body, onConfirm, disabled } = props;
  const [open, setOpen] = useState(false);
  return (
    <div>
      <IconButton
        aria-label="delete"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        <DeleteIcon />
      </IconButton>
      <ConfirmDialog
        title={title}
        setOpen={setOpen}
        onConfirm={onConfirm}
        open={open}
      >
        {body}
      </ConfirmDialog>
    </div>
  );
};
export default ConfirmDelete;
