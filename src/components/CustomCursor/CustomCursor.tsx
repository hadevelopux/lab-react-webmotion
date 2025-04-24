import React, { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.scss';

/**
 * Componente CustomCursor
 * 
 * Implementación de un cursor personalizado que reemplaza el cursor predeterminado del navegador.
 * Características:
 * - Movimiento suave con efecto de retardo
 * - Efecto de hover en elementos interactivos (enlaces, botones)
 * - Siempre visible por encima de todo el contenido (z-index: 99999)
 * - Mix-blend-mode para mejor visibilidad en cualquier fondo
 * 
 * El cursor está compuesto por:
 * - Un punto central (4px por defecto, 12px en hover)
 * - Un anillo circundante (24px por defecto, 40px en hover)
 */
const CustomCursor: React.FC = () => {
  // Posición actual del mouse
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // Posición suavizada para el efecto de retardo
  const [smoothedPosition, setSmoothedPosition] = useState({ x: 0, y: 0 });
  // Estado de hover para elementos interactivos
  const [isHovered, setIsHovered] = useState(false);
  // Referencia para el frame de animación
  const requestRef = useRef<number>();

  useEffect(() => {
    // Actualiza la posición del cursor con el movimiento del mouse
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Maneja los estados de hover para elementos interactivos
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    // Bucle de animación para el movimiento suave del cursor
    // Usa un factor bajo (0.05) para crear un efecto de retardo notable
    const animate = () => {
      setSmoothedPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.05,
        y: prev.y + (position.y - prev.y) * 0.05
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    // Agrega event listeners a todos los elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', onMouseEnter);
      element.addEventListener('mouseleave', onMouseLeave);
    });

    // Inicia la animación y el seguimiento del mouse
    window.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    // Limpieza
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
      });
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [position]);

  return (
    <div 
      className={`${styles.cursor} ${isHovered ? styles.hover : ''}`}
      style={{
        left: smoothedPosition.x,
        top: smoothedPosition.y,
        transition: 'transform 0.1s ease-out'
      }}
    />
  );
};

export default CustomCursor; 