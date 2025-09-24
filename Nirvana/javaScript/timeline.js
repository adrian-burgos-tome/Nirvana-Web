// timeline.js

document.addEventListener("DOMContentLoaded", function () {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    // Crear contenedor carrusel
    timeline.classList.add('timeline-carousel');
    const events = Array.from(timeline.querySelectorAll('.timeline-event'));
    if (events.length === 0) return;

    // Crear wrapper para eventos
    const wrapper = document.createElement('div');
    wrapper.className = 'timeline-carousel-wrapper';
    events.forEach(ev => wrapper.appendChild(ev));
    timeline.appendChild(wrapper);

    // Crear controles
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '<';
    prevBtn.className = 'timeline-carousel-btn prev';
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '>';
    nextBtn.className = 'timeline-carousel-btn next';
    timeline.appendChild(prevBtn);
    timeline.appendChild(nextBtn);

    let currentIndex = 0;
    const showEvent = (idx) => {
        wrapper.style.transform = `translateX(-${idx * 100}%)`;
    };
    showEvent(currentIndex);

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showEvent(currentIndex);
        }
    });
    nextBtn.addEventListener('click', () => {
        if (currentIndex < events.length - 1) {
            currentIndex++;
            showEvent(currentIndex);
        }
    });

    // Swipe para móvil
    let startX = null;
    wrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    wrapper.addEventListener('touchend', (e) => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50 && currentIndex > 0) {
            currentIndex--;
            showEvent(currentIndex);
        } else if (startX - endX > 50 && currentIndex < events.length - 1) {
            currentIndex++;
            showEvent(currentIndex);
        }
        startX = null;
    });

    // Cambiar a lista al pulsar "Mostrar Todos"
    const allBtn = document.querySelector('button[data-filter="all"]');
    let isList = false;
    allBtn.addEventListener('click', () => {
        if (!isList) {
            timeline.classList.remove('timeline-carousel');
            wrapper.style.transform = '';
            wrapper.style.display = 'block';
            events.forEach(ev => {
                ev.style.minWidth = 'unset';
                ev.style.margin = '20px 0';
                ev.style.textAlign = 'left';
            });
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            isList = true;
            allBtn.textContent = 'Ver como carrusel';
        } else {
            timeline.classList.add('timeline-carousel');
            wrapper.style.display = 'flex';
            events.forEach(ev => {
                ev.style.minWidth = '100%';
                ev.style.margin = '0 10px';
                ev.style.textAlign = 'center';
            });
            prevBtn.style.display = '';
            nextBtn.style.display = '';
            showEvent(currentIndex);
            isList = false;
            allBtn.textContent = 'Mostrar Todos';
        }
    });
});
