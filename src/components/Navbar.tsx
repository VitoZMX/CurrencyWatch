import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

export function Navbar() {
    return (
        <Box sx={{flexGrow: 1, marginBottom: '15px'}}>
            <AppBar position="static" style={{height: '50px'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters variant={'dense'}>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            CurrencyWatch
                        </Typography>
                        {/*<Button color="inherit">All currencies</Button>*/}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}