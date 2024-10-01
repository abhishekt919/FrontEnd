import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import CustomTooltip from 'app/shared-components/CustomTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import { userSession } from 'app/store/userSlice';
import AuthService from './../../auth/services/AuthService';
import { showMessage } from 'app/store/fuse/messageSlice';

const SwitchToSuperAdmin = () => {
    const { t } = useTranslation('Translation');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signInUser = useSelector(userSession);
    const onSwitchAccount = () => {
        if (Cookies.get("_SuperMyMachineOnline")) {
            AuthService
                .switchToSuperAdmin(Cookies.get("_SuperMyMachineOnline"))
                .then((result) => {
                })
                .catch((error) => {
                    dispatch(showMessage({ message: error, variant: 'error' }));
                });
        }
    }

    return (
        <CustomTooltip title={t('GO_BACK_TO_SUPERADMIN')}>
            <Button
                variant="text"
                startIcon={<FuseSvgIcon>heroicons-outline:login</FuseSvgIcon>}
                onClick={onSwitchAccount}
                className="px-10"
                size="medium"
            >
                {t('SWITCH_ACCOUNT')}
            </Button>
        </CustomTooltip>
    );
};

export default SwitchToSuperAdmin;
