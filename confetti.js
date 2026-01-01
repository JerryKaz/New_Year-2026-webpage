// Confetti animation with mobile performance optimizations

const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');

// Set canvas size
function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

resizeConfettiCanvas();
window.addEventListener('resize', resizeConfettiCanvas);

// Confetti particles
const confettiParticles = [];
let confettiAnimationId = null;
let confettiActive = false;

// Mobile performance settings
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const maxConfettiParticles = isMobile ? 100 : 300;
const confettiSize = isMobile ? 8 : 12;

class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = Math.random() * confettiCanvas.height * 0.5 - 100;
        this.size = Math.random() * confettiSize + 5;
        this.speed = Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.1;
        this.wobbleOffset = Math.random() * Math.PI * 2;
    }
    
    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        
        // Wobble effect
        this.x += Math.sin(Date.now() * this.wobbleSpeed + this.wobbleOffset) * 0.5;
        
        // Reset if off screen
        if (this.y > confettiCanvas.height) {
            this.y = -this.size;
            this.x = Math.random() * confettiCanvas.width;
        }
        
        if (this.x > confettiCanvas.width + this.size) {
            this.x = -this.size;
        } else if (this.x < -this.size) {
            this.x = confettiCanvas.width + this.size;
        }
    }
    
    draw() {
        confettiCtx.save();
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate(this.rotation * Math.PI / 180);
        
        if (this.shape === 'circle') {
            confettiCtx.fillStyle = this.color;
            confettiCtx.beginPath();
            confettiCtx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            confettiCtx.fill();
        } else {
            confettiCtx.fillStyle = this.color;
            confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }
        
        confettiCtx.restore();
    }
}

// Launch confetti
function launchConfetti() {
    if (confettiActive) return;
    
    confettiActive = true;
    confettiParticles.length = 0;
    
    // Create initial particles
    const particleCount = isMobile ? 60 : 150;
    for (let i = 0; i < particleCount && confettiParticles.length < maxConfettiParticles; i++) {
        confettiParticles.push(new Confetti());
    }
    
    // Auto-stop after duration
    const duration = isMobile ? 4000 : 7000;
    setTimeout(stopConfetti, duration);
    
    // Start animation if not already running
    if (!confettiAnimationId) {
        animateConfetti();
    }
}

function animateConfetti() {
    // Clear with slight transparency for trailing effect
    confettiCtx.fillStyle = 'rgba(10, 25, 47, 0.05)';
    confettiCtx.fillRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    // Update and draw particles
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Occasionally add new particles while active
    if (confettiActive && confettiParticles.length < maxConfettiParticles && Math.random() > 0.7) {
        confettiParticles.push(new Confetti());
    }
    
    // Continue animation
    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
    confettiActive = false;
    // Let animation continue until all particles are gone
    if (confettiParticles.length === 0) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
        
        // Clear canvas
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// Export functions
window.launchConfetti = launchConfetti;
window.stopConfetti = stopConfetti;