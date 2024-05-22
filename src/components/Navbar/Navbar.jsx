import React from 'react'
import './Navbar.css'
import menu from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import upload from '../../assets/upload.png'
import more from '../../assets/more.png'
import notification from '../../assets/notification.png'
import profile from '../../assets/jack.png'
import { Link } from 'react-router-dom'

const Navbar = ({setsidebar}) => {
  return (<>
   <nav className='flex-div'>
    <div className="nav-left flex-div">
        <img onClick={()=>setsidebar(prev=>!prev)} className='menu-icon' src={menu}/>
       <Link to='/'> <img className='logo' src={logo}/></Link>
    </div>
    <div className="nav-middle flex-div">
        <div className="search-box flex-div">
        <input type='text' placeholder='Search'/>
        <img src={search}/>
        </div>
    </div>
    <div className="nav-right flex-div">
        <img src={upload}/>
        <img src={more}/>
        <img src={notification}/>
        <img className='profile' src={profile}/>
    </div>
   </nav>
  </>)
}

export default Navbar
