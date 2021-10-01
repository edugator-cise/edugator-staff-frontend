import React from "react";
import { Button } from "@mui/material";
import { Edit, AssignmentTurnedIn } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const ButtonContainer = styled("div")({
  marginLeft: "auto",
});

const ProblemAction = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: grey["A700"],
}));

export function ProblemButtons() {
  return (
    <ButtonContainer>
      <ProblemAction startIcon={<AssignmentTurnedIn />} size="small">
        Grade
      </ProblemAction>

      <ProblemAction startIcon={<Edit />} size="small">
        Edit
      </ProblemAction>
    </ButtonContainer>
  );
}
