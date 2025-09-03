import { products as fallbackProducts } from '../data/products.js';
import { addToCart, updateCartUI } from './cart.js';

// State management
const state = {
    products: fallbackProducts,
    filters: {
        category: '',
        search: ''
    }
};

// DOM elements cache
const elements = {
    grid: null,
    categorySelect: null,
    searchInput: null
};

// Utility functions
const utils = {
    debounce(func, wait) {
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

    showError(message) {
        console.error('Error:', message);
        // Could add toast notification here
    }
};

// Product rendering
function renderProducts(products) {
    if (!elements.grid) return;
    
    elements.grid.innerHTML = '';
    
    if (!products.length) {
        elements.grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
                <h3>Nie znaleziono produktów</h3>
                <p>Spróbuj zmienić filtry wyszukiwania</p>
            </div>
        `;
        return;
    }

    const fragment = document.createDocumentFragment();
    
    products.forEach((product) => {
        const card = createProductCard(product);
        fragment.appendChild(card);
    });
    
    elements.grid.appendChild(fragment);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'cake-card';
    card.innerHTML = `
        <img src="${product.img}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p class="description">${product.description || ''}</p>
        <p class="price">Od ${product.price} zł</p>
        <div style="display:flex;gap:8px;">
            <button type="button" class="btn" data-product-id="${product.id}">Do koszyka</button>
            <a class="btn" href="./product.html?id=${product.id}" style="background:#555;border-color:#555">Szczegóły</a>
        </div>
    `;
    return card;
}

// Filtering logic
function applyFilters() {
    const { category, search } = state.filters;
    
    const filtered = state.products.filter(product => {
        const matchCategory = !category || product.category === category;
        const matchSearch = !search || 
            product.name.toLowerCase().includes(search.toLowerCase()) || 
            (product.description || '').toLowerCase().includes(search.toLowerCase());
        
        return matchCategory && matchSearch;
    });
    
    renderProducts(filtered);
}

function updateFilters(type, value) {
    state.filters[type] = value;
    applyFilters();
}

// Event handlers
function handleProductClick(event) {
    const target = event.target;
    
    if (target.matches('button[data-product-id]')) {
        const productId = Number(target.getAttribute('data-product-id'));
        const product = state.products.find(p => p.id === productId);
        
        if (product) {
            addToCart(product);
            // Visual feedback
            target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                target.style.transform = '';
            }, 150);
        }
    }
}

// Data loading
async function loadProductsJSON() {
    try {
        const response = await fetch('./data/products.json', { 
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        
        if (Array.isArray(products) && products.length > 0) {
            state.products = products;
            return true;
        }
        
        return false;
    } catch (error) {
        utils.showError('Failed to load products: ' + error.message);
        return false;
    }
}

// Initialization
async function initialize() {
    try {
        // Cache DOM elements
        elements.grid = document.getElementById('cakes-grid');
        elements.categorySelect = document.getElementById('category-filter');
        elements.searchInput = document.getElementById('search-input');
        
        if (!elements.grid) {
            throw new Error('Products grid not found');
        }
        
        // Load products
        await loadProductsJSON();
        
        // Render initial state
        renderProducts(state.products);
        
        // Setup event listeners
        setupEventListeners();
        
        // Update cart UI
        updateCartUI();
        
    } catch (error) {
        utils.showError('Initialization failed: ' + error.message);
    }
}

function setupEventListeners() {
    // Product grid clicks
    if (elements.grid) {
        elements.grid.addEventListener('click', handleProductClick);
    }
    
    // Category filter
    if (elements.categorySelect) {
        elements.categorySelect.addEventListener('change', (e) => {
            updateFilters('category', e.target.value);
        });
    }
    
    // Search input with debouncing
    if (elements.searchInput) {
        const debouncedSearch = utils.debounce((e) => {
            updateFilters('search', e.target.value);
        }, 300);
        
        elements.searchInput.addEventListener('input', debouncedSearch);
    }
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            const expanded = mobileMenuBtn.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
        
        // Close menu when clicking on links
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initialize();
    setupMobileMenu();
});

// Export for potential external use
window.productCatalog = {
    state,
    renderProducts,
    applyFilters,
    updateFilters
};