import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MoreVert } from "@mui/icons-material/";
import { DeleteDialog } from ".";
import { IAdminModule } from "../types";
import { useAppDispatch } from "../../../app/common/hooks";
import { openEditDialog } from "../ModulesPage.slice";

const MenuButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  marginLeft: theme.spacing(0.5),
  marginTop: "auto",
  marginBottom: "auto",
}));

interface MenuProps {
  module: IAdminModule;
}

export function ModuleMenu({ module }: MenuProps) {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
  const onDialogClose = () => {
    setConfirmDelete(false);
  };

  const handleClickAway = (event: any) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
        }}
      >
        <MoreVert />
      </MenuButton>
      
      {/*TODO: Move dialog component outside of Menu component*/}
      <DeleteDialog
        open={confirmDelete}
        handleClose={onDialogClose}
        toDelete={module}
      />

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
            event.stopPropagation();
            setAnchorEl(null);
            /// Functionality below
            dispatch(openEditDialog(module));
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            setAnchorEl(null);
            /// Functionality below
            setConfirmDelete(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
