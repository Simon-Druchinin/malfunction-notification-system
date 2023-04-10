import { lazy } from 'react'


const pagesRoutes = [
    {
      path: '/home',
      element: lazy(() => import('@/views/pages/home'))
    },
    {
      path: '/faq',
      element: lazy(() => import('@/views/pages/faq'))
    }
]

export default pagesRoutes
