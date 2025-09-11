document.addEventListener('DOMContentLoaded', () => {

    // GRAFICAS
    /* === ADN helpers === */
    function __dnaClamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
    function __dnaEase(t){ return (t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2); }
    function __dnaCountUp(el, target, dur = 1000, start = 0){
        if(!el) return;
        const t0 = performance.now();
        function step(now){
            const p = __dnaClamp((now - t0)/dur, 0, 1);
            el.textContent = Math.round(start + (target - start) * __dnaEase(p));
            if(p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* === ADN animaciones específicas === */
    function __dnaAnimRing(card){
        const circle = card.querySelector('.ring-progress');
        const counter = card.querySelector('.count');
        if(!circle) return;

        const r = circle.r?.baseVal?.value || parseFloat(circle.getAttribute('r')) || 40;
        const C = 2 * Math.PI * r;
        const percent = Number(card.dataset.percent || counter?.dataset.target || 0);
        const dur = Number(card.dataset.duration || 1200);

        circle.style.transition = 'none';
        circle.style.strokeDasharray = `${C}`;
        circle.style.strokeDashoffset = `${C}`;
        void circle.getBoundingClientRect();

        circle.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(.22,1,.36,1)`;
        circle.style.strokeDashoffset = `${C * (1 - percent/100)}`;

        if(counter) __dnaCountUp(counter, percent, dur, Number(counter.textContent) || 0);
    }

    function __dnaResetRing(card){
        const circle = card.querySelector('.ring-progress');
        const counter = card.querySelector('.count');
        if(!circle) return;
        const r = circle.r?.baseVal?.value || parseFloat(circle.getAttribute('r')) || 40;
        const C = 2 * Math.PI * r;
        circle.style.transition = 'none';
        circle.style.strokeDasharray = `${C}`;
        circle.style.strokeDashoffset = `${C}`;
        if(counter) counter.textContent = '0';
    }

    function __dnaAnimMiniBars(card){
        const bars = [...card.querySelectorAll('.bar')];
        const counter = card.querySelector('.count');
        if(!bars.length) return;

        const percent = Number(card.dataset.percent || counter?.dataset.target || 0);
        const dur = Number(card.dataset.duration || 900);
        const base = 28; // % base visual
        const n = bars.length;

        bars.forEach((b, i) => {
            b.style.transition = 'none';
            b.style.height = '10%';
            void b.offsetHeight;

            const h = __dnaClamp(base + ((percent - base) * (i+1))/n, 12, 100);
            const delay = i * 80;

            b.style.transition = `height ${dur}ms cubic-bezier(.22,1,.36,1) ${delay}ms`;
            b.style.height = `${h}%`;
        });

        if(counter) __dnaCountUp(counter, percent, dur + n*80, Number(counter.textContent) || 0);
    }

    function __dnaResetMiniBars(card){
        const bars = card.querySelectorAll('.bar');
        const counter = card.querySelector('.count');
        bars.forEach(b => { b.style.transition = 'none'; b.style.height = '10%'; });
        if(counter) counter.textContent = '0';
    }

    function __dnaAnimLine(card){
        const line = card.querySelector('.progress-line');
        const sparkle = card.querySelector('.sparkle');
        const counter = card.querySelector('.count');
        if(!line) return;

        const percent = Number(card.dataset.percent || counter?.dataset.target || 0);
        const dur = Number(card.dataset.duration || 1200);

        line.style.transition = 'none';
        line.style.width = '0%';
        if(sparkle){
            sparkle.style.transition = 'none';
            sparkle.style.left = '-8px';
            sparkle.style.opacity = '0';
        }
        void line.offsetWidth;

        line.style.transition = `width ${dur}ms cubic-bezier(.22,1,.36,1)`;
        line.style.width = `${percent}%`;
        if(sparkle){
            sparkle.style.transition = `left ${dur}ms cubic-bezier(.22,1,.36,1), opacity 200ms ease`;
            sparkle.style.opacity = '1';
            sparkle.style.left = `calc(${percent}% - 6px)`;
        }

        if(counter) __dnaCountUp(counter, percent, dur, Number(counter.textContent) || 0);
    }

    function __dnaResetLine(card){
        const line = card.querySelector('.progress-line');
        const sparkle = card.querySelector('.sparkle');
        const counter = card.querySelector('.count');
        if(line){ line.style.transition = 'none'; line.style.width = '0%'; }
        if(sparkle){
            sparkle.style.transition = 'none';
            sparkle.style.opacity = '0';
            sparkle.style.left = '-8px';
        }
        if(counter) counter.textContent = '0';
    }



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

                     /* === ADN (ring/bars/line) usando el MISMO observer === */
                    if (el.classList.contains('dna-card') || el.dataset.type) {
                        const type = (el.dataset.type || '').toLowerCase();
                        switch (type) {
                        case 'ring': __dnaAnimRing(el);  break;
                        case 'bars': __dnaAnimMiniBars(el);  break;
                        case 'line': __dnaAnimLine(el);  break;
                        }
                        el.dataset.dnaDone = '1'; // marca interna opcional
                    }
               } else if (repeat) {
                    el.classList.remove('is-inview');
                      /* === ⬇️ AÑADIR ESTO: reset ADN si repeat === */
                    if (el.classList.contains('dna-card') || el.dataset.type) {
                        const type = (el.dataset.type || '').toLowerCase();
                        switch (type) {
                        case 'ring': __dnaResetRing(el);  break;
                        case 'bars': __dnaResetMiniBars(el);  break;
                        case 'line': __dnaResetLine(el);  break;
                        }
                        el.dataset.dnaDone = '0';
                    }
               }
          });
     }, {
          root: null,
          rootMargin: '0px 0px -10% 0px',
          threshold: 0
     });

     els.forEach(el => {
          applyDataVars(el);
          io.observe(el);
          document.querySelectorAll('.dna-card').forEach(el => io.observe(el));
     });
});
