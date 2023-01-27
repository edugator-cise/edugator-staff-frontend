import PlaygroundLayout from "components/PlaygroundLayout";
import { ReactNode } from "react";
import { Container, Typography, Grow } from "@mui/material";
import Lottie from "lottie-react";
import CrocodileOnAScooter from "public/crocodileonascooter.json";

export default function CodePage() {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grow in appear timeout={500}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ width: 450, marginTop: -250 }}>
            <Lottie animationData={CrocodileOnAScooter} />
          </div>
          <div>
            <Typography variant="h4">Get Started</Typography>
          </div>
          <Typography variant="body1">
            Choose a problem on the navigation bar to start!
          </Typography>
        </div>
      </Grow>
    </Container>
  );
}

CodePage.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
