import { Button, Card, CardActions, CardMedia, Stack } from "@mui/material";
import EdugatorNotFound from "../../assets/EdugatorNotFound.png";
import { useHistory } from "react-router-dom";
import { Routes } from "../../shared/Routes.constants";

export function NotFoundPage() {
  const history = useHistory();
  return (
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
        </CardActions>
        <CardMedia
          component="img"
          src={EdugatorNotFound}
          alt="page not found"
        />
      </Card>
    </Stack>
  );
}
