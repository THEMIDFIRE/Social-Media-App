import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/feed/_feed')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <nav>
      NavBar
    </nav>
    <main>
      <h1>Feed Page</h1>
    </main>
    </>
  )
}
