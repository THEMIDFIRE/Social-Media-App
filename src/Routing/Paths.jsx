import { createBrowserRouter } from 'react-router'
import UserContextProvider from '../context/userContext.jsx'
import Home from '../Pages/Home/Home'
import AppLayout from '../Pages/Layout/AppLayout'
import LogIn from '../Pages/LogIn/LogIn.jsx'
import NotFound from '../Pages/NotFound/NotFound.jsx'
import Register from '../Pages/Register/Register.jsx'
import Auth from './Auth.jsx'
import Protected from './Protected.jsx'
import SinglePost from '../Pages/Posts/SinglePost.jsx'
import ProfilePage from '../Pages/Profile/ProfilePage.jsx'


export const layout = createBrowserRouter([
    {
        path: '', element:
            <UserContextProvider>
                <AppLayout />
            </UserContextProvider>
        , children: [
            { index: true, element: <Protected> <Home /> </Protected> },
            { path: '/profile/:name', element: <Protected> <ProfilePage /> </Protected> },
            { path: '/posts/:id', element: <Protected> <SinglePost /> </Protected> },
            { path: '/login', element: <Auth><LogIn /></Auth> },
            { path: '/register', element: <Auth><Register /></Auth> },
            { path: '*', element: <NotFound /> }
        ]
    }
])