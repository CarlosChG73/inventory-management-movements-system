# Sistema de Gestión de Inventario y Movimientos

Aplicación web de práctica orientada al control básico de inventario, registro de movimientos y gestión de recetas o preparaciones en un entorno de producción gastronómica digital.

## Descripción general

Este proyecto corresponde a la primera versión funcional de un MVP desarrollado como práctica de frontend web. Su propósito es ofrecer una base estructurada para registrar productos, controlar entradas y salidas, consultar existencias y asociar preparaciones con los insumos utilizados.

El sistema fue planteado a partir de un caso simulado denominado **Gastronomía G en Línea**, con enfoque en la organización de insumos, movimientos y recursos empleados en la producción de contenido gastronómico digital.

## Objetivo del proyecto

Desarrollar una base funcional en entorno web que permita:

- registrar productos o insumos
- controlar movimientos de entrada y salida
- consultar el inventario actual
- registrar recetas o preparaciones
- relacionar recetas con productos utilizados

## Estado actual del proyecto

**Versión actual:** MVP Frontend v1.0  
**Estado:** versión funcional inicial  
**Tipo de desarrollo:** práctica académica y de portafolio

La versión actual ya cuenta con una estructura completa de interfaz, diseño responsive, validaciones básicas y lógica funcional en JavaScript para operar el sistema directamente en el navegador.

## Alcance actual de la versión

En esta primera versión ya se encuentra implementado lo siguiente:

### Estructura e interfaz
- estructura HTML semántica completa
- metodología BEM en clases CSS
- diseño visual profesional y responsive
- navegación interna por secciones
- botón flotante para volver al inicio
- botón de modo nocturno
- favicon configurado

### Módulo de productos
- registro de productos
- captura de nombre, categoría, unidad de medida, stock inicial y stock mínimo
- visualización en tabla de productos registrados

### Módulo de movimientos
- registro de entradas y salidas
- selección de producto
- validación de stock disponible en salidas
- actualización del stock del producto
- historial de movimientos en tabla

### Módulo de inventario
- visualización de existencias actuales
- cálculo de estado del inventario:
  - disponible
  - bajo mínimo
  - agotado

### Módulo de recetas o preparaciones
- registro de recetas
- captura de nombre, descripción, fecha, productos usados y enlace de referencia
- visualización en tabla de recetas registradas

### Validaciones y experiencia de uso
- validaciones nativas HTML
- mensajes personalizados en español
- notificaciones visuales de acciones exitosas
- cambio de tema claro / oscuro

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla

## Estructura del proyecto

```bash
sistema-inventario-control-movimientos/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── img/
    └── favicon/