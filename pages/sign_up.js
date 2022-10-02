import Link from "next/link";
import {useState} from "react";
import { useAuth } from "../context/authContext";
import {apiPath} from "./dashboard";

export default function SignUp() {


    const { user, signUp } = useAuth()
    console.log('>>> Logging user data: ', user)

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    //Functions
    async function createUser (userUid) {
        console.log('>>> Initiating createUser PUT request')
        const reqOptions = {
            method: 'PUT'
        };
        const response = await fetch(`${apiPath()}/createUser/${userUid}`, reqOptions)
        const message = await response.json()
    }

    async function firstLoadout (userUid) {
        console.log('>>> Initiating first loadout PUT request')
        const reqOptions = {
            method: 'PUT'
        };
        const response = await fetch(`${apiPath()}/createLoadout/${userUid}`, reqOptions)
        const message = await response.json()
    }

    const handleSignUp = async (event) => {
        event.preventDefault()

        try {
            const newData = await signUp(data.email, data.password)
            await createUser(newData.user.uid) //creating a new player
            await firstLoadout(newData.user.uid) //setting up their inventory and first loadout

        } catch (error) {
            console.log('!!! Logging signup error: ', error)
        }
        console.log('>>> Logging sign up after try catches data: ', data);
    }


    return (
        <div>
            <p>Please register to continue</p>
            <form onSubmit={handleSignUp}>
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