import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";

const OutputPaper = styled(Paper)(
  ({ theme }) => `
  height: 100%;
  white-space: pre-wrap;
  height: auto;
  box-shadow: none;
  position: relative;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  line-height: 20px;
  font-weight: 400;
  border-radius: 0;
  overflow: auto;
  background-color: #f7f9fa;
`
);

const CompileOutputContainer = styled("div")(
  ({ theme }) => `
  text-align: left;
  height: 100%;
  overflow-y: auto;
`
);

interface Props {
  results: IResultSubmission[] | undefined;
}
export const SubmitOutput = ({ results }: Props) => {
  if (results) {
    return (
      <CompileOutputContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="results table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Input</TableCell>
                <TableCell align="left">Output</TableCell>
                <TableCell align="left">Expected</TableCell>
                <TableCell align="center">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row: IResultSubmission, index: number) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ whiteSpace: "pre-wrap" }}
                    align="left"
                  >
                    {row.stdin}
                  </TableCell>
                  <TableCell style={{ whiteSpace: "pre-wrap" }} align="left">
                    {row.output}
                  </TableCell>
                  <TableCell style={{ whiteSpace: "pre-wrap" }} align="left">
                    {row.expectedOutput}
                  </TableCell>
                  <TableCell style={{ whiteSpace: "pre-wrap" }} align="center">
                    {row.result ? (
                      <CheckCircle style={{ color: "#2E7D32" }} />
                    ) : (
                      <Cancel style={{ color: "#DC143C" }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CompileOutputContainer>
    );
  } else {
    return <OutputPaper>Press Run to run code</OutputPaper>;
  }
};
