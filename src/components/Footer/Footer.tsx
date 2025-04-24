import React from 'react'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        Copyright © 2025
      </div>
    </footer>
  )
}

export default Footer 