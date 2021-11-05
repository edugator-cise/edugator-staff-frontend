import { Button, Card, CardActions, CardMedia, Stack } from "@mui/material";
import React from "react";
import { LayoutContainer } from "../../shared/LayoutContainer";
import EdugatorNotFound from "../../assets/EdugatorNotFound.png";
import { useHistory } from "react-router-dom";
import { LocalStorage } from "../../app/common/LocalStorage";
import { Routes } from "../../shared/Routes.constants";

export function NotFoundPage() {
  const history = useHistory();
  return (
    <LayoutContainer pageTitle={"404: Page Not Found"}>
      <Stack>
        <Card>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(Routes.Landing)}
            >
              Homepage
            </Button>
            {LocalStorage.getToken() && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(Routes.Modules)}
              >
                Modules
              </Button>
            )}
            {!!!LocalStorage.getToken() &&
              history.location.pathname.indexOf("admin") !== -1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(Routes.Login)}
                >
                  Admin Login
                </Button>
              )}
          </CardActions>
          <CardMedia
            component="img"
            src={EdugatorNotFound}
            alt="page not found"
          />
        </Card>
      </Stack>
    </LayoutContainer>
  );
}
