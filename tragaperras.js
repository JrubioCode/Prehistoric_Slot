// FUNCIONALIDAD DEL RELOJ
var actualizarReloj = () => {
  document.getElementById("reloj").textContent = new Date().toLocaleTimeString();
  setTimeout(actualizarReloj, 1000);
};
actualizarReloj();

// ABRIR MODAL DE AJUSTE
function modalAjustes() {
  document.getElementById("modal-ajustes").style.display = "flex";
}

// EVENTO PARA CERRAR EL MODAL DE AJUSTES
document.getElementById("boton-cerrar").addEventListener("click", (event) => {
  document.getElementById("modal-ajustes").style.display = "none";
});

// MUSCIA DE FONDO
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

// EVENTO PARA CAMBIAR A BLANCO Y NEGRO
document.getElementById("blanco-negro").addEventListener("click", () => {
    document.body.style.filter = "grayscale(100%)";
    document.body.style.backgroundImage = "url('./assets/fondo-blanco-negro.png')";
});

// EVENTO PARA CAMBIAR A COLOR
document.getElementById("color").addEventListener("click", () => {
    document.body.style.filter = "none";
    document.body.style.backgroundImage = "url('./assets/fondo.png')";
});

// VARIABLE PARA EL SALDO Y LAS FICHAS
var saldo = 0;
var fichas = 0;

// ACTUALIZAR LA VISTA DEL SALDO Y LAS FICHAS EN LA PANTALLA
function actualizarSaldo() {
  if(estaEnIngles()){
    document.getElementById("dinero-actual").textContent = "DINERO ACTUAL: " + saldo;
    document.getElementById("fichas").textContent = "FICHAS: " + fichas;
  } else{
    document.getElementById("dinero-actual").textContent = "CURRENT MONEY: " + saldo;
    document.getElementById("fichas").textContent = "CHIPS: " + fichas;
  }
}

// EVENTO METER DINERO
document.getElementById("meter-dinero").addEventListener("click", function () {
  abrirModal("Meter dinero");
});

// EVENTO SACAR DINERO
document.getElementById("sacar-dinero").addEventListener("click", function () {
  abrirModal("Sacar dinero");
});

// ABRIR MODAL DEL DINERO
function abrirModal(tipo) {
  document.getElementById("modal-dinero").style.display = "flex";
  document.getElementById("modal-dinero").setAttribute("data-tipo", tipo);
}

// FUNCION PARA METER O SACAR DINERO
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

// FUNCION PARA CERRAR EL MODAL DEL DINERO
document.getElementById("boton-cerrar-modal").addEventListener("click", cerrarModal);
function cerrarModal() {
  document.getElementById("modal-dinero").style.display = "none";
  document.getElementById("introducirDinero").value = ''; // Limpiar el campo de entrada
}

// FUNCION ABRIR MODAL CONVERSION A FICHAS
function abrirModalConversionFichas() {
  document.getElementById("modal-conversion-fichas").style.display = "flex";
}

// FUNCION ABRIR MODAL CONVERSION A SALDO
function abrirModalConversionSaldo() {
  document.getElementById("modal-conversion-saldo").style.display = "flex";
}

// CONVERTIR A FICHAS
document.getElementById("convertirFichas").addEventListener("click", function () {
  abrirModalConversionFichas();
});

// CONVERTIR A DINERO
document.getElementById("convertirDinero").addEventListener("click", function () {
  abrirModalConversionSaldo();
});

// EVENTO PARA ACEPTAR LA CONVERSION A FICHAS
document.getElementById("boton-convertir-fichas").addEventListener("click", function () {
  const cantidad = parseFloat(document.getElementById("cantidadConversionFichas").value);

  if (!isNaN(cantidad) && cantidad > 0) {
    if (saldo >= cantidad) {
      const fichasObtenidas = cantidad * 100;
      saldo -= cantidad;
      fichas += fichasObtenidas;
      actualizarSaldo();
      document.getElementById("comprobacionConversionFichas").textContent = `Has convertido ${cantidad}€ en ${fichasObtenidas} fichas.`;
      document.getElementById("comprobacionConversionFichas").style.color = "green";
      setTimeout(() => {
        document.getElementById("comprobacionConversionFichas").textContent = "";
        cerrarModalConversionFichas();
      }, 1500);
    } else {
      document.getElementById("comprobacionConversionFichas").textContent = "Saldo insuficiente.";
      document.getElementById("comprobacionConversionFichas").style.color = "red";
      setTimeout(() => {
        document.getElementById("comprobacionConversionFichas").textContent = "";
      }, 1500);
    }
  } else {
    document.getElementById("comprobacionConversionFichas").textContent = "Por favor, ingresa una cantidad válida.";
    document.getElementById("comprobacionConversionFichas").style.color = "red";
    setTimeout(() => {
      document.getElementById("comprobacionConversionFichas").textContent = "";
    }, 1500);
  }
});

// EVENTO PARA ACEPTAR LA CONVERSION A SALDO
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
      setTimeout(() => {
        document.getElementById("comprobacionConversionDinero").textContent = "";
        cerrarModalConversionSaldo();
      }, 1500);
    } else {
      document.getElementById("comprobacionConversionDinero").textContent = "No tienes suficientes fichas.";
      document.getElementById("comprobacionConversionDinero").style.color = "red";
      setTimeout(() => {
        document.getElementById("comprobacionConversionDinero").textContent = "";
      }, 1500);
    }
  } else {
    document.getElementById("comprobacionConversionDinero").textContent = "Por favor, ingresa una cantidad válida.";
    document.getElementById("comprobacionConversionDinero").style.color = "red";
    setTimeout(() => {
      document.getElementById("comprobacionConversionDinero").textContent = "";
    }, 1500);
  }
});

// CERRAR MODAL CONVERSION A FICHAS
document.getElementById("boton-cerrar-conversion-fichas").addEventListener("click", cerrarModalConversionFichas);
function cerrarModalConversionFichas() {
  document.getElementById("modal-conversion-fichas").style.display = "none";
  document.getElementById("cantidadConversionFichas").value = '';
}

// CERRAR MODAL CONVERSION A SALDO
document.getElementById("boton-cerrar-conversion-saldo").addEventListener("click", cerrarModalConversionSaldo);
function cerrarModalConversionSaldo() {
  document.getElementById("modal-conversion-saldo").style.display = "none";
  document.getElementById("cantidadConversionSaldo").value = '';
}

// SIMBOLOS
const simbolos = [
  "cavernicola",
  "cavernicola",
  "cavernicola",
  "cavernicola",
  "cavernicola",
  "fuego",
  "fuego",
  "fuego",
  "fuego",
  "pollo",
  "pollo",
  "pollo",
  "mamut",
  "mamut",
  "grupoCavernicolas"
];

const simbolosRutas = {
  cavernicola: "./assets/tragaperras/cavernicola.png",
  fuego: "./assets/tragaperras/fuego.png",
  pollo: "./assets/tragaperras/pollo.png",
  mamut: "./assets/tragaperras/mamut.png",
  grupoCavernicolas: "./assets/tragaperras/grupoCavernicolas.png"
};

// PREMIOS
const premios = {
  cavernicola: 100,
  fuego: 200,
  pollo: 300,
  mamut: 500,
  grupoCavernicolas: 1000
};


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

// JUGAR CON ESPACIO
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !enGiro && puedeTirar()) {
    sonidoPalanca();
    cambiarPalanca();
    iniciarGiro();
  }
});

// JUGAR CON PALANCA
document.getElementById("palanca").addEventListener("click", function () {
  if (!enGiro && puedeTirar()) {
    sonidoPalanca();
    cambiarPalanca();
    iniciarGiro();
  }
});

// CAMBIAR ESTILO DE PALANCA
function cambiarPalanca() {
  const palanca = document.getElementById("palanca");
  palanca.src = "./assets/tragaperras/palanca_abajo.png";

  setTimeout(() => {
    palanca.src = "./assets/tragaperras/palanca_arriba.png";
  }, 200);
}

// GENERAR SIMBOLOS ALEATORIOS
function generarSimbolosAleatorios() {
  const simbolosPesados = [
    ...Array(5).fill("cavernicola"),
    ...Array(4).fill("fuego"),
    ...Array(3).fill("pollo"),
    ...Array(2).fill("mamut"),
    "grupoCavernicolas"
  ];
  return simbolosPesados;
}

const simbolosPesados = generarSimbolosAleatorios();

// COMPROBACION DE GIRO
var enGiro = false;

// INICIAR GIRO
function iniciarGiro() {
  if (enGiro) return;

  enGiro = true;
  simboloCarril1 = simboloCarril2 = simboloCarril3 = null;

  giroCarriles("carril1", 2000, (simbolo) => (simboloCarril1 = simbolo));
  giroCarriles("carril2", 3000, (simbolo) => (simboloCarril2 = simbolo));
  giroCarriles("carril3", 4000, (simbolo) => {
    simboloCarril3 = simbolo;
    verificarPremio();
    enGiro = false;
  });
}

// GIRAR CARRILES
function giroCarriles(carrilId, duracion, callback) {
  const carril = document.getElementById(carrilId);
  let tiempoInicio = null;

  const imagenes = Array(3).fill(""); // Espacio para 3 imágenes por carril

  function animarGiro(timestamp) {
    if (!tiempoInicio) tiempoInicio = timestamp;
    const progreso = timestamp - tiempoInicio;

    for (let i = 0; i < imagenes.length; i++) {
      const simbolo = simbolosPesados[Math.floor(Math.random() * simbolosPesados.length)];
      imagenes[i] = `<img src="${simbolosRutas[simbolo]}" class="simbolo_Imagen" data-simbolo="${simbolo}">`;
    }

    carril.innerHTML = imagenes.join("");

    if (progreso < duracion) {
      requestAnimationFrame(animarGiro);
    } else {
      callback(imagenes.map((img) => img.match(/data-simbolo="(.*?)"/)[1])); // Extraer símbolos
    }
  }
  requestAnimationFrame(animarGiro);
}

// SONIDO CUANDO TOQUE PREMIO
function sonidoPremio() {
  const sonidoPremio = document.getElementById("sonidoPremio");
  const controlVolumenPremio = document.getElementById("control-volumen-premio");
  sonidoPremio.volume = parseFloat(controlVolumenPremio.value);
  sonidoPremio.play();
}

// VERIFICAR PREMIOS
function verificarPremio() {
  setTimeout(() => {
    if (simboloCarril1[1] === simboloCarril2[1] && simboloCarril2[1] === simboloCarril3[1]) {
      const simboloGanador = simboloCarril1[1];
      const premio = premios[simboloGanador] || 0;
      fichas += premio;
      actualizarSaldo();
      sonidoPremio();
      mostrarMensajePremio("WINNER", "PREMIO", premio);
    } else {
      mostrarMensajePremio("CONTINUE PLAYING", "SIGUE TIRANDO");
    }
  }, 500);
}

// MENSAJE DEL PREMIO
function mostrarMensajePremio(mensajeIngles, mensajeEspanol, premio = 0) {
  const mensaje = estaEnIngles() ? mensajeIngles : mensajeEspanol;
  document.getElementById("mensajePremio").textContent = premio ? `${mensaje} +${premio}` : mensaje;
  setTimeout(() => {
    document.getElementById("mensajePremio").textContent = "";
  }, 1000);
}


// ACTUALIZAR SALDO EN LA PANTALLA
function actualizarSaldo() {
  if(estaEnIngles()){
    document.getElementById("dinero-actual").textContent = "CURRENT MONEY: " + saldo + "€";
    document.getElementById("fichas").textContent = "CURRENT CHIPS: " + fichas + "🎫";
  } else{
    document.getElementById("dinero-actual").textContent = "DINERO ACTUAL: " + saldo + "€";
    document.getElementById("fichas").textContent = "FICHAS ACTUALES: " + fichas + "🎫";
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
        premio1: "1000 fichas",
        premio2: "500 fichas",
        premio3: "300 fichas",
        premio4: "200 fichas",
        premio5: "100 fichas",
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
        premio1: "1000 chips",
        premio2: "500 chips",
        premio3: "300 chips",
        premio4: "200 chips",
        premio5: "100 chips",
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
  // ACTUALIZAR TRADUCCIONES
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key);
    if (el.tagName.toLowerCase() === 'input') {
      el.value = t(key);
    }
  });
});

// SI ESTA EN INGLES DEVUELVE TRUE, SI ESTA EN ESPAÑOL DEVUELVE FALSE
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

    // CAMBIAR ICONO DEPENDIENDO DEL IDIOMA
    if (estaEnIngles()) {
      document.getElementById('icono-idioma').src = './assets/ajustes/ingles.png';
    } else {
      document.getElementById('icono-idioma').src = './assets/ajustes/español.png';
    }
  });
}

// FUNCION PARA COMPROBAR EN QUE IDIOMA ESTA
function estaEnIngles() {
  return i18next.language === 'en';
}