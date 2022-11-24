import { rest } from "msw"
import { setupServer } from 'msw/node'

export const handler = [
    rest.post("https://api.escuelajs.co/api/v1/products", async(req, res, ctx) => {
        const data = await req.json()
        console.log("mock data from request: ", data)
        return res(
            ctx.json(data)
        )
    }),
    
]

export const server = setupServer(...handler)