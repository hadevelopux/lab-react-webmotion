import React from 'react'
import styles from './Navigation.module.scss'

/**
 * Props para el componente Navigation
 * @property {number} currentPageIndex - Índice de la página actualmente activa
 * @property {(index: number, e: React.MouseEvent) => void} onPageChange - Función para manejar el cambio de página
 */
interface NavigationProps {
  currentPageIndex: number
  onPageChange: (index: number, e: React.MouseEvent) => void
}

/**
 * Componente de navegación principal
 * Muestra los enlaces de navegación y maneja la interacción del usuario
 * @param {NavigationProps} props - Props del componente
 * @returns {JSX.Element} Componente de navegación renderizado
 */
const Navigation: React.FC<NavigationProps> = ({ currentPageIndex, onPageChange }) => {
  // Array de páginas para la navegación
  const pages = [
    { name: 'Inicio', index: 0 },
    { name: 'Nosotros', index: 1 },
    { name: 'Contacto', index: 2 }
  ]

  return (
    <nav className={styles.nav} role="navigation" aria-label="Navegación principal">
      <ul className={styles.navList}>
        {pages.map((page) => (
          <li key={page.index}>
            <a 
              href="#" 
              onClick={(e) => onPageChange(page.index, e)}
              className={currentPageIndex === page.index ? styles.active : ''}
              aria-current={currentPageIndex === page.index ? 'page' : undefined}
            >
              {page.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation 