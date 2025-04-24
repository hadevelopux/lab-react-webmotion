import React from 'react'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer 