import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Menu, MenuItem, ListItemIcon, Tooltip } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

const CustomActionMenu = ({ actions }) => {
    const { t } = useTranslation('Translation');
    const [moreMenuEl, setMoreMenuEl] = useState(null);

    const handleMoreMenuClick = (event) => {
        setMoreMenuEl(event.currentTarget);
    };

    const handleMoreMenuClose = (event) => {
        setMoreMenuEl(null);
    };

    const onClick = (i) => {
        handleMoreMenuClose();
        actions[i].onClick();
    };

    return (
        <>
            <Tooltip title={t('ACTIONS')} enterDelay={300} placement="bottom" arrow>
                <IconButton
                    aria-owns={moreMenuEl ? "more-menu" : null}
                    aria-haspopup="true"
                    onClick={handleMoreMenuClick}
                    size="large"
                >
                    <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
                </IconButton>
            </Tooltip>
            <Menu
                id="more-menu"
                anchorEl={moreMenuEl}
                open={Boolean(moreMenuEl)}
                onClose={handleMoreMenuClose}
            >
                {actions.map((action, i) =>
                    action.isVisible ? (
                        <MenuItem key={i} onClick={() => onClick(i)}>
                            <ListItemIcon>
                                {action.iconName ? (
                                    <FuseSvgIcon size={20}>{action.iconName}</FuseSvgIcon>
                                ) : action.icon}
                            </ListItemIcon>
                            {action.name}
                        </MenuItem>
                    ) : null
                )}
            </Menu>
        </>
    );
};

export default CustomActionMenu;