import { Logo } from '@/components/icons'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <main style={{ fontFamily: "'Manrope', 'Arial', sans-serif" }}>
                <section>
                    <div className="container h-screen md:grid md:grid-cols-2 md:items-center">
                        <div className="flex justify-center items-center gap-5">
                            <div className='w-1/4'>
                                <Logo />
                            </div>
                            <div>
                                <h1 className='font-bold text-7xl text-[#1E2A5E]' style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>Reflect</h1>
                                <p className='text-[#64748B] text-xl font-medium'>What&#39;s on your mind? Share it.</p>
                            </div>
                        </div>
                        <div className='mx-auto'>
                            <Outlet />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
