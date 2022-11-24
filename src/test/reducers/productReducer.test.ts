/* test suite / test case */
import productReducer, { fetchAll, updateOne, createOne } from "../../redux/reducers/products"
import { server } from "../shared/server"

import createStore from "../shared/mockStore"

let store = createStore()

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

beforeEach(() => {
    store = createStore()  /* make new store after every single test case */
})

describe("Test productReducer", () => {
    test("Check initial state", () => {
        /* const products = productReducer([], { type: "any" })
        expect(products).toEqual([]) */
        expect(store.getState().productReducer.length).toBe(0)
    })
    test("Should return array of products from api", async () => {
        await store.dispatch(fetchAll())
        expect(store.getState().productReducer.length).toBeGreaterThan(0)
    })
    test("should create one new product", async () => {
        await store.dispatch(fetchAll())
        const length = store.getState().productReducer.length
        await store.dispatch(createOne(
            {
                title: "Test product 2",
                price: 200,
                description: "Test products 2",
                categoryId: 2,
                images: []

            }
        ))
        expect(store.getState().productReducer.length).toBe(length + 1)
        expect(store.getState().productReducer[length].title).toBe("Test product 2")
    })
})