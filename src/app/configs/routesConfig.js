import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';

// Pages
import SettingsConfig from 'app/configs/settingsConfig';
import LegalConfig from '../main/legal/config';
import AuthPagesConfig from '../main/auth/authPagesConfig';
import Error404Config from '../main/404/config';
import DashboardConfig from '../main/dashboard/config';
import ProfileConfig from '../main/profile/config';
import AccountSettingsConfig from '../main/settings/config';
import UsersConfig from '../main/users/config';
import MachineConfig from '../main/machines/config';
import ProductConfig from '../main/product/config';
import CompanyConfig from '../main/affiliated-companies/config';
import GameConfig from '../main/Game/config';
import StudentConfig from '../main/Student-Management/config';
import ContactConfig from '../main/Contact/ContactConfig';
import NewProductConfig from '../main/new-product/config';

const routeConfig = [
  ...AuthPagesConfig,
  LegalConfig,
  Error404Config,
  DashboardConfig,
  ProfileConfig,
  AccountSettingsConfig,
  UsersConfig,
  MachineConfig,
  ProductConfig,
  CompanyConfig,
  GameConfig,
  StudentConfig,
  ContactConfig,
  NewProductConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfig, SettingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
    auth: SettingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;