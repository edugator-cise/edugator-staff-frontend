import React from "react";
import { Markdown } from "components/shared/Markdown";
import { Typography, Grow } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  problemTitle: string;
  problemStatement: string;
  problemAuthor: string;
  problemDifficulty: string;
  problemDateCreated: Date;
  problemLastModified: Date;
  problemIsShort: boolean;
  problemHasTemplate: boolean;
  problemIsQuiz: boolean;
}

const ProblemDescriptionPaper = styled("div")(
  ({ theme }) => `
  padding: ${theme.spacing(4)};
  text-align: left;
  overflow-y: auto;
  height: calc(100vh - 145px);
  background-color: white;
  margin: ${theme.spacing(1)};
  border-radius: 4px;
  min-width: 200px;
`
);
export const ProblemView = ({ problemTitle, problemStatement }: Props) => {
  return (
    <Grow in appear timeout={500}>
      <ProblemDescriptionPaper
        id="problem-description"
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
