import '../styles/globals.css'
import { AuthContextProvider} from '../context/authContext'
import Navbar from "../components/navbar";
import {useRouter} from "next/router";
import ProtectedRoute from "../components/protected_route";

const noAuthRequired = ['/sign_in', '/sign_up']

function MyApp({ Component, pageProps }) {
    const router = useRouter()
  return (
      <AuthContextProvider>
          <Navbar />
          {noAuthRequired.includes(router.pathname) ? (
              <Component {...pageProps} />
          ) : (
              <ProtectedRoute>
                  <Component {...pageProps} />
              </ProtectedRoute>
          )}
      </AuthContextProvider>
  )
}

export default MyApp
