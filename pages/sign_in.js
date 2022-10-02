import Link from "next/link";
import {useState} from "react";
import { useAuth } from "../context/authContext";

import { useRouter } from "next/router";


export default function SignIn() {

    const router = useRouter()

    const { user, login } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    console.log('>>> Logging user data from sign in page', user)

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('>>> Logging data from sign in page:', data);

        try {
            await login(data.email, data.password)
            router.push('/dashboard')
        } catch (error) {
            console.log('!!! Logging signup error: ', error)
        }
    }

    return (
        <div>
            <p>Please sign in to continue</p>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email </label>
                    <input
                        onChange={(event) => {
                        setData({
                            ...data,
                            email: event.target.value,
                        })
                    }}
                        value={data.email}
                        type="email"
                        name="uname"
                        required
                        placeholder={'Enter Email'}
                    />
                </div>
                <div>
                    <label>Password </label>
                    <input
                        onChange={(event) => {
                            setData({
                                ...data,
                                password: event.target.value,
                            })
                        }}
                        value={data.password}
                        type="password"
                        name="pass"
                        required
                        placeholder={'Enter Password'}
                    />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>

        </div>
    )

}