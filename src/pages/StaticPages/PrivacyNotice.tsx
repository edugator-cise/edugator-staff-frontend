import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VerticalNavigation from "../../shared/VerticalNavigation";
import { RootState } from "../../app/common/store";
import { requestModulesAndProblems } from "../CodeEditor/CodeEditorSlice";
import { useParams, useLocation } from "react-router-dom";
import { adminPathRegex, colors } from "../../shared/constants";
import { styled } from '@mui/styles'
import theme from "../../shared/theme";
import { Typography } from '@mui/material';

interface ProblemLocationState {
    moduleName?: string;
}

const Holder = styled("div")({
  height: 400,
  width: "100%",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: 'linear-gradient(transparent, transparent, transparent, transparent, #f1f1f11a, #f1f1f129, #f1f1f1da), url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)',
  backgroundImage: 'url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)',
  backgroundSize: "35em",
  mozWindowShadow: 'inset 0 -10px 10px -10px #0000001a',
  webkitBoxShadow: 'inset 0 -10px 10px -10px #0000001a',
  boxShadow: 'inset 0 -10px 10px -10px #0000001a',
  
});

function PrivacyNotice() {
    const modules = useSelector((state: RootState) => {
        const sortedModules = state.codeEditor.navStructure;
        return sortedModules.map((value) => value.name);
    });
    const dispatch = useDispatch();
    const locationState = useLocation<ProblemLocationState>();

    useEffect(() => {
        dispatch(
          requestModulesAndProblems({
            isAdmin: adminPathRegex.test(locationState.pathname),
          })
        );
        //disable exhaustive dependencies
        //eslint-disable-next-line
    }, [dispatch]);

  return (
    <>
    <VerticalNavigation
        light={true}
        modules={modules}
        codingPage={false}
    />
    <Holder>
        <div>
            <Typography variant="h2">
              PRIVACY POLICY
            </Typography>
            <Typography variant="body1" sx={{fontWeight: 400, color: '#999999'}}>
              Last Updated January 31, 2021
            </Typography>
        </div>
    </Holder>
    </>
  )
}

export default PrivacyNotice;
