import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { updateOne } from '../redux/reducers/products'

const Products = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.productReducer)
    const onEdit = () => {
        dispatch(updateOne({
            id: 3,
            data: {
                id: 1,
                title: "Test if product is changed",
                price: 300,
                description: "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
                category: {
                    id: 3,
                    name: "Furniture",
                    image: "https://api.lorem.space/image/furniture?w=640&h=480&r=4041"

                },
                images: [
                    "https://api.lorem.space/image/furniture?w=640&h=480&r=4123",
                    "https://api.lorem.space/image/furniture?w=640&h=480&r=4714",
                    "https://api.lorem.space/image/furniture?w=640&h=480&r=5550"
                ]
            }
        }))
    }
    return (
        <div>
            {
                products.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))
            }
            <table>
                <tr></tr>
                <tr></tr>
            </table>
            <button onClick={onEdit}>Edit</button>
        </div>
    )
}

export default Products