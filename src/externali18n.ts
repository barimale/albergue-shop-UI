import i18next from 'i18next';
import BackendConnector from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const externali18n = i18next.createInstance();

const loadPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:5020/externals/{{lng}}.json' : 'https://administrator-albergue-porto.web.app/externals/{{lng}}.json';
// const loadPath = process.env.NODE_ENV !== 'production' ? '/locales/{{ns}}/{{lng}}.json' : 'https://administrator-albergue-porto.web.app/externals/{{lng}}.json';

externali18n
  .use(BackendConnector)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    defaultNS: 'externals',
    fallbackLng: 'en',
    backend: {
      loadPath,
      addPath: loadPath,
      crossDomain: true,
      withCredentials: false,
      requestOptions: {
        mode: 'no-cors',
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        // },
      },
      // customHeaders: {
      //   'Access-Control-Allow-Origin': '*',
      // },
      reloadInterval: 10000,
    },
    react: {
      bindI18n: 'languageChanged loaded added',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
      wait: true,
    },
    initImmediate: true,
  });

export default externali18n;
