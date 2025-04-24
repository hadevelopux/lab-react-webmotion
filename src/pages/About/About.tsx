import React from 'react'
import styles from './About.module.scss'

/**
 * Componente de la página Sobre Nosotros
 * Muestra información sobre la empresa y su misión
 */
const About: React.FC = () => {
  return (
    <div className={styles.about}>
      <h1>Nosotros</h1>
      <p>Contenido simple sin animaciones</p>
    </div>
  )
}

export default About 