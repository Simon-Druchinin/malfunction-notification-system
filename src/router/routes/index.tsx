// ** React Imports
import { lazy, useContext } from 'react'
import { createRoutesFromElements, Navigate, Route, RouteObject, Routes } from 'react-router-dom'

import { isUserLoggedIn } from '@/utility/utils'

import pagesRoutes from './Pages'

// ** Page Layout
import Layout from '@/views/layouts'
import { AbilityContext } from '@/utility/context/Can'

// ** Default Routes
const defaultRoute: string = '/home'
const loginRoute: string = '/login'

const LoginPage = lazy(() => import('@/views/pages/authentication/Login'))
const ErrorPage = lazy(() => import('@/views/pages/misc/Error'))

type routeMeta = {
  authRoute?: boolean;
  publicRoute?: boolean;
  action?: string;
  resource?: string;
}

export interface IRoute {
  path: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
  index?: boolean;
  meta?: routeMeta
}

  const ProtectedRoute = ({ meta, children }: { meta: routeMeta | undefined, children: JSX.Element }) => {
    const ability = useContext(AbilityContext)
    const isLoggedIn: boolean = isUserLoggedIn()

    // ** Assign vars based on route meta
    const action = meta?.action
    const resource = meta?.resource

    if (
      (!isLoggedIn && meta === undefined) ||
      (!isLoggedIn && meta && !meta.authRoute && !meta.publicRoute)
    ) {
      /**
       ** If user is not Logged in & route meta is undefined
        ** OR
        ** If user is not Logged in & meta.authRoute, !meta.publicRoute are undefined
        ** Then redirect user to login
        */

      return <Navigate to={loginRoute} replace/>
    } else if (meta && meta.authRoute && isLoggedIn) {
      // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
      return <Navigate to='/' replace />
    } else if (isUserLoggedIn() && !ability.can(action || 'read', resource)) {
      // ** If user is Logged in and doesn't have ability to visit the page redirect the user to Not Authorized
      return <ErrorPage />
    } else {
      // ** If none of the above render component
      return children
    }
  }

  const ProtectedLayout = (): JSX.Element => {
    return isUserLoggedIn() ? <Layout /> : <Navigate to='/' replace />
  }

const routes: RouteObject[] = createRoutesFromElements(
  <Route>
    <Route path='/' element={<Navigate to={isUserLoggedIn() ? defaultRoute : loginRoute} />} />
    <Route element={<ProtectedRoute meta={{authRoute: true}}><LoginPage /></ProtectedRoute>} path={'/login'} />
    <Route element={<ProtectedLayout />} errorElement={<ErrorPage />}>
      {pagesRoutes.map((route: IRoute) => {
        return (
          <Route
            path={route.path}
            element={<ProtectedRoute meta={route.meta}><route.element /></ProtectedRoute>}
            index={route.index}
          />
        )
      })}
    </Route>
  </Route>
)



export { routes }
