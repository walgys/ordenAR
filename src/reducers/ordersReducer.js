import { getOrders } from "../global/data";

export const actions = {
    REFRESH_ORDERS: 'REFRESH_ORDERS'
  };
  
  export const OrdersReducer = async (state, action) => {
    switch (action.type){
        case 'REFRESH_ORDERS':
            let orders;
            await getOrders(action.payload.user).then(ord=>orders=ord);
            return {orders}
        default:
            return state;
    }
    
    
  }
