import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/feed/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1 className="text-2xl font-bold">Feed</h1>
    </>
  )
}
