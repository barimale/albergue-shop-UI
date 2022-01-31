import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const externali18n = i18next.createInstance();

const loadPath = `${process.env.REACT_APP_ADMINISTRATOR_BACKEND_APP}/locales/{{lng}}/{{ns}}.json`;

externali18n
  .use(Backend)
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
        mode: 'cors', credentials: 'same-origin', cache: 'default',
      },
      // reloadInterval: 10000,
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
