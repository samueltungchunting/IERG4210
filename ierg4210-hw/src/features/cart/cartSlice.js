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
                state.totalPrice += action.payload.price * parseInt(action.payload.quantity);
                state.totalItems += parseInt(action.payload.quantity);
            } else {
                // some bugs here
                productExist.quantity += parseInt(action.payload.quantity);
                state.totalPrice += productExist.price * productExist.quantity;
            }
        }
    }
})


export const { addToCart, removeFromCart, addToCartByQuantity } = cartSlice.actions;
export default cartSlice.reducer;