import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
})

function AuthLayout() {
    const matchRoute = useMatchRoute()

    return (
        <div className='grid grid-cols-2 h-screen md:*:px-30'>
            <div className='bg-surface flex flex-col gap-y-6 justify-center relative h-full overflow-hidden'>
                <div className='flex gap-2.5 items-center font-heading'>
                    <div className='size-3.5 bg-primary rounded-full' />
                    <p className='text-3xl font-semibold'>pulse</p>
                </div>
                {matchRoute({ to: '/login' }) &&
                    <>
                        <div className='*:text-5xl font-heading *:font-bold'>
                            <p>Say it.</p>
                            <p>Share it.</p>
                            <p className='text-accent'>Feel the pulse.</p>
                        </div>
                        <p className='text-muted text-lg'>Post, reply and follow the people worth hearing from. Simple, fast and yours.</p>
                    </>
                }
                {matchRoute({ to: '/register' }) &&
                    <>
                        <p className='text-5xl font-heading font-bold'>Join the <span className='text-accent'>conversation.</span></p>
                        <p className='text-muted text-lg'>Follow people, share ideas and keep what matters in your bookmarks.</p>
                    </>
                }
                <div className='bg-primary size-65 rounded-full absolute -right-15 -bottom-15' />
                <div className='bg-accent/55 size-24 rounded-full absolute right-37.5 bottom-10' />
            </div>
            <div className='flex flex-col justify-center px-10 md:px-30'>
                <div className='space-y-2'>
                    {matchRoute({ to: '/login' }) &&
                        <>
                            <p className='text-3xl font-heading font-bold'>Welcome back.</p>
                            <p className='text-muted'>Sign in to your account.</p>
                        </>
                    }
                    {matchRoute({ to: '/register' }) &&
                        <>
                            <p className='text-3xl font-heading font-bold'>Create an account.</p>
                            <p className='text-muted'>It takes less than a minute.</p>
                        </>
                    }
                </div>
                <Outlet />
            </div>
        </div>
    )
}
