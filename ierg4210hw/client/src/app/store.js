import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { initializeCartFromLocalStorage } from "../features/cart/cartSlice";
import categoryReducer from "../features/category/categorySlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        category: categoryReducer
    }
});

store.dispatch(initializeCartFromLocalStorage());

export default store;