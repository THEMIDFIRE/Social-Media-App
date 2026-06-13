import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/feed/saved')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Saved Posts</div>
}
