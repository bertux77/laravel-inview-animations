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

## 🔢 Contadores

Puedes animar números simplemente usando `data-count`:

```html
<div class="reveal" data-anim="fade-up">
  <span data-count="150">0</span>+
</div>
```

Al entrar en pantalla, el número se incrementará automáticamente hasta el valor indicado.

---

## 📊 Skill Bars (NUEVO)

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
