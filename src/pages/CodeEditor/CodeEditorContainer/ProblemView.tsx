import React from "react";
import { Markdown } from "../../../shared/Markdown";
import { Paper, Typography, Grow } from "@mui/material";
import { styled } from "@mui/material/styles";
interface Props {
  problemTitle: string;
  problemStatement: string;
}

const ProblemDescriptionPaper = styled(Paper)(
  ({ theme }) => `
  margin: ${theme.spacing(2)};
  padding: ${theme.spacing(2)};
  text-align: left;
  ${theme.breakpoints.up("md")} {
    height: 80vh;
  }
  overflow-y: auto;
`
);
export const ProblemView = ({ problemTitle, problemStatement }: Props) => {
  return (
    <Grow in appear timeout={500}>
      <ProblemDescriptionPaper
        sx={{
          "& pre": {
            whiteSpace: "pre-wrap",
          },
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "left" }}>
          {problemTitle}
        </Typography>
        <Markdown markdownString={problemStatement} />
      </ProblemDescriptionPaper>
    </Grow>
  );
};
