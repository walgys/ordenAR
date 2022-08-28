import React,{createContext, useReducer} from "react";
import { CartReducer } from "../reducers/ecommerceReducers";
import { OrdersReducer } from "../reducers/ordersReducer";

export const CartContext = createContext();
export const initialState = {
    products: [],
    totalItems: 0,
    totalPrice: 0
};
export const CartContextProvider = (props) => {
    const [orders, dispatchRefreshOrders] = useReducer(OrdersReducer, {orders: []})
    const [cart, dispatchCart] = useReducer(CartReducer, initialState);
    return (
        <CartContext.Provider value={{cart, dispatchCart, orders, dispatchRefreshOrders}} >
            {props.children}
        </CartContext.Provider>
    )
}