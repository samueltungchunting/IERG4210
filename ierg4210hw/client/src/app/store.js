import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { initializeCartFromLocalStorage } from "../features/cart/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

store.dispatch(initializeCartFromLocalStorage());

export default store;