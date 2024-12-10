import i18next from 'i18next';
import es from './navigation-i18n/es';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig = [
  {
    id: 'dashboard-component',
    title: 'Dashboard',
    translate: 'DASHBOARD',
    type: 'item',
    icon: 'material-outline:dashboard',
    url: 'dashboard',
  },
  {
    id: 'users',
    title: 'Users',
    translate: 'USERS',
    type: 'item',
    icon: 'material-outline:people',
    url: 'users',
  },
  {
    id: 'affiliated-companies',
    title: 'Affiliated Companies',
    translate: 'AFFILIATED_COMPANY',
    type: 'item',
    icon: 'material-outline:people',
    url: 'affiliated-companies',
  },
  {
    id: 'machines',
    title: 'Machines',
    translate: 'MACHINES',
    type: 'item',
    icon: 'heroicons-outline:office-building',
    url: 'machines',
  },
  {
    id: 'product',
    title: 'Product',
    type: 'item',
    icon: 'heroicons-outline:office-building',
    url: 'product',
  },
  {
    id: 'students',
    title: 'Students',
    type: 'item',
    icon: 'material-outline:people',
    url: 'student',
  },
  {
    id: 'game',
    title: 'Game',
    type: 'item',
    icon: 'heroicons-outline:office-building',
    url: 'game',
  },
  {
    id: 'event',
    title: 'Event',
    type: 'item',
    icon: 'heroicons-outline:office-building',
    url: 'event',
  },
  {
    id: 'contact',
    title: 'Contact',
    type: 'item',
    icon: 'material-outline:people',
    url: 'contact',
  },
  {
    id: 'new-product',
    title: 'New Product',
    type: 'item',
    icon: 'material-outline:people',
    url: 'new-product',
  },
  {
    id: 'traffic-light',
    title: 'Traffic Light',
    type: 'item',
    icon: 'material-outline:people',
    url: 'traffic-light',
  },
  {
    id: 'settings',
    title: 'Settings',
    translate: 'SETTINGS',
    type: 'item',
    icon: 'heroicons-outline:cog',
    url: 'settings',
  }
];

export default navigationConfig;
