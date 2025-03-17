document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');

    if (!mobileMenuBtn || !menu) return;


    const toggleMenu = () => {
        menu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            toggleMenu();
        }
    });


    const styles = `
        .mobile-menu-btn {
            width: 30px;
            height: 20px;
            position: relative;
        }

        .mobile-menu-btn span {
            display: block;
            width: 100%;
            height: 2px;
            background: #ff69b4;
            position: absolute;
            transition: all 0.3s ease;
        }

        .mobile-menu-btn span:nth-child(1) { top: 0; }
        .mobile-menu-btn span:nth-child(2) { top: 9px; }
        .mobile-menu-btn span:nth-child(3) { top: 18px; }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg);
            top: 9px;
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg);
            top: 9px;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Объединить обработчики событий для кнопок
    const handleScroll = (e) => {
        e.preventDefault();
        const orderSection = document.getElementById('order');
        orderSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Обработчик для кнопок в каталоге
    document.querySelectorAll('.catalog .cake-card .btn').forEach(button => {
        button.addEventListener('click', handleScroll);
    });

    // Обработчик для кнопки в hero секции
    const heroButton = document.querySelector('.hero .btn');
    if (heroButton) {
        heroButton.addEventListener('click', handleScroll);
    }

    // Добавим обработчик для плавной загрузки изображений
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading');
        img.onload = function() {
            img.classList.remove('loading');
        };
    });
}); 