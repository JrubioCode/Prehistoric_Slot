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

window.onload = () => {
  const controlVolumen = document.getElementById("control-volumen");
  const musicaFondo = document.getElementById("musicaFondo");
  let haIniciado = false;

  // Recuperar volumen guardado o establecer valor inicial
  const volumenGuardado = localStorage.getItem("control-volumen");
  const volumenInicial = volumenGuardado !== null ? parseFloat(volumenGuardado) : 0;
  controlVolumen.value = volumenInicial;
  musicaFondo.volume = volumenInicial;

  // Evento para ajustar el volumen y guardar el estado
  controlVolumen.addEventListener("input", (event) => {
    const nuevoVolumen = parseFloat(event.target.value);
    musicaFondo.volume = nuevoVolumen;
    localStorage.setItem("control-volumen", nuevoVolumen);
  });

  // Función para iniciar la música de fondo
  function iniciarMusica() {
    if (!haIniciado) {
      audio.volume = parseFloat(controlVolumen.value);
      audio.play();
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

// EVENTO PARA CAMBIAR EL TIPO DE COLOR
window.addEventListener("DOMContentLoaded", () => {
  const switchElement = document.getElementById("switch");
  
  // Establecer el modo claro (luz) por defecto
  if (!switchElement.checked) {
    document.body.style.filter = "none";
    document.body.style.backgroundImage = "url('./assets/fondo.png')";
    document.getElementById("switch").setAttribute("aria-label", "Modo claro");
  }

  switchElement.addEventListener("change", (event) => {
    const isChecked = event.target.checked;

    if (!isChecked) {
      document.body.style.filter = "grayscale(100%)";
      document.body.style.backgroundImage = "url('./assets/fondo-blanco-negro.png')";
      document.getElementById("switch").setAttribute("aria-label", "Modo noche");
    } else {
      document.body.style.filter = "none";
      document.body.style.backgroundImage = "url('./assets/fondo.png')";
      document.getElementById("switch").setAttribute("aria-label", "Modo claro");
    }
  });
});

// VARIABLE PARA EL SALDO Y LAS FICHAS
var saldo = 0;
var fichas = 100000;

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
    cambiarPalanca();
    iniciarGiro();
  }
});

// JUGAR CON PALANCA
document.getElementById("palanca").addEventListener("click", function () {
  if (!enGiro && puedeTirar()) {
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
<<<<<<< HEAD
  const carril = document.getElementById(carrilId); // Elemento del carril
  const slots = Array.from(carril.children); // Espacios (slots) fijos dentro del carril
  let tiempoInicio = null; // Marca de inicio del giro

  const retardo = 100; // Tiempo entre cambios de imagen
  let ultimoCambio = 0; // Controla la actualización de imágenes
=======
  const carril = document.getElementById(carrilId);
  let tiempoInicio = null;

  const imagenes = Array(3).fill(""); // Espacio para 3 imágenes por carril
>>>>>>> parent of 49784cc (TRAGAPERRAS FUNCIONAL)

  function animarGiro(timestamp) {
    if (!tiempoInicio) tiempoInicio = timestamp;
    const progreso = timestamp - tiempoInicio;

<<<<<<< HEAD
    // Actualizar imágenes en los slots solo si ha pasado el retardo
    if (timestamp - ultimoCambio >= retardo) {
      slots.forEach((slot) => {
        const simbolo = simbolosPesados[Math.floor(Math.random() * simbolosPesados.length)];
        slot.innerHTML = `<img src="${simbolosRutas[simbolo]}" class="simbolo_Imagen" data-simbolo="${simbolo}">`;
      });
      ultimoCambio = timestamp;
    }

    // Continuar animación hasta que termine la duración
=======
    for (let i = 0; i < imagenes.length; i++) {
      const simbolo = simbolosPesados[Math.floor(Math.random() * simbolosPesados.length)];
      imagenes[i] = `<img src="${simbolosRutas[simbolo]}" class="simbolo_Imagen" data-simbolo="${simbolo}">`;
    }

    carril.innerHTML = imagenes.join("");

>>>>>>> parent of 49784cc (TRAGAPERRAS FUNCIONAL)
    if (progreso < duracion) {
      requestAnimationFrame(animarGiro);
    } else {
      // Al finalizar, devolver los símbolos visibles
      const resultado = slots.map((slot) => {
        const img = slot.querySelector(".simbolo_Imagen");
        return img.dataset.simbolo;
      });
      callback(resultado);
    }
  }

  requestAnimationFrame(animarGiro); // Iniciar la animación
}

<<<<<<< HEAD


=======
>>>>>>> parent of 49784cc (TRAGAPERRAS FUNCIONAL)
// SONIDO CUANDO TOQUE PREMIO
function sonidoPremio() {
  const sonidoPremio = document.getElementById("sonidoPremio");
  const controlVolumenPremio = document.getElementById("control-volumen-premio");
  sonidoPremio.volume = parseFloat(controlVolumenPremio.value);
  sonidoPremio.play();
}

// VERIFICAR PREMIOS
function verificarPremio() {
  // Comprobación de premio completo (tres en el medio)
  setTimeout(verificarPremioCompleto, 500);

  // Comprobación de premio reducido (dos en el medio y uno arriba o abajo)
  setTimeout(verificarPremioReducido, 1000);

  // Comprobación de jackpot (todos los carriles tienen el mismo símbolo)
  setTimeout(verificarPremioJackpot, 1500);

  // Comprobación de premio por 6 o más símbolos iguales
<<<<<<< HEAD
  if (!premioOtorgado && verificarPremio6Simbolos()) {
    premioOtorgado = true;
  }

  // Comprobación de premio completo
  if (!premioOtorgado && verificarPremioCompleto()) {
    premioOtorgado = true;
  }

  // Comprobación de premio reducido
  if (!premioOtorgado && verificarPremioReducido()) {
    premioOtorgado = true;
  }
}

// FUNCIÓN PARA PREMIOS JACKPOT
function verificarPremioJackpot() {
  const simbolosCarril1 = simboloCarril1;
  const simbolosCarril2 = simboloCarril2;
  const simbolosCarril3 = simboloCarril3;

  const esCarril1Igual = simbolosCarril1[0] === simbolosCarril1[1] && simbolosCarril1[1] === simbolosCarril1[2];
  const esCarril2Igual = simbolosCarril2[0] === simbolosCarril2[1] && simbolosCarril2[1] === simbolosCarril2[2];
  const esCarril3Igual = simbolosCarril3[0] === simbolosCarril3[1] && simbolosCarril3[1] === simbolosCarril3[2];

  const mismoSimboloEntreCarriles = simbolosCarril1[0] === simbolosCarril2[0] && simbolosCarril2[0] === simbolosCarril3[0];

  if (esCarril1Igual && esCarril2Igual && esCarril3Igual && mismoSimboloEntreCarriles) {
    const simboloGanador = simbolosCarril1[0];
    const premioJackpot = (premios[simboloGanador] || 0) * 5;
    fichas += premioJackpot;
    actualizarSaldo();
    sonidoPremio();

    // Seleccionar los slots ganadores
    const slotsGanadores = [
      ...document.querySelectorAll("#carril1 .slot"),
      ...document.querySelectorAll("#carril2 .slot"),
      ...document.querySelectorAll("#carril3 .slot")
    ];

    // Agregar clase de borde ganador
    slotsGanadores.forEach((slot) => slot.classList.add("borde-ganador"));

    // Eliminar clase después de 4 segundos
    setTimeout(() => {
      slotsGanadores.forEach((slot) => slot.classList.remove("borde-ganador"));
    }, 4000);

    // Mostrar mensaje del premio
    mostrarMensajePremio("JACKPOT!!!", "JACKPOT PREMIO X5", premioJackpot);
    return true;
  }
  return false;
}

// FUNCIÓN PARA PREMIOS DE 6 SIMBOLOS
function verificarPremio6Simbolos() {
  const todosLosSimbolos = [...simboloCarril1, ...simboloCarril2, ...simboloCarril3];

  const conteoSimbolos = todosLosSimbolos.reduce((conteo, simbolo) => {
    conteo[simbolo] = (conteo[simbolo] || 0) + 1;
    return conteo;
  }, {});

  for (let simbolo in conteoSimbolos) {
    if (conteoSimbolos[simbolo] >= 6 && conteoSimbolos[simbolo] < 9) {
      const premio6Simbolos = (premios[simbolo] || 0) * 2;
      fichas += premio6Simbolos;
      actualizarSaldo();
      sonidoPremio();

      // Seleccionar los slots con el símbolo ganador
      const slotsGanadores = document.querySelectorAll(
        `.carril .slot img[data-simbolo='${simbolo}']`
      );

      // Aplicar la clase para el borde ganador
      slotsGanadores.forEach((slot) => {
        const parentSlot = slot.closest('.slot'); // Seleccionar el contenedor del slot
        parentSlot.classList.add("borde-ganador");
      });

      // Remover la clase después de 4 segundos
      setTimeout(() => {
        slotsGanadores.forEach((slot) => {
          const parentSlot = slot.closest('.slot'); // Seleccionar el contenedor del slot
          parentSlot.classList.remove("borde-ganador");
        });
      }, 4000);

      mostrarMensajePremio("WINNER (2X)", "PREMIO X2", premio6Simbolos);
      return true;
    }
  }
  return false;
=======
  setTimeout(verificarPremio6Simbolos, 2000);
>>>>>>> parent of 49784cc (TRAGAPERRAS FUNCIONAL)
}



// FUNCIÓN PARA PREMIOS COMPLETOS
function verificarPremioCompleto() {
  const simboloMedio1 = simboloCarril1[1];
  const simboloMedio2 = simboloCarril2[1];
  const simboloMedio3 = simboloCarril3[1];

  if (simboloMedio1 === simboloMedio2 && simboloMedio2 === simboloMedio3) {
    const simboloGanador = simboloMedio1;
    const premio = premios[simboloGanador] || 0;
    fichas += premio;
    actualizarSaldo();
    sonidoPremio();

<<<<<<< HEAD
    // Seleccionar los slots centrales
    const slot1 = document.querySelector("#carril1 .slot:nth-child(2)");
    const slot2 = document.querySelector("#carril2 .slot:nth-child(2)");
    const slot3 = document.querySelector("#carril3 .slot:nth-child(2)");

    [slot1, slot2, slot3].forEach((slot) => slot.classList.add("borde-ganador"));

    // Remover la clase después de 5 segundos
    setTimeout(() => {
      [slot1, slot2, slot3].forEach((slot) => slot.classList.remove("borde-ganador"));
    }, 5000);

=======
    // SELECCIONAR IMÁGENES GANADORAS
    const imagen1 = document.querySelector("#carril1 .simbolo_Imagen:nth-child(2)");
    const imagen2 = document.querySelector("#carril2 .simbolo_Imagen:nth-child(2)");
    const imagen3 = document.querySelector("#carril3 .simbolo_Imagen:nth-child(2)");

    // AGREGAR LA CLASE PARPADEANTE DEL CSS
    [imagen1, imagen2, imagen3].forEach((imagen) => {
      if (imagen) {
        imagen.classList.add("borde-ganador");
      }
    });

    // QUITAR EL PARPADEO A LOS 3s
    setTimeout(() => {
      [imagen1, imagen2, imagen3].forEach((imagen) => {
        if (imagen) {
          imagen.classList.remove("borde-ganador");
        }
      });
    }, 3000);
>>>>>>> parent of 49784cc (TRAGAPERRAS FUNCIONAL)
    mostrarMensajePremio("WINNER", "PREMIO", premio);
  }
}


// FUNCIÓN PARA PREMIOS REDUCIDOS
function verificarPremioReducido() {
  const simboloMedio1 = simboloCarril1[1];
  const simboloMedio2 = simboloCarril2[1];
  const simboloArriba3 = simboloCarril3[0];
  const simboloAbajo3 = simboloCarril3[2];

  if (simboloMedio1 === simboloMedio2 && (simboloMedio1 === simboloArriba3 || simboloMedio1 === simboloAbajo3)) {
    const simboloGanador = simboloMedio1;
    const premioReducido = (premios[simboloGanador] || 0) / 2;
    fichas += premioReducido;
    actualizarSaldo();
    sonidoPremio();

<<<<<<< HEAD
    // Seleccionar los slots ganadores
    const slot1 = document.querySelector("#carril1 .slot:nth-child(2)");
    const slot2 = document.querySelector("#carril2 .slot:nth-child(2)");
    const slot3 = simboloMedio1 === simboloArriba3
      ? document.querySelector("#carril3 .slot:nth-child(1)")
      : document.querySelector("#carril3 .slot:nth-child(3)");

    [slot1, slot2, slot3].forEach((slot) => slot.classList.add("borde-ganador"));

    // Remover la clase después de 4 segundos
    setTimeout(() => {
      [slot1, slot2, slot3].forEach((slot) => slot.classList.remove("borde-ganador"));
    }, 4000);

=======
    // SELECCIONAR IMÁGENES GANADORAS
    const imagen1 = document.querySelector("#carril1 .simbolo_Imagen:nth-child(2)");
    const imagen2 = document.querySelector("#carril2 .simbolo_Imagen:nth-child(2)");
    const imagenGanadora3 = simboloMedio1 === simboloArriba3
      ? document.querySelector("#carril3 .simbolo_Imagen:nth-child(1)") // Arriba
      : document.querySelector("#carril3 .simbolo_Imagen:nth-child(3)"); // Abajo

    // AGREGAR LA CLASE PARPADEANTE DEL CSS
    [imagen1, imagen2, imagenGanadora3].forEach((imagen) => {
      if (imagen) {
        imagen.classList.add("borde-ganador");
      }
    });

    // QUITAR EL PARPADEO A LOS 3s
    setTimeout(() => {
      [imagen1, imagen2, imagenGanadora3].forEach((imagen) => {
        if (imagen) {
          imagen.classList.remove("borde-ganador");
        }
      });
    }, 3000);
>>>>>>> parent of 49784cc (TRAGAPERRAS FUNCIONAL)
    mostrarMensajePremio("WINNER (HALF PRIZE)", "PREMIO REDUCIDO", premioReducido);
  }
}

// FUNCIÓN PARA PREMIOS JACKPOT
function verificarPremioJackpot() {
  const simbolo1 = simboloCarril1[1];
  const simbolo2 = simboloCarril2[1];
  const simbolo3 = simboloCarril3[1];

  if (simbolo1 === simbolo2 && simbolo2 === simbolo3) {
    const premioJackpot = (premios[simbolo1] || 0) * 5;
    fichas += premioJackpot;
    actualizarSaldo();
    sonidoPremio();

    // SELECCIONAR IMÁGENES GANADORAS
    const imagen1 = document.querySelector("#carril1 .simbolo_Imagen:nth-child(2)");
    const imagen2 = document.querySelector("#carril2 .simbolo_Imagen:nth-child(2)");
    const imagen3 = document.querySelector("#carril3 .simbolo_Imagen:nth-child(2)");

    // AGREGAR LA CLASE PARPADEANTE DEL CSS
    [imagen1, imagen2, imagen3].forEach((imagen) => {
      if (imagen) {
        imagen.classList.add("borde-ganador");
      }
    });

    // QUITAR EL PARPADEO A LOS 3s
    setTimeout(() => {
      [imagen1, imagen2, imagen3].forEach((imagen) => {
        if (imagen) {
          imagen.classList.remove("borde-ganador");
        }
      });
    }, 3000);
    mostrarMensajePremio("JACKPOT", "JACKPOT", premioJackpot);
  }
}

// FUNCIÓN PARA PREMIOS POR 6 O MÁS SÍMBOLOS IGUALES
function verificarPremio6Simbolos() {
  const todosLosSimbolos = [
    ...simboloCarril1,
    ...simboloCarril2,
    ...simboloCarril3
  ];

  // Contamos cuántas veces aparece cada símbolo
  const conteoSimbolos = todosLosSimbolos.reduce((conteo, simbolo) => {
    conteo[simbolo] = (conteo[simbolo] || 0) + 1;
    return conteo;
  }, {});

  // Verificamos si algún símbolo aparece 6 o más veces
  for (let simbolo in conteoSimbolos) {
    if (conteoSimbolos[simbolo] >= 6) {
      const premio6Simbolos = (premios[simbolo] || 0) * 2;
      fichas += premio6Simbolos;
      actualizarSaldo();
      sonidoPremio();

      // SELECCIONAR IMÁGENES GANADORAS
      const imagenesGanadoras = [
        ...document.querySelectorAll(`#carril1 .simbolo_Imagen[src='${simbolo}']`),
        ...document.querySelectorAll(`#carril2 .simbolo_Imagen[src='${simbolo}']`),
        ...document.querySelectorAll(`#carril3 .simbolo_Imagen[src='${simbolo}']`)
      ];

      // AGREGAR LA CLASE PARPADEANTE DEL CSS
      imagenesGanadoras.forEach((imagen) => {
        imagen.classList.add("borde-ganador");
      });

      // QUITAR EL PARPADEO A LOS 3s
      setTimeout(() => {
        imagenesGanadoras.forEach((imagen) => {
          imagen.classList.remove("borde-ganador");
        });
      }, 3000);
      mostrarMensajePremio("WINNER (2X)", "PREMIO X2", premio6Simbolos);
      break;
    }
  }
}


// FUNCIÓN PARA MOSTRAR EL MENSAJE DE PREMIO
function mostrarMensajePremio(mensajeEn, mensajeEs, premio = null) {
  const mensaje = estaEnIngles() ? mensajeEn : mensajeEs;
  const premioTexto = premio ? `: ${premio} fichas` : "";

  document.getElementById("mensajePremio").textContent = mensaje + premioTexto;
  setTimeout(() => {
    document.getElementById("mensajePremio").textContent = "";
  }, 2000);
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
        fichas: "FICHAS: " + fichas + "🎫",
        mensajePremio: "",
        idioma: "Idioma",
        volumenPrincipal: "Volumen principal",
        volumenPalanca: "Volumen de la palanca",
        volumenPremio: "Volumen del premio",
        ModoColor: "Modo de color",
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
        dineroActual: "CURRENT MONEY: "  + saldo + "€",
        premios: "Prizes",
        premio1: "1000 chips",
        premio2: "500 chips",
        premio3: "300 chips",
        premio4: "200 chips",
        premio5: "100 chips",
<<<<<<< HEAD
        fichas: "CHIPS: " + fichas + "🎫",
=======
        fichas: "CHIPS: ",
>>>>>>> parent of 49784cc (TRAGAPERRAS FUNCIONAL)
        mensajePremio: "",
        idioma: "Language",
        volumenPrincipal: "Main volume",
        volumenPalanca: "Lever volume",
        volumenPremio: "Prize volume",
        ModoColor: "Color mode",
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

// Función para cambiar el tamaño del título según el idioma
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

    // Cambiar el ícono dependiendo del idioma
    if (estaEnIngles()) {
      document.getElementById('icono-idioma').src = './assets/ajustes/ingles.png';
      document.getElementById("cartel-premios").src = './assets/premios/cartel-premios-ingles.png';
    } else {
      document.getElementById('icono-idioma').src = './assets/ajustes/español.png';
      document.getElementById("cartel-premios").src = './assets/premios/cartel-premios-español.png';
    }
  });

  // Cambiar el tamaño de fuente solo si el idioma es español
  if (!estaEnIngles()) {
    document.querySelector('h1').style.fontSize = "12px";
  } else {
    // Asegurarse de que el tamaño de la fuente vuelva a su tamaño original si está en inglés
    document.querySelector('h1').style.fontSize = "";
  }
}

// Función para comprobar si el idioma es inglés
function estaEnIngles() {
  return i18next.language === 'en';
}