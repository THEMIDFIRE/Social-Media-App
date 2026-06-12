import { createFileRoute } from '@tanstack/react-router'
import NavbarComponent from './components/navbar.component'

export const Route = createFileRoute('/feed/_feed')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <nav>
        <div className="container max-w-4/5 mx-auto py-6">
          <NavbarComponent />
        </div>
      </nav>
      <main>
        <h1>Feed Page</h1>
      </main>
    </>
  )
}
