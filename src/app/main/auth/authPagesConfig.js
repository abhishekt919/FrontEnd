import SignInConfig from './sign-in/config';
import SignUpConfig from './sign-up/config';
import SignOutConfig from './sign-out/config';
import ForgotPasswordPagesConfig from './forgot-password/config';
import ForgotPasswordEmailPageConfig from './forgot-password-email/config';
import ResetPasswordPagesConfig from './reset-password/config';
import ConfirmationRequiredPagesConfig from './confirmation-required/config';
import CompleteAccountConfig from './complete-account/config';

const AuthPagesConfig = [
  SignInConfig,
  SignUpConfig,
  SignOutConfig,
  ForgotPasswordPagesConfig,
  ForgotPasswordEmailPageConfig,
  ResetPasswordPagesConfig,
  ConfirmationRequiredPagesConfig,
  CompleteAccountConfig
];

export default AuthPagesConfig;
