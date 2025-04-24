/**
 * Declaración de tipos para módulos SCSS
 * Permite la importación de archivos .scss en TypeScript
 */
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
} 