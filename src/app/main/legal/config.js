import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const TermsofUse = lazy(() => import('./terms/index'));
const PrivacyPolicy = lazy(() => import('./privacy-policy/index'));
const FAQs = lazy(() => import('./faqs/index'));

const LegalConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    }
  },

 // auth: authRole.onlyGuest
  routes: [
    {
      path: 'legal/terms-of-use',
      element: <TermsofUse />,
    },
    {
      path:'legal/privacy-policy',
      element:<PrivacyPolicy/>
    },
    {
      path:'legal/faqs',
      element:<FAQs/>
    }
  ],
};

export default LegalConfig;
