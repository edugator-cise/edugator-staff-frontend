import React from "react";
import { Markdown } from "../../../shared/Markdown";
import { Paper, Typography, Grow } from "@mui/material";
import { styled } from "@mui/material/styles";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

interface Props {
  problemTitle: string;
  problemStatement: string;
}

const ProblemDescriptionPaper = styled(Paper)(
  
  ({ theme }) => `
  padding: 30px;
  text-align: left;
  ${theme.breakpoints.up("md")} {
    height: auto;
  }
  overflow-y: auto;
  width: 80%;
  min-width: 530px
  max-height: 200px
`
);
export const ProblemView = ({ problemTitle, problemStatement }: Props) => {
  return (
    <Grow in appear timeout={500}>
      <ProblemDescriptionPaper>
        <Typography variant="h4" sx={{ textAlign: "left" }}>
          {problemTitle}
        </Typography>
        <Markdown markdownString={problemStatement} />
      </ProblemDescriptionPaper>
    </Grow>
  );
};
