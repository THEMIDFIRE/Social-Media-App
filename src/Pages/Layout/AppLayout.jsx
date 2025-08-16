import { Outlet } from 'react-router'
import Nav from '../../components/Nav/Nav'
import { ToastContainer } from 'react-toastify'

export default function AppLayout() {
    return (
        <>
            <Nav />
            <main className='bg-gray-100 min-h-dvh'>
                <section className='pt-4 pb-6 px-2 md:max-w-4/5 lg:max-w-3/5 mx-auto'>
                    <Outlet />
                    <ToastContainer/>
                </section>
            </main>
        </>
    )
}
