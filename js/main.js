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

    /*
    ============================================================
    4. FUNCIONALIDAD DE FILTRO DE PORTAFOLIO
    ============================================================
    */
    const container = document.getElementById('portfolio-container');
    const filterButtons = document.querySelectorAll('.flex.justify-center.space-x-4 button');
    const projects = document.querySelectorAll('#portfolio-container > div'); // Selecciona todas las tarjetas

    // Función principal para mostrar u ocultar proyectos
    function filterProjects(category) {
        projects.forEach(project => {
            const projectCategory = project.getAttribute('data-category');
            
            // Si la categoría es 'all' o coincide con la categoría del proyecto, muestra la tarjeta
            if (category === 'all' || projectCategory === category) {
                // Muestra la tarjeta con una animación suave
                project.classList.remove('hidden', 'opacity-0');
                project.classList.add('opacity-100'); 
            } else {
                // Oculta la tarjeta
                project.classList.remove('opacity-100');
                project.classList.add('hidden', 'opacity-0');
            }
        });
    }

    // Función para manejar el estado activo de los botones
    function setActiveButton(activeButton) {
        filterButtons.forEach(button => {
            // Remueve las clases activas de todos
            button.classList.remove('bg-primary-dark', 'text-white', 'hover:bg-dark-hover', 'border-gray-medium');
            
            // Añade las clases pasivas (default) a los botones
            button.classList.add('border', 'border-gray-medium', 'text-primary-dark', 'hover:bg-gray-light');
        });

        // Añade las clases activas al botón clickeado
        activeButton.classList.remove('border', 'border-gray-medium', 'text-primary-dark', 'hover:bg-gray-light');
        activeButton.classList.add('bg-primary-dark', 'text-white', 'hover:bg-dark-hover');
    }

    // Escuchar los clicks en los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            let category;
            
            // Determinar la categoría basándose en el ID del botón
            if (button.id === 'filter-res') {
                category = 'residencial';
            } else if (button.id === 'filter-com') {
                category = 'comercial';
            } else {
                category = 'all';
            }
            
            filterProjects(category);
            setActiveButton(button);
        });
    });

    // Inicia con el filtro 'Todo' activo al cargar la página (opcional)
    const allButton = document.getElementById('filter-all');
    if (allButton) {
        allButton.click(); // Simula un click en 'Todo' al cargar
    }

    /*
    ============================================================
    5. FUNCIONALIDAD DEL CARRUSEL (SLIDER)
    ============================================================
    */
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (carouselTrack && prevBtn && nextBtn) {
        const slides = carouselTrack.querySelectorAll('.grid'); // Cada slide es un div.grid
        const slideCount = slides.length;
        let currentIndex = 0;
        let slideWidth = 0;

        // 5.1. Inicialización y ajuste de tamaño
        function initializeCarousel() {
            // Calcula el ancho basado en el contenedor padre
            const container = carouselTrack.parentElement;
            slideWidth = container.clientWidth;
            
            // Asigna el ancho calculado a cada slide
            slides.forEach(slide => {
                slide.style.minWidth = `${slideWidth}px`;
            });
            
            // Ajusta el ancho total del track
            carouselTrack.style.width = `${slideWidth * slideCount}px`;
            
            // Muestra el primer slide
            updateCarousel();
        }

        // Ejecutar al cargar la página y al redimensionar
        initializeCarousel();
        window.addEventListener('resize', initializeCarousel);


        // 5.2. Función principal de movimiento
        function updateCarousel() {
            // Calcula la posición de desplazamiento
            const offset = -currentIndex * slideWidth;
            carouselTrack.style.transform = `translateX(${offset}px)`;
            
            // Oculta/Muestra los botones si llegamos a los límites
            prevBtn.style.display = (currentIndex === 0) ? 'none' : 'block';
            nextBtn.style.display = (currentIndex === slideCount - 1) ? 'none' : 'block';
        }

        // 5.3. Navegación
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slideCount - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    } // Fin del if(carouselTrack...)

    // NOTA: La lógica de filtros de portafolio (Punto 4) queda deshabilitada
    // por ahora, ya que estamos usando el carrusel.

}); // Fin del DOMContentLoaded