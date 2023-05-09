import { useState, useEffect, useRef } from 'react'
import useJwt from '@/auth/jwt/useJwt'
import { Link, useLocation } from 'react-router-dom'
import NavItem from './NavItem'

import { X } from 'react-feather'

import themeConfig from '@/configs/themeConfig'


const Sidebar = (props: any): JSX.Element => {
  const { menuVisibility, setMenuVisibility } = props

  const [sideMenu, setSideMenu] = useState([])
  const { projectInstance } = useJwt()
  const location = useLocation()

  useEffect(() => {
    projectInstance.get('/api/v1/menu/nav-menu/')
      .then((response: any) => setSideMenu(response.data))
      .catch((error: any) => console.error(error))
  }, [])

  useEffect(() => {
    if (!menuVisibility) return
    setMenuVisibility(false)
  }, [location])

  return (
    <div className={`sidebar ${!menuVisibility && 'hidden'}`}>
      <div className="sidebar-header">
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <span><img src={themeConfig.app.appLogoImage} alt='logo' /></span>
          <div className='brand-container'>
            <h2 className='brand-text text-primary'>{themeConfig.app.appName}</h2>
            <h5 className='brand-subscription'>Система оповещения о неисправностях</h5>
          </div>
        </Link>
        <X className="nav-toggle" size={26} color='black' onClick={() => setMenuVisibility(false)} />
      </div>
      {sideMenu.map((item: any) => {
        return <NavItem key={item.id} item={item} />
      })}
    </div>
  )
}

export default Sidebar
