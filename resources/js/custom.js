document.addEventListener('DOMContentLoaded', () => {

     const els = document.querySelectorAll('.reveal');
     
     // CONTADODOR NUMERICO
     function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
     }
     // PROGRESS BAR
     function animateBars(scope = document){
          scope.querySelectorAll('.skill-bar,[data-width]').forEach(bar => {
          const w = parseInt(bar.getAttribute('data-width') || '0', 10);
          const dur = parseFloat(bar.getAttribute('data-duration') || '2'); // segundos
          const delay = parseFloat(bar.getAttribute('data-delay') || '0');

          // deja preparado transition (usa tus mismas variables si quieres)
          bar.style.transition = `width ${dur}s ease-in-out ${delay}s`;

          // anima en el siguiente frame para que el transition dispare
          requestAnimationFrame(() => {
               bar.style.width = w + '%';
          });
     });
     }

     function applyDataVars(el) {
          if (el.dataset.color) {
               el.style.setProperty('--color', el.dataset.color.trim());
          }
          if (el.dataset.lineWidth) {
               const w = el.dataset.lineWidth.trim();
               const widthWithUnit = /^[\d.]+$/.test(w) ? `${w}px` : w;
               el.style.setProperty('--line-width', widthWithUnit);
          }
          if (el.dataset.duration) {
               const d = el.dataset.duration.trim();
               const durationWithUnit = /^[\d.]+$/.test(d) ? `${d}s` : d;
               el.style.setProperty('--duration', durationWithUnit);
          }
     }

     const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
               const el = entry.target;
               const repeat = (el.dataset.repeat ?? 'true') !== 'false';

               if (entry.isIntersecting) {
                    requestAnimationFrame(() => el.classList.add('is-inview'));
                    const delay = parseFloat(el.dataset.delay || 0);
                    applyDataVars(el);
                    el.style.setProperty('--delay', `${delay}s`);

                    requestAnimationFrame(() => el.classList.add('is-inview'));

                    if (el.querySelector('[data-count]')) {
                         animateCounters();
                    }
                    // ✅ Activa barras dentro de este elemento
                    if (el.querySelector('.skill-bar,[data-width]')) {
                         animateBars(el);
                    }
               } else if (repeat) {
                    el.classList.remove('is-inview');
               }
          });
     }, {
          root: null,
          rootMargin: '0px 0px -10% 0px',
          // El threshold se elimina para un comportamiento más estable
          // O se puede cambiar a 0 si es necesario
          threshold: 0
     });

     els.forEach(el => {
          applyDataVars(el);
          io.observe(el);
     });
});