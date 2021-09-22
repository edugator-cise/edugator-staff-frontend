import React from 'react';
import { Button, TextField, DialogTitle, Dialog, Paper, Divider } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      display: "block",
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(2),
      margin: theme.spacing(1),
      maxWidth: "70%",
    },
    dialog: {
      //width: "50vw",
    },
    button: {
      margin: theme.spacing(1),
    },
    footer: {
      float: "right",
    },
  }),
);


export interface NewModuleDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (name: string) => void;
}

export default function NewModuleDialog(props: NewModuleDialogProps) {
  const { open, handleClose, handleSubmit } = props;
  const [moduleName, setModuleName] = React.useState('');

  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="new-module-dialog"
      open={open}
      className={classes.dialog}
      maxWidth="sm"
      fullWidth
    >
      <Paper elevation={3}>
        <DialogTitle id="module-title-dialog">Add a new module</DialogTitle>
        <Divider />
        <TextField
          id="outlined-new-module"
          label="Module Name"
          variant="outlined"
          onChange={(event) => { setModuleName(event.target.value) }}
          placeholder="Module X: Sorting Algorithms"
          className={classes.textfield}
          fullWidth
          autoFocus
        />

        <div className={classes.footer}>
          <Button
            onClick={() => handleSubmit(moduleName)}
            className={classes.button}
            variant="outlined"
          >
            Add module
          </Button>
        </div>
      </Paper>
    </Dialog>
  );
}
