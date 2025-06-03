document.addEventListener('DOMContentLoaded', function() {

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (navToggle && mainNavUl) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mainNavUl.classList.toggle('active');
            navToggle.innerHTML = !isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile nav when a link is clicked
    const navLinks = mainNavUl.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && mainNavUl.classList.contains('active')) {
                mainNavUl.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLiAnchors = document.querySelectorAll('.main-nav ul li a');

    if (sections.length > 0 && navLiAnchors.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Section is 50% in view
        };

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLiAnchors.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Ensure the first link is active on page load if hero is visible
        // Or if no section is initially intersecting (e.g. page too short)
        if (navLiAnchors[0] && window.scrollY < window.innerHeight * 0.5) {
           navLiAnchors.forEach(link => link.classList.remove('active'));
           navLiAnchors[0].classList.add('active');
        }
    }

    // Simple fade-in animation for elements on scroll
    const animatedElements = document.querySelectorAll('.product-card, .social-card, .features-list li, .contact-info > div, .contact-info > address, .contact-info > a.btn');
    
    const animateObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px from bottom
        threshold: 0.1
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target); 
            }
        });
    }, animateObserverOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Initial state for animation
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animateObserver.observe(el);
    });

});