/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { IconButton, LinearProgress, Typography } from '@material-ui/core';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { useCategories } from '../../hooks/useCategories';
import { useShopStatus } from '../../hooks/useShopStatus';
import LanguageSetter from '../organisms/LanguageSetter';
import { Logo } from './Logo';
import maini18n from '../../i18n';

export default function ContactScreenContent () {
  const status = useShopStatus();
  const { configSections } = useCategories();

  return (
    <>
      {status === undefined ? (
        <LinearProgress />
      ) : (
        <>
          {status !== undefined && status.isAtLeastOneCategoryDefined.valueOf() === true ? (
            <>
              {configSections.length > 0 ? (
                <Redirect to={configSections[0].api} />
              ) : (
                <I18nextProvider i18n={maini18n}>
                  <SystemIsEmpty />
                </I18nextProvider>
              )}
            </>
          ) : (
            <I18nextProvider i18n={maini18n}>
              <SystemIsEmpty />
            </I18nextProvider>
          )}
        </>
      )}
    </>
  );
}
const SystemIsEmpty = () => {
  const websiteBaseUrl = process.env.REACT_APP_WEBSITE_APP;
  const { i18n } = useTranslation();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
        >
          <div style={{
            width: '100%',
          }}
          >
            <LanguageSetter style={{
              float: 'right',
            }}
            />
          </div>
          <div style={{
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            paddingBottom: 0,
            height: '100%',
            width: '100%',
            fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px',
          }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'end',
            }}
            >
              {i18n.t('There are no items in the shop').toUpperCase()}
            </div>
            <div style={{
              alignContent: 'center',
              paddingTop: 0,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              color: 'white',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px',
            }}
            >
              <IconButton
                className="pointerOverEffect"
                href={websiteBaseUrl || ''}
                style={{
                  padding: context === DeviceType.isDesktopOrLaptop ? 20 : 10,
                  borderRadius: '0px',
                }}
              >
                <Logo
                  style={{
                    height: context === DeviceType.isDesktopOrLaptop ? 64 : 32,
                    width: 'auto',
                  }}
                />
                <Typography
                  style={{
                    color: 'white',
                    paddingLeft: '20px',
                  }}
                >
                  {i18n.t('Go back to ALBERGUE DE PEREGRINOS PORTO')}
                </Typography>
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </DeviceContextConsumer>
  );
};
