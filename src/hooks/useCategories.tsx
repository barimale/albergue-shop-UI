import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import { configSection, configSectionType } from '../router/routerConfiguration';
import {  Path as BuyPath } from "../components/screens/BuyScreen";

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
  const [categories, setCategories ] = useState<Array<Category>>(new Array<Category>());
  const [configSections, setConfigSections ] = useState<Array<configSection>>(new Array<configSection>());

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => {
      const getData = async () => {
          return await axios.get(
            `${shopBaseUrl}/api/shop/Category/GetAllCategories`, 
              {
                  cancelToken: source.token,
                  //WIP HMAC here
                  // headers: {
                  //     'Authorization': `Bearer ${userToken}` 
                  //   }
              }
          ).then((result: any)=>{
              return result.data;
          })
          .catch((thrown: any)=>{
              console.log('Request canceled', thrown.message);
              return new Array<Category>();
          });
      };

      getData()
          .then((result: any)=>{
            setCategories(result);
          }).catch(()=>{
            setCategories(new Array<Category>());
          });

      return () => {
        source.cancel("Axios request cancelled");
      };
    }, []);

    
  function ToConfigSections(categories: Array<Category>): configSection[] {
    return categories?.map((p: Category) => {
        return(
          {
              title: p.keyName,
              api: `${BuyPath}/${p.keyName.toLowerCase()}`,
              type: configSectionType.link
          } as configSection
        );}   
      );
  }

    useEffect(()=>{
      const getData = async (categories: Array<Category>) =>{
        return await ToConfigSections(categories);
      };

      getData(categories).then((result: configSection[])=>{
        setConfigSections(result);
      }).catch((error: any)=>{
        console.log(error);
        setConfigSections(new Array<configSection>())
      });

      return () => {
        source.cancel("Axios request cancelled");
      };

    },[categories]);

  return {categories, configSections};
}
