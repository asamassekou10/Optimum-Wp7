/*
  script.js
  Custom JavaScript for Optimum Wp7 Website - Optimized for Performance
*/

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS Animations with better configuration
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 400, // Faster animations
            easing: 'ease-out',
            once: true,
            offset: 100,
            delay: 0,
            disable: window.innerWidth < 768 // Disable on mobile for better performance
        });
        console.log('AOS initialized');
    } else {
        console.log('AOS not found - adding fallback visibility');
        // Fallback: ensure all AOS elements are visible
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons initialized');
    } else {
        console.log('Lucide not found');
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Animate the menu icon
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.style.transform = mobileMenu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(90deg)';
            }
        });
    }

    // --- Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // --- Dynamic Hero Slider ---
    const slides = document.querySelectorAll('.hero-slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const dotsContainer = document.getElementById('slider-dots');

    let currentSlide = 0;
    let slideInterval;

    // Check if there are slides to create a slider
    if (slides.length > 0) {
        
        // Function to create pagination dots
        function createDots() {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    showSlide(i);
                });
                dotsContainer.appendChild(dot);
            });
        }

        // Function to update dots to show the active slide
        function updateDots() {
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // Function to display a specific slide
        function showSlide(n) {
            // Remove 'active' class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            // Set the new current slide index, looping back if necessary
            currentSlide = (n + slides.length) % slides.length;
            // Add 'active' class to the new current slide
            slides[currentSlide].classList.add('active');
            updateDots();
            // Reset the automatic slide interval
            resetInterval();
        }

        // --- Event Listeners for Next/Prev Buttons ---
        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        // --- Automatic Sliding ---
        function startInterval() {
             // Set an interval to advance to the next slide every 5 seconds
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000); // Change slide every 5 seconds
        }

        function resetInterval() {
            // Clear the existing interval and start a new one
            clearInterval(slideInterval);
            startInterval();
        }

        // Initialize the slider
        createDots();
        startInterval();
    }

    // --- Modal Functionality ---
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const modalDetails = document.getElementById('modal-details');

    // Debug: Check if modal elements exist
    console.log('Modal elements found:', {
        modal: !!modal,
        modalClose: !!modalClose,
        modalOverlay: !!modalOverlay,
        modalTitle: !!modalTitle,
        modalDescription: !!modalDescription,
        modalImage: !!modalImage,
        modalDetails: !!modalDetails
    });

    // Modal data
    const modalData = {
        'solar-systems': {
            title: 'Systèmes Solaires Haute Performance',
            description: 'Nos systèmes solaires photovoltaïques sont conçus spécifiquement pour le climat africain, offrant une performance optimale même dans les conditions les plus exigeantes. Nous utilisons des technologies de pointe et des composants de qualité premium pour garantir une production d\'énergie maximale et une durabilité exceptionnelle.',
            image: 'https://placehold.co/800x400/1e3a8a/ffffff?text=Systèmes+Solaire+Haute+Performance',
            details: `
                <h4 class="font-semibold text-slate-800 mb-2">Caractéristiques principales :</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>Panneaux solaires haute efficacité (20%+)</li>
                    <li>Onduleurs intelligents avec monitoring</li>
                    <li>Systèmes de stockage lithium-ion</li>
                    <li>Garantie 25 ans sur les panneaux</li>
                    <li>Maintenance préventive incluse</li>
                </ul>
                <div class="mt-4 p-3 bg-amber-50 rounded-lg">
                    <p class="text-sm"><strong>Rendement :</strong> Production optimisée pour le climat sahélien avec une efficacité supérieure de 15% par rapport aux standards du marché.</p>
                </div>
            `
        },
        'solar-carports': {
            title: 'Ombrières Photovoltaïques',
            description: 'Transformez vos espaces de stationnement en centrales électriques intelligentes. Nos ombrières photovoltaïques combinent protection des véhicules et production d\'énergie verte, offrant un retour sur investissement rapide tout en contribuant à la transition énergétique.',
            image: 'https://placehold.co/800x400/10b981/ffffff?text=Ombrières+Photovoltaïques',
            details: `
                <h4 class="font-semibold text-slate-800 mb-2">Avantages des ombrières :</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>Protection des véhicules contre le soleil</li>
                    <li>Production d'électricité pour l'auto-consommation</li>
                    <li>Possibilité de recharge de véhicules électriques</li>
                    <li>Structure en acier galvanisé anti-corrosion</li>
                    <li>Installation rapide et modulaire</li>
                </ul>
                <div class="mt-4 p-3 bg-green-50 rounded-lg">
                    <p class="text-sm"><strong>Économies :</strong> Réduction de 40-60% de votre facture électrique selon la taille de l'installation.</p>
                </div>
            `
        },
        'residential-project': {
            title: 'Installation Résidentielle - Villa à Bamako',
            description: 'Installation complète d\'un système solaire autonome pour une villa moderne à Bamako. Ce projet démontre notre capacité à concevoir des solutions sur-mesure pour les particuliers, garantissant confort et économies d\'énergie.',
            image: 'https://placehold.co/800x400/334155/ffffff?text=Installation+Résidentielle',
            details: `
                <h4 class="font-semibold text-slate-800 mb-2">Spécifications du projet :</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>Puissance PV installée : 24 kWc</li>
                    <li>Puissance convertisseur : 10 kWh</li>
                    <li>Batteries de stockage LFPO4: 12000 kWh</li>
                    <li>Durée d'installation : 3 jours</li>
                    <li>Économies annuelles : 800 000 FCFA</li>
                </ul>
                <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p class="text-sm"><strong>Résultat :</strong> Autonomie énergétique complète avec retour sur investissement en 4 ans.</p>
                </div>
            `
        },
        'pharmacy-project': {
            title: 'Alimentation Continue - Pharmacie',
            description: 'Solution d\'alimentation électrique continue pour une pharmacie de Mopti, garantissant la conservation des médicaments et la continuité de service même en cas de coupure d\'électricité.',
            image: 'https://placehold.co/800x400/10b981/ffffff?text=Projet+Pharmacie',
            details: `
                <h4 class="font-semibold text-slate-800 mb-2">Solution mise en place :</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>Système hybride solaire-réseau</li>
                    <li>Puissance PV: 24 kWc</li>
                    <li>Convertisseur: 12 KVA</li>
                    <li>Batteries LFPO4 : 40 kWh</li>
                    <li>Autonomie : 12 heures</li>
                    <li>Production annuelle: 13 000 kWh</li>
                    <li>Monitoring en temps réel</li>
                    <li>Impact : Zéro interruption de service depuis l'installation, préservation optimale des médicaments.</li>
                    
                </ul>
                <div class="mt-4 p-3 bg-green-50 rounded-lg">
                    <p class="text-sm"><strong>Résultat :</strong> Autonomie énergétique complète avec retour sur investissement en 4 ans.</p>
                </div>
            `
        },
        'industrial-project': {
            title: 'Centrale Solaire Industrielle',
            description: 'Installation d\'une centrale solaire pour alimenter les besoins énergétiques de GSK Logistics à Senou. Ce projet démontre notre expertise dans les installations de grande envergure.',
            image: 'https://placehold.co/800x400/0ea5e9/ffffff?text=Centrale+Industrielle',
            details: `
                <h4 class="font-semibold text-slate-800 mb-2">Caractéristiques techniques :</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>Puissance totale : 80 kWc</li>
                    <li>Production annuelle : 75 000 kWh</li>
                    <li>Réduction CO2 : 35 tonnes/an</li>
                    <li>Durée d'installation : 2 semaines</li>
                    <li>Économies : 40% de la facture électrique</li>
                </ul>
                <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p class="text-sm"><strong>Résultat :</strong> Réduction significative des coûts opérationnels et amélioration de la compétitivité de l'entreprise.</p>
                </div>
            `
        }
    };

    // Function to open modal
    function openModal(modalId) {
        console.log('Opening modal for:', modalId);
        const data = modalData[modalId];
        if (data) {
            console.log('Modal data found:', data.title);
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalImage.src = data.image;
            modalImage.alt = data.title;
            modalDetails.innerHTML = data.details;
            modal.classList.remove('hidden');
            modal.style.display = 'flex'; // Force display
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            console.log('Modal should now be visible');
            
            // Reinitialize Lucide icons in modal
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        } else {
            console.log('No modal data found for:', modalId);
        }
    }

    // Function to close modal
    function closeModal() {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        document.body.style.overflow = ''; // Restore scrolling
        console.log('Modal closed');
    }

    // Event listeners for modal triggers
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    console.log('Modal triggers found:', modalTriggers.length);
    
    modalTriggers.forEach((trigger, index) => {
        console.log(`Modal trigger ${index}:`, trigger);
        console.log(`Modal trigger ${index} data-modal:`, trigger.getAttribute('data-modal'));
        
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const modalId = trigger.getAttribute('data-modal');
            console.log('Modal trigger clicked:', modalId);
            openModal(modalId);
        });
    });

    // Event listeners for closing modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });



    // --- Performance Optimizations ---
    
    // Optimized scroll handler for better performance
    let scrollTimeout;
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.getElementById('hero-slider');
        if (heroSection && window.innerWidth > 768) { // Only on desktop
            const rate = scrolled * -0.2; // Reduced parallax for better performance
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // Optimized Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation (only on desktop)
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.card, .section-title, .section-subtitle').forEach(el => {
            observer.observe(el);
        });
    }

    // --- Form Handling ---
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
        });
    }

    // --- Ensure cards are visible after page load ---
    setTimeout(() => {
        // Force visibility of all cards if they're not showing
        document.querySelectorAll('.card').forEach(card => {
            if (card.offsetHeight === 0 || card.style.display === 'none') {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            }
        });
        
        // Reinitialize AOS if needed
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 1000);
});
