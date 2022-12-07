import { Collapse, ListItemText } from "@mui/material";
import React, { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { requestLesson, requestProblem } from "./CodeEditorSlice";
import { styled } from "@mui/material/styles";
import { ILessonItem, INavigationItem, IProblemItem } from "./types";
import { adminPathRegex, colors } from "../../shared/constants";
import { useHistory, useLocation } from "react-router";
import { Routes } from "../../shared/Routes.constants";
import { BookOpen, Code } from "phosphor-react";

interface ClickedMenu {
  [key: string]: boolean;
}

interface SidenavProps {
  isHidden: boolean;
}

const CustomListItemButton = styled(ListItemButton)(
  ({ theme }) => `
  background-color: "white";
  border-left: solid 1px ${colors.borderGray};
  border-bottom: solid 1px ${colors.borderGray};
`
);

export const Sidenav = ({ isHidden }: SidenavProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navStructure = useSelector(
    (state: RootState) => state.codeEditor.navStructure
  );
  const history = useHistory();
  const [menu, setMenu] = useState<ClickedMenu>({});

  const handleClick = (item: string) => {
    const newData = { ...menu, [item]: !menu[item] };
    setMenu(newData);
  };
  return (
    <List
      component="nav"
      sx={{
        height: "100%",
        width: 250,
        minWidth: 250,
        maxWidth: 250,
        maxHeight: "calc(100vh - 64px)",
        bgcolor: "#F9F9F9",
        overflowY: "auto",
        display: isHidden ? "none" : "block",
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
            bgcolor: "#F9F9F9",
          }}
        >
          Content
        </ListSubheader>
      }
    >
      {navStructure.map((value: INavigationItem, indexVal: number) => (
        <React.Fragment key={value.name + "_" + indexVal}>
          <CustomListItemButton
            key={value.name + "_" + indexVal}
            onClick={() => {
              handleClick(value.name + "_" + indexVal);
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
          <Collapse
            in={!!menu[value.name + "_" + indexVal]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding sx={{ bgcolor: "#F9F9F9" }}>
              {value.problems.map(
                (problemItem: IProblemItem, index: number) => (
                  <CustomListItemButton
                    sx={{ pl: 4 }}
                    key={problemItem.problemName + "_" + indexVal + "_" + index}
                    onClick={() => {
                      dispatch(
                        requestProblem({
                          problemId: problemItem._id,
                          isAdmin: adminPathRegex.test(location.pathname),
                        })
                      );
                      const baseRoute = adminPathRegex.test(location.pathname)
                        ? Routes.AdminCode
                        : Routes.Code;
                      history.replace({
                        pathname: baseRoute + `/${problemItem._id}`,
                      });
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        sx: { fontSize: "0.8rem" },
                      }}
                      primary={`${indexVal + 1}.${index + 1} ${
                        problemItem.problemName
                      }`}
                    />
                    <Code
                      weight="regular"
                      size={16}
                      color={colors.navIconGray}
                    />
                  </CustomListItemButton>
                )
              )}
              {value.lessons?.map((lessonItem: ILessonItem, index: number) => (
                <CustomListItemButton
                  sx={{ pl: 4 }}
                  key={lessonItem.lessonName + "_" + indexVal + "_" + index}
                  onClick={() => {
                    dispatch(
                      requestLesson({
                        lessonId: lessonItem._id,
                      })
                    );
                    const baseRoute = Routes.Learn;
                    history.replace({
                      pathname: baseRoute + `/${lessonItem._id}`,
                    });
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      sx: { fontSize: "0.8rem" },
                    }}
                    primary={`${indexVal + 1}.${index + 1} ${
                      lessonItem.lessonName
                    }`}
                  />
                  <BookOpen
                    weight="regular"
                    size={16}
                    color={colors.navIconGray}
                  />
                </CustomListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};
