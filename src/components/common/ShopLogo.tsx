import React, { useRef } from 'react';

import LocalMallRoundedIcon from '@material-ui/icons/LocalMallRounded';
import { useTheme } from '@material-ui/core';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import useOverEffectHook from '../../hooks/useOverEffectHook';

export const ShopLogo = (props: any) => {
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div
          {...props}
          style={{
            margin: '3px',
            display: 'flex',
            width: 'auto',
            flexDirection: 'row',
            justifyContent: 'center',
            border: context === DeviceType.isDesktopOrLaptop ? `3px ${theme.palette.common.white} solid` : `1px ${theme.palette.common.white} solid`,
            borderRadius: '50%',
            backgroundColor: `${theme.palette.primary.main}`,
            alignItems: 'center',
            transition: 'width 0.2s, height 0.2s',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <LocalMallRoundedIcon
            ref={hoverRef}
            style={{
              cursor: 'pointer',
              opacity: opacityValue,
              margin: '5px',
              color: `${theme.palette.common.black}`,
              WebkitTapHighlightColor: 'transparent',
              height: context === DeviceType.isDesktopOrLaptop ? '33px' : `${33}px`,
              padding: '3px',
              width: 'auto',
            }}
          />
        </div>
      )}
    </DeviceContextConsumer>
  );
};
