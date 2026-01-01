// Fireworks animation with mobile performance optimizations

const fireworksCanvas = document.getElementById('fireworks-canvas');
const ctx = fireworksCanvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Fireworks particles
const particles = [];
let animationId = null;
let isActive = false;

// Mobile performance optimization
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const maxParticles = isMobile ? 50 : 150; // Limit particles on mobile
const particleSize = isMobile ? 2 : 3;

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.size = Math.random() * particleSize + 1;
    }
    
    update() {
        this.velocity.y += 0.05; // Gravity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
        this.size *= 0.99;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Launch fireworks from random positions
function launchFireworks(count = 5) {
    if (isActive) return; // Prevent multiple launches
    
    isActive = true;
    particles.length = 0; // Clear existing particles
    
    // Adjust count based on device
    const fireworkCount = isMobile ? Math.min(3, count) : count;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * fireworksCanvas.width,
                Math.random() * fireworksCanvas.height * 0.5 + fireworksCanvas.height * 0.25
            );
        }, i * 300);
    }
    
    // Auto-stop after duration (shorter on mobile)
    const duration = isMobile ? 5000 : 8000;
    setTimeout(stopFireworks, duration);
    
    // Start animation if not already running
    if (!animationId) {
        animate();
    }
}

function createFirework(x, y) {
    const colors = [
        '#ff5e7d', '#ff8a00', '#ffe300', '#59ff00', 
        '#00ffc8', '#00a6ff', '#9d4dff', '#ff4da6'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 50 && particles.length < maxParticles; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    // Clear canvas with transparency for trailing effect
    ctx.fillStyle = 'rgba(10, 25, 47, 0.1)';
    ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        // Remove dead particles
        if (particles[i].alpha <= 0 || particles[i].size <= 0.5) {
            particles.splice(i, 1);
        }
    }
    
    // Continue animation if there are particles or fireworks are active
    if (particles.length > 0 || isActive) {
        animationId = requestAnimationFrame(animate);
    } else {
        animationId = null;
    }
}

function stopFireworks() {
    isActive = false;
    // Let remaining particles fade out naturally
}

// Export functions for use in main script
window.launchFireworks = launchFireworks;
window.stopFireworks = stopFireworks;