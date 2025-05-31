// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = 'none';
    }
});

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
    });
});

// Mobile navigation toggle
const createMobileNav = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.insertBefore(mobileMenuBtn, navLinks);

    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #2563eb;
            cursor: pointer;
            padding: 0.5rem;
        }
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            .nav-links, .nav-actions {
                display: none;
                width: 100%;
                text-align: center;
            }
            .nav-links.active, .nav-actions.active {
                display: flex;
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navActions.classList.toggle('active');
    });
};

// Initialize mobile navigation
createMobileNav();

// Feature cards animation
const animateFeatureCards = () => {
    const cards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
};

// Initialize feature cards animation
animateFeatureCards();

// Form validation for login/signup
const validateForm = (form) => {
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');
    let isValid = true;

    if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    if (password && password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters long');
        isValid = false;
    }

    return isValid;
};

const showError = (input, message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc2626';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    const parent = input.parentElement;
    const existingError = parent.querySelector('.error-message');
    if (existingError) {
        parent.removeChild(existingError);
    }
    parent.appendChild(errorDiv);
};

// Add form validation to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
            e.preventDefault();
        }
    });
}); 