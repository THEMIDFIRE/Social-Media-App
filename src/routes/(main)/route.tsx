import { Logo } from '@/components/icons'
import MobileNavbarComponent from '@/shared/components/mobile-navbar'
import NavbarComponent from '@/shared/components/navbar'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
})

function RouteComponent() {
  const isMobile = useIsMobile()

  return (
    <>
      <nav className='shadow-xl mb-6 sticky top-0 bg-white z-10'>
        <div className="container max-w-5/6 mx-auto flex justify-between items-center py-4">
          {/* Logo - visible on all devices */}
          <div className="flex items-center gap-2">
            <div className="w-10">
              <Logo />
            </div>
            <h1 className="text-primary font-serif text-xl font-semibold">Reflect</h1>
          </div>
          {isMobile ?
            <MobileNavbarComponent />
            :
            <NavbarComponent />
          }
        </div>
      </nav>
      <Outlet />
    </>
  )
}
