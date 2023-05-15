// ** React Imports
import { useEffect, useState } from 'react'

import useJwt, { JwtToken, userData as userDataType } from '@/auth/jwt/useJwt'

// ** Router
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@/views/components/avatar'

// ** Utils
import { defaultAvatar } from '@/utility/utils'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Icons
import * as Icon from 'react-feather'

import jwt_decode from "jwt-decode"


export type dropDownMenuType = {
  id: number;
  type: string | null;
  icon: string | null;
  navLink: string | null;
  title: string | null;
}

const UserDropdown = () => {
  // ** State
  const [data, setData] = useState<dropDownMenuType[] | []>([])

  const { getToken } = useJwt()

  const decoded_token: JwtToken = jwt_decode(getToken() as string)
  const userData: userDataType = decoded_token.user_data

  const { handleLogout, projectInstance } = useJwt()

  // ** Get data on mount
  useEffect(() => {
    projectInstance.get('/api/v1/menu/dropdown-menu/')
      .then((response: any) => {
        setData(response.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  //** Vars
  const userAvatar = (userData && userData?.avatar) || defaultAvatar

  //** Obtain action by dropdown type
  const DropdownItemActions = {
    logout: () => handleLogout()
  }

  const renderDropdownMenu = () => {
    return data.map((item: dropDownMenuType) => {
      const IconTag = item.icon ? Icon[item.icon as keyof typeof Icon] : null
    
      if (item.type === 'divider') {
        return <DropdownItem key={item.id} divider />
      }

      return (
        <DropdownItem key={item.id} tag={Link} to={item.navLink} onClick={DropdownItemActions[item.type as keyof typeof DropdownItemActions]}>
          {IconTag ? <IconTag size={14} className='me-2' /> : null}
          <span className='align-middle'>{item.title}</span>
        </DropdownItem>
      )
    })
  } 

  return (
    <UncontrolledDropdown className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold text-black'>{ userData?.last_name } { userData?.first_name }</span>
          <span className='user-status text-black'>{ userData?.groups[0].name }</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        {renderDropdownMenu()}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
