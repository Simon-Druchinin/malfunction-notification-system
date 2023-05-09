// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import { ArrowUp, Menu } from 'react-feather'
import ScrollToTop from 'react-scroll-up'
import { Navbar, Button } from 'reactstrap'

// ** Custom Components
import FooterComponent from './footer'
import NavbarComponent from './navbar'
import SidebarComponent from './sidebar'

import classnames from 'classnames'

import themeConfig from '@/configs/themeConfig'
import { Link } from 'react-router-dom'


const VerticalLayout = ({children}: any) => {
  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <div className="wrapper navbar-floating footer-static">
      <SidebarComponent
        menuVisibility={menuVisibility}
        setMenuVisibility={setMenuVisibility}
      />

      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames('sidenav-overlay', {
          show: menuVisibility
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Vertical Nav Menu Overlay */}

      <Navbar expand='lg' color={'light'} className='header-navbar navbar align-items-center floating-nav navbar-shadow'>        
        <div className='navbar-container d-flex justify-content-between'>
          <Menu className='ms-3 mt-3' size={22} onClick={() => setMenuVisibility(true)} style={{cursor: 'pointer'}} />
          <Link className='brand-logo' to='/'>
            <span><img src={themeConfig.app.appLogoImage} alt='logo' /></span>
            <div className='brand-container'>
              <h2 className='brand-text text-primary'>{themeConfig.app.appName}</h2>
            </div>
          </Link>
          <NavbarComponent />
        </div>
      </Navbar>

      {/* Children Area */}
      <div className='app-content content overflow-hidden'>
        {children}
      </div>
      
      <footer className='footer footer-light yfooter-static'>
        <FooterComponent />
      </footer>


      <div className='scroll-to-top'>
        <ScrollToTop showUnder={300} style={{ bottom: '5%' }}>
          <Button className='btn-icon' color='primary'>
            <ArrowUp size={14} color='white' />
          </Button>
        </ScrollToTop>
      </div>
    </div>
  )
}

export default VerticalLayout
