import { AppBar, Toolbar, Container } from '@mui/material';
import React, { useState } from 'react'

function DrawerNavigation() {
    const [open, setOpen] = useState<boolean>(false);

    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="md">
                <Toolbar>
                    
                </Toolbar>
            </Container>
        </AppBar>
        
    )
}

export default DrawerNavigation
