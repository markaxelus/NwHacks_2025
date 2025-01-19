import React from 'react'
import Logo from '../assets/MindMap.png'
import { useLocation } from 'react-router-dom'
import styles from '../styles/Navbar.module.css'

const navLinks = [
    {
        name: 'Synapse',
        url: '/',
        icon: Logo,
    },
    {
        name: 'Mode',
        className: styles.login,
    },
    {
        name: 'Explore Product',
        url: '/generation',
        className: styles.exploreproduct,
    },
]

const hideNav = [
    '/generation'
]


const Navbar = () => {
    const location = useLocation()

    const shouldHideNav = hideNav.includes(location.pathname)

    if (shouldHideNav) {
        return null;
    }
    
    return (

        <nav className={`fixed top-0 w-full flex justify-between items-center py-4 pl-10 font-primary bg-white dark:bg-black `}>
            {/* Left : Logo */}
            <div className='flex space-x-4 font-bold text-3xl '>
                <a href={navLinks[0].url}
                    className='flex items-center '
                >
                {navLinks[0].icon && (
                    <img src={navLinks[0].icon} alt='logo' 
                        className='mr-2 dark:' />
                )}
                {navLinks[0].name}
                </a>
            </div>
            
            {/* Right : Navigation */}
            <div className='space-x-8 mr-20'>
                {navLinks.slice(1).map((link,index) => (
                    <a key={index}
                        href={link.url}
                        className={`text-md ${link.className || ''}`}
                    >
                    {link.name}    
                    </a>
                ))}
            </div>
        </nav>
  )
}

export default Navbar;