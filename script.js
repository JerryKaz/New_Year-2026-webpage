// Main JavaScript file for Happy New Year 2026 website - Mobile Optimized

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const mobileThemeIcon = mobileThemeToggle?.querySelector('i');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const yearProgress = document.getElementById('year-progress');
const progressText = document.getElementById('progress-text');
const fireworksBtn = document.getElementById('fireworks-btn');
const mobileCelebrateBtn = document.getElementById('mobile-celebrate');
const shareResolutionBtn = document.getElementById('share-resolution');
const resolutionInput = document.getElementById('resolution-input');
const currentYearElement = document.getElementById('current-year');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');

// Mobile detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Add touch device class for CSS targeting
if (isTouchDevice) {
    document.body.classList.add('touch-device');
}

// Mobile menu functionality
if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
        mobileMenuToggle.style.display = 'none';
        document.body.style.overflow = 'hidden';
    });
    
    mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuToggle.style.display = 'flex';
        document.body.style.overflow = 'auto';
    });
    
    // Close mobile menu when clicking on a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuToggle.style.display = 'flex';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Show/hide mobile menu toggle based on screen size
    function updateMobileMenuVisibility() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'flex';
            document.querySelector('.desktop-nav').style.display = 'none';
            document.querySelector('.desktop-theme-toggle').style.display = 'none';
        } else {
            mobileMenuToggle.style.display = 'none';
            mobileNav.classList.remove('active');
            document.querySelector('.desktop-nav').style.display = 'flex';
            document.querySelector('.desktop-theme-toggle').style.display = 'flex';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Initial check and resize listener
    updateMobileMenuVisibility();
    window.addEventListener('resize', updateMobileMenuVisibility);
}

// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    
    const isLightTheme = document.body.classList.contains('light-theme');
    const iconClass = isLightTheme ? 'fa-sun' : 'fa-moon';
    const oppositeIconClass = isLightTheme ? 'fa-moon' : 'fa-sun';
    
    // Update both desktop and mobile theme icons
    if (themeIcon) {
        themeIcon.classList.remove(oppositeIconClass);
        themeIcon.classList.add(iconClass);
    }
    
    if (mobileThemeIcon) {
        mobileThemeIcon.classList.remove(oppositeIconClass);
        mobileThemeIcon.classList.add(iconClass);
    }
    
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
}

// Add event listeners for theme toggles
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    if (mobileThemeIcon) {
        mobileThemeIcon.classList.remove('fa-moon');
        mobileThemeIcon.classList.add('fa-sun');
    }
}

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Countdown to New Year 2026
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const newYear = new Date(`January 1, ${currentYear + 1} 00:00:00`);
    const diff = newYear - now;
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Update DOM elements with animation
    animateCounter(daysElement, days);
    animateCounter(hoursElement, hours);
    animateCounter(minutesElement, minutes);
    animateCounter(secondsElement, seconds);
    
    // Calculate and update year progress
    const startOfYear = new Date(`January 1, ${currentYear} 00:00:00`);
    const endOfYear = new Date(`December 31, ${currentYear} 23:59:59`);
    const totalYearTime = endOfYear - startOfYear;
    const elapsedYearTime = now - startOfYear;
    const progressPercentage = (elapsedYearTime / totalYearTime) * 100;
    
    // Animate progress bar
    yearProgress.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage.toFixed(2)}% of ${currentYear} completed`;
    
    // If it's New Year, trigger celebration
    if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10) {
        triggerCelebration();
    }
}

// Animate counter changes
function animateCounter(element, newValue) {
    const currentValue = parseInt(element.textContent);
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#ff6b6b';
        
        setTimeout(() => {
            element.textContent = newValue.toString().padStart(2, '0');
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 150);
    }
}

// Trigger celebration effects
function triggerCelebration() {
    // Launch fireworks
    if (typeof launchFireworks === 'function') {
        launchFireworks();
    }
    
    // Launch confetti
    if (typeof launchConfetti === 'function') {
        launchConfetti();
    }
    
    // On mobile, reduce intensity for performance
    if (isMobile) {
        // Limit fireworks/confetti duration on mobile
        setTimeout(() => {
            if (typeof stopFireworks === 'function') stopFireworks();
            if (typeof stopConfetti === 'function') stopConfetti();
        }, 5000);
    }
    
    // Show celebration message
    showNotification("Happy New Year 2026! 🎉");
    
    // Vibrate on mobile if supported
    if (navigator.vibrate && isMobile) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }
}

// Show notification with mobile-friendly design
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-glass-cheers"></i>
            <p>${message}</p>
        </div>
    `;
    
    // Style the notification for mobile/desktop
    const isMobileView = window.innerWidth <= 768;
    notification.style.cssText = `
        position: fixed;
        ${isMobileView ? 'bottom: 20px; left: 20px; right: 20px;' : 'top: 100px; right: 20px;'}
        background: var(--card-bg);
        color: var(--text-color);
        padding: ${isMobileView ? '15px' : '20px'};
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        border-left: 5px solid var(--accent-color);
        z-index: 1000;
        animation: ${isMobileView ? 'slideUp 0.5s ease' : 'slideIn 0.5s ease'};
        max-width: ${isMobileView ? 'calc(100vw - 40px)' : '350px'};
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .notification-content i {
            font-size: ${isMobileView ? '1.2rem' : '1.5rem'};
            color: var(--accent-color);
        }
        .notification-content p {
            margin: 0;
            font-size: ${isMobileView ? '0.9rem' : '1rem'};
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Auto-remove notification
    const removeNotification = () => {
        notification.style.animation = `${isMobileView ? 'slideDown' : 'slideOut'} 0.5s ease forwards`;
        
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes slideDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(slideOutStyle);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
            document.head.removeChild(slideOutStyle);
            document.head.removeChild(style);
        }, 500);
    };
    
    // Remove after 5 seconds
    const autoRemoveTimer = setTimeout(removeNotification, 5000);
    
    // Also remove on click/tap
    notification.addEventListener('click', () => {
        clearTimeout(autoRemoveTimer);
        removeNotification();
    });
}

// Share resolution functionality
shareResolutionBtn.addEventListener('click', () => {
    const resolution = resolutionInput.value.trim();
    
    if (resolution) {
        // In a real app, you would send this to a backend
        // For demo purposes, we'll just show a notification
        showNotification(`Resolution saved: "${resolution.substring(0, 50)}${resolution.length > 50 ? '...' : ''}"`);
        
        // Clear the input
        resolutionInput.value = '';
        
        // Add to local storage for demo
        const resolutions = JSON.parse(localStorage.getItem('newYearResolutions') || '[]');
        resolutions.push({
            text: resolution,
            date: new Date().toISOString()
        });
        localStorage.setItem('newYearResolutions', JSON.stringify(resolutions));
        
        // Blur the button for better mobile UX
        shareResolutionBtn.blur();
    } else {
        showNotification("Please enter your resolution first!");
    }
});

// Fireworks button event listeners
if (fireworksBtn) {
    fireworksBtn.addEventListener('click', triggerCelebration);
    fireworksBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent double-tap zoom
        fireworksBtn.style.transform = 'scale(0.95)';
    });
    fireworksBtn.addEventListener('touchend', () => {
        fireworksBtn.style.transform = '';
    });
}

if (mobileCelebrateBtn) {
    mobileCelebrateBtn.addEventListener('click', triggerCelebration);
}

// Smooth scrolling for navigation links with mobile considerations
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate offset based on screen size
            const isMobileView = window.innerWidth <= 768;
            const headerHeight = isMobileView ? 70 : 90;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// Handle orientation change on mobile
let portrait = window.matchMedia("(orientation: portrait)");
portrait.addEventListener("change", function(e) {
    // Reload countdown to adjust layout if needed
    updateCountdown();
});

// Touch-friendly enhancements for countdown on mobile
if (isTouchDevice) {
    const countdownBoxes = document.querySelectorAll('.countdown-box');
    countdownBoxes.forEach(box => {
        box.addEventListener('touchstart', () => {
            box.style.transform = 'scale(0.95)';
        });
        
        box.addEventListener('touchend', () => {
            box.style.transform = 'scale(1)';
        });
    });
}

// Performance optimization: Reduce animation intensity on low-end devices
if (isMobile && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Reduce animation duration for better performance
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    
    // Limit expensive animations
    const style = document.createElement('style');
    style.textContent = `
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Load saved resolutions on page load
window.addEventListener('load', () => {
    const savedResolutions = JSON.parse(localStorage.getItem('newYearResolutions') || '[]');
    if (savedResolutions.length > 0) {
        console.log(`You have ${savedResolutions.length} saved resolutions`);
    }
    
    // Adjust layout for very small screens
    if (window.innerWidth < 320) {
        document.querySelector('.logo h1').style.fontSize = '1.2rem';
    }
});

// Handle viewport changes for ultra-wide screens
function handleViewportChanges() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Adjust font sizes for very wide screens
    if (vw > 2000) {
        document.documentElement.style.fontSize = '18px';
    } else if (vw > 1400) {
        document.documentElement.style.fontSize = '17px';
    } else {
        document.documentElement.style.fontSize = '16px';
    }
    
    // Adjust layout for very tall screens
    if (vh > 1200) {
        document.querySelector('.hero').style.minHeight = '90vh';
    }
}

// Initial call and resize listener
handleViewportChanges();
window.addEventListener('resize', handleViewportChanges);