import React,{createContext, useReducer} from "react";
import { CartReducer } from "../reducers/ecommerceReducers";
import { ordersReducer } from "../reducers/ordersReducer";

export const CartContext = createContext();
export const initialState = {
    products: [],
    totalItems: 0,
    totalPrice: 0
};
export const CartContextProvider = (props) => {
    const [orders, dispatchRefreshOrders] = useReducer(ordersReducer, {orders: []})
    const [cart, dispatchCart] = useReducer(CartReducer, initialState);
    return (
        <CartContext.Provider value={{cart, dispatchCart, orders, dispatchRefreshOrders}} >
            {props.children}
        </CartContext.Provider>
    )
}