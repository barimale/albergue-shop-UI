import './App.css';
import './AdditionalStyles.css';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { CartContextProvider } from './contexts/CartContext';
import CustomMuiThemeProvider from "./customTheme";
import Routes from "./router/Routes";
import { MainLayout } from './components/layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import maini18n from './i18n';
import externali18n from './externali18n';
import { useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import useLanguages from './hooks/useLanguages';

function ResourceLoadedApp() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { languages } = useLanguages();
  
  useEffect(()=>{
    if(maini18n.isInitialized === false){
      maini18n.init();
    }

    if(externali18n.isInitialized === false){
      externali18n.init();
    }

    if(languages.length > 0){
      languages.forEach(p => {
        externali18n.loadLanguages([p])
          .then(()=>{
            console.log("Language loaded: " + p);
          })
          .catch((error: any) => console.log(error));
      });

      externali18n
        .reloadResources(languages.flatMap((p: string) => p), 'externals')
        .catch((error: any) =>{
          console.log(error);
        });
    }

    setIsLoading(false);
  }, [languages]);
  
  return (
    <div className="App">
    {isLoading.valueOf() === true ?(
      <LinearProgress/>
    ):(
        <CustomMuiThemeProvider>
          <I18nextProvider i18n={maini18n}>
            <CartContextProvider>
              <DeviceContextProvider>
                <BrowserRouter>
                  <MainLayout>
                    <Routes/>
                  </MainLayout>
                </BrowserRouter>
              </DeviceContextProvider>
            </CartContextProvider>
          </I18nextProvider>
        </CustomMuiThemeProvider>
      )}
    </div>
  );
}

export default ResourceLoadedApp;