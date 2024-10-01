import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import { Paper, Typography, Alert, IconButton } from '@mui/material';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useDispatch } from 'react-redux';

import AuthService from './../../../auth/services/AuthService';
import AppLogo from 'app/shared-components/AppLogo';
import { showMessage } from 'app/store/fuse/messageSlice';

function VerifyMobilePhonePage() {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmitCode = () => {
    const { token } = routeParams;
    if (token) {
      setLoading(true);
      AuthService
        .verifyMobilePhone(token, verificationCode)
        .then((result) => {
          setLoading(false);
          if (result.messageId === 200) {
            dispatch(showMessage({ message: result.message }));
            navigate('/sign-in');
          }
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(error);
        });
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <AppLogo type="bg" />

          <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight">
            Confirmation required
          </Typography>
          <Typography className="mt-16">
            A verification code has been sent to your mobile phone number. Please enter verification code below to verify your account.
          </Typography>
          <div className="mt-24">
            <ReactInputVerificationCode
              length={6}
              onChange={setVerificationCode}
              value={verificationCode}
              placeholder=""
              passwordMask=""
              type="text"
            />
          </div>

          {errorMessage ?
            <Alert severity="warning" action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setErrorMessage(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
              sx={{ mb: 2 }} className="mt-10">
              {errorMessage}
            </Alert> : null}

          <LoadingButton
            variant="contained"
            color="secondary"
            className=" w-full mt-24"
            aria-label="Forgot Password"
            disabled={!verificationCode || verificationCode.length < 6}
            type="button"
            size="large"
            loading={isLoading}
            onClick={onSubmitCode}
          >
            Submit
          </LoadingButton>

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

export default VerifyMobilePhonePage;
