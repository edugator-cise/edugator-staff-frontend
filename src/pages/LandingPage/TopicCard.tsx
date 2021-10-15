import {
    Typography,
} from "@mui/material";
import { Card } from '@mui/material'
import { styled } from '@mui/styles'
import React, { useRef } from 'react'
import theme from '../../shared/theme'

interface topicInfo {
    name: string;
    staticImg: any,
    animatedImg: any,
    description: string
}

const Topic = styled('div')({
    height: 300,
    width: 250,
    backgroundColor: 'white',
    borderTop: '5px solid ' + theme.palette.primary.main,
    borderRadius: 15,
    boxShadow:
    '-1rem 0 2rem rgba(149, 157, 165, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
})



function TopicCard(props:topicInfo) {
    const gif = useRef<any>(null); 

    return (
        <Topic 
            onMouseOver={() => {gif.current.src = props.animatedImg}}
            onMouseOut={() => {gif.current.src = props.staticImg}} 
        >
            <img 
                height={100} 
                width={100} 
                src={props.staticImg} 
                ref={gif}
            />
            <Typography variant="h5" color="#3A4F58"><b>{props.name}</b></Typography>
            <Typography variant="body2" color="#3A4F58" sx={{maxWidth: '80%'}}>{props.description}</Typography>
        </Topic>
    )
}

export default TopicCard
