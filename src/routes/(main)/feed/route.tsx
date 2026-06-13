import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Bookmark, User } from 'lucide-react'

export const Route = createFileRoute('/(main)/feed')({
  component: RouteComponent,
})

function RouteComponent() {
  const isMobile = useIsMobile()

  return (
    <>
      <main className="min-h-screen">
        <div className="container max-w-5/6 mx-auto py-6">
          <div className="md:grid md:grid-cols-[25%_1fr_25%] md:gap-4">
            {!isMobile && <aside>
              <ul className='[&_*>a]:flex [&_*>a]:items-center [&_*>a]:gap-2 [&_*>a]:text-secondary [&_.active]:text-primary [&_.active]:font-semibold'>
                <li>
                  <Link to="/profile" activeOptions={{ exact: true }}>
                    <User />Profile
                  </Link>
                </li>
                <li>
                  <Link to="/feed/saved" activeOptions={{ exact: true }}>
                    <Bookmark />Saved
                  </Link>
                </li>
              </ul>
            </aside>}
            <div>
              <Outlet />
            </div>
            {!isMobile && <aside>Suggested Friends</aside>}
          </div>
        </div>
      </main >
    </>
  )
}
