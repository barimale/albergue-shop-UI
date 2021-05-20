import { Redirect, Route, Switch } from 'react-router-dom';
import { appBaseRouteKey} from "./routerConfiguration";
import { ContactScreen, Path as HomePath } from "../components/screens/ContactScreen";
import { CartScreen, Path as CartPath } from '../components/screens/CartScreen';
import { BuyScreen, Path as BuyPath } from '../components/screens/BuyScreen';
import { useShopStatus } from '../hooks/useShopStatus';
import { Category, useCategories } from '../hooks/useCategories';

export default function Routes(){
    const status = useShopStatus();
    const { categories } = useCategories();

    return(
        <Switch>
            <Route exact path={appBaseRouteKey + HomePath} render={() => <ContactScreen/>} />
            {status !== undefined && status.isAtLeastOneCategoryDefined.valueOf() === true && (
                <Route exact path={appBaseRouteKey + CartPath} render={() => <CartScreen/>} />
            )}
            {categories?.map((category: Category)=>{
                return(
                    <Route exact path={appBaseRouteKey + BuyPath + "/" + category.translatableDetails[0].name } render={() => <BuyScreen filterByCategory={category.id}/>} />
                );
            })}
            <Route render={() => <Redirect to={appBaseRouteKey + HomePath} />} />
        </Switch>
    );
}

export const SiteMapOnlyRoutes = () => {
    return(
        <Switch>
            <Route exact path={appBaseRouteKey + HomePath} render={() => <ContactScreen/>} />
            <Route render={() => <Redirect to={appBaseRouteKey + HomePath} />} />
        </Switch>
    );
}