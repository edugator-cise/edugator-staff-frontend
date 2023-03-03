import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material/";
import { IAdminModule } from "components/Modules/types";
import { useDispatch } from "react-redux";
import { openEditDialog } from "state/ModulesSlice";

interface MenuProps {
  module: IAdminModule;
  setModuleToDelete: (module: IAdminModule) => void;
}

export function ModuleMenu({ module, setModuleToDelete }: MenuProps) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickAway = (event: any) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
        }}
        sx={{ padding: 0.5 }}
      >
        <MoreVert />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClickAway}
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
            setModuleToDelete(module);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
