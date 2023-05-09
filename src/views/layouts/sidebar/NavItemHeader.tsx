import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'react-feather'

import * as Icon from 'react-feather'

const resolveLinkPath = (childTo: string, parentTo: string) => parentTo? `${parentTo}${childTo}` : childTo

const NavItemHeader = (props: any) => {
  const { item } = props
  const { title, icon, navLink: headerToPath, children } = item
  const IconTag = icon ? Icon[icon as keyof typeof Icon] : null
  
  const location = useLocation()

  const [expanded, setExpand] = useState(
    location.pathname.includes(headerToPath)
  )

  const onExpandChange = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setExpand(expanded => !expanded)
  }
	
  return (
    <>
      <button
        className={`navItem navItemHeaderButton ${expanded && 'expanded'}`}
        onClick={onExpandChange}
      >
        <div className='navLabel'>
          {IconTag ? <IconTag className='navIcon' size={14} /> : <Icon.Circle className='navIcon' size={8} />}
          <span className='navTitle'>{title}</span>
        </div>
        <ChevronDown size={14}
          className={`navItemHeaderChevron ${
            expanded && 'chevronExpanded'
          }`}
        />
      </button>

      {expanded && (
        <div className='navChildrenBlock'>
          {children.map((item: any) => {
            const { title, icon, children } = item
            const IconTag = icon ? Icon[icon as keyof typeof Icon] : null

            if (children) {
              return (
                <div key={item.id}>
                  <NavItemHeader
                    item={{
                      ...item,
                      navLink: resolveLinkPath(item.navLink, props.item.navLink),
                    }}
                  />
                </div>
              )
            }

            return (
              <NavLink
                key={item.id}
                to={resolveLinkPath(item.navLink, props.item.navLink)}
                className='navItem'          
              >
                <div className='navLabel'>
                  {IconTag ? <IconTag className='navIcon' size={14} /> : <Icon.Circle className='navIcon' size={8} />}
                  <span className='navTitle'>{title}</span>
                </div>
              </NavLink>
            )
          })}
        </div>
      )}
    </>
  )
}

export default NavItemHeader
