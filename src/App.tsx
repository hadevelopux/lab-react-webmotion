import React, { useState } from 'react'
import { PageTransition } from './components/PageTransition/PageTransition'
import Preloader from './components/Preloader/Preloader'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import styles from './App.module.scss'

/**
 * Componente principal de la aplicación
 * Maneja la navegación entre secciones y las transiciones
 */
function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [nextContent, setNextContent] = useState<React.ReactNode | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Array de componentes de página
  const pageComponents = [Home, About, Contact]

  /**
   * Maneja el cambio entre secciones
   * @param index - Índice de la sección a la que se quiere cambiar
   */
  const handlePageChange = (index: number, e: React.MouseEvent) => {
    e.preventDefault() // Prevenir el comportamiento por defecto del ancla
    if (index === currentPageIndex) return
    
    const NextPage = pageComponents[index]
    setNextContent(<NextPage />)
    setCurrentPageIndex(index)
  }

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <div className={styles.app}>
      <CustomCursor />
      {isLoading ? (
        <Preloader onLoadingComplete={handlePreloaderComplete} />
      ) : (
        <>
          <PageTransition nextChildren={nextContent}>
            {React.createElement(pageComponents[currentPageIndex])}
          </PageTransition>
          <nav className={styles.navigation}>
            <ul>
              {pageComponents.map((_, index) => (
                <li key={index}>
                  <a
                    href="#"
                    onClick={(e) => handlePageChange(index, e)}
                    className={index === currentPageIndex ? styles.active : ''}
                  >
                    {index === 0 ? 'Home' : index === 1 ? 'About' : 'Contact'}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}

export default App 