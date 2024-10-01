import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Hidden, Toolbar } from '@mui/material';
import clsx from 'clsx';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import NotificationPanelToggleButton from '../../shared-components/notificationPanel/NotificationPanelToggleButton';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import UserMenu from '../../shared-components/UserMenu';
import CompanyName from '../../shared-components/CompanyName';
import SwitchAccount from '../../shared-components/SwitchAccount';
import SwitchToSuperAdmin from '../../shared-components/SwitchToSuperAdmin';

import { userSession } from 'app/store/userSlice';

function ToolbarLayout(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbar = useSelector(selectFuseNavbar);
  const toolbarTheme = useSelector(selectToolbarTheme);
  const signInUser = useSelector(userSession);

  const [isSuperAdminLoggedIn, setSuperAdminLoggedin] = useState(Cookies.get("_SuperMyMachineOnline"));

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color="default"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? toolbarTheme.palette.background.paper
              : toolbarTheme.palette.background.default,
        }}
        position="static"
      >
        <Toolbar className="p-0 min-h-48 md:min-h-64">
          <div className="flex px-16">
            {config.navbar.display && config.navbar.position === 'left' && (
              <>
                <Hidden lgDown>
                  {(config.navbar.style === 'style-3' ||
                    config.navbar.style === 'style-3-dense') && (
                      <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                    )}

                  {config.navbar.style === 'style-1' && !navbar.open && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                  )}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
                </Hidden>
              </>
            )}
          </div>
          <div className="flex flex-1">
            <CompanyName />
          </div>
          <div className="flex items-center px-8 h-full overflow-x-auto">

            {isSuperAdminLoggedIn && (
              <SwitchToSuperAdmin />
            )}

            {signInUser?.switchUserEmail && (
              <SwitchAccount />
            )}

            <LanguageSwitcher />

            <FullScreenToggle />

            <NotificationPanelToggleButton />

            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === 'right' && (
            <>
              <Hidden lgDown>
                {!navbar.open && <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout);
