document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect & Progress Bar
    const nav = document.getElementById('main-nav');
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Nav Background
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    // 2. Reveal on Scroll
    const revealElements = document.querySelectorAll('[data-reveal]');

    const reveal = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < window.innerHeight - revealPoint) {
                const delay = el.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    el.classList.add('revealed');
                }, delay);
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // 3. Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const speed = 2000 / target; // Total duration 2 seconds

                const updateCount = () => {
                    const increment = target / 100;
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count) + '+';
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target + '+';
                    }
                };
                updateCount();
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => countObserver.observe(counter));

    // 4. Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times (X)
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when a sub-link is clicked
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('active'));
            const icon = menuToggle.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        });
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        });
    });

    // 6. Hero Background Slider
    const hero = document.querySelector('.hero');
    if (hero) {
        const images = [
            'images/farming_hero_image_1778760478639.png',
            'images/farming_slider_2_1778761298662.png',
            'images/farming_slider_3_1778761321793.png'
        ];
        let currentImg = 0;

        setInterval(() => {
            currentImg = (currentImg + 1) % images.length;
            hero.style.backgroundImage = `url('${images[currentImg]}')`;
        }, 3000); // Change image every 3 seconds
    }
});
