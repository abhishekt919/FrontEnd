import SignInPage from './index';
import authRoles from '../../../auth/authRoles';
import authPagesSettings from './../authPagesSettings';

const SignInConfig = {
  settings: authPagesSettings,
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;
