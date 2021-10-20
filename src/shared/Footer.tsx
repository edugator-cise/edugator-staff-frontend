import {
    Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import theme from "./theme";

const FooterHolder = styled('div')({
    width: '100%',
    height: 50,
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

function Footer() {
    return (
        <FooterHolder>
            <Typography variant="body1" color={theme.palette.primary.light}>Edugator, 2021</Typography>
        </FooterHolder>
    )
}

export default Footer
