import { NavLink, Outlet } from 'react-router-dom'
import VerticalLayout from './VerticalLayout'

const Layout = (): JSX.Element => {
  return (
    <VerticalLayout>
      <Outlet />
    </VerticalLayout>
  )
}

export default Layout
