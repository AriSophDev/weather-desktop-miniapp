# 🌤️ Weather Desktop Miniapp

Una mini-aplicación de escritorio para consultar el clima, construida con **Tauri** y **React**.

## ✨ Características

- 🖥️ Aplicación de escritorio ligera gracias a **Tauri** (backend en Rust)
- ⚛️ Interfaz construida con **React 19**
- 💅 Estilizado con **styled-components**
- ⚡ Desarrollo y build rápidos con **Vite**

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| React | Interfaz de usuario |
| Tauri | Empaquetado de escritorio (Rust) |
| Vite | Bundler / dev server |
| styled-components | Estilos |

## 🚀 Instalación
en el release esta el RPM o puedes hacer tu el build 


```bash
# Clonar el repositorio
git clone https://github.com/AriSophDev/weather-desktop-miniapp.git
cd weather-desktop-miniapp

# Instalar dependencias
bun install   # o npm install

# Modo desarrollo
bun run tauri dev

# Compilar aplicación de escritorio
bun run tauri build
```

## 📦 Scripts disponibles

- `dev` – Inicia el servidor de desarrollo Vite
- `build` – Compila el proyecto para producción
- `preview` – Previsualiza el build
- `tauri` – Comandos del CLI de Tauri

## 📄 Licencia

Este proyecto está bajo la licencia MIT

