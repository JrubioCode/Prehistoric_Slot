/* FUNCIONALIDAD DEL RELOJ */
var actualizarReloj = () => {
  document.getElementById("reloj").textContent = new Date().toLocaleTimeString();
  setTimeout(actualizarReloj, 1000);
};
actualizarReloj(); // Inicia la actualización del reloj

/* ABRIR MODAL DE AJUSTES */
function modalAjustes() {
  document.getElementById("modal-ajustes").style.display = "flex";
}

// EVENTO A BOTON DE CERRAR DE AJUSTES
document.getElementById("boton-cerrar").addEventListener("click", (event) => {
  document.getElementById("modal-ajustes").style.display = "none";
});

/* MUSICA DE FONDO */
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

/* EVENTO PARA EL CAMBIO A BLANCO Y NEGRO */
document.getElementById("blanco-negro").addEventListener("click", () => {
    document.body.style.filter = "grayscale(100%)";
    document.body.style.backgroundImage = "url('./assets/fondo-blanco-negro.png')";
});

/* EVENTO PARA EL CAMBIO A COLOR */
document.getElementById("color").addEventListener("click", () => {
    document.body.style.filter = "none";
    document.body.style.backgroundImage = "url('./assets/fondo.png')";
});

// Variables para el saldo y fichas
let saldo = 0;
let fichas = 0;

// Actualizar visualización del saldo y fichas
function actualizarSaldo() {
  if(estaEnIngles()){
    document.getElementById("dinero-actual").textContent = "DINERO ACTUAL: " + saldo;
    document.getElementById("fichas").textContent = "FICHAS: " + fichas;
  } else{
    document.getElementById("dinero-actual").textContent = "CURRENT MONEY: " + saldo;
    document.getElementById("fichas").textContent = "CHIPS: " + fichas;
  }
}

// Evento para "Meter dinero"
document.getElementById("meter-dinero").addEventListener("click", function () {
  abrirModal("Meter dinero");
});

// Evento para "Sacar dinero"
document.getElementById("sacar-dinero").addEventListener("click", function () {
  abrirModal("Sacar dinero");
});

// Función para abrir el modal de dinero
function abrirModal(tipo) {
  document.getElementById("modal-dinero").style.display = "flex";
  document.getElementById("modal-dinero").setAttribute("data-tipo", tipo);
}

// Función para aceptar el cambio de dinero en el modal
document.getElementById("boton-meter-dinero-modal").addEventListener("click", function () {
  const tipoTransaccion = document.getElementById("modal-dinero").getAttribute("data-tipo");
  const cantidad = parseFloat(document.getElementById("introducirDinero").value);

  if (!isNaN(cantidad) && cantidad > 0) {
    if (tipoTransaccion === "Meter dinero") {
      saldo += cantidad;
    } else if (tipoTransaccion === "Sacar dinero") {
      if (saldo >= cantidad) {
        saldo -= cantidad;
      } else {
        document.getElementById("comprobacionSaldo").textContent = "Saldo insuficiente";
        document.getElementById("comprobacionSaldo").style.color = "red";
        document.getElementById("comprobacionSaldo").style.fontSize = "15px";
        setTimeout(() => {
          document.getElementById("comprobacionSaldo").textContent = "";
        }, 1500);
        return;
      }
    }
    actualizarSaldo();
    cerrarModal();
  } else {
      document.getElementById("comprobacionSaldo").textContent = "Por favor, ingresa una cantidad valida";
      document.getElementById("comprobacionSaldo").style.color = "red";
      document.getElementById("comprobacionSaldo").style.fontSize = "15px";
      setTimeout(() => {
        document.getElementById("comprobacionSaldo").textContent = "";
      }, 1500);
  }
});

// Función para cerrar el modal de dinero
document.getElementById("boton-cerrar-modal").addEventListener("click", cerrarModal);
function cerrarModal() {
  document.getElementById("modal-dinero").style.display = "none";
  document.getElementById("introducirDinero").value = ''; // Limpiar el campo de entrada
}

// Función para abrir el modal de conversión a fichas
function abrirModalConversionFichas() {
  document.getElementById("modal-conversion-fichas").style.display = "flex";
}

// Función para abrir el modal de conversión a saldo
function abrirModalConversionSaldo() {
  document.getElementById("modal-conversion-saldo").style.display = "flex";
}

// Evento para "Convertir a fichas"
document.getElementById("convertirFichas").addEventListener("click", function () {
  abrirModalConversionFichas();
});

// Evento para "Convertir a dinero"
document.getElementById("convertirDinero").addEventListener("click", function () {
  abrirModalConversionSaldo();
});

// Evento para aceptar la conversión a fichas en el modal
document.getElementById("boton-convertir-fichas").addEventListener("click", function () {
  const cantidad = parseFloat(document.getElementById("cantidadConversionFichas").value);

  if (!isNaN(cantidad) && cantidad > 0) {
    if (saldo >= cantidad) {
      const fichasObtenidas = cantidad * 100; // Conversión 1€ = 100 fichas
      saldo -= cantidad;
      fichas += fichasObtenidas;
      actualizarSaldo();
      document.getElementById("comprobacionConversionFichas").textContent = `Has convertido ${cantidad}€ en ${fichasObtenidas} fichas.`;
      document.getElementById("comprobacionConversionFichas").style.color = "green";
    } else {
      document.getElementById("comprobacionConversionFichas").textContent = "Saldo insuficiente.";
      document.getElementById("comprobacionConversionFichas").style.color = "red";
    }
  } else {
    document.getElementById("comprobacionConversionFichas").textContent = "Por favor, ingresa una cantidad válida.";
    document.getElementById("comprobacionConversionFichas").style.color = "red";
  }
});

// Evento para aceptar la conversión a saldo en el modal
document.getElementById("boton-convertir-saldo").addEventListener("click", function () {
  const cantidadFichas = parseInt(document.getElementById("cantidadConversionSaldo").value);

  if (!isNaN(cantidadFichas) && cantidadFichas > 0) {
    if (fichas >= cantidadFichas) {
      const eurosObtenidos = cantidadFichas / 100;
      fichas -= cantidadFichas;
      saldo += eurosObtenidos;
      actualizarSaldo();
      document.getElementById("comprobacionConversionDinero").textContent = `Has convertido ${cantidadFichas} fichas en ${eurosObtenidos.toFixed(2)}€.`;
      document.getElementById("comprobacionConversionDinero").style.color = "green";
    } else {
      document.getElementById("comprobacionConversionDinero").textContent = "No tienes suficientes fichas.";
      document.getElementById("comprobacionConversionDinero").style.color = "red";
    }
  } else {
    document.getElementById("comprobacionConversionDinero").textContent = "Por favor, ingresa una cantidad válida.";
    document.getElementById("comprobacionConversionDinero").style.color = "red";
  }
});

// Función para cerrar el modal de conversión a fichas
document.getElementById("boton-cerrar-conversion-fichas").addEventListener("click", cerrarModalConversionFichas);
function cerrarModalConversionFichas() {
  document.getElementById("modal-conversion-fichas").style.display = "none";
  document.getElementById("cantidadConversionFichas").value = ''; // Limpiar el campo de entrada
}

// Función para cerrar el modal de conversión a saldo
document.getElementById("boton-cerrar-conversion-saldo").addEventListener("click", cerrarModalConversionSaldo);
function cerrarModalConversionSaldo() {
  document.getElementById("modal-conversion-saldo").style.display = "none";
  document.getElementById("cantidadConversionSaldo").value = ''; // Limpiar el campo de entrada
}

/* TRAGAPERRAS FUNCIONALIDAD */

/* SIMBOLOS TRAGAPERRAS */
const simbolos = [
  "./assets/tragaperras/cavernicola.png",
  "./assets/tragaperras/cavernicola.png",
  "./assets/tragaperras/cavernicola.png",
  "./assets/tragaperras/cavernicola.png",
  "./assets/tragaperras/cavernicola.png",
  "./assets/tragaperras/fuego.png",
  "./assets/tragaperras/fuego.png",
  "./assets/tragaperras/fuego.png",
  "./assets/tragaperras/fuego.png",
  "./assets/tragaperras/pollo.png",
  "./assets/tragaperras/pollo.png",
  "./assets/tragaperras/pollo.png",
  "./assets/tragaperras/mamut.png",
  "./assets/tragaperras/mamut.png",
  "./assets/tragaperras/grupoCavernicolas.png",
];

/* PREMIOS TRAGAPERRAS */
const premios = {
  "./assets/tragaperras/cavernicola.png": 100,
  "./assets/tragaperras/fuego.png": 200,
  "./assets/tragaperras/pollo.png": 300,
  "./assets/tragaperras/mamut.png": 500,
  "./assets/tragaperras/grupoCavernicolas.png": 1000,
};

/* SIMBOLOS CARRILES */
var simboloCarril1 = null;
var simboloCarril2 = null;
var simboloCarril3 = null;

/* SONIDO DE PALANCA */
function sonidoPalanca() {
  const sonidoPalanca = document.getElementById("sonidoPalanca");
  const controlVolumenPalanca = document.getElementById("control-volumen-palanca");
  sonidoPalanca.volume = parseFloat(controlVolumenPalanca.value);
  sonidoPalanca.play();
}

/* COMPROBACION DE FICHAS EN LAS TIRADAS */
function puedeTirar() {
  if (fichas >= 25) {
    fichas -= 25;
    actualizarSaldo();
    return true;
  } else {
    if(estaEnIngles()){
      document.getElementById("mensajePremio").textContent = "NO MONEY";
    setTimeout(() => {
      document.getElementById("mensajePremio").textContent = "";
    }, 1000);
    } else{
      document.getElementById("mensajePremio").textContent = "FICHAS INSUFICIENTE";
    setTimeout(() => {
      document.getElementById("mensajePremio").textContent = "";
    }, 1000);
    }
    return false;
  }
}

// Agregar evento para la palanca y para la tecla "espacio"
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !enGiro && puedeTirar()) {
    sonidoPalanca();
    cambiarPalanca();
    iniciarGiro();
  }
});

document.getElementById("palanca").addEventListener("click", function () {
  if (!enGiro && puedeTirar()) {
    sonidoPalanca();
    cambiarPalanca();
    iniciarGiro();
  }
});

// Cambiar la imagen de la palanca
function cambiarPalanca() {
  const palanca = document.getElementById("palanca");
  palanca.src = "./assets/tragaperras/palanca_abajo.png";

  setTimeout(() => {
    palanca.src = "./assets/tragaperras/palanca_arriba.png";
  }, 200);
}

// Estado para verificar si la máquina está girando
let enGiro = false;

// Iniciar los giros
function iniciarGiro() {
  if (enGiro) return;

  enGiro = true;
  simboloCarril1 = simboloCarril2 = simboloCarril3 = null;

  // Inicia los giros de cada carril con duraciones diferentes
  giroCarriles("carril1", 2000, (simbolos) => simboloCarril1 = simbolos);
  giroCarriles("carril2", 3000, (simbolos) => simboloCarril2 = simbolos);
  giroCarriles("carril3", 4000, (simbolos) => {
    simboloCarril3 = simbolos;
    verificarPremio();
    enGiro = false;
  });
}

// Animar el giro de cada carril
function giroCarriles(carrilId, duracion, callback) {
  const carril = document.getElementById(carrilId);
  let tiempoInicio = null;

  // Crear un array para las tres imágenes
  let imagenes = [
    "<img src='' class='simbolo_Imagen'>",
    "<img src='' class='simbolo_Imagen'>",
    "<img src='' class='simbolo_Imagen'>"
  ];

  // Función para animar el carril
  function animarGiro(timestamp) {
    if (!tiempoInicio) tiempoInicio = timestamp;
    const progreso = timestamp - tiempoInicio;

    // Actualizar las imágenes con símbolos aleatorios
    for (let i = 0; i < imagenes.length; i++) {
      const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
      imagenes[i] = `<img src="${simboloAleatorio}" class="simbolo_Imagen">`;
    }

    // Reemplazar las imágenes en el carril
    carril.innerHTML = imagenes.join(''); // Unir las imágenes en el carril

    // Continuar la animación hasta que pase el tiempo
    if (progreso < duracion) {
      requestAnimationFrame(animarGiro);
    } else {
      callback(imagenes);  // Llamar al callback con las tres imágenes
    }
  }

  requestAnimationFrame(animarGiro); // Iniciar la animación
}

// Función para sonar el premio
function sonidoPremio() {
  const sonidoPremio = document.getElementById("sonidoPremio");
  const controlVolumenPremio = document.getElementById("control-volumen-premio");
  sonidoPremio.volume = parseFloat(controlVolumenPremio.value);
  sonidoPremio.play();
}

// Función para verificar el premio
function verificarPremio() {
  setTimeout(() => {
    // Verificar si los símbolos del medio (índice 1) de los tres carriles son iguales
    if (simboloCarril1[1] === simboloCarril2[1] && simboloCarril2[1] === simboloCarril3[1]) {
      // Si los tres símbolos del medio son iguales
      const premio = premios[simboloCarril1[1]] || 0;  // Obtener el premio según el símbolo del medio
      fichas += premio;
      actualizarSaldo();
      sonidoPremio();
      if(estaEnIngles()){
        document.getElementById("mensajePremio").textContent = "WINNER";
      setTimeout(() => {
        document.getElementById("mensajePremio").textContent = "";
      }, 1000);
      } else{
        document.getElementById("mensajePremio").textContent = "PREMIO";
      setTimeout(() => {
        document.getElementById("mensajePremio").textContent = "";
      }, 1000);
      }
      setTimeout(() => {
        document.getElementById("mensajePremio").textContent = "";
      }, 1000);
    } else {
      if(estaEnIngles()){
        document.getElementById("mensajePremio").textContent = "CONTINUE PLAYING";
      setTimeout(() => {
        document.getElementById("mensajePremio").textContent = "";
      }, 1000);
      } else{
        document.getElementById("mensajePremio").textContent = "SIGUE TIRANDO";
      setTimeout(() => {
        document.getElementById("mensajePremio").textContent = "";
      }, 1000);
      }
      setTimeout(() => {
        document.getElementById("mensajePremio").textContent = "";
      }, 1000);
    }
  }, 500);
}

// Función para actualizar el saldo en la interfaz
function actualizarSaldo() {
  if(estaEnIngles()){
    document.getElementById("dinero-actual").textContent = "CURRENT MONEY: " + saldo + "€";
    document.getElementById("fichas").textContent = "CURRENT CHIPS: " + fichas + "🎫";
  setTimeout(() => {
    document.getElementById("mensajePremio").textContent = "";
  }, 1000);
  } else{
    document.getElementById("dinero-actual").textContent = "DINERO ACTUAL: " + saldo + "€";
    document.getElementById("fichas").textContent = "FICHAS ACTUALES: " + fichas + "🎫";
  setTimeout(() => {
    document.getElementById("mensajePremio").textContent = "";
  }, 1000);
  }
}

/* TRADUCIR A INGLES */
i18next.init({
  lng: 'es',  // Idioma por defecto
  resources: {
    es: {
      translation: {
        titulo: "Tragaperras Prehistóricas",
        meterDinero: "Meter dinero",
        sacarDinero: "Sacar dinero",
        convertirDinero: "Convertir a dinero",
        convertirFichas: "Convertir a fichas",
        dineroActual: "DINERO ACTUAL: 0€",
        premios: "Premios",
        premio1: "1000 puntos",
        premio2: "500 puntos",
        premio3: "300 puntos",
        premio4: "200 puntos",
        premio5: "100 puntos",
        fichas: "FICHAS: ",
        mensajePremio: "",
        idioma: "Idioma",
        volumenPrincipal: "Volumen principal",
        volumenPalanca: "Volumen de la palanca",
        volumenPremio: "Volumen del premio",
        blancoYNegro: "Blanco y negro",
        cerrar: "Cerrar",
        introducirDineroLabel: "Introduce dinero",
        aceptar: "Aceptar",
        cerrarModal: "Cerrar",
      }
    },
    en: {
      translation: {
        titulo: "Prehistoric Slots",
        meterDinero: "Deposit money",
        sacarDinero: "Withdraw money",
        convertirFichas: "Convert to chips",
        convertirDinero: "Convert to money",
        dineroActual: "CURRENT MONEY: 0€",
        premios: "Prizes",
        premio1: "1000 points",
        premio2: "500 points",
        premio3: "300 points",
        premio4: "200 points",
        premio5: "100 points",
        fichas: "CHIPS: ",
        mensajePremio: "",
        idioma: "Language",
        volumenPrincipal: "Main volume",
        volumenPalanca: "Lever volume",
        volumenPremio: "Prize volume",
        blancoYNegro: "Black and white",
        cerrar: "Close",
        introducirDineroLabel: "Enter money",
        aceptar: "Accept",
        cerrarModal: "Close",
      }
    }
  }
},
function(err, t) {
  // Actualizamos los elementos con las traducciones
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key);
    if (el.tagName.toLowerCase() === 'input') {
      el.value = t(key);
    }
  });
});

// Función que devuelve true si está en inglés, false si está en español
function estaEnIngles() {
  return i18next.language === 'en';
}

function traducir() {
  const nuevoIdioma = i18next.language === 'es' ? 'en' : 'es';
  
  i18next.changeLanguage(nuevoIdioma, function(err, t) {
    // Actualizamos los elementos con las traducciones después de cambiar el idioma
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.innerHTML = t(key);
      if (el.tagName.toLowerCase() === 'input') {
        el.value = t(key);
      }
    });

    // Cambiar el icono dependiendo del idioma
    if (estaEnIngles()) {
      document.getElementById('icono-idioma').src = './assets/ajustes/ingles.png';
    } else {
      document.getElementById('icono-idioma').src = './assets/ajustes/español.png';
    }
  });
}

// Función que devuelve true si está en inglés, false si está en español
function estaEnIngles() {
  return i18next.language === 'en';
}