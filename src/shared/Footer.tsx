import {
    Container,
    Typography,
    Button
} from "@mui/material";
import React, { useRef } from "react";
import { styled } from "@mui/styles";
import theme from "./theme";

const FooterHolder = styled('div')({
    width: '100%',
    height: 400,
    backgroundColor: theme.palette.primary.dark,
})

function Footer() {
    return (
        <FooterHolder>
            
        </FooterHolder>
    )
}

export default Footer
