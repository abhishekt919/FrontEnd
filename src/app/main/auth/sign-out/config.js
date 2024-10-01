import SignOutPage from './index';
import authPagesSettings from './../authPagesSettings';

const SignOutConfig = {
  settings: authPagesSettings,
  auth: null,
  routes: [
    {
      path: 'sign-out',
      element: <SignOutPage />,
    },
  ],
};

export default SignOutConfig;
