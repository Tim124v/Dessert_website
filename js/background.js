document.addEventListener('DOMContentLoaded', () => {
    const shapes = ['🍰', '🎂', '🧁', '🍪', '🍫'];
    const container = document.querySelector('.floating-shapes');
    
    function createShape() {
        const shape = document.createElement('div');
        const emoji = shapes[Math.floor(Math.random() * shapes.length)];
        
        shape.style.cssText = `
            position: absolute;
            font-size: ${20 + Math.random() * 30}px;
            left: ${Math.random() * 100}vw;
            top: -50px;
            opacity: ${0.3 + Math.random() * 0.7};
            transform: rotate(${Math.random() * 360}deg);
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        
        shape.textContent = emoji;
        container.appendChild(shape);
        
        shape.addEventListener('animationend', () => {
            shape.remove();
        });
    }
    
    setInterval(createShape, 1000);
});

// Добавляем стили для анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style); 