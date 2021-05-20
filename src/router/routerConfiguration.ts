import { Title as HomeTitle, Path as HomePath } from '../components/screens/ContactScreen';
import { Title as AboutMeTitle, Path as AboutMePath } from "../components/screens/AboutMeScreen";
import { 
    Subtitle1 as JestemKobietaTitle,
    Subtitle2 as JestemRodzicemTitle,
    Subtitle3 as JestemNastolatkiemTitle,
    Path as BuyPath } from "../components/screens/BuyScreen";
import { GetIdBybCategoryTitle } from "../components/common/BuyItems";
import { Path as TusPath, Title as TusTitle } from "../components/screens/TusScreen";

export const appBaseRouteKey = "";

export enum configSectionType {
    'divider',
    'link'
}

export type configSection = {
    title: string;
    api: string;
    type: configSectionType;
}

export function GetFullPathTo(title: string): string{
    const result = OrderedSectionsConfiguration.findIndex((p: configSection) => p.title === title);
    return OrderedSectionsConfiguration[result].api;
}

export const OrderedSectionsConfiguration: Array<configSection> = [
    {
        title: JestemKobietaTitle,
        api: appBaseRouteKey + BuyPath + "/" + GetIdBybCategoryTitle(JestemKobietaTitle),
        type: configSectionType.link
    },
    {
        title: JestemNastolatkiemTitle,
        api: appBaseRouteKey + BuyPath+ "/" + GetIdBybCategoryTitle(JestemNastolatkiemTitle),
        type: configSectionType.link
    },
    {
        title: JestemRodzicemTitle,
        api: appBaseRouteKey + BuyPath+ "/" + GetIdBybCategoryTitle(JestemRodzicemTitle),
        type: configSectionType.link
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider
    }
];