// ** React Imports
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { ArrowUp } from 'react-feather'
import ScrollToTop from 'react-scroll-up'
import { Navbar, Button } from 'reactstrap'

// ** Custom Components
import FooterComponent from './footer'
import NavbarComponent from './navbar'
// import SidebarComponent from './vertical-menu'

// ** Styles
// import '@/assets/scss/base/menu/menu-types/vertical-menu.scss'
// import '@/assets/scss/base/menu/menu-types/vertical-overlay-menu.scss'

const VerticalLayout = (props: any) => {
  // ** Props
  const { children, navbar, footer, menu, routerProps, currentActiveItem } = props
  const footerType: string = 'static'
  const navbarType: string = 'floating'
  const navbarColor: string = 'white'

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [menuCollapsed, setMenuCollapsed] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  // ** Vars
  const location = useLocation()

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
  }, [location])

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth)
    }
  }, [windowWidth])

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // ** Vars
  const footerClasses: any = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden'
  }

  const navbarWrapperClasses: any = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
    hidden: 'navbar-hidden'
  }

  const navbarClasses: any = {
    floating: 'floating-nav',
    sticky: 'fixed-top',
    static: 'navbar-static-top',
    hidden: 'd-none'
  }

  const bgColorCondition = navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white'

  if (!isMounted) {
    return null
  }
  return (
    <div
      className={classnames(
        `wrapper vertical-layout navbar-floating footer-static ${navbarWrapperClasses[navbarType] || 'navbar-floating'} ${
          footerClasses[footerType] || 'footer-static'
        }`,
        {
          // Modern Menu
          'vertical-menu-modern': windowWidth >= 1200,
          'menu-collapsed': menuCollapsed && windowWidth >= 1200,
          'menu-expanded': !menuCollapsed && windowWidth > 1200,

          // Overlay Menu
          'vertical-overlay-menu': windowWidth < 1200,
          'menu-hide': !menuVisibility && windowWidth < 1200,
          'menu-open': menuVisibility && windowWidth < 1200
        }
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      {/* {!isHidden ? (
        <SidebarComponent
          menu={menu}
          menuCollapsed={menuCollapsed}
          menuVisibility={menuVisibility}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
          routerProps={routerProps}
          currentActiveItem={currentActiveItem}
        />
      ) : null} */}

      <Navbar
        expand='lg'
        color={bgColorCondition ? navbarColor : ''}
        className={'header-navbar navbar align-items-center floating-nav navbar-shadow'}
      >
        <div className='navbar-container d-flex content'>
          <NavbarComponent />
        </div>
      </Navbar>
      {children}

      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames('sidenav-overlay', {
          show: menuVisibility
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Vertical Nav Menu Overlay */}

      <footer
        className={'footer footer-light footer-static'}
      >
        <FooterComponent />
      </footer>


      <div className='scroll-to-top'>
        <ScrollToTop showUnder={300} style={{ bottom: '5%' }}>
          <Button className='btn-icon' color='primary'>
            <ArrowUp size={14} />
          </Button>
        </ScrollToTop>
      </div>
    </div>
  )
}

export default VerticalLayout
