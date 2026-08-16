# CryptoFlow — Dashboard Financiero & Criptomonedas en Tiempo Real

[![CI & Deploy](https://github.com/alxnrocha/crypto-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/alxnrocha/crypto-dashboard/actions)
[![Demo GitHub Pages](https://img.shields.io/badge/Demo-GitHub_Pages-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://alxnrocha.github.io/crypto-dashboard/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**CryptoFlow** es un dashboard financiero interactivo y de alto rendimiento para el seguimiento y análisis técnico de criptomonedas en tiempo real. Diseñado para simular un terminal bursátil profesional, incorpora gráficos interactivos, mapa de calor de mercado, mitigación de rate-limits y lista de favoritos persistente.

- 🌐 **Demo en Vivo (GitHub Pages):** [https://alxnrocha.github.io/crypto-dashboard/](https://alxnrocha.github.io/crypto-dashboard/)
- 📦 **Repositorio GitHub:** [https://github.com/alxnrocha/crypto-dashboard](https://github.com/alxnrocha/crypto-dashboard)

---

## ✨ Características Principales

### 🚀 Experiencia de Usuario & Frontend
- **Integración con CoinGecko API:** Consumo de datos reales del top 100 de criptoactivos con fallback offline inmediato.
- **Mitigación Inteligente de Rate-Limit:** Cacheo agresivo con TanStack Query y polling controlado cada 60s para evitar errores HTTP 429.
- **Motor de Fluctuación en Tiempo Real:** Algoritmo microscópico que simula transacciones de alta frecuencia manteniendo la interfaz viva.
- **Gráficos Financieros Interactivos:** Visualización de tendencias históricas de precios con Recharts y rangos temporales ajustables (24h, 7d, 30d, 1y).
- **Watchlist Persistente con Zustand:** Gestión de estado global ligera para almacenar y sincronizar monedas favoritas en el navegador.

---

## 🏛️ Estructura del Proyecto

```text
07-crypto-dashboard/
├── .github/workflows/ci.yml       # Pipeline de CI y Deploy automático en Pages
├── screenshots/                   # Capturas de pantalla reales
│   ├── desktop.png
│   └── mobile.png
├── src/
│   ├── components/
│   │   ├── dashboard/             # CoinChart, CoinTable, MarketHeatmap y TopCards
│   │   ├── layout/                # Sidebar, TopBar y DashboardLayout
│   │   └── ui/                    # Botones, Cards y ErrorBoundary
│   ├── mocks/                     # Conjunto de datos offline de fallback
│   ├── pages/                     # Home y Watchlist
│   ├── services/                  # api.ts (cliente Axios y endpoints de CoinGecko)
│   ├── store/                     # useStore.ts (estado Zustand persistente)
│   ├── App.tsx                    # Shell principal
│   └── main.tsx                   # Entrypoint React 19
├── index.html                     # Entrypoint HTML5
└── vite.config.ts                 # Configuración de Vite y Tailwind v4
```

---

## ⚡ Guía de Inicio Rápido

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/alxnrocha/crypto-dashboard.git
cd crypto-dashboard
npm install
```

### 2. Iniciar en Modo Desarrollo
```bash
npm run dev
```

---

## 🧪 Calidad de Código y Pruebas

```bash
# Compilar para producción
npm run build
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para más detalles.

**Autor:** [Alexandre Rocha](https://github.com/alxnrocha)
