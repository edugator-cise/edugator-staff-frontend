import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import theme from "constants/theme";
import { colors } from "constants/config";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, Grow, IconButton, Tooltip, Box } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

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
      return (
        <>
        <FormControl
        sx={{ width: "calc(100% - 20px)", height: "100%" }}
        variant="outlined"
        >
        <Box
            sx={{
              fontFamily: `'Inter', sans-serif`,
              fontWeight: 600,
            }}
          >
            Input
          </Box>
        <OutlinedInput
          id="outlined-stdin"
          multiline
          minRows={1}
        //   value={stdin}
        //   onChange={handleStdinChange}
          aria-describedby="outlined-stdin-text"
          inputProps={{
            "aria-label": "stdin",
          }}
        />
        <br/>
          <Box
            sx={{
              fontFamily: `'Inter', sans-serif`,
              fontWeight: 600,
            }}
          >
            Output
          </Box>
        <OutlinedInput
          id="outlined-stdin"
          multiline
          minRows={1}
          aria-describedby="outlined-stdin-text"
          inputProps={{
            "aria-label": "stdin",
          }}
        />
        <br/>
      <Button
            variant="contained"
            color="primary"
            onClick={() => {
                
            }}
      >
            Check Output
        </Button>
      </FormControl>
      <script>
        if (checkOutput){
            <Cancel style={{ color: "#DC143C" }}></Cancel>
        }
      </script>
      </>
      );
      //<OutputPaper>test</OutputPaper>;
    
  };