import React, { useEffect } from "react";
import { Sidenav } from "./SideNav";
import { setRunCodeError } from "./CodeEditorSlice";
import VerticalNavigation from "../../shared/VerticalNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { requestModulesAndProblems } from "./CodeEditorSlice";
import {
  Grid,
  CircularProgress,
  Box,
  Container,
  Alert,
  Grow,
} from "@mui/material";
import { ProblemView } from "./CodeEditorContainer/ProblemView";
import { CodeEditorView } from "./CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "./CodeEditorContainer/InputOutputView";
import { EmptyState } from "./CodeEditorContainer/EmptyState";
import { colors } from "../../shared/constants";
import { useParams, useLocation } from "react-router-dom";
import { Stack, TreeStructure, ArrowsDownUp, ShareNetwork, Table, MathOperations } from "phosphor-react";
import { styled } from "@mui/material/styles";
import theme from "../../shared/theme";
import TopicLink from "./TopicLink";

interface ProblemEditorURL {
  problemId?: string;
}

interface ProblemLocationState {
  moduleName?: string;
}

interface TopicProps{
  name: string,
  icon: any,
  link: string
}

const TopicsSidebar = styled('div')({
  width: 80,
  minWidth: 80,
  height: '100vh',
  backgroundColor: '#1F2937',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start'
})

export const CodeEditorPage = () => {
  const params = useParams<ProblemEditorURL>();
  const location = useLocation<ProblemLocationState>().state;
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.codeEditor.isLoading
  );
  const currentProblem = useSelector(
    (state: RootState) => state.codeEditor.currentProblem
  );
  const errorMessage = useSelector(
    (state: RootState) => state.codeEditor.runCodeError
  );
  const modules = useSelector((state: RootState) => {
    const sortedModules = state.codeEditor.navStructure;
    return sortedModules.map((value) => value.name);
  });
  const isLoadingProblem = useSelector(
    (state: RootState) => state.codeEditor.isLoadingProblem
  );
  useEffect(() => {
    dispatch(
      requestModulesAndProblems({
        moduleName: location ? location["moduleName"] : undefined,
        problemId: params ? params["problemId"] : undefined,
      })
    );
    //disabling lint for next line because it asks to make location and params a dependency when we don't have to
    //eslint-disable-next-line
  }, [dispatch]);

  const topics:TopicProps[] = [
    {
      name: 'Lists, Stacks, and Queues',
      link: '',
      icon: <Stack weight="fill" size={28} />
    },
    {
      name: 'Trees',
      link: '',
      icon: <TreeStructure weight="fill" size={28} />
    },
    {
      name: 'Heaps',
      link: '',
      icon: <ArrowsDownUp weight="fill" size={28} />
    },
    {
      name: 'Graphs',
      link: '',
      icon: <ShareNetwork weight="fill" size={28} />
    },
    {
      name: 'Sets, Maps, and Hash Tables',
      link: '',
      icon: <Table weight="fill" size={28} />
    },
    {
      name: 'Algorithms',
      link: '',
      icon: <MathOperations weight="fill" size={28} />
    },
  ]

  if (isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Box>
          <CircularProgress />
        </Box>
      </Grid>
    );
  } else {
    return (
      <Box
        minHeight="100%"
        display="flex"
        flexDirection="row"
        sx={{ bgcolor: colors.lightGray }}
      >
        <TopicsSidebar>
        <Box
          sx={{
            height: 64, 
            width: '100%', 
            backgroundColor: theme.palette.primary.main
          }}
        />
        {topics.map((topic, i) => {
          return(
          <TopicLink 
            key={i}
            name={topic.name}
            icon={topic.icon}
            link={topic.link}
            active={false}
          />
          )
        })}
      </TopicsSidebar>
      <Box sx={{height: '100%', width: '100%'}}>      
        <VerticalNavigation light={true} modules={modules} codingPage={true} />
        {errorMessage.hasError && (
          <Grow in timeout={500}>
            <Alert
              severity="error"
              sx={{
                position: "absolute",
                left: "0",
                right: "0",
                width: "50%",
                marginTop: 5,
                marginRight: "auto",
                marginLeft: "auto",
              }}
              onClose={() => {
                dispatch(
                  setRunCodeError({ hasError: false, errorMessage: "" })
                );
              }}
            >
              {errorMessage.errorMessage}
            </Alert>
          </Grow>
        )}
        <Box
          sx={{
            height: "calc(100vh - 64px)",
            m: 0,
            display: "flex",
            flex: "1 1 auto",
          }}
        >
          <Box sx={{ height: "100%", width: 320, backgroundColor: "#F9F9F9" }}>
            <Sidenav />
          </Box>
          <Grid
            container
            spacing={2}
            sx={{ margin: 0, pr: 4, height: "100%", maxWidth: "100%" }}
          >
            {isLoadingProblem ? (
              <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
                sx={{ height: "100vh" }}
              >
                <Box>
                  <CircularProgress />
                </Box>
              </Grid>
            ) : currentProblem === undefined ? (
              <EmptyState />
            ) : (
              <>
                <Grid item xs={12} md={4}>
                  <ProblemView
                    problemTitle={currentProblem.title}
                    problemStatement={currentProblem.statement}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Container
                    disableGutters
                    sx={{ flexDirection: "column", pt: 2 }}
                  >
                    <CodeEditorView
                      code={currentProblem.code.body}
                      templatePackage={currentProblem.templatePackage}
                    />
                    <InputOutputView />
                  </Container>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        </Box>
      </Box>
    );
  }
};
