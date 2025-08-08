import { Outlet } from 'react-router'
import Nav from '../../components/Nav/Nav'

export default function AppLayout() {
    return (
        <>
            <Nav />
            <main className='bg-gray-100 min-h-dvh'>
                <section className='pt-4 pb-6 px-2 md:max-w-1/2 mx-auto'>
                    <Outlet />
                </section>
            </main>
        </>
    )
}
