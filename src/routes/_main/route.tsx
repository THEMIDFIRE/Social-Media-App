import { createFileRoute, Outlet } from '@tanstack/react-router'
import NavbarComponent from './feed/components/navbar'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <nav className='shadow-xl mb-6 sticky top-0 bg-white z-10'>
        <div className="container max-w-5/6 mx-auto">
          <NavbarComponent />
        </div>
      </nav>
      <Outlet />
    </>
  )
}
