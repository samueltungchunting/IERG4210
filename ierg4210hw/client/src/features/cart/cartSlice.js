import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        productList: [],
        totalPrice: 0,
        totalItems: 0,

    },
    reducers: {
        addToCart: (state, action) => {
            const productExist = state.productList.find((product) => {
                return product.productId === action.payload.productId
            })
            if (!productExist) {
                state.productList.push({
                    productId: action.payload.productId,
                    name: action.payload.name,
                    price: action.payload.price,
                    img: action.payload.img,
                    quantity: 1
                });
                state.totalPrice += action.payload.price;
            } else {
                productExist.quantity += 1;
                state.totalPrice += productExist.price;
            }
            state.totalItems += 1;
        },
        removeFromCart: (state, action) => {
            const existProduct = state.productList.find((product) => {
                return product.productId === action.payload.productId
            });
            if (existProduct.quantity === 1) {
                state.productList = state.productList.filter((product) => {
                    return product.productId !== action.payload.productId
                });
            } else {
                existProduct.quantity -= 1;
            }
            state.totalPrice -= existProduct.price;
            state.totalItems -= 1;
        },
        addToCartByQuantity: (state, action) => {
            // so many bugs here
            const productExist = state.productList.find((product) => {
                return product.productId === action.payload.productId
            })
            if (!productExist) {
                state.productList.push({
                    productId: action.payload.productId,
                    name: action.payload.name,
                    price: action.payload.price,
                    img: action.payload.img,
                    quantity: action.payload.quantity
                });
                // some bugs here
                // state.totalPrice += action.payload.price * parseInt(action.payload.quantity);
                // state.totalItems += parseInt(action.payload.quantity);
                state.totalPrice = state.productList.map(product => product.price * product.quantity).reduce((acc, current) => acc + current, 0);
                state.totalItems = state.productList.map(product => product.quantity).reduce((acc, current) => acc + current, 0);
            } else {
                // some bugs here
                productExist.quantity = parseInt(action.payload.quantity);
                state.totalPrice = state.productList.map(product => product.price * product.quantity).reduce((acc, current) => acc + current, 0);
                state.totalItems = state.productList.map(product => product.quantity).reduce((acc, current) => acc + current, 0);
            }
        },
        initializeCartFromLocalStorage: (state) => {
            // Update the state with data from local storage
            const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
            state.productList = localStorageCart;
            state.totalItems = localStorageCart.reduce((total, item) => total + item.quantity, 0);
            state.totalPrice = calculateTotalPrice(localStorageCart);
          },
    }
})

const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const { addToCart, removeFromCart, addToCartByQuantity, initializeCartFromLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;