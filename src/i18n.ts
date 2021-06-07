import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import LocalStorageBackend from "i18next-localstorage-backend";

const maini18n = i18next.createInstance();

maini18n
  .use(Backend)
  .use(LanguageDetector)
  // .use(LocalStorageBackend)s
  // .use(Cache)
  .use(initReactI18next)
  .init({
    defaultNS: 'translation',
    preload:  ['en', 'pt', 'nl', 'de'],
    fallbackLng: ['en', 'pt', 'nl', 'de'],
    supportedLngs: ['en', 'pt', 'nl', 'de'],
    debug: process.env.NODE_ENV !== 'production',
    backend: {
      loadPath: '/locales/main/{{lng}}/{{ns}}.json'
    },
    react: {
      bindI18n: 'languageChanged loaded',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
      wait: true
    },
    initImmediate: true
  });

export default maini18n;