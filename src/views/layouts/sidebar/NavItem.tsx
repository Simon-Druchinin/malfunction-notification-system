import { NavLink } from 'react-router-dom'
import NavItemHeader from './NavItemHeader'

import * as Icon from 'react-feather'


const NavItem = ({ item }: any) => {
  const { title, icon, navLink, children } = item
  const IconTag = icon ? Icon[icon as keyof typeof Icon] : null

  if (children) {
    return <NavItemHeader item={item} />
  }

  return (
    <NavLink
      to={navLink}
      className='navItem'
    >
      <div className='navLabel'>
        {IconTag ? <IconTag size={14} className='navIcon' /> : <Icon.Circle className='navIcon' size={8} />}
        <span className='navTitle'>{title}</span>
      </div>
    </NavLink>
  )
}

export default NavItem
