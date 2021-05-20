import { Redirect, Route, Switch } from 'react-router-dom';
import { appBaseRouteKey} from "./routerConfiguration";
import { ContactScreen, Path as HomePath } from "../components/screens/ContactScreen";
import { CartScreen, Path as CartPath } from '../components/screens/CartScreen';
import { 
  BuyScreen, 
  Path as BuyPath,
  Subtitle1 as JestemKobietaTitle,
  Subtitle2 as JestemRodzicemTitle,
  Subtitle3 as JestemNastolatkiemTitle } from '../components/screens/BuyScreen';
import { GetIdBybCategoryTitle } from "../components/common/BuyItems";

export default function Routes(){
    return(
        <Switch>
            <Route path={appBaseRouteKey + HomePath} exact render={() => <ContactScreen/>} />
            <Route exact path={appBaseRouteKey + CartPath} render={() => <CartScreen/>} />
            <Route exact path={appBaseRouteKey + BuyPath + "/" + GetIdBybCategoryTitle(JestemKobietaTitle)} render={() => <BuyScreen filterByCategory={JestemKobietaTitle}/>} />
            <Route exact path={appBaseRouteKey + BuyPath + "/" + GetIdBybCategoryTitle(JestemRodzicemTitle)} render={() => <BuyScreen filterByCategory={JestemRodzicemTitle}/>} />
            <Route exact path={appBaseRouteKey + BuyPath + "/" + GetIdBybCategoryTitle(JestemNastolatkiemTitle)} render={() => <BuyScreen filterByCategory={JestemNastolatkiemTitle}/>} />
            <Route render={() => <Redirect to={appBaseRouteKey + HomePath} />} />
        </Switch>
    );
}