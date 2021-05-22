import { Redirect, Route, Switch } from 'react-router-dom';
import { appBaseRouteKey, configSection} from "./routerConfiguration";
import { ContactScreen, Path as HomePath } from "../components/screens/ContactScreen";
import { CartScreen, Path as CartPath } from '../components/screens/CartScreen';
import { BuyScreen, Path as BuyPath } from '../components/screens/BuyScreen';
import { useShopStatus } from '../hooks/useShopStatus';
import { useCategories } from '../hooks/useCategories';

export default function Routes(){
    const status = useShopStatus();
    const { configSections: OrderedSectionsConfiguration } = useCategories();

    return(
        <Switch>
            <Route exact path={appBaseRouteKey + HomePath} render={() => <ContactScreen/>} />
            {status !== undefined && status.isAtLeastOneCategoryDefined.valueOf() === true && (
                <Route exact path={appBaseRouteKey + CartPath} render={() => <CartScreen/>} />
            )}
            {OrderedSectionsConfiguration?.map((p: configSection, index: number)=>{
                return <Route exact key={index} path={p.api} render={() => <BuyScreen filterByCategory={p.id}/>} />
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