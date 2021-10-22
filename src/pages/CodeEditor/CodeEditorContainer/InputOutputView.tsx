import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { styled } from "@mui/material/styles";
import { setActiveTab, setStdin } from "../CodeEditorSlice";
import { CompileOutput } from "./CompileOutput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/common/store";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SubmitOutput } from "./SubmitOutput";
const TabBar = styled("div")(
  () => `
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: rgb(250,250,250);
`
);

export const InputOutputView = () => {
  const dispatch = useDispatch();

  const activeTab = useSelector(
    (state: RootState) => state.codeEditor.activeTab
  );
  const stdin = useSelector((state: RootState) => state.codeEditor.stdin);
  const compileOutput = useSelector(
    (state: RootState) => state.codeEditor.compilerOutput
  );
  const submissionOutput = useSelector(
    (state: RootState) => state.codeEditor.submissionOutput
  );
  const isAcceptedOutput = useSelector(
    (state: RootState) => state.codeEditor.isAcceptedOutput
  );
  const handleChange = (event: any, newValue: number) => {
    dispatch(setActiveTab(newValue));
  };

  const handleStdinChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    dispatch(setStdin(event.target.value));
  };

  return (
    <Grow in appear timeout={500}>
      <Paper sx={{ mt: 2 }}>
        <TabBar>
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
        <Box sx={{ height: "20vh", pt: 2, pr: 2, pl: 2, pb: 1.5 }}>
          {activeTab === 0 ? (
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <OutlinedInput
                id="outlined-stdin"
                multiline
                minRows={6}
                maxRows={6}
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
                compileBody={compileOutput.compilerBody}
                compileMessage={compileOutput.compilerMessage}
              />
            </>
          ) : (
            <SubmitOutput results={submissionOutput} />
          )}
        </Box>
      </Paper>
    </Grow>
  );
};
