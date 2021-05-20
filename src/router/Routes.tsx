import { Redirect, Route, Switch } from 'react-router-dom';
import { appBaseRouteKey} from "./routerConfiguration";
import { ProductsScreen, Path as HomePath } from '../components/screens/ProductsScreen';
import { ContactScreen, Path as ContactPath } from "../components/screens/ContactScreen";
import { AboutMeScreen, Path as AboutMePath } from '../components/screens/AboutMeScreen';
import { CartScreen, Path as CartPath } from '../components/screens/CartScreen';
import { 
  BuyScreen, 
  Path as BuyPath,
  Subtitle1 as JestemKobietaTitle,
  Subtitle2 as JestemRodzicemTitle,
  Subtitle3 as JestemNastolatkiemTitle } from '../components/screens/BuyScreen';
import { GetIdBybCategoryTitle } from "../components/common/BuyItems";
import React from 'react';
import { TusScreen, Title as TusTitle, Path as TusPath } from '../components/screens/TusScreen';

export default function Routes(){
    return(
        <Switch>
            <Route path={appBaseRouteKey + HomePath} exact render={() => <ProductsScreen/>} />
            <Route exact path={appBaseRouteKey + ContactPath} render={() => <ContactScreen/>} />
            <Route exact path={appBaseRouteKey + AboutMePath} render={() => <AboutMeScreen/>} />
            <Route exact path={appBaseRouteKey + CartPath} render={() => <CartScreen/>} />
            <Route exact path={appBaseRouteKey + BuyPath + "/" + GetIdBybCategoryTitle(JestemKobietaTitle)} render={() => <BuyScreen filterByCategory={JestemKobietaTitle}/>} />
            <Route exact path={appBaseRouteKey + BuyPath + "/" + GetIdBybCategoryTitle(JestemRodzicemTitle)} render={() => <BuyScreen filterByCategory={JestemRodzicemTitle}/>} />
            <Route exact path={appBaseRouteKey + BuyPath + "/" + GetIdBybCategoryTitle(JestemNastolatkiemTitle)} render={() => <BuyScreen filterByCategory={JestemNastolatkiemTitle}/>} />
            <Route exact path={appBaseRouteKey + TusPath} render={() => <TusScreen filterByCategory={TusTitle}/>} />
            <Route render={() => <Redirect to={appBaseRouteKey + HomePath} />} />
        </Switch>
    );
}