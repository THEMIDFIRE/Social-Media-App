import { Navigate } from 'react-router'

export default function Protected({ children }) {
    if (localStorage.getItem('token')) {
        return children
    } else {
        return <Navigate to={'/login'} />
    }
}
