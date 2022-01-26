/* eslint-disable no-console */
import React, { useEffect, useState, lazy, Suspense } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import CenteredDiv from '../common/CenteredDiv';
import { ItemDetails } from '../common/BuyItems';
import { shopBaseUrl } from '../../hooks/useCategories';
import { LoadingInProgress } from '../molecules/LoadingInProgress';

const MobileBuyContent = lazy(() => import('../../components/mobile/BuyContent'));
const DesktopBuyContent = lazy(() => import('../../components/desktop/BuyContent'));

export const Path = '/shopping';

export type BuyScreenProps = {
  filterByCategory: string;
}

export function BuyScreen (props: BuyScreenProps) {
  const { filterByCategory } = props;
  const [items, setItems] = useState<ItemDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => {
    const getData = async () => axios.get(
      `${shopBaseUrl}/api/shop/Item/GetItemsByCategoryId/${filterByCategory}`,
      {
        cancelToken: source.token,
      },
    ).then((result: any) => result.data)
      .catch((thrown: any) => {
        console.log('Request canceled', thrown.message);
        return [];
      });

    getData()
      .then((result: any) => setItems(result))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));

    return () => {
      source.cancel('Axios request cancelled');
    };
  }, [filterByCategory]);

  return (
    <DeviceContextConsumer>
      {(context) => (
        isLoading ? (
          <LoadingInProgress />
        ) : (
          <div style={{
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: context === DeviceType.isDesktopOrLaptop ? 'space-around' : 'space-evenly',
            color: 'white',
            width: '100%',
            paddingBottom: 0,
            height: 'inherit',
            fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px',
          }}
          >
            {context === DeviceType.isTabletOrMobile ? (
              (
                <Suspense fallback={(
                  <CenteredDiv>
                    <CircularProgress color="secondary" />
                  </CenteredDiv>
            )}
                >
                  <MobileBuyContent items={items} />
                </Suspense>
              )
            ) : (
              <Suspense fallback={(
                <CenteredDiv>
                  <CircularProgress color="secondary" />
                </CenteredDiv>
            )}
              >
                <DesktopBuyContent items={items} />
              </Suspense>
            )}
          </div>
        )
      )}
    </DeviceContextConsumer>
  );
}
