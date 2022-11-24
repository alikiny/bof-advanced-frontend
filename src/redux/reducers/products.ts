import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

import { AddedProduct, Product } from "../../types/Products";

const initialState: Product[] = []

export const fetchAll = createAsyncThunk(
    "fetchAll",
    async () => {
        const result = await axios.get("https://api.escuelajs.co/api/v1/products")
        const data = result.data
        return data
    }
)

export const updateOne = createAsyncThunk(
    "updateOne",
    async ({
        id, data
    }: {
        id: number,
        data: Product
        }) => {
        const result = await axios.put(
            `https://api.escuelajs.co/api/v1/products/${id}`, data
        )
        return result.data
    }
)

export const createOne = createAsyncThunk(
    "createOne",
    async (product: AddedProduct) => {
        try {
            const result = await axios.post("https://api.escuelajs.co/api/v1/products", product)
            const newProduct = result.data
            return newProduct
        } catch (e) {
            console.log(e)
            throw Error("cannot create product")
        }
    }
)

const productSlice = createSlice({
    name: "productReducer",
    initialState,
    reducers: {

    },
    extraReducers: build => {
        build
            .addCase(fetchAll.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(updateOne.fulfilled, (state, action) => {
                return state.map(
                    item => {
                        if (item.id === action.payload.id) {
                            item = action.payload
                        }
                        return item
                    }
                )
            })
            .addCase(createOne.fulfilled, (state, action) => {
                state.push(action.payload)
            })
    }
})

const productReducer = productSlice.reducer
export default productReducer