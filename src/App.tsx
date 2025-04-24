import React, { useState } from 'react'
import { PageTransition } from './components/PageTransition/PageTransition'
import Preloader from './components/Preloader/Preloader'
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
      {/* Contenido principal siempre presente */}
      <nav className={styles.navigation}>
        <ul>
          <li>
            <a 
              href="/" 
              onClick={(e) => handlePageChange(0, e)}
              className={currentPageIndex === 0 ? styles.active : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/about" 
              onClick={(e) => handlePageChange(1, e)}
              className={currentPageIndex === 1 ? styles.active : ''}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="/contact" 
              onClick={(e) => handlePageChange(2, e)}
              className={currentPageIndex === 2 ? styles.active : ''}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <main className={styles.main}>
        <PageTransition nextChildren={nextContent}>
          {React.createElement(pageComponents[currentPageIndex])}
        </PageTransition>
      </main>

      {/* Preloader como overlay */}
      {isLoading && <Preloader onLoadingComplete={handlePreloaderComplete} />}
    </div>
  )
}

export default App 