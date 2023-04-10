import { NavLink, Outlet } from 'react-router-dom'

const Layout = (): JSX.Element => {
  return (
    <>
      <header>
        <NavLink to="/home">Главная</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
      </header>
        <Outlet />
      <footer>
        COPYRIGHT © {new Date().getFullYear()}
      </footer>
    </>
  )
}

export default Layout
