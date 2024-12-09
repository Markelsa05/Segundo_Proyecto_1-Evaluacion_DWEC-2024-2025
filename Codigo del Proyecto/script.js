"use strict"; //Activa el modo estricto de JavaScript para evitar errores comunes y mejorar la calidad del codigo.

// Espera a que todo el contenido del documento esté cargado antes de ejecutar el script.
document.addEventListener("DOMContentLoaded", () => { 
    console.log('Script cargado correctamente');
    // Obtencion de Elementos del DOM mediante su id
    let nombreInput = document.getElementById("nombreJugador");
    let submitButton = document.getElementById("enviar");
    let mensaje = document.getElementById("mensaje");
    let mensajeDelHeroe = document.getElementById("mensajeDelHeroe");
    let botonJugar = document.getElementById("botonJugar");
    let tableroContainer = document.getElementById("tablero"); // Contenedor para el tablero

    // Creacion dinamica de boton para tirar dado y la imagen del dado
    let botonTirarDado = document.createElement("button"); 
    let dadoImagen = document.createElement("img");

    // Guarda la posición inicial del heroe (esquina superior izquierda), creando un objeto llamado posicionHeroe
    let posicionHeroe = { fila: 0, columna: 0 }; 
    // Guarda la posición fija del cofre (esquina inferior derecha). creando un objeto llamado posicionCofre
    let posicionCofre = { fila: 9, columna: 9 }; 
    let numeroTiradas = 0; // Numero de veces que se tira el dado por partida


    // Recuperamos el record desde localstorage
    // Se verifica si hay un récord almacenado en localStorage. 
    // Si existe, lo convierte en un número, si no, lo establece como null.
    let recordTiradas;

    if (localStorage.getItem("recordTiradas")) 
    {
      recordTiradas = parseInt(localStorage.getItem("recordTiradas"));
      console.log('Record recogido correctamente')
    } 
    else 
    {
      recordTiradas = null;
      console.log(`${recordTiradas}`);
    }

    // Cuando el jugador hace clic en "Enviar", valida el nombre con la funcion validarNombre(). 
    // Si la funcion validarNombre devuelve , habilita el botón "Jugar".
    submitButton.addEventListener("click", iniciarJuego);
    function iniciarJuego() 
    {
      console.log('Entrada en la funcion iniciar juego');
      if (validarNombre() === true) 
      {
          botonJugar.classList.remove("hidden");
      }   
      
    }

    // Funcion para la validacion del nombre antes de iniciar el juego
    function validarNombre () 
    {
      console.log('Entrada en la funcion validarNombre');
        // Quita espacios del nombre y reinicia los mensajes anteriores
        let nombreJugador = nombreInput.value.trim(); 
        mensaje.textContent = ""; 
        mensaje.classList.remove("success", "error");

        // Valida que el nombre tenga al menos 4 letras y no incluya números
        if (nombreJugador.length < 4) 
            {
                mensaje.textContent = "El nombre debe tener 4 o más letras";
                mensaje.classList.add("error");
                console.log('El nombre debe tener 4 o mas letras');
                return false;
            }

        if (/\d/.test(nombreJugador)) // Verificar si hay números
            { 
                mensaje.textContent = "Números no permitidos";
                mensaje.classList.add("error");
                console.log('El nombre no puede contener numeros');
                return false;
            }

        // Si el nombre es válido, Muestra un mensaje de bienvenida al juego para el usuario. 
        mensajeDelHeroe.textContent = `A luchar heroe: ${nombreJugador}`;
        console.log(`Nombre del jugador: ${nombreJugador}`);
        mensajeDelHeroe.classList.remove("hidden");
        mensajeDelHeroe.classList.add("success");

        mensaje.classList.remove("error");
        mensaje.textContent = ""; 

        // Deshabilita el campo de nombre y el botón para evitar cambios posteriores.
        nombreInput.disabled = true;
        submitButton.disabled = true;
        return true;
    }

  // Cuando se hace clic en  el boton jugar, se oculta el botón y se genera la cuadrícula 10x10.
  botonJugar.addEventListener("click", generarTablero);
  function generarTablero()
  {
    console.log('Entrando en la funcion generar tablero');
    botonJugar.classList.add("hidden");
    
    // Se generan 10 filas y 10 columnas, creando cada celda con la clase suelo.
    let tabla = document.createElement("table");
    tabla.classList.add("tablero");

    for (let fila = 0; fila < 10; fila++) {
      let filaElemento = document.createElement("tr");
      for (let columna = 0; columna < 10; columna++) {
        let celda = document.createElement("td");
        celda.classList.add("suelo");

        // Posicionamos el heroe y el cofre en sus respectivas posiciones iniciales.
        if (fila === 0 && columna === 0) {
          celda.classList.add("heroe");
          celda.innerHTML = '<img src="./img/heroe.png" alt="Heroe"/>';
          console.log('Imagen del heroe colocada correctamente');
        } else if (fila === 9 && columna === 9) {
          celda.classList.add("cofre");
          celda.innerHTML = '<img src="./img/cofre.png" alt="Cofre"/>';
          console.log('Imagen del cofre colocada correctamente');
        }

        // dataset es un objeto especial que permite agregar y manipular 
        // atributos personalizados de tipo data en elementos HTML.
        // Por lo que en el html quedaria algo asi <td data-fila="2" data-columna="3"></td> en caso de que
        // fila = 2 y columna = 3, esto hace que se asignen las coordenadas a las celdas y sean mas faciles de acceder.
        celda.dataset.fila = fila;
        celda.dataset.columna = columna;

        filaElemento.appendChild(celda);
      }
      tabla.appendChild(filaElemento);
    }

    // Agregar la tabla al contenedor
    tableroContainer.appendChild(tabla);

    // Configurar botón "Tirar dado"
    botonTirarDado.textContent = "Tirar dado";
    botonTirarDado.classList.add("botonDado");
    tableroContainer.appendChild(botonTirarDado);

    // Imagen del dado
    dadoImagen.src = "./img/dado1.png";
    dadoImagen.alt = "Dado";
    dadoImagen.classList.add("dadoImagen");
    tableroContainer.appendChild(dadoImagen);
    
  }

  // Al hacer click en tirar dado llama a la funcion tirarDado() y realiza lo siguiente:
  botonTirarDado.addEventListener("click",tirarDado)
  function tirarDado() 
  {
    console.log('Entrando en la funcion tirarDado');
    // Aumenta el contador de tiradas.
    numeroTiradas++;
    console.log(`Numero de tirada: ${numeroTiradas}`);
    // Generar número aleatorio entre 1 y 6
    let numeroDado = Math.floor(Math.random() * 6) + 1;
    console.log(`Numero del dado: ${numeroDado}`);
    // Cambia la imagen del dado dependiendo del numero aleatorio que genere
    dadoImagen.src = `./img/dado${numeroDado}.png`;
    // Resalta las celdas a las que el heroe puede moverse dependiendo del numero que se haya generado de manera aleatoria.
    resaltarCeldas(numeroDado);
  }

  // La funcion resaltarCeldas tiene como parametro pasos que es el numero que ha sacado el jugador al tirar el dado.
  function resaltarCeldas(pasos) {
    console.log('Entrada en la funcion resaltarCeldas');
    let tabla = document.querySelector(".tablero");
    let celdas = tabla.querySelectorAll("td");

    // Limpiamos el resaltado de todas las celdas una vez terminado el movimiento del heroe a otra celda,
    // recorriendo todas las celda con foreach
    celdas.forEach((celda) => celda.classList.remove("resaltado"));

    //Extrae las coordenadas actuales de la fila y columna del heroe
    let { fila, columna } = posicionHeroe; 

    // Este array almacena todas las posiciones válidas a las que el heroe puede moverse en esta tirada.
    let posiblesMovimientos = [];
    // Cada pasada por el bucle calcula las posiciones válidas en las 4 direcciones arriba, abajo, izquierda, derecha.
    // Se hacen comprobaciones en cada condicional para asegurarse que ningun movimiento se salga del tablero.
    // Se itera el bucle cuantas veces como pasos que puedas dar, esto es dado por el numero del dado que salga en la tirada
    for (let i = 1; i <= pasos; i++) 
    {
        // Calcula la posición hacia abajo y la agrega a posiblesMovimientos si está dentro de los límites del tablero.
        if (fila + i < 10) posiblesMovimientos.push({ fila: fila + i, columna });
        // Calcula la posición hacia arriba y la agrega a posiblesMovimientos si está dentro de los límites del tablero.
        if (fila - i >= 0) posiblesMovimientos.push({ fila: fila - i, columna });
        // Calcula la posición hacia la derecha y la agrega a posiblesMovimientos si está dentro de los límites del tablero.
        if (columna + i < 10) posiblesMovimientos.push({ fila: fila, columna: columna + i });
        // Calcula la posición hacia la izquierda y la agrega a posiblesMovimientos si está dentro de los límites del tablero.
        if (columna - i >= 0) posiblesMovimientos.push({ fila: fila, columna: columna - i });
    }

    // Pasa sobre cada posición válida almacenada en posiblesMovimientos
    // En mov representa cada posicion posible con fila y columna
    posiblesMovimientos.forEach((mov) => {
        console.log('Funcion que Itera por cada posicion valida')
        // Busca la celda específica en el tablero usando sus atributos data-fila y data-columna.
        let celda = tabla.querySelector(
          `td[data-fila='${mov.fila}'][data-columna='${mov.columna}']`
        );
        // Verifica si la celda existe.
        if (celda) 
        {
          // Agrega la clase resaltado a la celda.
          celda.classList.add("resaltado");
          // Agrega un evento click a la celda resaltada que ejecuta la función moverHeroe que
          // permite que el jugador haga clic en esta celda para mover al héroe a esa posición.
          celda.addEventListener("click", moverHeroe);
        }
      });
    }

    
    function moverHeroe(ev) 
    {
      console.log('Entrando en la funcion moverHeroe');
        // Obtiene la nueva celda seleccionada por el jugador.
        let nuevaCelda = ev.target.closest("td");
        let tabla = document.querySelector(".tablero");
        let celdas = tabla.querySelectorAll("td");
    
        // Limpiar posición anterior en la que estaba el heroe antes de cambiar de celda, sin afectar al cofre
        celdas.forEach((celda) => {
            if (!celda.classList.contains("cofre")) 
            {
              celda.classList.remove("heroe");
            }
            if (!celda.classList.contains("cofre"))
            {
                celda.innerHTML = "";
            }
          });
    
        // Actualizar la posición del heroe
        let nuevaFila = parseInt(nuevaCelda.dataset.fila);
        let nuevaColumna = parseInt(nuevaCelda.dataset.columna);
        // Se cambian los valores del objeto posicion heroe por la nuevaFila y la nuevaColumna donde se encontrara el heroe
        posicionHeroe = { fila: nuevaFila, columna: nuevaColumna }; 
    
        // Colocar al heroe en la nueva celda
        nuevaCelda.classList.add("heroe");
        nuevaCelda.innerHTML = '<img src="./img/heroe.png" alt="Heroe"/>';
        
        // Si el heroe alcanza el cofre verifica la victoria.
        if (nuevaFila === posicionCofre.fila && nuevaColumna === posicionCofre.columna) 
        {
            verificarVictoria();
        }

        // Limpiamos el resaltado de todas las celdas una vez terminado el movimiento del heroe a otra celda,
        // recorriendo todas las celda con foreach
        celdas.forEach((celda) => celda.classList.remove("resaltado"));
      }

  // Verificar victoria y gestionar récord
  function verificarVictoria() 
  {
    console.log('Entrando en la funcion verificarVictoria');
    alert(`¡Victoria! Has alcanzado el cofre en ${numeroTiradas} tiradas.`);
    
    // Actualiza localStorage si el jugador supera el récord.
    if (recordTiradas === null || numeroTiradas < recordTiradas) 
    {
      localStorage.setItem("recordTiradas", numeroTiradas);
      alert(`¡Nuevo récord! Has establecido un nuevo récord con ${numeroTiradas} tiradas.`);
    } 
    else if (recordTiradas === null || numeroTiradas == recordTiradas)
    {
      alert(`Récord igualado. El record actual es de ${recordTiradas} tiradas.`);
    }
    else
    {
      alert(`Récord no superado. El record actual es de ${recordTiradas} tiradas.`);
    }

    // Cuado termina la partida, se reiniciar el juego de manera que el usuario tiene que iniciar una nueva partida
    // y volver a introducir su nombre. Esto se hace con location.reload() que recarga completamente la pagina
    // en la que se esta ejecutando el codigo, como si el usuario que esta jugando hubiese presionado F5 al final.
    location.reload();
  }
});
