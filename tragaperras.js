// FUNCIONALIDADES HEADER

// Gestión del saldo
var saldo = 0;

const ingresar = document.getElementById("ingresar");
const retirar = document.getElementById("retirar");
const botonMonedas = document.getElementById("botonMonedas");
const mostrarSaldo = document.getElementById("saldo");

function actualizarSaldo() {
  mostrarSaldo.textContent = "PUNTOS: ".concat(saldo);
}

botonMonedas.addEventListener("click", function () {
  const puntosIngresar = parseInt(ingresar.value) || 0;
  const puntosRetirar = parseInt(retirar.value) || 0;

  // Validación para evitar saldo negativo al retirar
  if (puntosIngresar > 0 && puntosRetirar === 0) {
    saldo += puntosIngresar;
  } else if (puntosRetirar > 0 && puntosIngresar === 0) {
    if (saldo >= puntosRetirar) {
      saldo -= puntosRetirar;
    } else {
      window.alert("No tienes suficientes puntos para retirar esa cantidad.");
    }
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

// Música de fondo
window.onload = () => {
  const audio = document.getElementById('musicaFondo');
  const controlVolumen = document.getElementById('control-volumen');
  const modalAjustes = document.getElementById('modal-ajustes');
  var haIniciado = false;

  function iniciarMusica() {
    if (!haIniciado) {
      audio.volume = parseFloat(controlVolumen.value);
      audio.play().catch(error => console.log("No se pudo reproducir el audio:", error));
      haIniciado = true;
    }
  }

  document.addEventListener('click', iniciarMusica);
  document.addEventListener('scroll', iniciarMusica);
  document.addEventListener('keydown', iniciarMusica);
  document.addEventListener('touchstart', iniciarMusica);

  controlVolumen.addEventListener('input', (event) => {
    audio.volume = parseFloat(event.target.value);
  });

  modalAjustes.addEventListener('click', iniciarMusica);
};

// Blanco y negro
const blancoNegroImg = document.getElementById('blanco-negro');
const colorImg = document.getElementById('color');

blancoNegroImg.addEventListener('click', () => {
  document.body.classList.add('blanco-negro');
  document.body.style.backgroundImage = "url('./assets/fondo-blanco-negro.png')";
});

colorImg.addEventListener('click', () => {
  document.body.classList.remove('blanco-negro');
  document.body.style.backgroundImage = "url('./assets/fondo.png')";
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

var simboloCarril1 = null;
var simboloCarril2 = null;
var simboloCarril3 = null;

function sonidoPalanca() {
  const sonidoPalanca = document.getElementById("sonidoPalanca");
  const controlVolumenPalanca = document.getElementById("control-volumen-palanca");
  sonidoPalanca.volume = parseFloat(controlVolumenPalanca.value);
  sonidoPalanca.play();
}

// Verificar si hay saldo suficiente antes de iniciar la tirada
function puedeTirar() {
  if (saldo >= 50) {
    saldo -= 50;
    actualizarSaldo();
    return true;
  } else {
    window.alert("No tienes suficientes puntos para tirar. Necesitas al menos 50 puntos.");
    return false;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && puedeTirar()) {
    sonidoPalanca();
    cambiarPalanca();
    iniciarGiro();
  }
});

document.getElementById("palanca").addEventListener("click", function () {
  if (puedeTirar()) {
    sonidoPalanca();
    cambiarPalanca();
    iniciarGiro();
  }
});

function cambiarPalanca() {
  const palanca = document.getElementById("palanca");
  palanca.src = "./assets/tragaperras/palanca_abajo.png";

  setTimeout(() => {
    palanca.src = "./assets/tragaperras/palanca_arriba.png";
  }, 200);
}

function iniciarGiro() {
  simboloCarril1 = simboloCarril2 = simboloCarril3 = null;
  giroCarriles("carril1", 2000, (simbolo) => simboloCarril1 = simbolo);
  giroCarriles("carril2", 3000, (simbolo) => simboloCarril2 = simbolo);
  giroCarriles("carril3", 4000, (simbolo) => {
    simboloCarril3 = simbolo;
    verificarPremio();
  });
}

function giroCarriles(carrilId, duracion, callback) {
  const carril = document.getElementById(carrilId);
  let tiempoInicio = null;

  function animarGiro(timestamp) {
    if (!tiempoInicio) tiempoInicio = timestamp;
    const progreso = timestamp - tiempoInicio;
    const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
    carril.innerHTML = `<img src="${simboloAleatorio}" alt="símbolo" class="simbolo_Imagen">`;

    if (progreso < duracion) {
      requestAnimationFrame(animarGiro);
    } else {
      callback(simboloAleatorio);
    }
  }

  requestAnimationFrame(animarGiro);
}

function sonidoPremio() {
  const sonidoPremio = document.getElementById("sonidoPremio");
  const controlVolumenPremio = document.getElementById("control-volumen-premio");
  sonidoPremio.volume = parseFloat(controlVolumenPremio.value);
  sonidoPremio.play();
}

function verificarPremio() {
  setTimeout(() => {
    if (simboloCarril1 === simboloCarril2 && simboloCarril2 === simboloCarril3) {
      const premio = premios[simboloCarril1] || 0;
      saldo += premio;
      sonidoPremio();
      actualizarSaldo();
      document.getElementById("mensajePremio").textContent = "PREMIO";
    } else {
      document.getElementById("mensajePremio").textContent = "SIGUE INTENTANDOLO. YA CASI ESTÁ";
    }
    setTimeout(() => {
      document.getElementById("mensajePremio").textContent = "";
    }, 2000);
  }, 300);
}