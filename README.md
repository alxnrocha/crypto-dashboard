# CryptoFlow — Dashboard Financiero & Criptomonedas en Tiempo Real

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success?style=flat-square&logo=github&logoColor=white)](https://alxnrocha.github.io/crypto-dashboard/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-22C55E?style=flat-square)](https://recharts.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-4338CA?style=flat-square)](https://github.com/pmndrs/zustand)
[![CoinGecko API](https://img.shields.io/badge/CoinGecko-REST_API-8DC63F?style=flat-square)](https://www.coingecko.com/api)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **Proyecto 07 del Portafolio Profesional** — Dashboard financiero interactivo de alto rendimiento para el seguimiento y análisis técnico de criptomonedas en tiempo real.  
> 🔗 **Demo en Vivo en GitHub Pages:** [https://alxnrocha.github.io/crypto-dashboard/](https://alxnrocha.github.io/crypto-dashboard/)

---

## 🌟 Visión General & Propuesta de Valor

**CryptoFlow** es un terminal bursátil web diseñado para operadores e inversores en activos digitales.

Proporciona cotizaciones en tiempo real consumidas de la API oficial de CoinGecko, visualización de tendencias con gráficos interactivos Recharts, mapa de calor de volatilidad, mitigación de rate-limits y lista de favoritos persistente mediante Zustand.

---

## ✨ Características Principales

- **Integración con CoinGecko API:** Consumo de datos de mercado del top 100 de criptoactivos con fallback offline inmediato.
- **Mitigación Inteligente de Rate-Limit:** Cacheo optimizado y polling controlado para evitar errores de cuota.
- **Motor de Fluctuación en Tiempo Real:** Algoritmo que simula micro-movimientos de mercado manteniendo la interfaz reactiva.
- **Gráficos Financieros Interactivos:** Visualización de tendencias con Recharts y rangos temporales ajustables (24h, 7d, 30d, 1y).
- **Watchlist Persistente con Zustand:** Gestión de favoritos almacenada en el navegador.

---

## 🏛️ Arquitectura del Proyecto

```text
07-crypto-dashboard/
├── index.html
├── src/
│   ├── components/                # CryptoTable, PriceChart, MarketHeatmap, Watchlist
│   ├── services/                  # Integración CoinGecko API
│   ├── stores/                    # Zustand store para favoritos
│   ├── types/                     # Tipos TypeScript
│   ├── App.tsx                    # Componente raíz
│   └── main.tsx                   # Punto de entrada
├── LICENSE
├── package.json
└── vite.config.ts
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/alxnrocha/crypto-dashboard.git
   cd crypto-dashboard
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🛡️ Calidad de Código & Testing

- **Seguridad de Tipos:** TypeScript estricto para datos de mercado y respuestas de la API.
- **Rendimiento:** Gráficos optimizados y debounce en búsquedas.

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
