import React from 'react';
import { hexToRgb } from '@material-ui/core';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { thirdMain } from '../../customTheme';
import { RGBToRGBA } from '../../utilities';

export const Ornament = () => (
  <DeviceContextConsumer>
    {(context) => (
      <div style={{
        backgroundColor: `${RGBToRGBA(hexToRgb(thirdMain), 0.65)}`,
        height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '25px' : '14px',
        width: '100%',
        boxShadow: 'unset',
        paddingTop: '0px',
        backgroundImage: 'url(\'/small-shell.png\')',
        backgroundBlendMode: 'multiply',
        backgroundSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '25px 25px' : '14px 14px',
      }}
      />
    )}
  </DeviceContextConsumer>
);
