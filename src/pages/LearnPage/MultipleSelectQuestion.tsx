import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Checkbox } from '@mui/material'
import styled from '@emotion/styled'
import theme from '../../shared/theme'
import {
    CheckCircle,
    XCircle
  } from "phosphor-react";

const QuestionHolder = styled.div((props: any) => ({
    width: '70%',
    marginTop: 50,
    height: 'auto',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 0px 8px 0px',
    transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
    alignSelf: 'center',
    ":hover": {
        transform: props.checked ? '' : 'scale(1.01)',
        boxShadow: props.checked ? 'rgba(99, 99, 99, 0.2) 0px 0px 8px 0px' : 'rgba(99, 99, 99, 0.1) 0px 0px 20px 0px'
    },
    padding: 20
}))

const AnswerHolder = styled.div((props : any) => ({
    width: '100%',
    height: 'fit-content',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: props.checked ? props.isAnswerCorrect ? props.clicked ? '#22B16E' : '#e4fcf1' : props.clicked ? '#f76f7a' : theme.palette.primary.light : props.clicked ? theme.palette.primary.main : theme.palette.primary.light,
    color: props.clicked ? 'white' : theme.palette.primary.dark,
    borderRadius: 4,
    border: props.checked ? props.isAnswerCorrect ? props.clicked ? 'none' : '2px dashed #22B16E' : 'none' : 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    duration: 150,
    transition: 'background-color .2s ease-out, color .2s ease-out',
    ":hover": {
        backgroundColor: props.checked ? props.isAnswerCorrect ? props.clicked ? '#22B16E' : '#e4fcf1' : props.clicked ? '#f76f7a' : theme.palette.primary.light : theme.palette.primary.main,
        color: props.checked ? props.isAnswerCorrect ? props.clicked ? 'white' : theme.palette.primary.dark : props.clicked ? 'white' : theme.palette.primary.dark : 'white',
    },
}))

const AnswerFeedback = styled.div((props : any) => ({
    width: '98%',
    justifySelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    border: props.answered ? props.correct ? '2px solid #22B16E' : '2px solid #f76f7a' : 'none',
    backgroundColor: props.correct ? '#e4fcf1' : '#ffedef',
    paddingTop: props.answered ? 10 : 0,
    paddingBottom: props.answered ? 10 : 0,
    marginTop: props.answered ? 20 : 0,
    marginLeft: props.answered ? 10 : 0,
    color: 'white',
    transition: 'max-height 0.5s ease-in-out, background-color .2s ease-out, border .2s ease-out',
    maxHeight: props.answered ? 500 : 0,
    overflowY: 'hidden',
}))

const CheckButton = styled.div((props : any) => ({
    width: '98%',
    justifySelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: theme.palette.primary.dark,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 15,
    marginLeft: 10,
    color: 'white',
    cursor: "pointer",
    transition: 'background-color .2s ease-out',
}))

interface MultipleSelectProps {
    question: string,
    correctAnswers: Array<number>,
    answers: {id: number, text: string}[],
    number: number
}

function MultipleSelectQuestion(props : MultipleSelectProps) {
    const [questionsClicked, setQuestionsClicked] = useState<Array<boolean>>([])
    const [answered, setAnswered] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [checked, setChecked] = useState(false) // fire when "Check answer" is clicked

    const answerText = (id : number, clicked : boolean) => {
        console.log(id);
        console.log(clicked);
        if (props.correctAnswers.includes(id + 1)) {
            if (clicked) {
                return 'CORRECT'
            } else {
                return 'CORRECT ANSWER'
            }
        } else {
            if (clicked) {
                return 'INCORRECT'
            } else {
                return ''
            }
        }
    }

    //set initial state of all questions clicked to false on mount
    useEffect(() => {
        if (props.answers && props.answers.length > 1) {
            for (let i = 0; i < props.answers.length; i++) {
                setQuestionsClicked(prev => [...prev, false])
            }
        }
    }, [])

  return (
    <QuestionHolder checked={checked}>
        <Typography variant='overline' sx={{fontWeight: 600, fontSize: '0.9em'}} fontSize='subtitle2' color={theme.palette.primary.main}>Question {props.number}</Typography>
        <Typography variant='h6' sx={{fontWeight: 200, fontFamily: 'DM Serif Display'}}>{props.question}</Typography>
        
        <Grid container rowSpacing={2} columnSpacing={2} sx={{marginTop: 1, alignSelf: 'center', justifySelf: 'center'}}>
                {props.answers.map((ans, i) => {
                    
                    return (
                        <Grid key={i} sx={{
                            minHeight: '100',
                        }} item xs={props.answers.length % 2 === 0 ? 6 : 12}>
                            <AnswerHolder className="answerHolder" onClick={() => {
                                //set the answer state to clicked
                                let currentClickState = []
                                for (let status of questionsClicked) currentClickState.push(status);
                                currentClickState[i] = !currentClickState[i];
                                setQuestionsClicked(currentClickState)
                            }} clicked={questionsClicked[i]} checked={checked} correct={correct} isAnswerCorrect={props.correctAnswers.includes(i + 1)} key={i}>
                                <Typography variant='body2' sx={{fontWeight: 500, marginLeft: 2, marginRight: 2}} key={i}>{ans.text}</Typography>
                                <Typography sx={{fontSize: '0.7em', fontWeight: 700, letterSpacing: 0.5, marginLeft: 2, marginRight: 2}} key={i}>{checked && answerText(ans.id, questionsClicked[i])}</Typography>
                            </AnswerHolder>
                        </Grid>
                    )
                })}
            </Grid>
            <CheckButton onClick={() => {setChecked(true)}}><Typography variant='overline' sx={{fontWeight: 600, fontSize: '0.8em'}} fontSize='subtitle2' color={"white"}>CHECK ANSWER</Typography></CheckButton>
            
            <AnswerFeedback checked={checked}>
                {correct ? <CheckCircle weight="duotone" size={24} style={{marginLeft: 15}} color={"#22B16E"} /> : <XCircle weight="duotone" size={24} style={{marginLeft: 15}}  color={'#f76f7a'}/>}
                <Typography variant='body2' sx={{fontWeight: 500, marginLeft: 1, marginRight: 2}} color={correct ? "#22B16E" : '#f76f7a'}>{correct ? 'Correct! Nice job!' : 'Oops! Please try again.'}</Typography>
            </AnswerFeedback>
    </QuestionHolder>
  )
}

export default MultipleSelectQuestion