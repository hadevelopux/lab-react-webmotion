import React from 'react'
import styles from './Contact.module.scss'

/**
 * Componente de la página de Contacto
 * Proporciona información para contactar con la empresa
 */
const Contact: React.FC = () => {
  return (
    <div className={styles.contact}>
      <h1>Contacto</h1>
      <p>Contenido simple sin animaciones</p>
    </div>
  )
}

export default Contact 