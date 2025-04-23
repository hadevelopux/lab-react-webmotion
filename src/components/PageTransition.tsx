// Importaciones necesarias
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import styles from './PageTransition.module.scss'

// Props del componente
interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation()
  // Referencias a los elementos del DOM
  const transitionRef = useRef<HTMLDivElement>(null)  // Contenedor de las barras de transición
  const contentRef = useRef<HTMLDivElement>(null)     // Contenedor del contenido
  const isInitialLoad = useRef(true)  // Controla la carga inicial
  const [currentContent, setCurrentContent] = useState(children)
  const [nextContent, setNextContent] = useState<React.ReactNode>(null)

  // Función para animar las barras hacia abajo
  const animateBarsDown = (bars: Element[]): Promise<void> => {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => resolve()
      })

      tl.set(bars, { y: '-100%' })
        .to(bars, {
          y: '0%',
          stagger: 0.1,
          ease: 'power2.inOut'
        })
    })
  }

  // Función para animar las barras hacia arriba
  const animateBarsUp = (bars: Element[]): Promise<void> => {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => resolve()
      })

      tl.to(bars, {
        y: '100%',
        stagger: 0.1,
        ease: 'power2.inOut'
      })
    })
  }

  // Función principal que maneja la transición
  const handleTransition = async () => {
    const transition = transitionRef.current
    const content = contentRef.current

    if (!transition || !content) return

    const bars = Array.from(transition.children)

    // Guardar el nuevo contenido
    setNextContent(children)

    // Mostrar la transición
    gsap.set(transition, { display: 'flex' })

    try {
      // 1. Bajar la cortina completamente
      await animateBarsDown(bars)
      
      // 2. SOLO cuando la cortina está abajo, actualizar el contenido
      setCurrentContent(children)
      
      // 3. Subir la cortina
      await animateBarsUp(bars)
      
      // 4. Ocultar la transición
      gsap.set(transition, { display: 'none' })
    } catch (error) {
      console.error('Error en la transición:', error)
    }
  }

  // Efecto que se ejecuta cuando cambia la ruta
  useEffect(() => {
    if (isInitialLoad.current) {
      gsap.set(transitionRef.current, { display: 'none' })
      isInitialLoad.current = false
      return
    }

    handleTransition()
  }, [location.pathname])

  // Renderizado del componente
  return (
    <>
      {/* Contenedor del contenido */}
      <div 
        ref={contentRef} 
        className={styles.content}
        style={{ 
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        {currentContent}
      </div>

      {/* Contenedor de las barras de transición */}
      <div ref={transitionRef} className={styles.transition}>
        {/* Crea 10 barras verticales */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.bar} />
        ))}
      </div>
    </>
  )
}

export default PageTransition