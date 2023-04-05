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
export const ProblemView = ({
  problemTitle,
  problemStatement,
  problemAuthor,
  problemDifficulty,
  problemDateCreated,
  problemLastModified,
  problemIsShort, 
  problemHasTemplate, 
  problemIsQuiz,
}: Props) => {
  //check if problemDateCreated is null
  const dateCreated = new Date(problemDateCreated).toLocaleDateString();
  const lastModified = new Date(problemLastModified).toLocaleDateString();
  let isShort:string = 'yes';
  if (!problemIsShort){
    isShort = 'no';
  }
  let hasTemplate:string = 'yes';
  if (!problemHasTemplate){
    hasTemplate = 'no';
  }
  let isQuiz:string = 'yes';
  if (!problemIsQuiz){
    isQuiz = 'no';
  }

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
        {problemAuthor && problemDifficulty && problemLastModified ? (
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            <b>Author:</b> {problemAuthor}
            <br />
            <b>Difficulty:</b> {problemDifficulty}
            {dateCreated != "Invalid Date" ? (
              <>
                <br />
                <b>Date Created: </b> {dateCreated}
              </>
            ) : null}
            <br />
            <b>Last Modified:</b> {lastModified}
            <b>Is Short:</b> {isShort}
            <b>Has Template:</b> {hasTemplate}
            <b>Last Modified:</b> {isQuiz}
          </Typography>
        ) : null}
      </ProblemDescriptionPaper>
    </Grow>
  );
};
