# API de Chistes para GitHub README 😄

Esta API genera badges dinámicos con chistes de programación en español para tu README de GitHub.

## 🚀 Uso

Para añadir un chiste a tu README, inserta una de las siguientes líneas:

```markdown
![Chiste del Día](https://joke-readme-api-production.up.railway.app/api/joke#codeql.svg)

<!-- Modo oscuro -->
![Chiste del Día](https://joke-readme-api-production.up.railway.app/api/joke?theme=dark#codeql.svg)
```

## 🎨 Temas Disponibles

La API soporta dos temas:

- `light` (predeterminado): Fondo blanco con texto negro
- `dark`: Fondo oscuro con texto blanco

## 🔧 Parámetros

| Parámetro | Descripción | Valores | Predeterminado |
|-----------|-------------|---------|----------------|
| theme | Tema del badge | `light`, `dark` | `light` |

## 📝 Ejemplo

### Tema Claro
![Chiste del Día](https://joke-readme-api-production.up.railway.app/api/joke#codeql.svg)

### Tema Oscuro
![Chiste del Día](https://joke-readme-api-production.up.railway.app/api/joke?theme=dark#codeql.svg)

### 💡 Nota
Para asegurar que el chiste se actualice con cada recarga, usamos la extensión `#codeql.svg` al final de la URL. Esto evita el cacheo excesivo por parte de GitHub.

## ⚙️ Características

- Chistes de programación en español
- Actualización automática con cada recarga
- Diseño responsive
- Soporte para temas claro y oscuro
- Compatible con GitHub Markdown

## 🛠️ API Base

- URL Base: `https://joke-readme-api-production.up.railway.app`
- Endpoint: `/api/joke`

## 📄 Licencia

MIT License

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerir cambios o mejoras.