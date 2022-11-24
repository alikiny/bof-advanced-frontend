import axios from 'axios'
import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { authenticate } from '../redux/reducers/users'

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const user = useAppSelector(/* ≤ */state => state.userReducer.currentUser)
    const dispatch = useAppDispatch()
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            console.log(email, password)
            const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", { email, password })
            const token = response.data
            localStorage.setItem("token", token.access_token)
            dispatch(authenticate(token.access_token))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                Email : <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            {user && (
                <p>{user.name} {user.role}</p>
            )}
        </div>
    )
}

export default Login