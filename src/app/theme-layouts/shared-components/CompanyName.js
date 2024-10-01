import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { userProfile } from 'app/store/userProfileSlice';

function CompanyName() {
    const profile = useSelector(userProfile);

    if (!profile) {
        return null;
    }

    return (
        <>
            <div className="hidden md:flex flex-col mx-4 items-end">
                <Typography component="span" className="font-semibold text-xl flex">
                    {profile.company.name}
                </Typography>
            </div>
        </>
    );
}

export default CompanyName;
