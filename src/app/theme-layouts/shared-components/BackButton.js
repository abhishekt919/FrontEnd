import * as React from 'react';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { useTranslation } from 'react-i18next';

export default function BackButton() {
  const { t } = useTranslation('Translation');
  return (
    <Button className="ml-auto" startIcon={<ChevronLeft />} component={NavLinkAdapter} to={-1}>
      {t('BACK')}
    </Button>
  );
}
