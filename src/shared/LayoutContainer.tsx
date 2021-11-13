import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { requestLogout } from "../pages/Login/LoginPage.slice";
import { closeAlert } from "../pages/modules/ModulesPage.slice";
import { Routes } from "../shared/Routes.constants";

export type ButtonColor = "primary" | "success" | "error" | "info" | "warning";
export type ButtonVariant = "text" | "contained" | "outlined";

export interface ButtonProps {
  label: string;
  onClick(): void;
  variant?: string;
  color?: string;
}

interface Props {
  pageTitle: string;
  children: JSX.Element;
  actionButtons?: ButtonProps[];
}

export const LayoutContainer = ({
  pageTitle,
  children,
  actionButtons = [],
}: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1">
            EDUGATOR
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {history.location.pathname !== Routes.Login.toString() && (
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={() => {
                dispatch(requestLogout());
                dispatch(closeAlert());
                history.push(Routes.Login);
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          flexGrow: 1,
          paddingTop: "3rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex">
          <Typography
            variant="h4"
            component="h2"
            align="left"
            sx={{
              flexGrow: 1,
            }}
          >
            {pageTitle}
          </Typography>
          {actionButtons.map((button) => (
            <Button
              onClick={button.onClick}
              key={button.label}
              variant={button.variant as ButtonVariant}
              color={button.color as ButtonColor}
            >
              {button.label}
            </Button>
          ))}
        </Box>
        <Divider sx={{ marginTop: "1rem", marginBottom: "2rem" }} />
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          paddingBottom="2rem"
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};
