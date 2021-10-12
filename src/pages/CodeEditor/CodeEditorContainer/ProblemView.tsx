import React from "react";
import { Markdown } from "../../../shared/Markdown";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
interface Props {
  problemTitle: string;
  problemStatement: string;
}

const ProblemDescriptionPaper = styled(Paper)(
  ({ theme }) => `
  margin: ${theme.spacing(2)};
  padding: ${theme.spacing(1)};
  text-align: left;
  ${theme.breakpoints.up("md")} {
    height: 80vh;

  }
`
);
export const ProblemView = ({ problemTitle, problemStatement }: Props) => {
  return (
    <ProblemDescriptionPaper>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        {problemTitle}
      </Typography>
      <Markdown markdownString={problemStatement} />
    </ProblemDescriptionPaper>
  );
};
