document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');

    mobileMenuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });


    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
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
}); 