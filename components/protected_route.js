import React, {useEffect} from 'react'
import {useAuth} from "../context/authContext";
import {useRouter} from "next/router";

export default function ProtectedRoute({ children }) {

    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(!user) {
            router.push('/sign_in')
        }
    }, [router, user])

    return (
        <>
            {user ? children : null}
        </>
    )
}