import React from 'react'
import styles from './Home.module.scss'

/**
 * Componente de la página de inicio
 * Muestra el contenido principal de la aplicación
 */
const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1>Inicio</h1>
      <p>Contenido simple sin animaciones</p>
    </div>
  )
}

export default Home 