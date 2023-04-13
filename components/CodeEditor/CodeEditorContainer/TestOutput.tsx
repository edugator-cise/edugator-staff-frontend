import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import theme from "constants/theme";
import { colors } from "constants/config";

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
    checkOutput: boolean | undefined;
  }

  export const TestOutput = ({ checkOutput }: Props) => {
    if (checkOutput) {
      return <OutputPaper>Hello</OutputPaper>;
    } else {
      return <OutputPaper>test</OutputPaper>;
    }
  };