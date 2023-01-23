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
import { NextRoutes } from "src/shared/Routes.constants";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { LocalStorage } from "src/app/common/LocalStorage";
import { closeAlert } from "src/pages/modules/ModulesPage.slice";
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
  children: React.ReactNode;
  actionButtons?: ButtonProps[];
}

export const AdminLayout = ({
  pageTitle,
  children,
  actionButtons = [],
}: Props) => {
  const router = useRouter();
  const pathName = router.pathname;

  const dispatch = useDispatch();
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1">
            EDUGATOR
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          { pathName !== NextRoutes.Login && (
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={() => {
                LocalStorage.removeToken();
                dispatch(closeAlert());
                router.push(NextRoutes.Login);
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
              sx={{ marginLeft: 1 }}
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
