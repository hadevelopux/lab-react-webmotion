import React from 'react'
import styles from './Home.module.scss'

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1>Home</h1>
      <p>Simple content without animations</p>
    </div>
  )
}

export default Home 