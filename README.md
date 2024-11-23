
# Prehistoric Slot Machine

Bienvenido a **Prehistoric Slot Machine**, un emocionante proyecto de una máquina tragaperras ambientada en el Paleolítico. Este juego te transportará a una época primitiva, donde podrás gestionar tu saldo, girar los carriles y ganar premios con combinaciones únicas.

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
- Implementado con **i18next**, permite cambiar dinámicamente entre idiomas (español e inglés por defecto).
- Extensible para agregar más idiomas mediante archivos JSON.

### 4. **Personalización y ajustes**
- **Control de volumen**: Ajusta el volumen principal desde el menú de configuración.
- **Modo blanco y negro**: Cambia la paleta de colores de la interfaz mediante un interruptor.
- **Reloj dinámico**: Muestra la hora actual en la esquina superior derecha.

---

## 📂 Estructura del proyecto

```
Prehistoric_Slot_Machine/
│
├── assets/                     # Recursos gráficos (imágenes, iconos)
│   ├── tragaperras/            # Imágenes de los símbolos y la palanca
│   ├── premios/                # Imágenes de premios
│   └── ajustes/                # Iconos de configuración
│
├── index.html                  # Página principal
├── tragaperras.css             # Estilos del juego
├── tragaperras.js              # Lógica e interacción del juego
├── locales/                    # Archivos de traducción
│   ├── es.json                 # Traducciones en español
│   └── en.json                 # Traducciones en inglés
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

La traducción es gestionada por **i18next**, que permite cambiar el idioma dinámamente. Por defecto, el idioma es español.

Para cambiar de idioma:
1. Abre el menú de ajustes (⚙).
2. Haz clic en el icono de idioma. El texto de toda la interfaz cambiará automáticamente.

### Agregar nuevos idiomas
1. Crea un archivo JSON en la carpeta `locales/` con las traducciones para el nuevo idioma.
2. Ejemplo de archivo `locales/fr.json` para francés:
   ```json
   {
     "meterDinero": "Insérer de l'argent",
     "sacarDinero": "Retirer de l'argent",
     "convertirFichas": "Convertir en jetons",
     "convertirDinero": "Convertir en argent",
     "dineroActual": "ARGENT: 0€",
     "fichasActuales": "JETONS: 0🎫"
   }
   ```

3. Configura la opción en el código para permitir seleccionar ese idioma.

---

## 🌟 Funcionalidades avanzadas

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

- **Desarrollador**: [Tu Nombre]
- **Iconos y Recursos Gráficos**: Imágenes propias o creadas para el proyecto.
- **Librerías**:
  - [i18next](https://www.i18next.com/) para la traducción.
  - [Google Fonts](https://fonts.google.com/) para la tipografía.

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

---

¡Gracias por jugar a **Prehistoric Slot Machine**! Si tienes sugerencias o encuentras errores, no dudes en reportarlos.