import React, { useEffect } from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { lazy, Suspense } from 'react';
import CenteredDiv from '../common/CenteredDiv';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LinearProgress } from '@material-ui/core';
import { useCategories } from '../../hooks/useCategories';
import { useHistory } from 'react-router-dom';

const MobileBuyContent = lazy(() => import("../../components/mobile/BuyContent"));
const DesktopBuyContent = lazy(() => import("../../components/desktop/BuyContent"));

export const Path = "/shopping";

export type BuyScreenProps = {
  filterByCategory: string;
}

export function BuyScreen(props: BuyScreenProps){
  const {filterByCategory} = props;

  return (
    <DeviceContextConsumer>
    {context =>
        <div style={{
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: context === DeviceType.isDesktopOrLaptop ? 'space-around': 'space-evenly',
          color: 'white',
          paddingBottom: 0,
          height: 'inherit',
          fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px'
        }}>
          {context === DeviceType.isTabletOrMobile ? (
            (<Suspense fallback={
              <CenteredDiv>
                  <CircularProgress color="secondary" />
              </CenteredDiv>
            }>
            <MobileBuyContent filterByCategory={filterByCategory}/>
          </Suspense>)
          ):(
            <Suspense fallback={
              <CenteredDiv>
                  <CircularProgress color="secondary" />
              </CenteredDiv>
            }>
              <DesktopBuyContent filterByCategory={filterByCategory}/>
            </Suspense>
          )}
        </div>
    }
    </DeviceContextConsumer>
  );
}