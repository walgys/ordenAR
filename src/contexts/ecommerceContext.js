import React,{createContext, useReducer} from "react";
import { CartReducer } from "../reducers/ecommerceReducers";

export const CartContext = createContext();
export const initialState = {
    products: [],
    totalItems: 0,
    totalPrice: 0
};
export const CartContextProvider = (props) => {
    const [cart, dispatchCart] = useReducer(CartReducer, initialState);
    return (
        <CartContext.Provider value={{cart, dispatchCart}} >
            {props.children}
        </CartContext.Provider>
    )
}