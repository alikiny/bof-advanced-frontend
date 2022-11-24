import { configureStore } from "@reduxjs/toolkit";

import productReducer from "../../redux/reducers/products";

const createStore = () => {
    const store = configureStore({
        reducer: {
            productReducer
        }
    })
    return store
}

export default createStore

