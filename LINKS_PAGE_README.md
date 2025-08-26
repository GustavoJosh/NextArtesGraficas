# Página de Enlaces Rápidos (Linktree)

## Descripción
Se ha creado una página estática tipo "linktree" que permite acceso rápido a los servicios principales del sitio y a las plantillas de menú QR.

## Rutas creadas

### `/links` - Página principal de enlaces
- **Propósito**: Página tipo linktree con acceso rápido a servicios
- **Características**:
  - No indexada por motores de búsqueda (robots.txt + meta robots)
  - Diseño responsive y mobile-friendly
  - Botones con efectos hover y animaciones
  - Enlaces a plantillas de menú QR
  - Enlaces a secciones principales (contacto, imprenta)

### `/menusqr/[template]` - Plantillas de menú QR
- **Plantillas disponibles**:
  - `/menusqr/elegante`
  - `/menusqr/minimalista` 
  - `/menusqr/neon`
  - `/menusqr/oceano`

- **Características**:
  - Carga las plantillas HTML estáticas desde `public/menusqr/`
  - Iframe para mostrar el contenido sin conflictos de estilos
  - Botón de regreso a la página de enlaces
  - Manejo de errores y páginas no encontradas

## Archivos creados

```
src/app/links/
├── page.tsx          # Página principal de enlaces
├── loading.tsx       # Estado de carga
└── README.md         # Este archivo

src/app/menusqr/
├── layout.tsx        # Layout para plantillas
└── [template]/
    ├── page.tsx      # Página dinámica para plantillas
    ├── error.tsx     # Manejo de errores
    └── not-found.tsx # Página no encontrada
```

## Configuración

### Robots.txt
Se actualizó `src/app/robots.ts` para excluir `/links/` de la indexación:
```typescript
disallow: ['/private/', '/admin/', '/api/', '/links/']
```

### Metadata
La página `/links` incluye metadata que previene la indexación:
```typescript
robots: 'noindex, nofollow'
```

## Uso

1. **Acceso directo**: Navegar a `https://tudominio.com/links`
2. **Compartir**: Esta URL es ideal para compartir en redes sociales o códigos QR
3. **Plantillas**: Los usuarios pueden acceder directamente a las plantillas de menú QR
4. **Servicios**: Acceso rápido a contacto e imprenta

## Características técnicas

- **Framework**: Next.js 14 con App Router
- **Estilos**: Tailwind CSS con gradientes y animaciones
- **Iconos**: Lucide React
- **Responsive**: Optimizado para móviles y desktop
- **SEO**: Configurado para no aparecer en buscadores
- **Performance**: Páginas estáticas generadas en build time
- **Error Handling**: Manejo completo de errores y estados de carga

## Personalización

Para modificar los enlaces o estilos:
1. Editar `src/app/links/page.tsx` para cambiar enlaces o diseño
2. Modificar colores en las clases de Tailwind CSS
3. Agregar nuevas plantillas en `availableTemplates` array
4. Actualizar iconos importando desde `lucide-react`