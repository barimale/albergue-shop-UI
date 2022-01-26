import { useState, useEffect } from 'react';
import axios from 'axios';

import { shopBaseUrl } from './useCategories';

export type TranslateResponse = {
  translation: string;
  isError: boolean;
}

function useLanguages () {
  const [languages, setLanguages] = useState<string[]>([]);
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  // const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => axios.get(
      `${shopBaseUrl}/api/shop/Language/GetAllSupportedAlphaCodes`,
      {
        cancelToken: source.token,
        headers: {
          // WIP: HMAC here
          // 'Authorization': `Bearer ${userToken}`
        },
      },
    ).then((result: any) => result.data)
      .catch((thrown: any) => {
        // eslint-disable-next-line no-console
        console.log('Request canceled', thrown.message);
        return [];
      });

    getData()
      .then((result: any) => {
        setLanguages(result);
      });

    return () => {
      source.cancel('Axios request cancelled');
    };
  }, []);

  async function translate (from: string, to: string, text: string, signal: AbortSignal)
  : Promise<TranslateResponse> {
    return fetch('https://libretranslate.com/translate', {
      method: 'POST',
      signal,
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response: any) => {
      const data: any = await response.json();
      if (data.translatedText !== undefined) {
        return {
          isError: false, translation: data.translatedText,
        };
      }

      if (data.error !== undefined) {
        return {
          isError: true, translation: data.error,
        };
      }

      return {
        isError: true, translation: 'Translation not possible',
      };
    }).catch((error: any) => {
      // eslint-disable-next-line no-console
      console.log(error);
      return {
        isError: true, translation: 'Translation not possible',
      };
    });
  }

  return {
    languages, translate,
  };
}

export default useLanguages;
