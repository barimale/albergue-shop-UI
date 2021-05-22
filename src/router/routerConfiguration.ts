import {  Path as BuyPath } from "../components/screens/BuyScreen";
import axios from 'axios';

export const appBaseRouteKey = "";

export enum configSectionType {
    'divider',
    'link'
}

export type configSection = {
    title: string;
    api: string;
    type: configSectionType;
    id: string;
}

export function GetFullPathTo(items: configSection[], title: string): string{
    const result = items.findIndex((p: configSection) => p.title === title);
    return items[result].api;
}