// Importaciones necesarias
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './PageTransition.module.scss'

/**
 * Props para el componente PageTransition
 * @param children - Contenido actual que se está mostrando
 * @param nextChildren - Siguiente contenido que se mostrará después de la transición
 */
interface Props {
  children: React.ReactNode
  nextChildren?: React.ReactNode
}

/**
 * Componente que maneja la transición tipo cortina entre diferentes contenidos
 * Inspirado en el efecto de transición de dgrees.studio
 */
export const PageTransition: React.FC<Props> = ({ children, nextChildren }) => {
  // Estado para mantener el contenido actual
  const [currentContent, setCurrentContent] = useState(children)

  // Referencias a elementos del DOM
  const wrapperRef = useRef<HTMLDivElement>(null)    // Contenedor principal
  const transitionRef = useRef<HTMLDivElement>(null)  // Contenedor de las barras de transición
  const contentRef = useRef<HTMLDivElement>(null)     // Contenedor del contenido

  /**
   * Maneja la secuencia de animación de la transición
   * La secuencia es:
   * 1. Barras bajan una por una
   * 2. Se espera a que todas las barras estén abajo
   * 3. Se cambia el contenido
   * 4. Barras suben una por una
   */
  const handleTransition = () => {
    if (!transitionRef.current || !contentRef.current) return

    // Timeline principal que controlará toda la secuencia de animación
    const tl = gsap.timeline()
    
    // Aseguramos que el contenedor de transición sea visible
    gsap.set(transitionRef.current, { display: 'flex' })
    
    // Obtenemos todas las barras
    const bars = transitionRef.current.children

    // 1. Animación de bajada: cada barra baja secuencialmente
    for (let i = 0; i < bars.length; i++) {
      tl.to(bars[i], {
        yPercent: 100,          // Mueve la barra hacia abajo 100%
        duration: 0.6,          // Duración de cada animación
        ease: "power4.inOut",   // Efecto de aceleración/desaceleración pronunciado
      }, i * 0.08)              // Delay entre cada barra
    }

    // 2. Espera y cambio de contenido
    tl.add(() => {
      setCurrentContent(nextChildren)  // Actualiza el contenido
    }, "+=0.3")                       // Espera 0.3s después de que las barras bajen

    // 3. Pequeña pausa para asegurar que el contenido se actualizó
    tl.add(() => {}, "+=0.2")

    // 4. Animación de subida: las barras suben en orden inverso
    for (let i = bars.length - 1; i >= 0; i--) {
      tl.to(bars[i], {
        yPercent: 0,            // Regresa la barra a su posición original
        duration: 0.6,          // Duración de cada animación
        ease: "power4.inOut",   // Mismo efecto que la bajada
      }, `>-${0.45}`)          // Superposición entre animaciones para un efecto más fluido
    }

    // 5. Oculta el contenedor de transición al finalizar
    tl.add(() => {
      gsap.set(transitionRef.current, { display: 'none' })
    })
  }

  // Ejecuta la transición cuando cambia el contenido
  useEffect(() => {
    if (nextChildren && nextChildren !== children) {
      handleTransition()
    }
  }, [nextChildren, children])

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={contentRef} className={styles.content}>
        {currentContent}
      </div>
      {/* Contenedor de las barras de transición */}
      <div ref={transitionRef} className={styles.transition}>
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
    </div>
  )
}

export default PageTransition