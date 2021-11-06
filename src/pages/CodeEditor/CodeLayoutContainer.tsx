import { Box, Alert, Grow } from "@mui/material";
import React, { useEffect } from "react";
import { requestModules } from "../LandingPage/LandingPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { setRunCodeError } from "./CodeEditorSlice";
import VerticalNavigation from "../../shared/VerticalNavigation";
import TopicLink from "./TopicLink";
import { colors } from "../../shared/constants";
import { styled } from "@mui/material/styles";
import theme from "../../shared/theme";
import { Stack, TreeStructure, ArrowsDownUp, ShareNetwork, Table, MathOperations } from "phosphor-react";


interface Props {
  children: JSX.Element[] | JSX.Element;
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

export const CodeLayoutContainer = ({ children }: Props) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(
    (state: RootState) => state.codeEditor.runCodeError
  );

  const modules = useSelector((state: RootState) => state.landingPage.modules);
  useEffect(() => {
    dispatch(requestModules());
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

  return (
    <Box
      minHeight="100%"
      display="flex"
      flexDirection="row"
      sx={{ bgcolor: '#eeeeee' }}
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
      <VerticalNavigation light={true} codingPage={true} modules={modules} />
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
              dispatch(setRunCodeError({ hasError: false, errorMessage: "" }));
            }}
          >
            {errorMessage.errorMessage}
          </Alert>
        </Grow>
      )}
      {children}
      </Box>
    </Box>
  );
};
