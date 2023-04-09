import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { styled } from "@mui/material/styles";
import { CompileOutput } from "./CompileOutput";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SubmitOutput } from "./SubmitOutput";
import { CompilerOutput } from "hooks/types";
import { IResultSubmission } from "../types";
const TabBar = styled("div")(
  () => `
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: rgb(250,250,250);
`
);

const CodeHolder = styled("div")(
  ({ theme }) => `
  height: calc(100% - 82px);
  background-color: white;
  margin: ${theme.spacing(1)};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 60px;
`
);

export const InputOutputView = ({
  stdin,
  setStdin,
  compilerOutput,
  isAcceptedOutput,
  submissionOutput,
  activeTab,
  setActiveTab,
}: {
  stdin: string;
  setStdin: (stdin: string) => void;
  compilerOutput: CompilerOutput;
  isAcceptedOutput: boolean | undefined;
  submissionOutput: IResultSubmission[] | undefined;
  activeTab: number;
  setActiveTab: (activeTab: number) => void;
}) => {
  const handleChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStdinChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setStdin(event.target.value);
  };

  return (
    <Grow in appear timeout={500}>
      <CodeHolder>
        <TabBar
          sx={{ borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}
        >
          <Tabs
            value={activeTab}
            onChange={handleChange}
            textColor="inherit"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "white",
                borderLeft: "2px solid transparent",
                borderRight: "2px solid transparent",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Tab disableRipple label="Stdin"></Tab>
            <Tab disableRipple label="Compiler Output"></Tab>
            <Tab disableRipple label="Submission"></Tab>
          </Tabs>
        </TabBar>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            pt: 2,
            pr: 2,
            pl: 2,
            pb: 1.5,
            overflowY: "auto",
          }}
        >
          {activeTab === 0 ? (
            <FormControl
              sx={{ width: "calc(100% - 20px)", height: "100%" }}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-stdin"
                multiline
                minRows={6}
                value={stdin}
                onChange={handleStdinChange}
                aria-describedby="outlined-stdin-text"
                inputProps={{
                  "aria-label": "stdin",
                }}
              />
            </FormControl>
          ) : activeTab === 1 ? (
            <>
              <CompileOutput
                accepted={isAcceptedOutput}
                compileBody={compilerOutput?.compilerBody}
                compileMessage={compilerOutput?.compilerMessage}
              />
            </>
          ) : (
            <SubmitOutput results={submissionOutput} />
          )}
        </Box>
      </CodeHolder>
    </Grow>
  );
};
