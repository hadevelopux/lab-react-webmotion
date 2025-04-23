import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          Logo
        </Link>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/about" className={styles.link}>About Us</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header 