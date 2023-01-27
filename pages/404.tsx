import React from "react";
import { Button, Card, CardActions, CardMedia, Stack } from "@mui/material";
import { Routes } from "constants/navigationRoutes";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Stack>
      <Card>
        <CardActions>
          <Link href={Routes.Landing}>
            <Button variant="contained" color="primary">
              Homepage
            </Button>
          </Link>
        </CardActions>
        <CardMedia
          component="img"
          src="/EdugatorNotFound.png"
          alt="page not found"
        />
      </Card>
    </Stack>
  );
}
