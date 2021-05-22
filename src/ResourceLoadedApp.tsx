import './App.css';
import './AdditionalStyles.css';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { CartContextProvider } from './contexts/CartContext';
import CustomMuiThemeProvider from "./customTheme";
import Routes from "./router/Routes";
import { MainLayout } from './components/layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';

function ResourceLoadedApp() {
  return (
    <div className="App">
        <CustomMuiThemeProvider>
          <CartContextProvider>
            <DeviceContextProvider>
              <BrowserRouter>
                <MainLayout>
                  <Routes/>
                </MainLayout>
              </BrowserRouter>
            </DeviceContextProvider>
          </CartContextProvider>
        </CustomMuiThemeProvider>
    </div>
  );
}

export default ResourceLoadedApp;