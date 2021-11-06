import { styled } from '@mui/styles'
import React from 'react'

interface TopicProps{
    icon: any,
    name: string,
    link: string,
    active: boolean
}


function TopicLink(props:TopicProps) {

    const IconHolder = styled('div')({
        height: 60,
        width: 60,
        backgroundColor: props.active ? '#111827' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 7,
        borderRadius: 10,
        color: '#939aa6',
        '&:hover': {
            backgroundColor: '#111827',
            color: '#dedede',
            cursor: 'pointer'
        },
        WebkitTransition: 'background-color 100ms linear, color 100ms linear',
        msTransition: 'background-color 100ms linear, color 100ms linear',
        transition: 'background-color 100ms linear, color 100ms linear'
    })
    
    return (
        <IconHolder>
            {React.cloneElement(props.icon, {})}
        </IconHolder>
    )
}

export default TopicLink
