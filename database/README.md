# Base de Datos: Crypto Dashboard

Este directorio contiene la arquitectura relacional (SQL) que soporta las funcionalidades de Watchlist y Alertas del Dashboard. 

Aunque el proyecto actual consume datos vía API (CoinGecko) y persiste favoritos en `localStorage`, este esquema demuestra cómo el producto será estructurado cuando migremos a un backend real en Node.js (con MySQL).

## Diagrama Entidad-Relación (DER)

El siguiente diagrama ilustra cómo las tablas se relacionan para soportar múltiples alertas y una lista de favoritos unificada por usuario.

```mermaid
erDiagram
    USERS ||--o{ WATCHLISTS : "tiene favoritos"
    USERS ||--o{ PRICE_ALERTS : "configura alertas"
    COINS ||--o{ WATCHLISTS : "está en"
    COINS ||--o{ PRICE_ALERTS : "tiene"

    USERS {
        string id PK
        string email
        string password_hash
        string first_name
        timestamp created_at
    }

    COINS {
        string id PK "CoinGecko ID"
        string symbol
        string name
        string image_url
    }

    WATCHLISTS {
        string user_id PK, FK
        string coin_id PK, FK
        timestamp added_at
    }

    PRICE_ALERTS {
        string id PK
        string user_id FK
        string coin_id FK
        decimal target_price
        enum condition_type "ABOVE o BELOW"
        boolean is_active
    }
```

## Ejecución

Para importar este modelo en su entorno local de MySQL Workbench:

1. Ejecute `schema.sql` para construir las tablas y restricciones (Foreign Keys).
2. Ejecute `seed.sql` para inyectar datos de prueba (Mock Users, Coins, Watchlist e Alerts).
