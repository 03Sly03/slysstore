import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import { ProductData } from '../src/types/datas';
import Cookies from 'js-cookie';

// sans les cookies
/*
export interface AppContextInterface {
  cart: {
    cartItems: ProductQuantity[];
  };
}*/

const cookies = Cookies.get('cart');

export interface AppContextInterface {
  cart: {
    cartItems: ProductQuantity[];
  };
}

export interface ProductQuantity extends ProductData {
  quantity?: number;
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  location?: object;
}

interface ACTIONTYPE {
  type: string;
  payload: ProductQuantity;
}

export function createCtx<A, B>(defaultValue: A, defaultDispatch: B) {
  const ctx = createContext({
    state: defaultValue,
    dispatch: defaultDispatch,
  });
  return ctx;
}

export const Store = createCtx<
  AppContextInterface | null,
  Dispatch<ACTIONTYPE> | null
>(null, null);

export function StoreProvider(props: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

// sans les cookies
/*
const initialState: AppContextInterface = {
  cart: {
    cartItems: [],
  },
};
*/

// avec les cookies
const initialState: AppContextInterface = {
  cart: cookies ? JSON.parse(cookies) : { cartItems: [], shippingAddress: {} },
};

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_RESET':
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    default:
      return state;
  }
}
