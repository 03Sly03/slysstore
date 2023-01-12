import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import { ProductData } from '../src/types/datas';

export interface AppContextInterface {
  cart: {
    cartItems: ProductQuantity[];
  };
}

export interface ProductQuantity extends ProductData {
  quantity: number;
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

const initialState: AppContextInterface = {
  cart: {
    cartItems: [],
  },
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
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}
