import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import AppLogo from 'app/shared-components/AppLogo';
function LandingFooter() {
    let year = new Date();

    return (
        <div className="app-footer">
            <div className="flex flex-col items-center px-24 sm:px-64 sm:py-20">
                <div className="w-full max-w-7xl">
                    <div className="grid grid-cols-1 gap-x-24 gap-y-48 sm:grid-cols-2 lg:grid-cols-4 lg:gap-64 w-full mt-10 mb-20">
                        <div>
                            <Typography variant="button" display="block" className="mb-20">
                                About Us
                            </Typography>
                            <AppLogo type="white"/>
                            <Typography variant="body2" className="mt-20">
                                Easy-to-use fleet preventive maintenance software for drivers, mechanics, and managers.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="button" display="block" className="mb-20">
                                Quick Links
                            </Typography>
                            <ul>
                                <li>
                                    <Link href='/sign-in'>
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/sign-up'>
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <Typography variant="button" display="block" className="mb-20">
                                Legal
                            </Typography>
                            <ul>
                                <li>
                                    <Link href='/legal/terms-of-use'>
                                        Terms of use
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/legal/privacy-policy'>
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <Typography variant="button" display="block" className="mb-20">
                                Contact Us
                            </Typography>
                            <ul>
                                <li>
                                    <Typography variant="body2">
                                        contact@RocketWebServices.com
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body2">
                                        22 Meridian Road, Suite 19,
                                        Edison NJ, 08820
                                    </Typography>
                                </li>
                            </ul>
                            <div className="apps">
                                <div>
                                 
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} className="border-t-2 border-gray-700 border-solid py-20">
                    <Typography variant="body2" className="text-center">
                        Coyright &copy; {year.getFullYear()} My Machine Online. All rights reserved.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default LandingFooter;
