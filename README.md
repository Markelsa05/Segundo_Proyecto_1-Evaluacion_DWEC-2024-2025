# Segundo_Proyecto_1-Evaluacion_DWEC-2024-2025
El objetivo de este proyecto es desarrollar una aventura interactiva en la cual el usuario controla a un personaje que se mueve por una cuadrícula de 10x10 en busca de un cofre, empleando técnicas de programación en JavaScript y HTML para gestionar el formulario, los movimientos en la tabla y el almacenamiento de datos persistente en localStorage.


Decisiones de Diseño 

1. Estructura del Juego 

Tablero 10x10: Se eligió una cuadrícula de 10x10 por su simplicidad y equilibrio entre dificultad y jugabilidad. 

Posiciones Fijas: El héroe comienza en la esquina superior izquierda y el cofre en la esquina inferior derecha, garantizando un objetivo claro y fácil de localizar para el jugador. 

2. Flujo del Juego 

Validación del Nombre: Antes de iniciar el juego, el nombre del jugador es validado para garantizar que cumpla con ciertos requisitos (mínimo 4 caracteres y sin números). 

Lanzamiento de Dado: La mecánica del dado introduce aleatoriedad, mejorando la jugabilidad. 

Movimiento Resaltado: Las celdas a las que el héroe puede moverse se resaltan visualmente, haciendo el juego más intuitivo. 


3. Persistencia de Datos 

Uso de localStorage: Los récords de tiradas se almacenan localmente para que persistan entre sesiones, incentivando a los jugadores a superar su propia marca. 

4. Interfaz de Usuario 

Diseño Minimalista: Se priorizó una interfaz simple y funcional: 

Mensajes de retroalimentación claros (errores, victoria, récords). 

Elementos visuales (imágenes del héroe, cofre y dado) para mejorar la inmersión. 

Botón Dinámico de Tirar Dado: Este se genera y se habilita solo cuando es necesario, evitando interacciones innecesarias. 

 

Desafíos Encontrados y Soluciones 

1. Desafío: Gestión de la Posición del Héroe 

Problema: Cuando el héroe se movía, la imagen del cofre desaparecía debido a un borrado general de contenido en las celdas. 

Solución: Se añadió una condición que excluye la celda del cofre de ser limpiada durante la actualización del tablero. 

 

2. Desafío: Comparación y Actualización de Récords 

Problema: Inicialmente, comparar y actualizar récords requería múltiples comprobaciones. 

Solución: Simplificamos la lógica utilizando un bloque if-else para manejar los escenarios de récord existente o inexistente. 

 

 

 

3. Desafío: Reinicio Automático del Juego 

Problema: Tras alcanzar el cofre, el tablero no se reiniciaba automáticamente. 

Solución: Se implementó un reinicio del juego usando location.reload() después de mostrar el mensaje de victoria y actualizar los récords. 

 

4. Desafío: Validación de Entrada del Nombre 

Problema: Los jugadores podían ingresar nombres inválidos (demasiado cortos o con números), lo que afectaba la experiencia de juego. 

Solución: Se creó una función validarNombre que controla la longitud mínima y prohíbe caracteres numéricos, mostrando mensajes claros en caso de error. 

 

Decisiones Técnicas 

Uso de JavaScript Puro 

localStorage: Permitió una solución simple y efectiva para persistir datos del récord. 

Reutilización de Código: Se organizaron las funciones de manera modular, permitiendo su fácil reutilización y comprensión. 

 

Características Implementadas: 

Validación de Inputs: Previene errores de entrada por parte del usuario. 

Tablero Dinámico: Se genera dinámicamente con posiciones iniciales del héroe y el cofre. 

Resaltado de Movimientos: Indica visualmente las opciones disponibles tras tirar el dado. 

 

Registro de Récords: Permite competir con uno mismo al guardar el menor número de tiradas en localStorage. 

Reinicio Automático: Reinicia el juego tras ganar, manteniendo el flujo de juego continuo. 

 

Futuras Mejoras: 

Dificultad Variable: Permitir al jugador seleccionar diferentes tamaños de tablero o agregar obstáculos para mayor desafío. 

Historial de Juegos: Implementar un registro completo de récords por usuario. 

Estética Mejorada: Incorporar animaciones y diseño responsive para una experiencia más atractiva. 

Soporte Multijugador Local: Permitir a dos jugadores competir por alcanzar el cofre primero. 

 

 

 

