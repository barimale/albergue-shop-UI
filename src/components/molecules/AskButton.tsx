/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Path as ContactPath } from '../screens/ContactScreen';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';

type AskButtonProps = {
    isFirstLineVisible? : boolean;
}

export const AskButton = (props: AskButtonProps) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          borderRadius: '0px',
          paddingRight: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          {(props.isFirstLineVisible === undefined
          || (props.isFirstLineVisible !== undefined && props.isFirstLineVisible === true)) && (
            <Typography style={{
              verticalAlign: 'middle',
              textAlign: 'left',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '12px',
            }}
            >
                {t('Out of stock')}
            </Typography>
          )}
          <Typography
            paragraph={false}
            style={{
              verticalAlign: 'middle',
              paddingRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '10px' : '10px',
            }}
          >
            <a
              className="pointerOverEffect"
              style={{
                cursor: 'pointer',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                color: '#0B3976',
                textDecorationLine: 'none',
              }}
              onClick={(event: any) => {
                event.stopPropagation();
                history.replace(ContactPath);
              }}
            >
              <OpenInNewIcon
                fontSize={context === DeviceType.isDesktopOrLaptop ? 'small' : 'small'}
                style={{
                  verticalAlign: 'middle',
                  paddingRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                }}
              />
              {t('Contact Us')}
            </a>
          </Typography>
        </div>
      )}
    </DeviceContextConsumer>
  );
};
