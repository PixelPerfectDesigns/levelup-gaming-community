// js/script.js - Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            navToggle.classList.toggle('nav__toggle--active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('nav__menu--active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav__menu--active');
                navToggle.classList.remove('nav__toggle--active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('nav__menu--active');
                navToggle.classList.remove('nav__toggle--active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });    });

    // Enhanced Form handling with thank you messages
    const registrationForm = document.getElementById('registration-form');
    const registrationFormHero = document.getElementById('registration-form-hero');
    const contactForm = document.getElementById('contact-form');

    // Form submission handler
    function handleFormSubmission(form, thankYouMessage) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                field.classList.remove('error');
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                }
            });

            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                }
            });

            // Password confirmation validation (for registration form)
            if (form.id === 'registration-form') {
                const password = form.querySelector('#password');
                const confirmPassword = form.querySelector('#confirmPassword');
                if (password && confirmPassword && password.value !== confirmPassword.value) {
                    isValid = false;
                    confirmPassword.classList.add('error');
                    showErrorMessage('Passwords do not match!');
                    return;
                }
            }
            
            if (isValid) {
                // Simulate form submission with loading state
                showLoadingState(form);
                
                // Simulate server delay
                setTimeout(() => {
                    showThankYouMessage(form, thankYouMessage);
                }, 1500);
            } else {
                showErrorMessage('Please fill in all required fields correctly.');
            }
        });
    }

    // Initialize form handlers
    const registrationThankYou = {
        title: "Welcome to LevelUp Gaming!",
        message: "Thank you for joining our community! We've sent a confirmation email with next steps to get started.",
        email: "Please check your email and click the verification link to activate your account."
    };

    if (registrationForm) {
        handleFormSubmission(registrationForm, registrationThankYou);
    }

    if (registrationFormHero) {
        handleFormSubmission(registrationFormHero, registrationThankYou);
    }

    if (contactForm) {
        handleFormSubmission(contactForm, {
            title: "Message Received!",
            message: "Thank you for contacting us! We've received your message and will get back to you soon.",
            email: "We'll send our response to the email address you provided within 24-48 hours."
        });
    }

    // Helper functions for form handling
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        submitBtn.style.opacity = '0.7';
        
        // Store original text for potential reuse
        submitBtn.dataset.originalText = originalText;
    }

    function showThankYouMessage(form, thankYouConfig) {
        let formContainer;
        
        // Handle different forms and their containers
        if (form.id === 'registration-form-hero') {
            // Direct selection of the container for the hero form
            formContainer = form.closest('.registration__content');
        } else if (form.id === 'registration-form') {
            formContainer = form.closest('.registration__content');
        } else {
            formContainer = form.closest('.registration-form, .contact-form, .form-container');
        }
        
        // If no container found, use the form's parent
        if (!formContainer) {
            formContainer = form.parentElement;
        }
        
        // Create thank you message HTML
        const thankYouHTML = `
            <div class="thank-you-message" style="text-align: center; padding: 3rem 2rem; animation: fadeInUp 0.6s ease-out;">
                <div class="thank-you-icon" style="font-size: 4rem; margin-bottom: 1.5rem; color: var(--accent-color);">
                    ✅
                </div>
                <h2 style="color: var(--primary-color); margin-bottom: 1rem; font-size: 2rem;">
                    ${thankYouConfig.title}
                </h2>
                <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: var(--color-text-dark); line-height: 1.6;">
                    ${thankYouConfig.message}
                </p>
                <div style="background: rgba(var(--primary-color-rgb, 65, 105, 225), 0.1); padding: 1rem; border-radius: var(--border-radius); margin-bottom: 2rem;">
                    <p style="color: var(--primary-color); font-weight: 600; margin: 0;">
                        📧 ${thankYouConfig.email}
                    </p>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button onclick="location.reload()" class="btn btn--secondary" style="padding: 0.75rem 1.5rem;">
                        Submit Another ${form.id.includes('registration') ? 'Registration' : 'Message'}
                    </button>
                    <a href="index.html" class="btn btn--primary" style="padding: 0.75rem 1.5rem; text-decoration: none;">
                        Return to Home
                    </a>
                </div>
            </div>
        `;
        
        // Add CSS animation for smooth transition
        if (!document.querySelector('#thankYouStyles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'thankYouStyles';
            styleSheet.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .form-fade-out {
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.4s ease-out;
                }
            `;
            document.head.appendChild(styleSheet);
        }
        
        // Animate form out
        form.classList.add('form-fade-out');
        
        // Replace form with thank you message after animation
        setTimeout(() => {
            // Clear entire container and add thank you message
            formContainer.innerHTML = thankYouHTML;
            
            // Make sure the container is visible
            formContainer.style.display = 'flex';
            formContainer.style.flexDirection = 'column';
            
            // Ensure visibility on hero form container specifically
            if (form.id === 'registration-form-hero') {
                const heroContainer = document.querySelector('.registration__content');
                if (heroContainer) {
                    heroContainer.style.display = 'flex';
                    heroContainer.style.flexDirection = 'column';
                }
            }
        }, 400);
    }

    function showErrorMessage(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error-message-popup');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message popup
        const errorPopup = document.createElement('div');
        errorPopup.className = 'error-message-popup';
        errorPopup.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: var(--error-color, #f44336); color: white; padding: 1rem 1.5rem; border-radius: var(--border-radius); box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 10000; animation: slideInRight 0.3s ease-out;">
                <span style="margin-right: 1rem;">⚠️</span>
                ${message}
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.2rem; float: right; cursor: pointer; padding: 0; margin-left: 1rem;">×</button>
            </div>
        `;
        
        document.body.appendChild(errorPopup);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorPopup.parentElement) {
                errorPopup.remove();
            }
        }, 5000);
        
        // Add slide in animation
        if (!document.querySelector('#errorStyles')) {
            const errorStyles = document.createElement('style');
            errorStyles.id = 'errorStyles';
            errorStyles.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(errorStyles);
        }
    }

    // Add error styles for form validation
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: var(--error-color, #f44336) !important;
            box-shadow: 0 0 5px rgba(244, 67, 54, 0.3) !important;
        }
    `;
    document.head.appendChild(style);

    // Card hover effects (if needed)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize animations if AOS is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    console.log('LevelUp Gaming website loaded successfully!');
});

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils if needed
window.LevelUpUtils = utils;
