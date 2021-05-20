import React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { Categories } from "../common/BuyItems";
import { lazy, Suspense } from 'react';
import CenteredDiv from '../common/CenteredDiv';
import CircularProgress from '@material-ui/core/CircularProgress';

const MobileBuyContent = lazy(() => import("../../components/mobile/BuyContent"));
const DesktopBuyContent = lazy(() => import("../../components/desktop/BuyContent"));

export const Path = "/shopping";
export const Subtitle1 = Categories[0].title;
export const Subtitle2 = Categories[1].title;
export const Subtitle3 = Categories[2].title;
export const Subtitle4 = Categories[3].title;

export type BuyScreenProps = {
  filterByCategory: string;
}

export function BuyScreen(props: BuyScreenProps){
  const { filterByCategory } = props;

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