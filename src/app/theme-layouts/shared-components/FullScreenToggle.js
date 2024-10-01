import clsx from 'clsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import CustomTooltip from 'app/shared-components/CustomTooltip';

const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const HeaderFullScreenToggle = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { t } = useTranslation('Translation');

  useEnhancedEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullScreen(document[getBrowserFullscreenElementProp()] != null);

    return () => {
      document.onfullscreenchange = undefined;
    };
  });

  function getBrowserFullscreenElementProp() {
    if (typeof document.fullscreenElement !== 'undefined') {
      return 'fullscreenElement';
    }
    if (typeof document.mozFullScreenElement !== 'undefined') {
      return 'mozFullScreenElement';
    }
    if (typeof document.msFullscreenElement !== 'undefined') {
      return 'msFullscreenElement';
    }
    if (typeof document.webkitFullscreenElement !== 'undefined') {
      return 'webkitFullscreenElement';
    }
    throw new Error('fullscreenElement is not supported by this browser');
  }

  /* View in fullscreen */
  function openFullscreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  function toggleFullScreen() {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement
    ) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
  }

  return (
    <CustomTooltip title={t('FULLSCREEN_TOGGLE')}>
      <IconButton
        onClick={toggleFullScreen}
        className={clsx('w-40 h-40', props.className)}
        size="large"
      >
        <FuseSvgIcon>heroicons-outline:arrows-expand</FuseSvgIcon>
      </IconButton>
    </CustomTooltip>
  );
};

export default HeaderFullScreenToggle;
