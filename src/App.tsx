import React from "react";
import "./App.css";
import { LoginPage } from "./app/Login/Login";

function App() {
  return (
    <div className="App">
      <Typography variant="h1" color="textSecondary">
        <LoginPage></LoginPage>
      </Typography>
    </div>
  );
}

export default App;
