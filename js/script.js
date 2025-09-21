document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');

    // --- Intersection Observer for Sections & Active Nav Link ---
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in the section
                entry.target.classList.add('visible');

                // Update the active navigation link
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-menu li a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    sections.forEach(section => sectionObserver.observe(section));


    // --- Animate Cards with a Stagger Effect ---
    // Use a separate observer for cards to trigger animation as they enter view
    const cards = document.querySelectorAll('.project, .service-card');
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                // Find the card's index among its siblings to calculate delay
                const index = Array.from(card.parentNode.children).indexOf(card);
                card.style.transitionDelay = `${index * 150}ms`;
                card.classList.add('visible');
                // Stop observing the card once it's visible
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.1 // Trigger when a small part of the card is visible
    });

    cards.forEach(card => cardObserver.observe(card));


    // --- Smooth Scroll for Anchor Links ---
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offset = 70; // Offset for fixed navbar height
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a link
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            if (formStatus) {
                formStatus.textContent = 'Message Sent Successfully!';
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 3000);
            }
            contactForm.reset();
        });
    }

    // --- Set 'Home' Link to Active when at the Top of the Page ---
    window.addEventListener('scroll', () => {
        if (window.scrollY < 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-menu li a[href="#hero"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    });

    // --- Hero Text Letter Animation ---
    const heroText = document.getElementById('hero-text');
    if (heroText) {
        heroText.innerHTML = heroText.textContent.split('').map(char => {
            return char.trim() === '' ? ' ' : `<span class="letter-animation">${char}</span>`;
        }).join('');

        const letters = document.querySelectorAll('.letter-animation');
        letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 80}ms`;
        });
    }
});