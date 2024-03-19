import React from 'react'
import { Link } from 'react-router-dom'
import  icon_profile from './assets/icon_profile.svg'

export const Header = () => {

  return (
      <div className="header">
        <Link to={'/afisha'} className='link_logo'><h1 className='logo'>master<span>Class</span></h1></Link>
        <Link to={'/reg'}><img className='profile_icon' src={icon_profile} alt="" /></Link>
      </div>
  )
}

export default Header