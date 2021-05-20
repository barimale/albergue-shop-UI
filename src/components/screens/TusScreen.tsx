import React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { Categories } from "../common/BuyItems";
import { lazy, Suspense } from 'react';
import CenteredDiv from '../common/CenteredDiv';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ContentLayout } from '../layouts/MainLayout';

const TusScreenContent = lazy(() => import("../common/TusScreenContent"));

export const Path = "/tus";
export const Title = Categories[3].title;

export type TusScreenProps = {
  filterByCategory: string;
}

export function TusScreen(props: TusScreenProps){
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
            <Suspense fallback={
                <CenteredDiv>
                    <CircularProgress color="secondary" />
                </CenteredDiv>
              }>
                <ContentLayout>
                  <TusScreenContent filterByCategory={filterByCategory}/>
                </ContentLayout>
            </Suspense>
        </div>
    }
    </DeviceContextConsumer>
  );
}