// ** React Imports
import { lazy } from 'react'
import { createRoutesFromElements, Navigate, Route, RouteObject } from 'react-router-dom'

// ** Page Layout
import Layout from '@/views/layouts'

// ** Default Route
const defaultRoute = '/home'


const Home = lazy(() => import('@/views/pages/home'))
const ErrorPage = lazy(() => import('@/views/pages/misc/Error'))

const routes: RouteObject[] = createRoutesFromElements(
  <Route element={<Layout />} errorElement={<ErrorPage />}>
    <Route index path='/home' element={<Home />} />
    <Route path='/' element={<Navigate to={defaultRoute} replace />} />
  </Route>
)



export { defaultRoute, routes }
