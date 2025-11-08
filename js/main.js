// Espera a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    /*
    ============================================================
    1. FUNCIONALIDAD DEL MENÚ MÓVIL
    ============================================================
    */
    const menuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.getElementById('nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            // Alterna la clase 'hidden' en el menú.
            // La clase 'hidden' de Tailwind es (display: none)
            navMenu.classList.toggle('hidden');
        });
    }

    /*
    ============================================================
    2. FUNCIONALIDAD DE SCROLL SUAVE (SMOOTH SCROLL)
    ============================================================
    */
    // Selecciona todos los enlaces que empiezan con '#'
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Previene el salto brusco por defecto
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // ¡La magia del scroll suave!
                });

                // (Opcional) Cierra el menú móvil si se hace clic en un enlace
                if (window.innerWidth < 768 && !navMenu.classList.contains('hidden')) {
                    navMenu.classList.add('hidden');
                }
            }
        });
    });

    /*
    ============================================================
    3. ANIMACIÓN DE SCROLL (Intersection Observer)
    ============================================================
    */
    // Esta es la API moderna de JavaScript para detectar
    // cuándo un elemento entra en la pantalla.
    
    // Selecciona todas las secciones que marcamos
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // Observa en relación al viewport
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento está en pantalla (isIntersecting)
            if (entry.isIntersecting) {
                // Añade la clase 'is-visible' que definimos en el CSS
                entry.target.classList.add('is-visible');
                // Deja de observar este elemento (la animación solo ocurre una vez)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Asigna el observador a cada una de tus secciones
    sections.forEach(section => {
        observer.observe(section);
    });

});