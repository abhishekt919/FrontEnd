import Link from '@mui/material/Link';
import clsx from 'clsx';

const AppLogo = ((props) => {
    if (props.type === "white") {
        return (
            <Link href="/" style={{ marginLeft: '0px' }}>
                <div className={clsx(props.className)}>
                    {/* <img className="w-full h-full scale-100" src="assets/images/logo/white-logo.svg" alt="logo" /> */}
                    My Machine Online
                </div>
            </Link>
        );
    }
    if (props.type === "bg") {
        return (
            <Link href="/">
                <div style={{ width: '300px' }}>
                    <img className="w-full h-full scale-100" src="assets/images/logo/logo.jpg" alt="logo" />
                </div>
            </Link>
        );
    }
    return null;
});

export default AppLogo;
