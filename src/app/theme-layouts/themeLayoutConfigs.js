import i18next from 'i18next';
import layout from './layout/LayoutConfig';
import en from './../main/i18n/en';
import es from './../main/i18n/es';

i18next.addResourceBundle('en', 'Translation', en);
i18next.addResourceBundle('es', 'Translation', es);

const themeLayoutConfigs = {
  layout
};

export default themeLayoutConfigs;
