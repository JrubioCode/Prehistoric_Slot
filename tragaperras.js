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

// Musica de fondo
window.onload = () => {
  const audio = document.getElementById('musicaFondo');
  const controlVolumen = document.getElementById('control-volumen');
  const modalAjustes = document.getElementById('modal-ajustes');
  var haIniciado = false;

  // Función para iniciar la música al interactuar
  function iniciarMusica() {
      if (!haIniciado) {
          audio.volume = parseFloat(controlVolumen.value);
          audio.play().then(() => {
              console.log("Música iniciada tras la interacción");
          }).catch(error => {
              console.log("No se pudo reproducir el audio:", error);
          });
          haIniciado = true;
      }
  }

  // Escuchar eventos de interacción del usuario
  document.addEventListener('click', iniciarMusica);
  document.addEventListener('scroll', iniciarMusica);
  document.addEventListener('keydown', iniciarMusica);
  document.addEventListener('touchstart', iniciarMusica);

  // Ajustar el volumen del audio
  controlVolumen.addEventListener('input', (event) => {
      audio.volume = parseFloat(event.target.value);
  });

  // Iniciar música si se abre el modal de ajustes
  modalAjustes.addEventListener('click', iniciarMusica);
};

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
var simboloCarril1 = null;
var simboloCarril2 = null;
var simboloCarril3 = null;

function sonidoPalanca(){
    // Obtener el elemento de audio de la palanca
    const sonidoPalanca = document.getElementById("sonidoPalanca");

    // Obtener el control de volumen de la palanca
    const controlVolumenPalanca = document.getElementById("control-volumen-palanca");
  
    // Ajustar el volumen según el control
    sonidoPalanca.volume = parseFloat(controlVolumenPalanca.value);
  
    // Reproducir el sonido cuando se hace clic en la palanca
    sonidoPalanca.play();
}

// Giro y movimiento de palanca al pulsar el espacio
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    sonidoPalanca();
    cambiarPalanca();
    iniciarGiro();
  }
});

// Giro y movimiento de palanca al pulsar en la palanca
document.getElementById("palanca").addEventListener("click", function () {
  sonidoPalanca();
  cambiarPalanca();
  iniciarGiro();
});

// Cambiar de posicion la palanca
function cambiarPalanca() {
  palanca.src = "./assets/tragaperras/palanca_abajo.png";

  var intervalo = setInterval(function () {
    palanca.src = "./assets/tragaperras/palanca_arriba.png";
    clearInterval(intervalo);
  }, 200);
}

// Giro de la tragaperras
function iniciarGiro() {
  simboloCarril1 = simboloCarril2 = simboloCarril3 = null;
    giroCarriles("carril1", 2000, (simbolo) => simboloCarril1 = simbolo);
    giroCarriles("carril2", 3000, (simbolo) => simboloCarril2 = simbolo);
    giroCarriles("carril3", 4000, (simbolo) => { simboloCarril3 = simbolo;
    verificarPremio();
  });
}

// Función para girar cada carril
function giroCarriles(carrilId, duracion, callback) {
  const carril = document.getElementById(carrilId);
  let tiempoInicio = null;

  function animarGiro(timestamp) {
    if (!tiempoInicio) tiempoInicio = timestamp;
    const progreso = timestamp - tiempoInicio;

    // Crear símbolo aleatorio
    const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
    const imagen = document.createElement("img");
    imagen.src = simboloAleatorio;
    imagen.classList.add("simbolo_Imagen");

    // Añadir la imagen al inicio del carril (para efecto de movimiento hacia abajo)
    carril.prepend(imagen);

    // Controlar el límite de elementos en el carril
    if (carril.childNodes.length > 3) {
      carril.removeChild(carril.lastChild); // Eliminamos el último hijo para mantener tamaño fijo
    }

    // Continuar la animación mientras no se haya alcanzado la duración
    if (progreso < duracion) {
      requestAnimationFrame(animarGiro);
    } else {
      detenerGiro(carril, simboloAleatorio, callback); // Detener giro y devolver símbolo final
    }
  }

  requestAnimationFrame(animarGiro);
}

// Función para detener el giro y mostrar el símbolo final
function detenerGiro(carril, simboloFinal, callback) {
  // Limpiamos el carril y mostramos solo el símbolo final
  carril.innerHTML = `<img src="${simboloFinal}" alt="símbolo" class="simbolo_Imagen">`;
  callback(simboloFinal);
}

function sonidoPremio(){
  // Obtener el elemento de audio de la palanca
  const sonidoPremio = document.getElementById("sonidoPremio");

  // Obtener el control de volumen de la palanca
  const controlVolumenPremio = document.getElementById("control-volumen-premio");

  // Ajustar el volumen según el control
  sonidoPremio.volume = parseFloat(controlVolumenPremio.value);

  // Reproducir el sonido cuando se hace clic en la palanca
  sonidoPremio.play();
}

// Función para verificar si hay tres símbolos iguales
function verificarPremio() {
  setTimeout(() => {
    if (simboloCarril1 && simboloCarril1 === simboloCarril2 && simboloCarril2 === simboloCarril3) {
      const premio = premios[simboloCarril1] || 0;
      saldo += premio;
      sonidoPremio();
      actualizarSaldo();
      document.getElementById("mensajePremio").innerHTML = "PREMIO";
      setTimeout(() => {
        document.getElementById("mensajePremio").innerHTML = "";
      }, 2000);
    } else {
      document.getElementById("mensajePremio").innerHTML = "UNA MAS Y TE TOCA";
      setTimeout(() => {
        document.getElementById("mensajePremio").innerHTML = "";
      }, 2000);
    }
  }, 300);
}