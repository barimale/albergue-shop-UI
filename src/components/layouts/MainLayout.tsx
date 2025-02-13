import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useLocation, useHistory } from 'react-router-dom';
import { hexToRgb } from '@material-ui/core/styles';
import { RGBToRGBA, thirdMain } from '../../customTheme';
import Footer from '../molecules/Footer';
import Header from '../molecules/Header';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const MainLayout = (props : any) => {
  const [paddingTop, setPaddingTop] = useState<number>(10);
  const [paddingBottom, setPaddingBottom] = useState<number>(10);
  const { innerHeight: height } = window;
  const isPortrait = useMediaQuery({
    orientation: 'portrait',
  });
  const prevVal = usePrevious(isPortrait);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    history.replace(location.pathname);
  }, [window.screen.width, window.screen.height]);

  useEffect(() => {
    if (prevVal === undefined) {
      return;
    }

    if (isPortrait !== prevVal) {
      history.replace(location.pathname);
    }
  }, [isPortrait, prevVal]);

  return (
    <DeviceContextConsumer>
      {(context) => (
        context.valueOf() === DeviceType.isTabletOrMobile ? (
          <p>Mobile and Tablet not supported.</p>
        ) : (
          <>
            <Header onSize={(size: any) => {
              setPaddingTop(size.height || 0);
            }}
            />
            <div
              className="main-layout"
              style={{
                height: height - paddingTop - paddingBottom,
                width: '100%',
                paddingTop,
                paddingBottom,
                display: 'inline-flex',
                background: `${RGBToRGBA(hexToRgb(thirdMain), 1)}`,
                justifyContent: 'center',
              }}
            >
              {props.children}
            </div>
            <Footer onSize={(size: any) => {
              setPaddingBottom(size.height || 0);
            }}
            />
          </>
        )
      )}
    </DeviceContextConsumer>
  );
};

export const ContentLayout = (props: any) => (
  <div style={{
    height: 'inherit',
    width: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  >
    {props.children}
  </div>
);

export const ContentLayout2 = (props: any) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    width: 'inherit',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    backgroundColor: 'white',
  }}
  >
    {props.children}
  </div>
);
