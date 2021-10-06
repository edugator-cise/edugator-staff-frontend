import React from "react";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
  })
);

export default function ModuleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClickAway = (event: any) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => {
          handleClick(event);
        }}
        className={classes.root}
        size="large"
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(event) => {
          handleClickAway(event);
        }}
      >
        <MenuItem
          onClick={(event) => {
            handleClose(event);
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            handleClose(event);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
