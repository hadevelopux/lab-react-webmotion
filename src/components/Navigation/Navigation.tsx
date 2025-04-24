import React, { memo, useCallback, useMemo } from 'react'
import type { KeyboardEvent } from 'react'
import styles from './Navigation.module.scss'
import { NAVIGATION_PAGES, type PageIndex } from '../../constants/navigation'

/**
 * Props que recibe el componente Navigation
 * @interface NavigationProps
 * @property {number} currentPageIndex - Índice de la página actualmente activa
 * @property {(index: number, e: React.MouseEvent) => void} onPageChange - Callback que se ejecuta al cambiar de página
 */
interface NavigationProps {
  currentPageIndex: PageIndex
  onPageChange: (index: PageIndex, e: React.MouseEvent | KeyboardEvent) => void
}

/**
 * Función de comparación personalizada para React.memo
 * Evita re-renderizados innecesarios cuando las props no cambian
 */
const arePropsEqual = (prevProps: NavigationProps, nextProps: NavigationProps) => {
  return prevProps.currentPageIndex === nextProps.currentPageIndex
}

/**
 * Componente de navegación principal
 * 
 * Este componente renderiza una barra de navegación con enlaces a las diferentes
 * secciones de la aplicación. Utiliza memo para evitar re-renderizados innecesarios
 * y está optimizado para rendimiento con useMemo y useCallback.
 * 
 * @component
 * @param {NavigationProps} props - Props del componente
 * @returns {JSX.Element} Componente de navegación renderizado
 * 
 * @example
 * ```tsx
 * <Navigation 
 *   currentPageIndex={0}
 *   onPageChange={(index, e) => handlePageChange(index, e)}
 * />
 * ```
 */
const Navigation: React.FC<NavigationProps> = memo(({ currentPageIndex, onPageChange }) => {
  /**
   * Memoiza el array de páginas para evitar recreación en cada render
   * @type {Page[]}
   */
  const pages = useMemo(() => NAVIGATION_PAGES, [])

  /**
   * Función helper memoizada para generar las clases CSS de los enlaces
   * @param {number} index - Índice de la página
   * @returns {string} Cadena de clases CSS
   */
  const getLinkClasses = useCallback((index: PageIndex) => {
    return `${styles.navLink} ${currentPageIndex === index ? styles.active : ''}`
  }, [currentPageIndex])

  /**
   * Maneja el evento de clic en los enlaces de navegación
   * Utiliza currying para optimizar el rendimiento
   * @param {number} index - Índice de la página a la que se quiere navegar
   * @returns {(e: React.MouseEvent) => void} Función manejadora del evento
   */
  const handleNavigation = useCallback((index: PageIndex) => (e: React.MouseEvent | KeyboardEvent) => {
    // Solo manejar eventos de teclado para Enter y Espacio
    if (e instanceof KeyboardEvent && e.key !== 'Enter' && e.key !== ' ') {
      return
    }

    e.preventDefault()
    onPageChange(index, e)
  }, [onPageChange])

  return (
    <nav 
      className={styles.nav} 
      role="navigation" 
      aria-label="Navegación principal"
    >
      <ul className={styles.navList}>
        {pages.map((page) => (
          <li key={page.index}>
            <a 
              href={`#${page.name.toLowerCase()}`}
              onClick={handleNavigation(page.index)}
              onKeyDown={handleNavigation(page.index)}
              className={getLinkClasses(page.index)}
              aria-current={currentPageIndex === page.index ? 'page' : undefined}
              tabIndex={0}
              role="link"
            >
              {page.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}, arePropsEqual)

Navigation.displayName = 'Navigation'

export default Navigation 