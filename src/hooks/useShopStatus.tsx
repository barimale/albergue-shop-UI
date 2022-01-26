import { useState, useEffect } from 'react';
import axios from 'axios';
import { shopBaseUrl } from './useCategories';

export interface ShopStatus {
  isAtLeastOneCategoryDefined: boolean;
}

export const useShopStatus = () => {
  const [status, setStatus] = useState<ShopStatus | undefined>(undefined);

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => {
    const getData = async () => axios.get(
      `${shopBaseUrl}/api/shop/Status/GetStatus`,
      {
        cancelToken: source.token,
        // WIP HMAC here
        // headers: {
        //     'Authorization': `Bearer ${userToken}`
        //   }
      },
    ).then((result: any) => result.data);

    getData()
      .then((result: ShopStatus) => {
        setStatus(result);
      }).catch(() => {
        setStatus({
          isAtLeastOneCategoryDefined: false,
        } as ShopStatus);
      });

    return () => {
      source.cancel('Axios request cancelled');
    };
  }, []);

  return status;
};
