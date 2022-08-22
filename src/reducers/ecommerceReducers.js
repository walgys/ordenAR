export const actions = {
  ADD_TO_CART: 'ADD_TO_CART',
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { products } = state;
      const foundProduct = products.find(
        ({ productId }) => productId === action.payload.productId
      );
      const newProducts = foundProduct
        ? products.map((product) =>
            product.productId === action.payload.productId
              ? {
                  ...product,
                  quantity: product.quantity + action.payload.quantity,
                  subtotal:
                    (product.quantity + action.payload.quantity) *
                    product.price,
                }
              : product
          )
        : [...products, action.payload];
      const newState = {
        ...state,
        products: newProducts,
        totalItems: newProducts.reduce((acc, a) => acc + a.quantity, 0),
        totalPrice: newProducts.reduce(
          (acc, a) => acc + a.price * a.quantity,
          0
        ),
      };
      return newState;
    default:
      return state;
  }
};
