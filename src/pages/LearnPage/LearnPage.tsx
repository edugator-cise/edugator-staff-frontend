import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { Sidenav } from "../CodeEditor/SideNav";
import { styled } from '@mui/styles'
import theme from "../../shared/theme";
import {
    Grid,
    CircularProgress,
    Box,
    Alert,
    Grow,
} from "@mui/material";
import TopicSidebar from '../../shared/TopicSidebar'
import VerticalNavigation from "../../shared/VerticalNavigation";
import { adminPathRegex, colors } from "../../shared/constants";
import { useParams, useLocation } from "react-router-dom";
import { sampleLesson } from './sampleLesson';
import { sampleLessonExport } from './sampleLessonExport';
import { html } from './sampleLessonHTML';
import { Interweave, Node, Markup } from 'interweave';
import './learnStyles.css'
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ImageBlock from './ImageBlock';
import MultipleSelectQuestion from './MultipleSelectQuestion';

function LearnPage() {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    let questionCount = 1
    const dispatch = useDispatch();

    const modules = useSelector((state: RootState) => {
        const sortedModules = state.codeEditor.navStructure;
        return sortedModules.map((value) => value.name);
    });

    const LessonHolder = styled('div')({
        width: '80%',
        maxWidth: "1400px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 30,
        height: 'auto',
        textAlign: 'left',
        backgroundColor: 'white',        
        boxShadow: 'inset 0px 8px 5px -5px hsla(0,0%,0%,.1);',
        marginBottom: 100,
        [theme.breakpoints.down("lg")]: {
            width: '100%'
        },
    })

    const LessonHeader = styled('div')({
        width: '100%',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottom: '2px solid lightgrey',
        paddingBottom: 0,
    })

    function transform(node: HTMLElement, children: Node[]): React.ReactNode {
        console.log(node.tagName);
        console.log(node);
        
        if (node.tagName === 'H2') {
            return <h2 style={{marginBottom: 0, fontWeight: 200, fontFamily: 'DM Serif Display'}}>{children}</h2>;
        } else if (node.tagName === 'H3') {
            return <h3 style={{marginBottom: 0, fontWeight: 200, fontFamily: 'DM Serif Display'}}><i>{children}</i></h3>;
        } else if (node.tagName === 'P') {
            return <p style={{lineHeight: 1.5, color: '#242424'}}>{children}</p>;
        } else if (node.tagName === 'PRE') {
            return <code style={{padding: 10, borderRadius: 8, backgroundColor: '#242424', color: 'white', alignSelf: 'center'}}>{children}</code>
        }
    }

  return (
    <Box
        height="100vh"
        display="flex"
        flexDirection="row"
        sx={{ bgcolor: colors.lightGray, overflow: "hidden" }}
      >
        <TopicSidebar hidden={isHidden} setHidden={setIsHidden}/>
          
        <Box sx={{ height: "100%", width: "100%" }}>
          <VerticalNavigation
            light={true}
            modules={modules}
            codingPage={true}
          />
            <Box
                sx={{
                height: "100%",
                width: "100%",
                m: 0,
                display: "flex",
                }}
            >
                <Sidenav hidden={isHidden} />
                <div id="lesson-container" style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    overflowY: 'scroll'
                }}>
                    <LessonHolder>
                        <LessonHeader>
                            <div className='lesson-title'>{sampleLesson[0].title}</div>
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: 'auto', justifyContent: 'flex-end'}}>

                                <div className='lesson-subtitle' style={{color: theme.palette.primary.dark}}><span style={{color: theme.palette.primary.main}}>Author: </span>{sampleLesson[0].author}</div>
                                <div className='lesson-subtitle' style={{color: theme.palette.primary.dark}}><span style={{color: theme.palette.primary.main}}>Last Updated: </span>{sampleLesson[0].date}</div>
                            </div>
                        </LessonHeader>
                        {sampleLesson.slice(1).map((block : any, i) => {
                            if (block.type === "text") {
                                console.log(JSON.parse(JSON.stringify(block.content)));
                                
                                return (
                                    <div key={i} style={{width: '100%'}}>
                                        <Markup transform={transform} className='inter' content={JSON.parse(JSON.stringify(block.content.html))} />
                                    </div>
                                )
                            } else if (block.type === "image") {
                                return (
                                    <ImageBlock key={i} src={block.content.sourcePath} caption={block.content.caption} height={block.content.height} width={block.content.width} alignment={block.content.alignment} />
                                )  
                            } else if (block.type === 'MC') {
                                questionCount++;
                                return (
                                    <MultipleChoiceQuestion key={i} number={questionCount - 1} image={block.content.image} sourcePath={block.content.sourcePath} answers={block.content.answers} correctAnswer={block.content.correctAnswer} question={block.content.question} />
                                )
                            } else if (block.type === 'MS') {
                                questionCount++;
                                return (
                                    <MultipleSelectQuestion key={i} number={questionCount - 1} answers={block.content.answers} correctAnswer={block.content.correctAnswer} question={block.content.question} />
                                )
                            }
                        })}
                    </LessonHolder>
                </div>
            </Box>
        </Box>
    </Box>
  )
}

export default LearnPage