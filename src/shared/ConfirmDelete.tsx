import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "./ConfirmationDialog";

const ConfirmDelete = (props: {
  title: string;
  body: string;
  onConfirm: any;
}) => {
  const { title, body, onConfirm } = props;
  let confirmOpen = false;
  const setConfirmOpen = (val: boolean) => {
    confirmOpen = val;
  };
  return (
    <div>
      <IconButton aria-label="delete" onClick={() => setConfirmOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <ConfirmDialog
        title={title}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={onConfirm}
      >
        {body}
      </ConfirmDialog>
    </div>
  );
};
export default ConfirmDelete;
