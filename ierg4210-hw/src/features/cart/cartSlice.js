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
    }
})


export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;