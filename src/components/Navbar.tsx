import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import TodayIcon from '@mui/icons-material/Today'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import {ButtonBase, Icon} from '@material-ui/core'
import {NavLink} from 'react-router-dom'

const itemsNavMenu = [
    {text: 'Все валюты', link: '/currencies', icon: <LocalAtmIcon/>},
    {text: 'Ежедневные курсы НБРБ', link: '/day', icon: <TodayIcon/>},
    {text: 'Ежемесячные курсы НБРБ', link: '/month', icon: <CalendarMonthIcon/>},
]

export function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <Box sx={{flexGrow: 1, marginBottom: '15px'}}>
            <AppBar position="static" style={{height: '50px'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters variant={'dense'}>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            CurrencyWatch
                        </Typography>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Other pages">
                                <IconButton onClick={handleOpenMenu} sx={{p: 1}}>
                                    <Icon style={{color: '#ffffff'}}>
                                        <MoreVertIcon/>
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseMenu}
                                PaperProps={{
                                    sx: {
                                        backgroundColor: '#eff0ee', // замените на ваш желаемый цвет фона
                                    },
                                }}
                            >
                                {itemsNavMenu.map(({text, link, icon}) => (
                                    <ButtonBase
                                        component={NavLink}
                                        to={link}
                                        style={{display: 'flex', alignItems: 'center'}}
                                        key={text}
                                    >
                                        <MenuItem style={{width: '100%'}}
                                                  onClick={handleCloseMenu}>
                                            {icon}
                                            <Typography sx={{ml: 2}}>{text}</Typography>
                                        </MenuItem>
                                    </ButtonBase>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

        </Box>
    )
}