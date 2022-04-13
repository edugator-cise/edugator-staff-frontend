import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import styled from '@emotion/styled'
import theme from '../../shared/theme'

const QuestionHolder = styled.div((props: any) => ({
    width: '70%',
    marginTop: 50,
    height: 'auto',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: props.answered ? props.correct ? 'rgba(34, 177, 110, 0.7) 0px 0px 8px 0px' : 'rgba(247, 111, 122, 0.7) 0px 0px 8px 0px' : 'rgba(99, 99, 99, 0.2) 0px 0px 8px 0px',
    transition: 'box-shadow 0.3s ease-in-out',
    alignSelf: 'center',
    padding: 20
}))

const AnswerHolder = styled.div((props : any) => ({
    width: '100%',
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: props.clicked ? props.isAnswerCorrect ? '#22B16E' : '#f76f7a' : theme.palette.primary.light,
    color: props.clicked ? 'white' : theme.palette.primary.dark,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    duration: 150,
    transition: 'background-color .2s ease-out, color .2s ease-out',
    ":hover": {
        backgroundColor: props.correct && !props.clicked ? theme.palette.primary.light : props.clicked ? props.isAnswerCorrect ? '#22B16E' : '#f76f7a' : theme.palette.primary.main,
        color: props.correct && !props.clicked ? theme.palette.primary.dark : 'white'
    },
}))

interface MultipleChoiceProps {
    question: string,
    correctAnswer: number,
    answers: {id: number, text: string}[],
    number: number
}


function MultipleChoiceQuestion(props : MultipleChoiceProps) {
    const [questionsClicked, setQuestionsClicked] = useState<Array<boolean>>([])
    const [answered, setAnswered] = useState(false)
    const [correct, setCorrect] = useState(false)

    //set initial state of all questions clicked to false on mount
    useEffect(() => {
        if (props.answers && props.answers.length > 1) {
            for (let i = 0; i < props.answers.length; i++) {
                setQuestionsClicked(prev => [...prev, false])
            }
        }
    }, [])

  return (
    <QuestionHolder answered={answered} correct={correct}>
        <Typography variant='overline' sx={{fontWeight: 600, fontSize: '0.9em'}} fontSize='subtitle2' color={theme.palette.primary.main}>Question {props.number}</Typography>
        <Typography variant='h6' sx={{fontWeight: 600}}>{props.question}</Typography>
        
        <Grid container rowSpacing={2} columnSpacing={2} sx={{marginTop: 1, alignSelf: 'center', justifySelf: 'center'}}>
                {props.answers.map((ans, i) => {
                    return (
                        <Grid item xs={props.answers.length % 2 === 0 ? 6 : 12}>
                            <AnswerHolder onClick={() => {
                                //set styling for question holder based on answer
                                setAnswered(true)
                                if (i === props.correctAnswer) {
                                    setCorrect(true)
                                } else if (correct !== true) {
                                    setCorrect(false)
                                }
                                
                                //set the answer state to clicked
                                if (questionsClicked[i] === false && correct !== true) {
                                    let currentClickState = []
                                    for (let status of questionsClicked) currentClickState.push(status);
                                    currentClickState[i] = true;
                                    setQuestionsClicked(currentClickState)
                                }
                            }} clicked={questionsClicked[i]} correct={correct} isAnswerCorrect={i === props.correctAnswer} key={i}>
                                <Typography variant='body2' sx={{fontWeight: 500, marginLeft: 2, marginRight: 2}} key={ans.id}>{ans.text}</Typography>
                            </AnswerHolder>
                        </Grid>
                    )
                })}
            </Grid>
    </QuestionHolder>
  )
}

export default MultipleChoiceQuestion