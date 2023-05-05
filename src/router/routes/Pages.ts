import { lazy } from 'react'
import { IRoute } from '../routes'


const pagesRoutes: IRoute[] = [
    {
      path: '/home',
      element: lazy(() => import('@/views/pages/home')),
      index: true,
      meta: {
        action: 'manage',
        resource: 'default'
      }
    },
    {
      path: '/faq',
      element: lazy(() => import('@/views/pages/faq')),
      meta: {
        action: 'manage',
        resource: 'default'
      }
    }
]

export default pagesRoutes
