/* FUNCIONALIDAD DEL RELOJ */
var actualizarReloj = () => {
  document.getElementById("reloj").textContent = new Date().toLocaleTimeString();
  setTimeout(actualizarReloj, 1000); // Llama a la función cada segundo
};
actualizarReloj(); // Inicia la actualización del reloj

/* ABRIR MODAL DE AJUSTES */
function modalAjustes() {
  document.getElementById("modal-ajustes").style.display = "flex";
}
/* CERRAR MODAL DE AJUSTES */
function cerrarModal() {
  document.getElementById("modal-ajustes").style.display = "none";
}
/* EVENTO A BOTON DE CERRAR DE AJUSTES */
document.getElementById("boton-cerrar").addEventListener("click", (event) => {
  cerrarModal();
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

/* TRAGAPERRAS FUNCIONALIDAD */
let saldo = 100;

/* SIMBOLOS TRAGAPERRAS */
const simbolos = [
  "./assets/tragaperras/cavernicola.png",
  "./assets/tragaperras/fuego.png",
  "./assets/tragaperras/pollo.png",
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

/* COMPROBACION DE SALDO EN LAS TIRADAS */
function puedeTirar() {
  if (saldo >= 50) {
    saldo -= 50;
    actualizarSaldo();
    return true;
  } else {
    if(estaEnIngles()){
      document.getElementById("mensajePremio").textContent = "NO MONEY";
    setTimeout(() => {
      document.getElementById("mensajePremio").textContent = "";
    }, 1000);
    } else{
      document.getElementById("mensajePremio").textContent = "SALDO INSUFICIENTE";
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
      saldo += premio;  // Aumenta el saldo con el premio
      sonidoPremio();  // Reproduce el sonido de premio
      actualizarSaldo();  // Actualiza el saldo en la interfaz
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
  setTimeout(() => {
    document.getElementById("mensajePremio").textContent = "";
  }, 1000);
  } else{
    document.getElementById("dinero-actual").textContent = "DINERO ACTUAL: " + saldo + "€";
  setTimeout(() => {
    document.getElementById("mensajePremio").textContent = "";
  }, 1000);
  }
}

// Abrir el modal de dinero al hacer clic en los botones
document.getElementById("meter-dinero").addEventListener("click", function () {
  document.getElementById("modal-dinero").style.display = "flex";
  document.getElementById("tipo-transaccion").textContent = "Meter dinero";
});

document.getElementById("sacar-dinero").addEventListener("click", function () {
  document.getElementById("modal-dinero").style.display = "flex";
  document.getElementById("tipo-transaccion").textContent = "Sacar dinero";
});

// Función para aceptar el cambio de dinero
document.getElementById("boton-meter-dinero-modal").addEventListener("click", function () {
  const cantidad = parseFloat(document.getElementById("introducirDinero").value);
  if (!isNaN(cantidad) && cantidad > 0) {
    if (document.getElementById("tipo-transaccion").textContent === "Meter dinero") {
      saldo += cantidad;  // Aumentar saldo
    } else if (document.getElementById("tipo-transaccion").textContent === "Sacar dinero") {
      if (saldo >= cantidad) {
        saldo -= cantidad;  // Disminuir saldo
      } else {


        alert("No tienes suficiente saldo.");
        return;
      }
    }
    actualizarSaldo();  // Actualizar el saldo en la interfaz
    document.getElementById("modal-dinero").style.display = "none";  // Cerrar modal
  } else {
    alert("Por favor, ingresa una cantidad válida.");
  }
});

// Cerrar el modal sin hacer cambios
document.getElementById("boton-cerrar-modal").addEventListener("click", function () {
  document.getElementById("modal-dinero").style.display = "none";
});

/* TRADUCIR A INGLES */
i18next.init({
  lng: 'es',  // Idioma por defecto
  resources: {
    es: {
      translation: {
        titulo: "Tragaperras Prehistóricas",
        meterDinero: "Meter dinero",
        sacarDinero: "Sacar dinero",
        convertirDinero: "Convertir a fichas",
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
        convertirDinero: "Convert to chips",
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