import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MoreVert } from "@mui/icons-material/";
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
  setModuleToDelete: (module: IAdminModule) => void;
}

export function ModuleMenu({ module, setModuleToDelete }: MenuProps) {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
            setModuleToDelete(module);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
