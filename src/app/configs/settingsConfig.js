import themesConfig from 'app/configs/themesConfig';
import i18n from '../../i18n';

const settingsConfig = {
  layout: {
    style: 'layout'
  },
  customScrollbars: true,
  direction: i18n.dir(i18n.options.lng) || 'ltr',
  theme: {
    main: themesConfig.default,
    navbar: themesConfig.defaultDark,
    toolbar: themesConfig.default,
    footer: themesConfig.default,
  },
  /*
   To make whole app auth protected by default set defaultAuth:['director', 'manager', 'employee']
   To make whole app accessible without authorization by default set defaultAuth: null
   *** The individual route configs which has auth option won't be overridden.
   */
  defaultAuth: ['director', 'manager', 'employee'],
  /*
    Default redirect url for the logged-in user,
   */
  loginRedirectUrl: '/dashboard',
};

export default settingsConfig;
