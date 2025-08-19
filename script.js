// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Set up all functionality
    initApp();
});

function initApp() {
    // Sticky header
    window.addEventListener('scroll', stickyHeader);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Dark/Light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // FAQ accordion functionality
    setupFAQAccordion();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Animated CTA button
    setupAnimatedCTA();
}

// Sticky header functionality
function stickyHeader() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburger.children[1].style.opacity = '0';
        hamburger.children[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        navLinks.style.display = 'none';
        hamburger.children[0].style.transform = 'none';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'none';
    }
}

// Dark/Light mode toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference
function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// FAQ accordion functionality
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            
            // Toggle active class on question
            question.classList.toggle('active');
            
            // Toggle answer visibility
            answer.classList.toggle('active');
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navLinksContainer = document.querySelector('.nav-links');
                
                if (hamburger.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animated CTA button
function setupAnimatedCTA() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(229, 9, 20, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add pulse animation every 5 seconds
        setInterval(() => {
            button.classList.add('pulse');
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 1000);
        }, 5000);
    });
}

// Check for saved theme on page load
checkSavedTheme();

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .btn-primary.pulse {
        animation: pulse 1s ease;
    }
`;
document.head.appendChild(style);