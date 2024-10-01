import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';

function MobileNavigation(props) {
    const navigation = [{
        id: 'about-component',
        title: 'About Us',
        translate: 'ABOUT',
        type: 'item',
        icon: 'heroicons-outline:newspaper',
        url: 'about'
    }, {
        id: 'contact-component',
        title: 'Contact Us',
        translate: 'CONTACT',
        type: 'item',
        icon: 'material-outline:mail',
        url: 'contact-us'
    }, {
        id: 'signin-component',
        title: 'Sign In',
        translate: 'SIGNIN',
        type: 'item',
        icon: 'material-outline:login',
        url: 'sign-in'
    }];

    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

    const dispatch = useDispatch();

    return useMemo(() => {
        function handleItemClick(item) {
            if (isMobile) {
                dispatch(navbarCloseMobile());
            }
        }

        return (
            <FuseNavigation
                className={clsx('navigation', props.className)}
                navigation={navigation}
                layout={props.layout}
                dense={props.dense}
                active={props.active}
                onItemClick={handleItemClick}
            />
        );
    }, [dispatch, isMobile, navigation, props.active, props.className, props.dense, props.layout]);
}

MobileNavigation.defaultProps = {
    layout: 'vertical',
};

export default memo(MobileNavigation);
