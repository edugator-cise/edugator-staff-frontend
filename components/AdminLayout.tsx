import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { Routes } from "constants/navigationRoutes";
import { closeAlert } from "../state/ModulesSlice";
import { useDispatch } from "react-redux";
import { LocalStorage } from "lib/auth/LocalStorage";
import { useEffect } from "react";
export type ButtonColor = "primary" | "success" | "error" | "info" | "warning";
export type ButtonVariant = "text" | "contained" | "outlined";

export interface ButtonProps {
  label: string;
  onClick(): void;
  variant?: string;
  color?: string;
}

type Props = {
  pageTitle: string;
  children: React.ReactNode;
  actionButtons?: ButtonProps[];
};

const AdminLayout = ({ pageTitle, children, actionButtons = [] }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locationState = router.asPath;

  useEffect(() => {
    if (!LocalStorage.getToken() && locationState !== Routes.Login) {
      router.push(Routes.Login);
    }
  }, []);
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1">
            EDUGATOR
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {locationState !== Routes.Login && (
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={() => {
                LocalStorage.removeToken();
                dispatch(closeAlert());
                router.push(Routes.Login);
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

export default AdminLayout;
