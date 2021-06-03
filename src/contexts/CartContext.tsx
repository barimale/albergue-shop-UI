import React, { useEffect, useState } from 'react';
import { ItemDetails, ItemImageDetails } from '../components/common/BuyItems';

export interface AddressDetails {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
  region: string;
  country: string;
  email: string;
  emailConfirmed: string;
}

type Cart = {
    items: Array<ItemDetails>;
    getAddressDetails: () => AddressDetails;
    orderStatus: string;
    setOrderStatus: (value: string) => void;
    clear: () => void;
    getCount: () => number;
    add: (item: ItemDetails) => void;
    remove: (item: ItemDetails) => void;
    decrementByOne: (item: ItemDetails) => void;
    isPhysicalItemIncluded: () => boolean;
    registerAddressDetails: (data: AddressDetails) => void;
};

const CartContext = React.createContext<Cart>({} as Cart);

const CART_KEY = "8D61A160-53B4-40F1-A078-4DEEDC4E6CD7";

const CartContextProvider = (props: any) => {
    const [ defaultItems, setDefaultItems] = useState<Array<ItemDetails>>(new Array<ItemDetails>());
    const [ addressDetails, setAddressDetails] = useState<AddressDetails>({} as AddressDetails);
    const [ orderStatus, setOrderStatus ] = useState<string>("");

    useEffect(()=>{
      debugger
      var cartContent = localStorage.getItem(CART_KEY);
      if(cartContent !== null){
        var result: Array<ItemDetails> = JSON.parse(cartContent);
        setDefaultItems(result);
      }
    }, []);

    useEffect(()=>{
      debugger
      localStorage.setItem(CART_KEY, JSON.stringify(defaultItems));
    }, [defaultItems]);

      const cartContext: Cart = ({
        clear: () => {
          setDefaultItems(new Array<ItemDetails>());  
          setAddressDetails({} as AddressDetails);    
        },
        getCount: () => {
            return defaultItems.length;
          },
        add: (data: ItemDetails) => {
          let copied = Object.assign({} as ItemDetails, data);
          copied.images = new Array<ItemImageDetails>();
          var currentCart = Array.from<ItemDetails>(defaultItems);
          const result = currentCart.concat([copied]);
          setDefaultItems(result);
        },
        remove: (data: ItemDetails) => {
            var current = Array.from<ItemDetails>(defaultItems);
            var hasToStay = current.filter((p: ItemDetails) => p.id !== data.id);
            setDefaultItems(hasToStay);     
        },
        decrementByOne: (data: ItemDetails) => {
          var current = Array.from<ItemDetails>(defaultItems);
          var hasToBeRemoved = current.findIndex((p: ItemDetails) => p.id === data.id);
          if(hasToBeRemoved > -1){
            current.splice(hasToBeRemoved, 1);
          }
          setDefaultItems(current);     
      },
        isPhysicalItemIncluded: () => {
          return true;
        },
        registerAddressDetails: (data: AddressDetails) => {
          setAddressDetails(data); 
        },
        setOrderStatus: (value: string) => {
          setOrderStatus(value);
        },
        getAddressDetails:() => {
          return addressDetails;
        },
        orderStatus: orderStatus,
        items: defaultItems
      });
  
    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
  }

export { CartContextProvider, CartContext };