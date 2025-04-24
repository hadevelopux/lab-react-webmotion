/**
 * Enumeración de las páginas disponibles en la navegación
 */
export enum PageIndex {
  HOME = 0,
  ABOUT = 1,
  CONTACT = 2
}

/**
 * Interfaz que define la estructura de una página en la navegación
 */
export interface Page {
  name: string
  index: PageIndex
}

/**
 * Configuración de las páginas disponibles en la navegación
 */
export const NAVIGATION_PAGES: Page[] = [
  { name: 'Inicio', index: PageIndex.HOME },
  { name: 'Nosotros', index: PageIndex.ABOUT },
  { name: 'Contacto', index: PageIndex.CONTACT }
] 