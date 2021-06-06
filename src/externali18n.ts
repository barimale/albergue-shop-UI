import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const externali18n = i18next.createInstance();

externali18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    defaultNS: 'externals',
    backend: {
      loadPath: '/locales/externals/{{lng}}.json',
      addPath: '/locales/externals/{{lng}}.json',
      reloadInterval: 10000
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false
    },
  });

export default externali18n;