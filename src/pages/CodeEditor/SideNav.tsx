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
interface ClickedMenu {
  [key: string]: Boolean;
}

interface IProblemItem {
  problemName: string;
  _id: string;
}

const CustomListItemButton = styled(ListItemButton)(
  ({ theme }) => `
  background-color: "#ffffff";
  border-left: solid 1px #e2e2e2;
  border-bottom: solid 1px #e2e2e2;
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
        height: "calc(100vh - 64px)",
        width: "100%",
        bgcolor: "#ffffff",
        overflowY: "auto",
      }}
      aria-labelledby="nested-exercises-list"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ borderBottom: "1px solid #e2e2e2" }}
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
            <ListItemText primary={`${indexVal + 1}. ${value.name}`} />
            {menu[value.name + "_" + indexVal] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </CustomListItemButton>
          <Collapse in={!!menu[value.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ bgcolor: "#ffffff" }}>
              {value.problems.map(
                (problemItem: IProblemItem, index: number) => (
                  <CustomListItemButton
                    sx={{ pl: 4 }}
                    key={problemItem.problemName + "_" + indexVal + "_" + index}
                    onClick={() => dispatch(setCurrentProblem(problemItem._id))}
                  >
                    <ListItemText
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
