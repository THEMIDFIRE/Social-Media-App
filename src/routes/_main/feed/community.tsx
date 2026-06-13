import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/feed/community')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Community Feed</div>
}
