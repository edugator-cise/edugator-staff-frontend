import { Collapse, ListItemText } from "@mui/material";
import React, { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { setCurrentProblem } from "./CodeEditorSlice";
import { styled } from "@mui/material/styles";
import { INavigationItem, IProblemItem } from "./types";
import { colors } from "../../shared/constants";
interface ClickedMenu {
  [key: string]: Boolean;
}

const CustomListItemButton = styled(ListItemButton)(
  ({ theme }) => `
  background-color: "white";
  border-left: solid 1px ${colors.borderGray};
  border-bottom: solid 1px ${colors.borderGray};
`
);

export const Sidenav = () => {
  const dispatch = useDispatch();
  const navStructure = useSelector(
    (state: RootState) => state.codeEditor.navStructure
  );
  const [menu, setMenu] = useState<ClickedMenu>({});

  const handleClick = (item: string) => {
    const newData = { ...menu, [item]: !menu[item] };
    setMenu(newData);
  };
  return (
    <List
      component="nav"
      sx={{
        height: "calc(100vh - 80px)",
        width: "100%",
        bgcolor: "white",
        overflowY: "auto",
      }}
      aria-labelledby="nested-exercises-list"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            borderBottom: `1px solid ${colors.borderGray}`,
            textAlign: "left",
            color: "#000000",
          }}
        >
          Exercises
        </ListSubheader>
      }
    >
      {navStructure.map((value: INavigationItem, indexVal: number) => (
        <>
          <CustomListItemButton
            key={value.name + "_" + indexVal}
            onClick={() => {
              handleClick(value.name);
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                sx: { fontSize: "0.8rem" },
              }}
              primary={`${indexVal + 1}. ${value.name}`}
            />
            {menu[value.name + "_" + indexVal] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </CustomListItemButton>
          <Collapse in={!!menu[value.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ bgcolor: "white" }}>
              {value.problems.map(
                (problemItem: IProblemItem, index: number) => (
                  <CustomListItemButton
                    sx={{ pl: 4 }}
                    key={problemItem.problemName + "_" + indexVal + "_" + index}
                    onClick={() => dispatch(setCurrentProblem(problemItem._id))}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        sx: { fontSize: "0.8rem" },
                      }}
                      primary={`${indexVal + 1}.${index + 1} ${
                        problemItem.problemName
                      }`}
                    />
                  </CustomListItemButton>
                )
              )}
            </List>
          </Collapse>
        </>
      ))}
    </List>
  );
};
