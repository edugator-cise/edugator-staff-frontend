import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import theme from "../../../shared/theme";
import { colors } from "../../../shared/constants";

const CompileOutputContainer = styled("div")(
  ({ theme }) => `
  text-align: left;
  overflow-y: scroll;
  margin-right: ${theme.spacing(1)};
  margin-left: ${theme.spacing(1)};
  height: calc(100%);
`
);

const OutputPaper = styled("div")(
  ({ theme }) => `
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  line-height: 20px;
  font-weight: 400;
  border-radius: 0;
  overflow: auto;
  background-color: #f7f9fa;
  border-radius: 4px;
  margin-right: ${theme.spacing(1)};
  margin-left: ${theme.spacing(1)};
` 
);

interface Props {
  accepted: boolean | undefined;
  compileMessage: string;
  compileBody: string;
}
export const CompileOutput = ({
  accepted,
  compileMessage,
  compileBody,
}: Props) => {
  if (accepted) {
    return (
      <CompileOutputContainer id="compile-container">
        <Typography variant="h5" color={theme.palette.success.main}>
          Compilation Successful
        </Typography>
        <Paper sx={{ backgroundColor: colors.lightGray, height: "60%", p: 2 }}>
          {compileBody}
        </Paper>
      </CompileOutputContainer>
    );
  } else if (accepted === false) {
    return (
      <CompileOutputContainer id="compile-container">
        <Typography variant="h5" color={theme.palette.error.main}>
          {compileMessage}
        </Typography>
        <Paper
          sx={{
            backgroundColor: colors.lightPink,
            color: colors.redText,
            p: 2,
            whiteSpace: "pre-wrap",
          }}
        >
          {compileBody}
        </Paper>
      </CompileOutputContainer>
    );
  }
  return <OutputPaper>Press Run to run code</OutputPaper>;
};
