import { products as fallbackProducts } from '../data/products.js';
import { addToCart, updateCartUI } from './cart.js';

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');

    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            const expanded = mobileMenuBtn.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });

        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const grid = document.getElementById('cakes-grid');
    const categorySelect = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');

    function render(list) {
        if (!grid) return;
        grid.innerHTML = '';
        const fragment = document.createDocumentFragment();
        list.forEach((p) => {
            const card = document.createElement('div');
            card.className = 'cake-card';
            card.innerHTML = `
                <img src="${p.img}" alt="${p.name}" loading="lazy">
                <h3>${p.name}</h3>
                <p class="description">${p.description || ''}</p>
                <p class="price">Od ${p.price} zł</p>
                <div style="display:flex;gap:8px;">
                    <button type="button" class="btn" data-product-id="${p.id}">Do koszyka</button>
                    <a class="btn" href="./product.html?id=${p.id}" style="background:#555;border-color:#555">Szczegóły</a>
                </div>
            `;
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);
    }

    function applyFilters() {
        const q = (searchInput?.value || '').toLowerCase();
        const cat = categorySelect?.value || '';
        const filtered = state.products.filter(p => {
            const matchCat = !cat || p.category === cat;
            const matchQ = !q || p.name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q);
            return matchCat && matchQ;
        });
        render(filtered);
    }

    const state = { products: fallbackProducts };

    async function loadProductsJSON() {
        try {
            const res = await fetch('./data/products.json', { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                if (Array.isArray(json) && json.length) {
                    state.products = json;
                }
            }
        } catch (e) {}
    }

    if (grid) {
        render(state.products);
        loadProductsJSON().then(() => applyFilters());
        grid.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.matches('button[data-product-id]')) {
                const id = Number(target.getAttribute('data-product-id'));
                const product = state.products.find(pr => pr.id === id);
                if (product) addToCart(product);
            }
        });
    }

    categorySelect?.addEventListener('change', applyFilters);
    searchInput?.addEventListener('input', applyFilters);

    updateCartUI();
});