import { AppBar, Avatar, Box, Button, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone';
import './NavBar.css'
import useAuth from '../../../Hooks/useAuth';
import { useHistory } from "react-router-dom";


const pages = ['home', 'services', 'doctors', 'Appointment', 'about', 'login'];
const settings = ['Profile', 'Logout'];

const Navbar = () => {
    // authentication 
    const { logout, user } = useAuth();
    const { displayName, photoURL } = user;

    //navigation
    let history = useHistory();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleUserControl = (event) => {
        const userEvent = event.currentTarget.innerText;
        if (userEvent === 'Logout') {
            logout();
        }
        else if (userEvent === 'Profile') {
            console.log('ok');
            history.push("/profile");
        }
    };
    return (
        <Box sx={{ mt: 8 }} >
            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }} >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        > <HealingTwoToneIcon
                                fontSize='large'
                            />
                            Health Haven Hospital
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}

                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {/*-------- small skin navigation-------- */}
                                {pages.map((page) => (
                                    <MenuItem key={page}
                                        bgcolor="primary"
                                        onClick={handleCloseNavMenu}
                                        component={Link}
                                        to={page}
                                    >{page}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h6"
                            align='center'
                            component="div"
                            sx={{ flexGrow: 1, pt: 2, display: { xs: 'flex', md: 'none' } }}
                        >
                            <HealingTwoToneIcon
                                fontSize='large' />  Health Haven Hospital
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            {/*-------- large skin navigation-------- */}

                            {pages.map((page) => (
                                <Link
                                    key={page}
                                    className="text-style text-style-fullscrn "
                                    to={page}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    > {page}

                                    </Button></Link>
                            ))}
                        </Box>

                        {/* user info and navigation btn */}

                        {
                            user?.email ? <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={user?.email ? photoURL : "/static/images/avatar/2.jpg"} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
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
                                    onClose={handleCloseUserMenu}
                                >  <Typography sx={{ p: '5px' }} color="primary" textAlign="center">Hi, {displayName}</Typography>
                                    <Divider />
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography onClick={handleUserControl} textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box> : <></>
                        }
                    </Toolbar>
                </Container>
            </AppBar>

        </Box>
    );
};

export default Navbar;