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
      path: '/schema-editor',
      element: lazy(() => import('@/views/pages/schema-editor')),
    },
    {
      path: '/applications/create',
      element: lazy(() => import('@/views/pages/applications')),
      meta: {
        action: 'manage',
        resource: 'default'
      }
    },
    {
      path: '/users/create',
      element: lazy(() => import('@/views/pages/users/create')),
    },
]

export default pagesRoutes
