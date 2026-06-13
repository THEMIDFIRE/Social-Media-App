import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Bookmark, User } from 'lucide-react'

export const Route = createFileRoute('/_main/feed')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <main className="min-h-screen">
        <div className="container max-w-5/6 mx-auto py-6">
          <div className="grid grid-cols-[25%_1fr_25%] gap-4">
            <aside>
              <ul className='[&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-2 [&>li>a]:text-secondary [&>li>.active]:text-primary [&>li>.active]:border-b-3 [&>li>.active]:border-primary'>
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
            </aside>
            <div>
              <Outlet />
            </div>
            <aside>Suggested Friends</aside>
          </div>
        </div>
      </main >
    </>
  )
}
