 
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
            setupFeaturedSlider();
            setupCategoryCards();
            setupContentFilter();
            
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
            
            // Banner slider functionality
            setupBannerSlider();
            
            // Content card interactions
            setupContentCards();
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

        // Featured slider functionality
        function setupFeaturedSlider() {
            const slides = document.querySelectorAll('.featured-slide');
            const indicators = document.querySelectorAll('.featured-indicators .indicator');
            const prevBtn = document.querySelector('.featured-control.prev');
            const nextBtn = document.querySelector('.featured-control.next');
            
            let currentSlide = 0;
            let slideInterval;
            
            // Function to show a specific slide
            function showSlide(index) {
                // Remove active class from all slides and indicators
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Add active class to current slide and indicator
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
                
                currentSlide = index;
            }
            
            // Function to go to next slide
            function nextSlide() {
                let nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            }
            
            // Function to go to previous slide
            function prevSlide() {
                let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            }
            
            // Start auto slide
            function startSlideShow() {
                slideInterval = setInterval(nextSlide, 6000);
            }
            
            // Stop auto slide
            function stopSlideShow() {
                clearInterval(slideInterval);
            }
            
            // Event listeners for controls
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    stopSlideShow();
                    nextSlide();
                    startSlideShow();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    stopSlideShow();
                    prevSlide();
                    startSlideShow();
                });
            }
            
            // Event listeners for indicators
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    stopSlideShow();
                    showSlide(parseInt(this.getAttribute('data-index')));
                    startSlideShow();
                });
            });
            
            // Pause slideshow when hovering over slider
            const featuredSlider = document.querySelector('.featured-slider-container');
            if (featuredSlider) {
                featuredSlider.addEventListener('mouseenter', stopSlideShow);
                featuredSlider.addEventListener('mouseleave', startSlideShow);
            }
            
            // Start the slideshow
            startSlideShow();
        }

        // Add category card hover effects
        function setupCategoryCards() {
            const categoryCards = document.querySelectorAll('.category-card');
            
            categoryCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.zIndex = '10';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.zIndex = '';
                });
            });
        }

        // Content filter functionality
        function setupContentFilter() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const contentCards = document.querySelectorAll('.content-card');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    // Filter content cards
                    contentCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }

        // Content card interactions
        function setupContentCards() {
            const contentCards = document.querySelectorAll('.content-card');
            
            contentCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.zIndex = '10';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.zIndex = '';
                });
                
                // Add click event to play button
                const playBtn = card.querySelector('.action-btn:first-child');
                if (playBtn) {
                    playBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        alert('Playing content...');
                    });
                }
            });
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

        // Banner slider functionality
        function setupBannerSlider() {
            const slides = document.querySelectorAll('.banner-slide');
            const indicators = document.querySelectorAll('.indicator');
            const prevBtn = document.querySelector('.banner-control.prev');
            const nextBtn = document.querySelector('.banner-control.next');
            
            let currentSlide = 0;
            let slideInterval;
            
            // Function to show a specific slide
            function showSlide(index) {
                // Remove active class from all slides and indicators
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Add active class to current slide and indicator
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
                
                currentSlide = index;
            }
            
            // Function to go to next slide
            function nextSlide() {
                let nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            }
            
            // Function to go to previous slide
            function prevSlide() {
                let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            }
            
            // Start auto slide
            function startSlideShow() {
                slideInterval = setInterval(nextSlide, 5000);
            }
            
            // Stop auto slide
            function stopSlideShow() {
                clearInterval(slideInterval);
            }
            
            // Event listeners for controls
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    stopSlideShow();
                    nextSlide();
                    startSlideShow();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    stopSlideShow();
                    prevSlide();
                    startSlideShow();
                });
            }
            
            // Event listeners for indicators
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    stopSlideShow();
                    showSlide(parseInt(this.getAttribute('data-index')));
                    startSlideShow();
                });
            });
            
            // Pause slideshow when hovering over banner
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.addEventListener('mouseenter', stopSlideShow);
                heroSection.addEventListener('mouseleave', startSlideShow);
            }
            
            // Start the slideshow
            startSlideShow();
        }

        // Check for saved theme on page load
        checkSavedTheme();