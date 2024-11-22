/* FUNCIONALIDAD DEL RELOJ */
var actualizarReloj = () => {
  document.getElementById("reloj").textContent = new Date().toLocaleTimeString();
  setTimeout(actualizarReloj, 1000);
};
actualizarReloj();

/* ABRIR Y CERRAR MODAL DE AJUSTES */
function modalAjustes() {
  const modal = document.getElementById("modal-ajustes");

  if (modal.style.display === "flex") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
}

/* EVENTO PARA CAMBIAR EL TIPO DE COLOR */
window.addEventListener("DOMContentLoaded", () => {
  const switchElement = document.getElementById("switch");
  const filtro = document.getElementById("blancoYnegro");

  if (switchElement.checked) {
    filtro.style.display = "none"; // Modo claro
    document.getElementById("switch").setAttribute("aria-label", "Modo claro");
  } else {
    filtro.style.display = "block"; // Modo noche
    document.getElementById("switch").setAttribute("aria-label", "Modo noche");
  }

  // Evento para alternar entre modos
  switchElement.addEventListener("change", (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      filtro.style.display = "none"; // Modo claro
      document.getElementById("switch").setAttribute("aria-label", "Modo claro");
    } else {
      filtro.style.display = "block"; // Modo noche
      document.getElementById("switch").setAttribute("aria-label", "Modo noche");
    }
  });
});

// Crear el objeto de audio
const musicaFondo = new Audio("./audios/audio-principal.mp3");
musicaFondo.loop = true; // La música se repetirá
musicaFondo.volume = 0.5; // Volumen inicial

// Referencia al control de volumen en el HTML
const iconoVolumen = document.getElementById('icono-volumen');
const controlVolumen = document.getElementById('control-volumen');

// Estado del sonido
let musicaMuteada = false;

// Función para reproducir música
function reproducirMusica() {
    if (musicaFondo.paused) {
        musicaFondo.play();
    }
}

// Función para alternar entre silenciar y activar música
function alternarSonido() {
    if (musicaMuteada) {
        // Activar el sonido
        musicaFondo.muted = false;
        musicaMuteada = false;
        iconoVolumen.src = './assets/ajustes/volumen.png'; // Cambiar al icono de volumen activo
    } else {
        // Silenciar el sonido
        musicaFondo.muted = true;
        musicaMuteada = true;
        iconoVolumen.src = './assets/ajustes/mute.png'; // Cambiar al icono de silencio
    }
}

// Detectar clic en el control de volumen
controlVolumen.addEventListener('click', alternarSonido);

// Detectar interacción inicial del usuario para iniciar la música
function iniciarMusicaAlInteraccion() {
    document.addEventListener('click', reproducirMusica, { once: true });
    document.addEventListener('scroll', reproducirMusica, { once: true });
    document.addEventListener('keydown', reproducirMusica, { once: true });
}

// Llamar a la función para habilitar las interacciones iniciales
iniciarMusicaAlInteraccion();

// Función para reproducir el sonido de la palanca
function sonidoPalanca() {
  const audioPalanca = new Audio("./audios/sonido-palanca.mp3");
  audioPalanca.volume = 0.7; // Ajustar el volumen, 70% en este caso
  audioPalanca.play();
}

function sonidoPremio(){
  const audioPalanca = new Audio("./audios/sonido-premio.mp3");
  audioPalanca.volume = 0.7; // Ajustar el volumen, 70% en este caso
  audioPalanca.play();
}

/* GESTIÓN DEL SALDO */
var saldo = 0;
var fichas = 0;

// Función para mostrar un modal
function mostrarModal(modal) {
    modal.style.display = "flex";
}

// Función para cerrar un modal
function cerrarModal(modal) {
    modal.style.display = "none";
}

// Mostrar modales
document.getElementById("boton-ingresar-dinero").addEventListener("click", function () {
    mostrarModal(document.getElementById("modal-meter-dinero"));
});

document.getElementById("boton-retirar-dinero").addEventListener("click", function () {
    mostrarModal(document.getElementById("modal-retirar-dinero"));
});

document.getElementById("boton-convertir-a-fichas").addEventListener("click", function () {
    mostrarModal(document.getElementById("modal-conversion-fichas"));
});

document.getElementById("boton-convertir-a-dinero").addEventListener("click", function () {
    mostrarModal(document.getElementById("modal-conversion-saldo"));
});

// Cerrar los modales
document.getElementById("boton-cerrar-meter-dinero-modal").addEventListener("click", function () {
    cerrarModal(document.getElementById("modal-meter-dinero"));
});

document.getElementById("boton-cerrar-retirar-dinero-modal").addEventListener("click", function () {
    cerrarModal(document.getElementById("modal-retirar-dinero"));
});

document.getElementById("boton-cerrar-conversion-fichas").addEventListener("click", function () {
    cerrarModal(document.getElementById("modal-conversion-fichas"));
});

document.getElementById("boton-cerrar-conversion-saldo").addEventListener("click", function () {
    cerrarModal(document.getElementById("modal-conversion-saldo"));
});

// Ingresar dinero
document.getElementById("boton-meter-dinero-modal").addEventListener("click", function () {
    const cantidadDinero = parseFloat(document.getElementById("input-introducir-dinero").value);
    if (cantidadDinero <= 0 || isNaN(cantidadDinero)) {
        document.getElementById("comprobacion-meter-dinero").textContent = "Por favor, ingresa una cantidad válida.";
        document.getElementById("comprobacion-meter-dinero").style.color = "red";
        setTimeout(() => {
            document.getElementById("comprobacion-meter-dinero").textContent = "";
        }, 1500);
    } else {
        saldo += cantidadDinero;
        actualizarSaldo();
        cerrarModal(document.getElementById("modal-meter-dinero"));
    }
});

// Retirar dinero
document.getElementById("boton-retirar-dinero-modal").addEventListener("click", function () {
    const cantidadDinero = parseFloat(document.getElementById("input-retirar-dinero").value);
    if (cantidadDinero <= 0 || isNaN(cantidadDinero)) {
        document.getElementById("comprobacion-retirar-dinero").textContent = "Por favor, ingresa una cantidad válida.";
        document.getElementById("comprobacion-retirar-dinero").style.color = "red";
        setTimeout(() => {
            document.getElementById("comprobacion-retirar-dinero").textContent = "";
        }, 1500);
    } else if (cantidadDinero > saldo) {
        document.getElementById("comprobacion-retirar-dinero").textContent = "No tienes suficiente saldo.";
        document.getElementById("comprobacion-retirar-dinero").style.color = "red";
        setTimeout(() => {
            document.getElementById("comprobacion-retirar-dinero").textContent = "";
        }, 1500);
    } else {
        saldo -= cantidadDinero;
        actualizarSaldo();
        cerrarModal(document.getElementById("modal-retirar-dinero"));
    }
});

// Convertir saldo a fichas
document.getElementById("boton-convertir-fichas").addEventListener("click", function () {
    const cantidadEuros = parseFloat(document.getElementById("input-cantidad-conversion-fichas").value);
    
    if (cantidadEuros <= 0 || isNaN(cantidadEuros)) {
        document.getElementById("comprobacion-convertir-a-fichas").textContent = "Por favor, ingresa una cantidad válida.";
        document.getElementById("comprobacion-convertir-a-fichas").style.color = "red";
        setTimeout(() => {
            document.getElementById("comprobacion-convertir-a-fichas").textContent = "";
        }, 1500);
    } else if (cantidadEuros > saldo) {
        document.getElementById("comprobacion-convertir-a-fichas").textContent = "No tienes suficiente saldo.";
        document.getElementById("comprobacion-convertir-a-fichas").style.color = "red";
        setTimeout(() => {
            document.getElementById("comprobacion-convertir-a-fichas").textContent = "";
        }, 1500);
    } else {
        const cantidadFichas = cantidadEuros * 100;
        saldo -= cantidadEuros;
        fichas += cantidadFichas;
        actualizarSaldo();
        cerrarModal(document.getElementById("modal-conversion-fichas"));
    }
});

// Convertir fichas a saldo
document.getElementById("boton-convertir-saldo").addEventListener("click", function () {
    const cantidadFichas = parseInt(document.getElementById("input-cantidad-conversion-saldo").value);
    
    if (cantidadFichas <= 0 || isNaN(cantidadFichas)) {
        document.getElementById("comprobacion-convertir-a-dinero").textContent = "Por favor, ingresa una cantidad válida.";
        document.getElementById("comprobacion-convertir-a-dinero").style.color = "red";
        setTimeout(() => {
            document.getElementById("comprobacion-convertir-a-dinero").textContent = "";
        }, 1500);
    } else if (cantidadFichas > fichas) {
        document.getElementById("comprobacion-convertir-a-dinero").textContent = "No tienes suficientes fichas.";
        document.getElementById("comprobacion-convertir-a-dinero").style.color = "red";
        setTimeout(() => {
            document.getElementById("comprobacion-convertir-a-dinero").textContent = "";
        }, 1500);
    } else {
        const cantidadEuros = cantidadFichas / 100;
        fichas -= cantidadFichas;
        saldo += cantidadEuros;
        actualizarSaldo();
        cerrarModal(document.getElementById("modal-conversion-saldo"));
    }
});

// Actualizar el saldo y las fichas
function actualizarSaldo() {
    document.getElementById("dinero-actual").textContent = "DINERO: " + saldo + "€";
    document.getElementById("fichas-actuales").textContent = "FICHAS: " + fichas + "🎫";
}

// Funcionalidad tragaperras
var cavernicola = "./assets/tragaperras/cavernicola.png";
var fuego = "./assets/tragaperras/fuego.png";
var pollo = "./assets/tragaperras/pollo.png";
var mamut = "./assets/tragaperras/mamut.png";
var grupoCavernicolas = "./assets/tragaperras/grupoCavernicolas.png";

var premios = {
  cavernicola: 100,
  fuego: 200,
  pollo: 300,
  mamut: 500,
  grupoCavernicolas: 1000
};

var simbolos = [cavernicola, fuego, pollo, mamut, grupoCavernicolas];

// Evento para el clic en la palanca
document.getElementById("palanca").addEventListener("click", () => {
  if (fichas >= 25 && !estaGirando()) { 
    sonidoPalanca();
    cambiarPalanca();
    girar();
    fichas -= 25;
    actualizarSaldo();
  } else if (fichas < 25) {
    mostrarMensajePremio("¡No tienes suficientes fichas para jugar!");
  }
});

// Evento para el clic en la tecla espacio
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevenir que otras acciones por defecto se disparen (como scroll, etc.)

    if (fichas >= 25 && !estaGirando()) {
      sonidoPalanca();
      cambiarPalanca();
      girar();
      fichas -= 25;  
      actualizarSaldo();
    } else if (fichas < 25) {
      mostrarMensajePremio("¡No tienes suficientes fichas para jugar!");
    }
  }
});

// Función para cambiar la imagen de la palanca
function cambiarPalanca(){
  document.getElementById("palanca").src = "./assets/tragaperras/palanca_abajo.png";
  setTimeout(() => {
    document.getElementById("palanca").src = "./assets/tragaperras/palanca_arriba.png";
  }, 200);
}

// Función para obtener una imagen aleatoria de los símbolos
function obtenerImagenAleatoria() {
  var simboloAleatorio = Math.floor(Math.random() * simbolos.length);
  return simbolos[simboloAleatorio];
}

// Función para simular el giro
function girar() {
  var carril1 = document.getElementById("carril1");
  var carril2 = document.getElementById("carril2");
  var carril3 = document.getElementById("carril3");

  // Bloquear la interacción mientras gira
  bloquearInteraccion(true);

  function actualizarCarril(carril) {
    const imagenes = carril.querySelectorAll('img');
    imagenes.forEach(img => {
      img.src = obtenerImagenAleatoria();
    });
  }

  function girarCarril(carril, duracion) {
    var intervalo = setInterval(() => {
      actualizarCarril(carril);
    }, 50); // Cambiar imagen cada 50ms

    // Detener el giro
    setTimeout(() => {
      clearInterval(intervalo);
      actualizarCarril(carril);
    }, duracion); // Detener después de la duración específica
  }

  girarCarril(carril1, 2000);
  girarCarril(carril2, 3000);
  girarCarril(carril3, 4000);

  // Esperar a que termine el giro para comprobar el premio
  setTimeout(() => {
    comprobarPremio();
    bloquearInteraccion(false);
  }, 4500); // Después de 4 segundos, que es el tiempo del giro más largo
}

// Función para comprobar el premio
function comprobarPremio() {
  // Obtener las imágenes de cada carril
  var carril1 = document.getElementById("carril1");
  var carril2 = document.getElementById("carril2");
  var carril3 = document.getElementById("carril3");

  var imagenCarril1 = Array.from(carril1.querySelectorAll('img')).map(img => img.src);
  var imagenCarril2 = Array.from(carril2.querySelectorAll('img')).map(img => img.src);
  var imagenCarril3 = Array.from(carril3.querySelectorAll('img')).map(img => img.src);

  // Comprobación de todas las imágenes iguales (premio x5)
  if (imagenCarril1.every(src => src === imagenCarril1[0]) &&
      imagenCarril2.every(src => src === imagenCarril2[0]) &&
      imagenCarril3.every(src => src === imagenCarril3[0])) {
    var simbolo = imagenCarril1[0].split("/").pop().split(".")[0];
    var premio = premios[simbolo] * 5;

    fichas += premio;
    actualizarSaldo();

    // Aplicar efecto a todas las imágenes
    const imagenesPremiadas = [
      ...carril1.querySelectorAll('img'),
      ...carril2.querySelectorAll('img'),
      ...carril3.querySelectorAll('img')
    ];
    imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
    }, 3000);

    mostrarMensajePremio(`PREMIO JACKPOT ¡Has ganado ${premio}€ y ${premio} fichas!`);
    sonidoPremio();
    return;
  }

  // Comprobación de premio medio del carril 1 y 3, y superior/inferior del carril del medio (premio x2)
  if (imagenCarril2[0] === imagenCarril2[2] &&
      imagenCarril1[1] === imagenCarril2[0] &&
      imagenCarril3[1] === imagenCarril2[0]) {
    var simbolo = imagenCarril2[0].split("/").pop().split(".")[0];
    var premio = premios[simbolo] * 2;

    fichas += premio;
    actualizarSaldo();

    // Aplicar efecto de parpadeo a las imágenes premiadas
    const imagenesPremiadas = [
      carril2.children[0],
      carril2.children[2],
      carril1.children[1],
      carril3.children[1],
    ];
    imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
    }, 3000);

    mostrarMensajePremio(`¡Has ganado ${premio} fichas!`);
    sonidoPremio();
    return;
  }

  // Comprobación de imágenes específicas en posiciones de los carriles (premio x3)
  if (imagenCarril1[1] === imagenCarril2[0] &&
      imagenCarril1[1] === imagenCarril2[2] &&
      imagenCarril3[1] === imagenCarril2[0] &&
      imagenCarril3[1] === imagenCarril2[2]) {
    var simbolo = imagenCarril2[0].split("/").pop().split(".")[0];
    var premio = premios[simbolo] * 3;

    fichas += premio;
    actualizarSaldo();

    // Aplicar efecto de parpadeo a las imágenes premiadas
    const imagenesPremiadas = [
      carril1.children[1],
      carril3.children[1],
      carril2.children[0],
      carril2.children[2],
    ];
    imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
    }, 3000);

    mostrarMensajePremio(`PREMIO ESQUINAS ¡Has ganado ${premio} fichas!`);
    sonidoPremio();
    return;
  }

  // Comprobación de si las imágenes del centro son iguales (premio normal)
  var imagenCentroCarril1 = carril1.children[1].src;
  var imagenCentroCarril2 = carril2.children[1].src;
  var imagenCentroCarril3 = carril3.children[1].src;

  if (imagenCentroCarril1 === imagenCentroCarril2 && imagenCentroCarril1 === imagenCentroCarril3) {
    var simbolo = imagenCentroCarril1.split("/").pop().split(".")[0];
    var premio = premios[simbolo];

    fichas += premio;
    actualizarSaldo();

    // Aplicar efecto de parpadeo a las imágenes premiadas
    const imagenesPremiadas = [
      carril1.children[1],
      carril2.children[1],
      carril3.children[1],
    ];
    imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
    }, 3000);

    mostrarMensajePremio(`¡PREMIO NORMAL Has ganado ${premio} fichas!`);
    sonidoPremio();
    return;
  }

  mostrarMensajePremio("¡Intenta de nuevo!");
}

// Función para mostrar el mensaje de premio
function mostrarMensajePremio(mensaje) {
  var mensajeElemento = document.getElementById("mensajePremio");
  mensajeElemento.textContent = mensaje;

  setTimeout(() => {
    mensajeElemento.textContent = "";
  }, 3000); 
}

// Función para bloquear o desbloquear la interacción (palanca o tecla espacio)
function bloquearInteraccion(bloquear) {
  const palanca = document.getElementById("palanca");

  if (bloquear) {
    palanca.disabled = true;
  } else {
    palanca.disabled = false;
  }
}

function estaGirando() {
  const palanca = document.getElementById("palanca");
  return palanca.disabled;
}