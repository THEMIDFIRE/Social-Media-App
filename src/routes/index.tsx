import { createFileRoute } from "@tanstack/react-router"

import { ThemeSwitch } from "@/components/theme-switch"

export const Route = createFileRoute("/")({
    component: HomePage,
})

function HomePage() {
    return (
        <>
            <ThemeSwitch />
        </>
    )
}