import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Preloader.module.scss'

interface Props {
  // Callback que se ejecuta cuando el preloader termina su animación
  onLoadingComplete: () => void
}

export const Preloader = ({ onLoadingComplete }: Props) => {
  // Estado para controlar el progreso de carga (0-100)
  const [progress, setProgress] = useState(0)
  
  // Referencias a elementos del DOM
  const progressRef = useRef<HTMLDivElement>(null)      // Barra de progreso
  const barsRef = useRef<HTMLDivElement>(null)         // Contenedor de barras
  const barRefs = useRef<HTMLDivElement[]>([])         // Array de barras individuales
  const preloaderRef = useRef<HTMLDivElement>(null)    // Contenedor principal

  // Función que maneja la animación de salida del preloader
  const startExitAnimation = () => {
    console.log('Iniciando animación de salida')
    const tl = gsap.timeline()

    // 1. Fade out de la barra de progreso
    tl.to(progressRef.current?.parentElement, {
      opacity: 0,
      duration: 0.3
    })

    // 2. Animar barras bajando secuencialmente
    barRefs.current.forEach((bar, index) => {
      tl.to(bar, {
        scaleY: 1,                    // Escala vertical completa
        duration: 0.6,                // Duración de cada barra
        ease: "power4.inOut",         // Tipo de easing
      }, index * 0.08)                // Delay entre cada barra
    })

    // 3. Pausa para mantener las barras abajo
    tl.to({}, { duration: 0.3 })

    // 4. Animar barras subiendo en orden inverso
    for (let i = barRefs.current.length - 1; i >= 0; i--) {
      tl.to(barRefs.current[i], {
        scaleY: 0,                    // Regresa a escala 0
        duration: 0.6,                // Duración de subida
        ease: "power4.inOut",         // Mismo easing que bajada
      }, `>-${0.45}`)                 // Superposición entre animaciones
    }

    // 5. Llamar al callback cuando termine toda la animación
    tl.call(() => {
      console.log('Animación completada, llamando a onLoadingComplete')
      onLoadingComplete()
    })
  }

  // Efecto para manejar la carga de recursos
  useEffect(() => {
    console.log('Iniciando efecto de carga')
    let loadedResources = 0
    let totalResources = 0

    // Función para actualizar el progreso de carga
    const updateProgress = () => {
      loadedResources++
      const currentProgress = Math.min((loadedResources / Math.max(totalResources, 1)) * 100, 100)
      console.log(`Progreso actual: ${currentProgress}%, Recursos cargados: ${loadedResources}/${totalResources}`)
      
      setProgress(currentProgress)
      
      // Animar la barra de progreso
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: currentProgress / 100,
          duration: 0.5,
          ease: "power2.out"
        })
      }

      // Iniciar animación de salida cuando todo esté cargado
      if (loadedResources >= totalResources) {
        console.log('Todos los recursos cargados')
        setTimeout(startExitAnimation, 500)
      }
    }

    // Recolectar todos los recursos a cargar
    const images = Array.from(document.images)
    const videos = Array.from(document.getElementsByTagName('video'))
    const resources = [...images, ...videos]
    
    totalResources = resources.length
    console.log(`Total de recursos a cargar: ${totalResources}`)

    // Si no hay recursos, simular una carga mínima
    if (totalResources === 0) {
      console.log('No se encontraron recursos, simulando carga mínima')
      setTimeout(() => {
        setProgress(100)
        if (progressRef.current) {
          gsap.to(progressRef.current, {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setTimeout(startExitAnimation, 500)
            }
          })
        }
      }, 1000)
      return
    }

    // Monitorear la carga de cada recurso
    resources.forEach(resource => {
      if (resource.complete) {
        console.log('Recurso ya cargado:', resource.src || 'video')
        updateProgress()
      } else {
        console.log('Esperando carga de recurso:', resource.src || 'video')
        resource.addEventListener('load', updateProgress)
        resource.addEventListener('error', () => {
          console.log('Error al cargar recurso:', resource.src || 'video')
          updateProgress()
        })
      }
    })

    // Limpieza de event listeners
    return () => {
      resources.forEach(resource => {
        resource.removeEventListener('load', updateProgress)
        resource.removeEventListener('error', updateProgress)
      })
    }
  }, [])

  return (
    <div ref={preloaderRef} className={styles.preloader}>
      {/* Contenedor de la barra de progreso y número */}
      <div className={styles.progressContainer}>
        <div ref={progressRef} className={styles.progress} />
        <div className={styles.progressNumber}>{Math.round(progress)}</div>
      </div>

      {/* Contenedor de las barras de transición */}
      <div ref={barsRef} className={styles.bars}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={el => {
              if (el) barRefs.current[i] = el
            }}
            className={styles.bar}
            style={{
              transform: 'scaleY(0)'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Preloader 