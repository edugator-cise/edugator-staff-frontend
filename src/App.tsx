import React from "react";
import "./App.css";
import { LoginPage } from "./app/Login/Login";
import { Typography } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Typography variant="h3" color="textSecondary">
        <LoginPage></LoginPage>
      </Typography>
    </div>
  );
}

export default App;
