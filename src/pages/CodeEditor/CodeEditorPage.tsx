import React, { useEffect, useState } from "react";
import { Sidenav } from "./SideNav";
import {
  requestFirstProblemFromModule,
  requestProblem,
  setRunCodeError,
} from "./CodeEditorSlice";
import { Link } from "react-router-dom";
import VerticalNavigation from "../../shared/VerticalNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { requestModulesAndProblems } from "./CodeEditorSlice";
import {
  Grid,
  CircularProgress,
  Box,
  Alert,
  Grow,
  Avatar,
} from "@mui/material";
import { ProblemView } from "./CodeEditorContainer/ProblemView";
import { CodeEditorView } from "./CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "./CodeEditorContainer/InputOutputView";
import { EmptyState } from "./CodeEditorContainer/EmptyState";
import { adminPathRegex, colors } from "../../shared/constants";
import { useParams, useLocation } from "react-router-dom";
import {
  Stack,
  TreeStructure,
  ArrowsDownUp,
  ShareNetwork,
  Table,
  MathOperations,
  House,
  ListBullets,
} from "phosphor-react";
import { styled } from "@mui/material/styles";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import theme from "../../shared/theme";
import TopicLink from "./TopicLink";
import LightModeLogo from "../../assets/LightModeLogo.svg";

interface ProblemEditorURL {
  problemId?: string;
}

interface ProblemLocationState {
  moduleName?: string;
}

interface TopicProps {
  name: string;
  icon: any;
  link: string;
}

const TopicsSidebar = styled("div")({
  width: 70,
  minWidth: 70,
  height: "100vh",
  backgroundColor: "#1F2937",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
});

export const CodeEditorPage = () => {
  const [isHidden, setIsHidden] = useState(false);
  const params = useParams<ProblemEditorURL>();
  const locationState = useLocation<ProblemLocationState>();
  const location = locationState.state;
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
  const navigation = useSelector(
    (state: RootState) => state.codeEditor.navStructure
  );
  const isLoadingProblem = useSelector(
    (state: RootState) => state.codeEditor.isLoadingProblem
  );
  useEffect(() => {
    dispatch(
      requestModulesAndProblems({
        isAdmin: adminPathRegex.test(locationState.pathname),
      })
    );
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [dispatch]);

  const topics: TopicProps[] = [
    {
      name: "Lists, Stacks, and Queues",
      link: "",
      icon: <Stack weight="fill" size={24} />,
    },
    {
      name: "Trees",
      link: "",
      icon: <TreeStructure weight="fill" size={24} />,
    },
    {
      name: "Heaps",
      link: "",
      icon: <ArrowsDownUp weight="fill" size={24} />,
    },
    {
      name: "Graphs",
      link: "",
      icon: <ShareNetwork weight="fill" size={24} />,
    },
    {
      name: "Sets, Maps, and Hash Tables",
      link: "",
      icon: <Table weight="fill" size={24} />,
    },
    {
      name: "Algorithms",
      link: "",
      icon: <MathOperations weight="fill" size={24} />,
    },
  ];
  useEffect(() => {
    if (params && params["problemId"]) {
      dispatch(
        requestProblem({
          problemId: params["problemId"],
          isAdmin: adminPathRegex.test(locationState.pathname),
        })
      );
    }
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    if (
      location &&
      location["moduleName"] !== undefined &&
      navigation &&
      navigation.length > 0
    ) {
      dispatch(
        requestFirstProblemFromModule({
          navigation,
          moduleName: location["moduleName"],
          isAdmin: adminPathRegex.test(locationState.pathname),
        })
      );
    }
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [location]);

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
        height="100vh"
        display="flex"
        flexDirection="row"
        sx={{ bgcolor: colors.lightGray, overflow: "hidden" }}
      >
        <TopicsSidebar>
          <Box
            sx={{
              height: 64,
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 1,
            }}
          >
            <Link to={"/"}>
              <Avatar src={LightModeLogo} sx={{ height: 40, width: 40 }} />
            </Link>
          </Box>
          <Link to={"/"}>
          <TopicLink
            name="Home"
            active={false}
            icon={<House weight="fill" size={24} />}
            link=""
          />
          </Link>
          <div
            onClick={() => {
              setIsHidden(!isHidden);
            }}
          >
            <TopicLink
              name="View All"
              active={true}
              icon={<ListBullets weight="fill" size={24} />}
              link=""
            />
          </div>
          <Box
            sx={{
              height: "1px",
              width: "60%",
              margin: "10px",
              borderBottom: "1px solid #939aa6",
            }}
          />
          {/* {topics.map((topic, i) => { //Include this for adding remaining topics to sidebar
            return (
              <TopicLink
                key={i}
                name={topic.name}
                icon={topic.icon}
                link={topic.link}
                active={false}
              />
            );
          })} */}
        </TopicsSidebar>
        <Box sx={{ height: "100%", width: "100%" }}>
          <VerticalNavigation
            light={true}
            modules={modules}
            codingPage={true}
          />
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
              height: "100%",
              width: "100%",
              m: 0,
              display: "flex",
            }}
          >
            <Sidenav hidden={isHidden} />
            {isLoadingProblem ? (
              <Grid container direction="column" sx={{ height: "100vh" }}>
                <Box>
                  <CircularProgress />
                </Box>
              </Grid>
            ) : currentProblem === undefined ? (
              <EmptyState />
            ) : (
              <Allotment snap={true}>
                <Allotment.Pane minSize={310}>
                  <ProblemView
                    problemTitle={currentProblem.title}
                    problemStatement={currentProblem.statement}
                  />
                </Allotment.Pane>
                <Allotment.Pane minSize={350}>
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      overflow: "scroll",
                    }}
                  >
                    <CodeEditorView
                      code={currentProblem.code.body}
                      templatePackage={currentProblem.templatePackage}
                    />
                    <InputOutputView />
                  </div>
                </Allotment.Pane>
              </Allotment>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
};
