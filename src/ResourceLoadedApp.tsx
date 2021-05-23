import './App.css';
import './AdditionalStyles.css';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { CartContextProvider } from './contexts/CartContext';
import CustomMuiThemeProvider from "./customTheme";
import Routes from "./router/Routes";
import { MainLayout } from './components/layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';

function ResourceLoadedApp() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    if(i18n.isInitialized === false){
      i18n.init();
    }

    setIsLoading(false);
  }, []);
  
  return (
    <div className="App">
    {isLoading.valueOf() === true ?(
      <LinearProgress/>
    ):(
        <CustomMuiThemeProvider>
          <I18nextProvider i18n={i18n}>
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