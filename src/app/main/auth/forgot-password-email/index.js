import { Link } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import AppLogo from 'app/shared-components/AppLogo';
function ForgotPasswordEmailPage() {
  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <AppLogo type="bg" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Forgot Password
          </Typography>
          <Typography className="mt-16">
            An email with instructions has been sent to your email address. Follow those
            instructions to reset your password.
          </Typography>

          <Typography className="mt-32 text-md font-medium" color="text.secondary">
            <span>Return to</span>
            <Link className="ml-4 text-primary-500 hover:underline" to="/sign-in">
              Sign in
            </Link>
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default ForgotPasswordEmailPage;
