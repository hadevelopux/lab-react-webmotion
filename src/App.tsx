import React, { useState } from 'react'
import { PageTransition } from './components/PageTransition/PageTransition'
import Preloader from './components/Preloader/Preloader'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Navigation from './components/Navigation/Navigation'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import styles from './App.module.scss'

/**
 * Componente principal de la aplicación
 * Maneja la navegación entre secciones y las transiciones
 * @returns {JSX.Element} Aplicación renderizada
 */
function App() {
  // Estados para controlar la navegación y el contenido
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0)
  const [nextContent, setNextContent] = useState<React.ReactNode | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Array de componentes de página
  const pageComponents = [Home, About, Contact]

  /**
   * Maneja el cambio entre secciones
   * @param {number} index - Índice de la sección a la que se quiere cambiar
   * @param {React.MouseEvent} e - Evento del clic
   */
  const handlePageChange = (index: number, e: React.MouseEvent) => {
    e.preventDefault() // Prevenir el comportamiento por defecto del ancla
    if (index === currentPageIndex) return
    
    const NextPage = pageComponents[index]
    setNextContent(<NextPage />)
    setCurrentPageIndex(index)
  }

  /**
   * Maneja la finalización del preloader
   */
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
          <Navigation 
            currentPageIndex={currentPageIndex}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}

export default App 