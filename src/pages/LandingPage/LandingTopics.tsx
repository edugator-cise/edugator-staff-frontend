import {
    Container,
    Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { styled } from "@mui/styles";
import theme from "../../shared/theme";
import SortingGif from '../../assets/icons8-alphabetical-sorting.gif'
import SortingStatic from '../../assets/icons8-alphabetical-sorting-100.png'
import HeapGif from '../../assets/icons8-expand-arrow.gif'
import HeapStatic from '../../assets/icons8-expand-arrow-100.png'
import LinkedGif from '../../assets/icons8-link.gif'
import LinkedStatic from '../../assets/icons8-link-100.png'
import StackGif from '../../assets/icons8-menu.gif'
import StackStatic from '../../assets/icons8-menu-100.png'
import RecursiveGif from '../../assets/icons8-replay.gif'
import RecursiveStatic from '../../assets/icons8-replay-100.png'
import MapGif from '../../assets/icons8-thumbnail-view.gif'
import MapStatic from '../../assets/icons8-thumbnail-view-100.png'
import TopicCard from "./TopicCard";

const Holder = styled("div")({
    height: 800,
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: 'linear-gradient(white, transparent, transparent, transparent), url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)',
    backgroundSize: "35em",
    [theme.breakpoints.up("xl")]: {
    },
});

const TopicList = styled('div')({
    display: 'flex',
    flexDirection: 'row',
})

function LandingTopics() {
    const topics = [
        {
            name: "Sorting",
            description: "Sort through arrays and vectors with different conditions.",
            staticImg: SortingStatic,
            animatedImg: SortingGif,
        },
        {
            name: "Linked Lists",
            description: "Connected data sets in node format.",
            staticImg: LinkedStatic,
            animatedImg: LinkedGif,
        },
        {
            name: "Stacks and Queues",
            description: "Lorem ipsum dolor sit amet.",
            staticImg: StackStatic,
            animatedImg: StackGif,
        },
        {
            name: "Heaps",
            description: "Lorem ipsum dolor sit amet.",
            staticImg: HeapStatic,
            animatedImg: HeapGif,
        },
        {
            name: "Sets and Maps",
            description: "Lorem ipsum dolor sit amet.",
            staticImg: MapStatic,
            animatedImg: MapGif,
        },
        {
            name: "Recursion",
            description: "Lorem ipsum dolor sit amet.",
            staticImg: RecursiveStatic,
            animatedImg: RecursiveGif,
        },
    ]
    
    return (
        <Holder>
            
            <Typography variant="h3">Choose your learning path by</Typography>
            <Typography variant="h3" color="primary">Topic</Typography>
            
            <TopicList>
            {topics.map((topic, index) =>
                <TopicCard 
                    key={index}
                    name={topic.name}
                    description={topic.description}
                    staticImg={topic.staticImg}
                    animatedImg={topic.animatedImg}    
                />
            )}
            </TopicList>
            
            
        </Holder>
        
    )
}

export default LandingTopics
