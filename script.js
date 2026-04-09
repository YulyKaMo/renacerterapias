document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------
       Theme Toggle (Dark/Light)
       ------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-sun';
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'fa-solid fa-sun';
        }
    });

    /* -------------------------
       Language Toggle (ES/EN)
       ------------------------- */
    const langToggleBtn = document.getElementById('lang-toggle');
    const langLabel = langToggleBtn.querySelector('.lang-label');
    const htmlEl = document.documentElement;
    
    // Check saved language
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en') {
        htmlEl.classList.add('lang-en');
        htmlEl.setAttribute('lang', 'en');
        langLabel.textContent = 'ES';
    } else {
        htmlEl.setAttribute('lang', 'es');
        langLabel.textContent = 'EN';
    }

    langToggleBtn.addEventListener('click', () => {
        if (htmlEl.classList.contains('lang-en')) {
            htmlEl.classList.remove('lang-en');
            htmlEl.setAttribute('lang', 'es');
            localStorage.setItem('lang', 'es');
            langLabel.textContent = 'EN';
        } else {
            htmlEl.classList.add('lang-en');
            htmlEl.setAttribute('lang', 'en');
            localStorage.setItem('lang', 'en');
            langLabel.textContent = 'ES';
        }
    });

    /* -------------------------
       Mobile Menu Toggle
       ------------------------- */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    /* -------------------------
       Gallery Carousel
       ------------------------- */
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    let currentIndex = 0;
    
    const updateSlidePosition = () => {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
            slide.style.opacity = index === currentIndex ? '1' : '0.5';
            if(index === currentIndex) {
                slide.classList.add('current-slide');
            } else {
                slide.classList.remove('current-slide');
            }
        });
    };

    // Initialize slides
    updateSlidePosition();

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        updateSlidePosition();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        updateSlidePosition();
    });

    // Auto-play carousel
    setInterval(() => {
        currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        updateSlidePosition();
    }, 5000);

    /* -------------------------
       Contact Form Submission
       ------------------------- */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalContents = btn.innerHTML;
            
            // Show loading state
            const isEnglish = htmlEl.classList.contains('lang-en');
            btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${isEnglish ? 'Sending...' : 'Enviando...'}`;
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = `<i class="fa-solid fa-check"></i> ${isEnglish ? 'Message Sent!' : '¡Mensaje Enviado!'}`;
                btn.style.background = '#2BAE66'; // Green success color
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalContents;
                    btn.style.background = ''; // Revert to gradient
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
