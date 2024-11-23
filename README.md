
# Prehistoric Slot Machine

Bienvenido a **Prehistoric Slot Machine**, un emocionante proyecto de una máquina tragaperras ambientada en el Paleolítico. Este juego te transportará a una época primitiva, donde podrás gestionar tu saldo, girar los carriles y ganar premios con combinaciones únicas.

## 🌐 Acceso a la web

Puedes jugar a **Prehistoric Slot Machine** directamente desde este enlace:  
[Prehistoric Slot Machine en Vercel](https://prehistoric-slot.vercel.app/)

---

## 🎮 Descripción

En este juego, diseñado para combinar diversión e interactividad, los jugadores pueden:

- **Ingresar y retirar saldo.**
- **Convertir saldo en fichas y viceversa.**
- **Girar la máquina tragaperras** para intentar obtener premios con combinaciones ganadoras como:
  - Jackpot (símbolos iguales en todos los carriles).
  - Línea Horizontal.
  - Línea Diagonal.

Todo ello está acompañado de una interfaz atractiva con diseño configurable, traducción multilingüe y ajustes personalizables.

---

## 🛠️ Tecnologías utilizadas

El proyecto ha sido desarrollado con las siguientes herramientas:

- **HTML5**: Para estructurar los elementos del juego.
- **CSS3**: Para estilizar los elementos, crear modales interactivos y aplicar animaciones.
- **JavaScript**: Para implementar la lógica del juego y las interacciones con los usuarios.
- **i18next**: Librería para gestionar traducciones dinámicas y soporte multilingüe.
- **Google Fonts**: Uso de la fuente *Uncial Antiqua* para reflejar la estética del Paleolítico.

---

## 📜 Características principales

### 1. **Gestión de saldo**
- Los usuarios pueden ingresar dinero, retirarlo y convertirlo a fichas para jugar.
- Las cantidades disponibles de dinero y fichas se actualizan en tiempo real.

### 2. **Máquina tragaperras funcional**
- Tres carriles con símbolos prehistóricos: cavernícola, fuego, pollo y más.
- Combinaciones ganadoras:
  - **Jackpot**: Tres símbolos iguales en todos los carriles.
  - **Línea Horizontal**: Tres símbolos iguales en una fila horizontal.
  - **Línea Diagonal**: Tres símbolos iguales en diagonal.

### 3. **Soporte multilingüe**
- Implementado con **i18next**, permite cambiar dinámicamente entre idiomas (español e inglés).

### 4. **Personalización y ajustes**
- **Control de volumen**: Ajusta el volumen principal desde el menú de configuración.
- **Modo gris**: Cambia la paleta de colores de la interfaz mediante un interruptor.
- **Reloj dinámico**: Muestra la hora actual en la esquina superior derecha.

---

## 📂 Estructura del proyecto

```
Prehistoric_Slot_Machine/
│
├── assets/                     # Recursos gráficos
│   ├── tragaperras/            # Imágenes de los símbolos y la palanca
│   ├── premios/                # Imágenes de premios
│   ├── ajustes/                # Iconos de configuración
│   ├── fondo.png               # Imagen de fondo principal
│   ├── fondo-blanco-negro.png  # Imagen de fondo en blanco y negro
│   └── logo.webp               # Logo del proyecto
│
├── audios/                     # Recursos de audio
│   ├── audio-principal.mp3     # Música de fondo
│   ├── sonido-palanca.mp3      # Sonido de la palanca
│   └── sonido-premio.mp3       # Sonido al ganar
│
├── index.html                  # Página principal
├── tragaperras.css             # Estilos del juego
├── tragaperras.js              # Lógica e interacción del juego
└── README.md                   # Documentación del proyecto
```

---

## 🚀 Cómo usar el proyecto

### Requisitos previos
- Un navegador web moderno que soporte HTML5, CSS3 y JavaScript.
- Conexión a Internet para cargar la fuente de Google y la librería **i18next**.

### Pasos para ejecutar
1. Clona este repositorio o descarga el proyecto como archivo `.zip`.
2. Abre el archivo `index.html` en tu navegador.
3. ¡Empieza a jugar! Configura tus preferencias, ingresa saldo y gira la tragaperras.

---

## 🌐 Configuración de idioma

La traducción es gestionada por **i18next**, que permite cambiar el idioma dinámicamente. Por defecto, el idioma es español.

El código para gestionar las traducciones se encuentra directamente en el archivo `tragaperras.js`. A continuación, se muestra un fragmento clave:

```javascript
i18next.init({
  lng: 'es',  // Idioma por defecto
  resources: {
    es: {
      translation: {
        meterDinero: "Meter dinero",
        sacarDinero: "Sacar dinero",
        convertirDinero: "Convertir a dinero",
        convertirFichas: "Convertir a fichas",
        dineroActual: "DINERO: 0€",
        fichasActuales: "FICHAS: 0🎫"
      }
    },
    en: {
      translation: {
        meterDinero: "Deposit money",
        sacarDinero: "Withdraw money",
        convertirFichas: "Convert to chips",
        convertirDinero: "Convert to money",
        dineroActual: "MONEY: 0€",
        fichasActuales: "CHIPS: 0🎫"
      }
    }
  }
}, function(err, t) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key);
  });
});
```

Para cambiar entre idiomas, el usuario puede hacer clic en el botón correspondiente del menú de ajustes.

---

## 🌟 Más funcionalidades

1. **Modo Blanco y Negro**:
   - Cambia el filtro de color con un interruptor en el menú de ajustes.
   - Implementado con CSS mediante el filtro `grayscale()`.

2. **Reloj en tiempo real**:
   - Actualiza dinámicamente la hora mostrada en la esquina superior derecha.

3. **Modales interactivos**:
   - Interfaz intuitiva para ingresar saldo, convertir fichas y realizar ajustes personalizados.

---

## 🧪 Próximos pasos

- Agregar efectos de sonido para eventos clave (por ejemplo, girar la máquina o ganar premios).
- Implementar un sistema de puntuación global o local para registrar los mejores resultados.
- Expandir el soporte multilingüe a más idiomas.

---

## 📖 Créditos

- **Desarrollador**: [JrubioCode]

---

¡Gracias por jugar a **Prehistoric Slot Machine**!
