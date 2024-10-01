import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AppLogo from 'app/shared-components/AppLogo';
import MobileNavigation from './MobileNavigation';

const drawerWidth = 280;
const navItems = [{
    name: 'Contact Us',
    url: '/contact/'
}, {
    name: 'Sign In',
    url: '/sign-in'
}];

function LandingHeader(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, marginLeft: '25px' }}>
                <AppLogo type="bg" />
            </Typography>
            <Divider />
            <MobileNavigation className="mt-20" />
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" className="app-header">
                <div className="flex flex-col items-center">
                    <Toolbar className="w-full max-w-7xl app-header-padding">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className="menu-icon"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <AppLogo type="bg" />
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Link key={item.name} href={item.url} className="nav-item">{item.name}</Link>
                            ))}
                        </Box>
                    </Toolbar>
                </div>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

LandingHeader.propTypes = {
    window: PropTypes.func
};

export default LandingHeader;