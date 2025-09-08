<img src="preview/laravel-inview-animations.webp" alt="Logo Laravel Inview Animations" width="300">

# Laravel Inview Animations

✨ Animaciones personalizadas con **IntersectionObserver** para Laravel.  
Incluye un sistema de `reveal` para entradas dinámicas, contadores numéricos y barras de progreso animadas.  

Ideal para landing pages, portfolios o dashboards que necesitan ese **toque de vida** sin sobrecargar el frontend.

---

## 🚀 Instalación

```bash
composer require bertux77/inview-animations
php artisan vendor:publish --tag=inview-animations-assets
php artisan vendor:publish --tag=inview-animations-config
```

---

## 🔌 Uso

Añade el componente Blade en tu layout:

```blade
<x-inview-animations-assets />
```

Esto cargará automáticamente el CSS (`inview-animations.css`) y el JS (`inview-animations.js`).

---

## 🎭 Animaciones disponibles

El sistema se basa en el atributo `data-anim` aplicado a un elemento con clase `.reveal`.  
Ejemplo:

```html
<h2 class="reveal" data-anim="fade-up" data-delay="0.3" data-duration="1s">
  Hola Lanzarote 🌞
</h2>
```

Algunas animaciones incluidas:

- `fade-in`, `fade-up`, `fade-left`, `fade-right`
- `title-up`, `subtitle-up`, `paragraph-fade`
- `img-left`, `img-right`
- `scale-up`, `scale-pop`, `zoom-in`
- `rotate-in`, `flip-up`, `flip-left`, `flip-horizontal-in`
- `blur-in`, `sharp-slide`
- `clip-up`, `wipe-right`
- `skew-in`
- `text-gradient-sweep`, `liquid-reveal`, `shimmer`
- `tilt3d-bounce`, `turn-scale-left`, `turn-scale-right`
- `split-reveal`, `bounce-up`

---
# Animaciones especiales

## Animaciones para Gráficas (ADN Stack)

Además de las animaciones de entrada (`fade`, `scale`, `flip`, etc.), este paquete incluye **animaciones dinámicas de gráficas** para tarjetas `.dna-card`.  
Están pensadas para visualizar datos de forma creativa (anillos, mini-barras y barras lineales).

### 🔵 Ring Progress (Anillo)

Animación circular que muestra un porcentaje con trazo progresivo.

```html
<article class="dna-card" data-type="ring" data-percent="85" data-duration="1200">
  <svg viewBox="0 0 120 120" class="w-28 h-28">
    <circle cx="60" cy="60" r="40" fill="none" stroke="#e8ddd4" stroke-width="12"/>
    <circle class="ring-progress" cx="60" cy="60" r="40" fill="none"
            stroke="url(#ringGrad1)" stroke-linecap="round" stroke-width="12"
            stroke-dasharray="251" stroke-dashoffset="251"/>
  </svg>
  <h3>
    <span class="count" data-target="85">0</span>% Creativo
  </h3>
</article>
```

**Atributos disponibles**
- `data-type="ring"`
- `data-percent="85"` → porcentaje final
- `data-duration="1200"` → duración de la animación en ms
- `data-repeat="true|false"` → repetir al reentrar en viewport

---

### 🟤 Mini Bar Chart

Animación de barras verticales con efecto escalonado.

```html
<article class="dna-card" data-type="bars" data-percent="70" data-duration="900">
  <div class="h-20 w-40 flex items-end gap-2">
    <div class="bar flex-1 bg-brown-light/30 rounded-t" style="height:10%"></div>
    <div class="bar flex-1 bg-brown-light/30 rounded-t" style="height:10%"></div>
    <div class="bar flex-1 bg-brown-light/30 rounded-t" style="height:10%"></div>
  </div>
  <h3>
    <span class="count" data-target="70">0</span>% Inquieto
  </h3>
</article>
```

**Atributos disponibles**
- `data-type="bars"`
- `data-percent="70"` → altura máxima relativa de las barras
- `data-duration="900"` → duración de cada barra
- `data-repeat="true|false"`

---

### 🟠 Linear Progress Bar

Animación de progreso horizontal con destello (`sparkle`) que recorre la barra.

```html
<article class="dna-card" data-type="line" data-percent="100" data-duration="1200">
  <div class="relative h-3 w-full bg-white rounded-full border overflow-hidden">
    <div class="progress-line h-full w-0 rounded-full"
         style="background: linear-gradient(90deg,#b8a08a,#9d8066,#d4c4b0)"></div>
    <span class="sparkle absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-beige-dark opacity-0"></span>
  </div>
  <h3>
    <span class="count" data-target="100">0</span>% Perfeccionista
  </h3>
</article>
```

**Atributos disponibles**
- `data-type="line"`
- `data-percent="100"` → porcentaje de ancho final
- `data-duration="1200"` → duración de la animación
- `data-repeat="true|false"`

---

### ℹ️ Notas

- Todas las animaciones usan el **mismo IntersectionObserver** que el resto de animaciones del paquete (`fade`, `scale`, etc.).
- El atributo `data-repeat` permite reiniciar la animación al volver a entrar en viewport.
- Los contadores numéricos (`.count[data-target]`) se animan automáticamente con el valor de `data-target`.

## 🔢 Contadores

Puedes animar números simplemente usando `data-count`:

```html
<div class="reveal" data-anim="fade-up">
  <span data-count="150">0</span>+
</div>
```

Al entrar en pantalla, el número se incrementará automáticamente hasta el valor indicado.

---

## 📊 Skill Bars

La nueva animación `skill-bar` te permite crear **barras de progreso animadas**.  
Se activan al entrar en pantalla y respetan `data-width`, `data-duration` y `data-delay`.

### Ejemplo:

```html
<div class="bg-beige-medium rounded-full h-3 reveal" data-anim="fade-in">
  <div class="skill-bar bg-gradient-to-r from-slate-custom to-gray-dark h-3 rounded-full"
       data-width="90"
       data-duration="1.2"
       data-delay="0.2"></div>
</div>
```

👉 Explicación:
- `data-width="90"` → la barra crecerá hasta el 90%.
- `data-duration="1.2"` → animación de 1.2 segundos.
- `data-delay="0.2"` → comienza 0.2 segundos después de entrar en pantalla.

---

## ⚙️ Atributos globales

- `data-delay="0.3"` → retardo de inicio.
- `data-duration="1s"` → duración de la animación.
- `data-repeat="false"` → solo se reproduce una vez.
- `data-color`, `data-line-width` → personalizan algunas animaciones especiales.

---

## 📦 Roadmap

- [x] Animaciones reveal básicas
- [x] Contadores automáticos
- [x] Skill Bars
- [ ] Animaciones con stagger en grupo
- [ ] Integración con Livewire / Alpine.js
- [ ] Presets para Tailwind CSS

---

## 📝 Licencia

MIT © 2025 – Creado con ❤️ por [Bertux77](https://albertofreelance.com)
