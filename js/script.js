/**
 * Issue Addressal Portal
 * Main JavaScript functionality for interactive elements and animations
 * Enhances user experience with smooth animations and interactive QR codes
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll event for header styling
    const banner = document.querySelector('.banner');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            banner.classList.add('scrolled');
        } else {
            banner.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links with offset accounting for fixed header
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if(href.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if(targetSection) {
                    const headerOffset = 140; // Adjusted for the banner + navbar height
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    this.classList.add('active');
                }
            }
        });
    });

    // Update active navigation link on scroll
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('nav a[href="#' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('nav a[href="#' + sectionId + '"]')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavOnScroll);

    // Adding animation on scroll for how-it-works section
    const steps = document.querySelectorAll('.step');
    
    function checkScroll() {
        steps.forEach((step, index) => {
            const stepPosition = step.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(stepPosition < screenPosition) {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
                
                // Delay each step animation slightly for cascade effect
                setTimeout(() => {
                    step.classList.add('animated');
                }, 150 * index);
            }
        });
    }
    
    // Set initial state
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'all 0.7s ease';
    });
    
    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    
    function animateServiceCards() {
        serviceCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(cardPosition < screenPosition) {
                setTimeout(() => {
                    card.classList.add('animated');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 200 * index);
            }
        });
    }
    
    // Set initial state for service cards
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Check scroll on page load
    setTimeout(() => {
        checkScroll();
        animateServiceCards();
    }, 300);
    
    // Check scroll on scroll event
    window.addEventListener('scroll', () => {
        checkScroll();
        animateServiceCards();
    });
    
    // Footer heart animation enhancement
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.addEventListener('mouseenter', function() {
            this.style.animation = 'heartbeat 0.6s infinite';
            this.style.color = '#ff0066';
        });
        
        heart.addEventListener('mouseleave', function() {
            this.style.animation = 'heartbeat 1.5s infinite';
            this.style.color = '';
        });
    }
    
    // QR code hover effect and accessibility features
    const qrLinks = document.querySelectorAll('.qr-link');
    qrLinks.forEach(qrLink => {
        const qrCode = qrLink.querySelector('.qr-code');
        const scanText = qrLink.querySelector('.scan-text');
        
        qrLink.addEventListener('mousemove', function(e) {
            if (!qrCode) return;
            
            const rect = qrCode.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            qrCode.style.transform = `perspective(800px) rotateY(${moveX}deg) rotateX(${-moveY}deg) scale(1.03)`;
        });
        
        qrLink.addEventListener('mouseleave', function() {
            if (!qrCode) return;
            qrCode.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
        });
        
        // Add click feedback animation
        qrLink.addEventListener('mousedown', function() {
            if (!qrCode) return;
            qrCode.style.transform = 'perspective(800px) scale(0.98)';
        });
        
        qrLink.addEventListener('mouseup', function() {
            if (!qrCode) return;
            qrCode.style.transform = 'perspective(800px) scale(1.03)';
        });
        
        // Enhanced keyboard accessibility
        qrLink.addEventListener('focus', function() {
            if (!qrCode) return;
            // Add visual indication for keyboard focus
            qrCode.style.transform = 'perspective(800px) rotateY(5deg) rotateX(-2deg) scale(1.03)';
            qrCode.style.boxShadow = 'var(--shadow-lg)';
            
            // Enhance visual cues for keyboard users
            if (scanText) {
                scanText.style.color = 'var(--primary-dark)';
                scanText.style.transform = 'translateY(-2px)';
            }
        });
        
        qrLink.addEventListener('blur', function() {
            if (!qrCode) return;
            qrCode.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
            qrCode.style.boxShadow = '';
            
            if (scanText) {
                scanText.style.color = '';
                scanText.style.transform = '';
            }
        });
        
        // Add keyboard support for enter key
        qrLink.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                if (!qrCode) return;
                qrCode.style.transform = 'perspective(800px) scale(0.98)';
                
                setTimeout(() => {
                    qrCode.style.transform = 'perspective(800px) scale(1.03)';
                }, 100);
            }
        });
    });
});