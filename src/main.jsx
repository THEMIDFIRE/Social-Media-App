import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { layout } from './Routing/Paths.jsx'

<layout/>
createRoot(document.getElementById('root')).render(
    <RouterProvider router={layout} />
)
