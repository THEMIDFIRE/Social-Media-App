import { Navigate } from 'react-router'

export default function Auth({ children }) {
    if (localStorage.getItem('token')) {
        return <Navigate to={'/'} />
    } else {
        return children
    }
}
