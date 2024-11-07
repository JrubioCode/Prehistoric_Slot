// FUNCIONALIDADES HEADER

// Gestión del saldo
var saldo = 0;

const ingresar = document.getElementById("ingresar");
const retirar = document.getElementById("retirar");
const botonMonedas = document.getElementById("botonMonedas");
const mostrarSaldo = document.getElementById("saldo");

function actualizarSaldo() {
  mostrarSaldo.textContent = "SALDO ACTUAL: ".concat(saldo);
}

botonMonedas.addEventListener("click", function () {
  const puntosIngresar = parseInt(ingresar.value) || 0;
  const puntosRetirar = parseInt(retirar.value) || 0;

  if (puntosIngresar > 0 && puntosRetirar === 0) {
    saldo += puntosIngresar;
  } else if (puntosRetirar > 0 && puntosIngresar === 0) {
    saldo -= puntosRetirar;
  } else {
    window.alert("Por favor, llena solo un campo para añadir o retirar puntos.");
  }

  ingresar.value = "";
  retirar.value = "";

  actualizarSaldo();
});

// Reloj
function actualizarReloj() {
  const ahora = new Date();
  const reloj = ahora.toLocaleTimeString();
  document.getElementById("reloj").textContent = reloj;
}
setInterval(actualizarReloj, 1000);
actualizarReloj();

// Modal ajustes
function modalAjustes() {
  const modal = document.getElementById("modal-ajustes");
  if (modal.style.display === "none" || modal.style.display === "") {
    modal.style.display = "flex";
    document.addEventListener("click", cerrarModal);
  } else {
    modal.style.display = "none";
    document.removeEventListener("click", cerrarModal);
  }
}

// Cerrar modal
function cerrarModal(event) {
  const modal = document.getElementById("modal-ajustes");
  const iconoAjustes = document.querySelector(".icono-ajustes");

  if (!modal.contains(event.target) && event.target !== iconoAjustes) {
    modal.style.display = "none";
    document.removeEventListener("click", cerrarModal);
  }
}

// Audio general
var audio = new Audio("./audios/audio-principal.mp3");
audio.loop = true;

var sonando = false;
var volumenImg = document.getElementById("volumen");

volumenImg.addEventListener("click", function() {
  if (!sonando) {
    audio.play();
    sonando = true;
  } else {
    if (audio.volume > 0) {
      audio.volume = 0;
      volumenImg.src="./assets/ajustes/sin-volumen.png";
    } else {
      audio.volume = 1;
      volumenImg.src="./assets/ajustes/volumen.png";
    }
  }
});

// Símbolos y premios tragaperras
const simbolos = [
  "./assets/tragaperras/cavernicola.png",
  "./assets/tragaperras/fuego.png",
  "./assets/tragaperras/pollo.png",
  "./assets/tragaperras/mamut.png",
  "./assets/tragaperras/grupoCavernicolas.png",
];

const premios = {
  "./assets/tragaperras/cavernicola.png": 100,
  "./assets/tragaperras/fuego.png": 200,
  "./assets/tragaperras/pollo.png": 300,
  "./assets/tragaperras/mamut.png": 500,
  "./assets/tragaperras/grupoCavernicolas.png": 1000,
};

// Variables para almacenar el símbolo final de cada carril
let simboloCarril1 = null;
let simboloCarril2 = null;
let simboloCarril3 = null;

// Evento al pulsar espacio
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    cambiarPalanca();
    iniciarGiro();
  }
});

// Palanca
var palanca = document.getElementById("palanca");
palanca.addEventListener("click", function () {
  cambiarPalanca();
  iniciarGiro();
});

function cambiarPalanca() {
  palanca.src = "./assets/tragaperras/palanca_abajo.png";

  var intervalo = setInterval(function () {
    palanca.src = "./assets/tragaperras/palanca_arriba.png";
    clearInterval(intervalo);
  }, 200);
}

// Iniciar el giro de los carriles
function iniciarGiro() {
  simboloCarril1 = simboloCarril2 = simboloCarril3 = null; // Reinicia los símbolos
  giroCarriles("carril1", 2000, (simbolo) => simboloCarril1 = simbolo);
  giroCarriles("carril2", 3000, (simbolo) => simboloCarril2 = simbolo);
  giroCarriles("carril3", 4000, (simbolo) => { simboloCarril3 = simbolo;
    verificarPremio(); // Llama a la verificación después del último carril
  });
}

// Función para girar cada carril
function giroCarriles(carrilId, duracion, callback) {
  const carril = document.getElementById(carrilId);
  let tiempoInicio = null;

  function animarGiro(timestamp) {
    if (!tiempoInicio) tiempoInicio = timestamp;
    const progreso = timestamp - tiempoInicio;

    const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
    const imagen = document.createElement("img");
    imagen.src = simboloAleatorio;
    imagen.classList.add("simbolo_Imagen");
    
    carril.appendChild(imagen);

    // Si hay más de 10 elementos, elimina el primer hijo para mantener el tamaño constante
    if (carril.childNodes.length > 10) {
      carril.removeChild(carril.firstChild);
    }

    // Continua la animación mientras no se haya alcanzado la duración
    if (progreso < duracion) {
      requestAnimationFrame(animarGiro);
    } else {
      detenerGiro(carril, simboloAleatorio, callback); // Pasa el símbolo final y la función callback
    }
  }

  requestAnimationFrame(animarGiro);
}

// Función para detener el giro y mostrar el símbolo final
function detenerGiro(carril, simboloFinal, callback) {
  carril.innerHTML = `<img src="${simboloFinal}" alt="símbolo" class="simbolo_Imagen">`;
  callback(simboloFinal); // Llama al callback con el símbolo final
}

// Función para verificar si hay tres símbolos iguales
function verificarPremio() {

  setTimeout(() => {
    if (simboloCarril1 && simboloCarril1 === simboloCarril2 && simboloCarril2 === simboloCarril3) {
      const premio = premios[simboloCarril1] || 0;
      saldo += premio;
      actualizarSaldo();
      alert(`¡Felicidades! Has ganado ${premio} puntos.`);
    } else {
      alert("No hubo premio esta vez. ¡Intenta de nuevo!");
    }
  }, 500);
}

// Blanco y negro
document.getElementById("blanco-negro").addEventListener("click", function(){
  
  // Cambiar de fondo
  document.body.style.backgroundImage= "url('./assets/fondo-blanco-negro.png')";
  
  // Cambiar el fondo de todas las imágenes
  document.querySelectorAll("img").forEach((element) => {
    element.style.backgroundColor = "grey";
  });

  // Cambiar el fondo de todos los inputs
  document.querySelectorAll("input").forEach((element) => {
    element.style.backgroundColor = "grey";
  });
});