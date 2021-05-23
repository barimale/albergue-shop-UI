export interface ItemDetails {
    id?: string;
    active: boolean;
    price: number;
    categoryId: string;
    images: Array<ItemImageDetails>;
    translatableDetails: Array<ItemTranslatableDetails>;
}

export interface ItemImageDetails {
    id?: string;
    name: string;
    imageData: string;
}

export interface ItemTranslatableDetails {
    id?: string;
    name: string;
    shortDescription: string;
    description: string;
    languageId: string;
}
