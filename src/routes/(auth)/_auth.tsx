import { Logo } from '@/components/icons'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <main style={{ fontFamily: "'Manrope', 'Arial', sans-serif" }}>
                <section>
                    <div className="container min-h-screen max-w-4/5 mx-auto py-6 max-md:space-y-5 md:grid md:grid-cols-2 md:items-center">
                        {/* Logo */}
                        <div className="flex justify-center items-center gap-5">
                            <div className='w-1/4'>
                                <Logo />
                            </div>
                            <div>
                                <h1 className='font-bold text-3xl md:text-4xl lg:text-7xl text-primary font-serif'>Reflect</h1>
                                <p className='text-secondary max-[425px]:text-sm text-lg lg:text-xl font-medium'>What&#39;s on your mind? Share it.</p>
                            </div>
                        </div>
                        {/* Forms */}
                        <div className='mx-auto border-2 border-gray-400/50 rounded-lg px-4 py-6 shadow-xl'>
                            <Outlet />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
