import React from 'react'
import Link from 'next/link'
import { useAuth } from '../context/authContext'
import { useRouter } from 'next/router'

export default function Navbar() {
    const { user, logout } = useAuth()
    const router = useRouter()

    return (
        <div>
            <h1>Navbar</h1>
            {user ? (
                <div>
                    <button onClick={() => {
                        logout()
                        router.push('/sign_in')
                    }}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link href='/sign_up'>Sign Up </Link>
                    <Link href='/sign_in'>Sign In </Link>
                </div>
            )}
        </div>
    )
}