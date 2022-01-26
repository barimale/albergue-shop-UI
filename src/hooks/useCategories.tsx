/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { configSection, configSectionType } from '../router/routerConfiguration';
import { Path as BuyPath } from '../components/screens/BuyScreen';

export const shopBaseUrl = process.env.REACT_APP_SHOP_APP;

export interface Category {
  id: string;
  keyName: string;
  translatableDetails: Array<CategoryTranslatableDetails>;
}

export interface CategoryTranslatableDetails {
  id: string;
  name: string;
  languageId: string;
  categoryId?: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [configSections, setConfigSections] = useState<configSection[]>([]);

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => {
    const getData = async () => axios.get(
      `${shopBaseUrl}/api/shop/Category/GetAllCategories`,
      {
        cancelToken: source.token,
        // WIP HMAC here
        // headers: {
        //     'Authorization': `Bearer ${userToken}`
        //   }
      },
    ).then((result: any) => result.data)
      .catch((thrown: any) => {
        console.log('Request canceled', thrown.message);
        return [];
      });

    getData()
      .then((result: any) => {
        setCategories(result);
      }).catch(() => {
        setCategories([]);
      });

    return () => {
      source.cancel('Axios request cancelled');
    };
  }, []);

  function ToConfigSections (categories: Array<Category>): configSection[] {
    return categories?.map((p: Category) => (
          {
            title: p.keyName,
            api: `${BuyPath}/${p.keyName.toLowerCase()}`,
            type: configSectionType.link,
            id: p.id,
          } as configSection
    ));
  }

  useEffect(() => {
    const getData = async (categories: Array<Category>) => ToConfigSections(categories);

    getData(categories).then((result: configSection[]) => {
      setConfigSections(result);
    }).catch((error: any) => {
      console.log(error);
      setConfigSections([]);
    });

    return () => {
      source.cancel('Axios request cancelled');
    };
  }, [categories]);

  return {
    categories, configSections,
  };
};
