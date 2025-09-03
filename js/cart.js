// Cart state management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cart operations
export function getCart() {
    return [...cart]; // Return copy to prevent external mutations
}

export function addToCart(product) {
    if (!product || !product.id) {
        console.error('Invalid product data');
        return false;
    }

    const existing = cart.find(p => p.id === product.id);
    
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    updateCartUI();
    return true;
}

export function removeFromCart(productId) {
    if (!productId) return false;
    
    const initialLength = cart.length;
    cart = cart.filter(p => p.id !== productId);
    
    if (cart.length !== initialLength) {
        saveCart();
        updateCartUI();
        return true;
    }
    
    return false;
}

export function updateQuantity(productId, newQty) {
    if (!productId || newQty < 1) return false;
    
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.qty = newQty;
        saveCart();
        updateCartUI();
        return true;
    }
    
    return false;
}

export function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

export function getCartTotal() {
    return cart.reduce((total, item) => {
        return total + ((item.qty || 1) * (Number(item.price) || 0));
    }, 0);
}

export function getCartCount() {
    return cart.reduce((count, item) => count + (item.qty || 1), 0);
}

// Persistence
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
}

// UI Updates
export function updateCartUI() {
    updateCartBadge();
    updateMiniCart();
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-count');
    const sumEl = document.querySelector('.cart-sum');
    
    if (badge) {
        const count = getCartCount();
        badge.textContent = String(count);
        badge.style.display = count > 0 ? 'block' : 'none';
    }
    
    if (sumEl) {
        const total = getCartTotal();
        sumEl.textContent = `${total} zł`;
        sumEl.style.display = total > 0 ? 'inline' : 'none';
    }
}

function updateMiniCart() {
    const miniCart = document.getElementById('mini-cart');
    const itemsEl = document.getElementById('mini-cart-items');
    const totalEl = document.getElementById('mini-cart-total');
    
    if (!miniCart || !itemsEl || !totalEl) return;
    
    // Clear existing items
    itemsEl.innerHTML = '';
    
    if (cart.length === 0) {
        itemsEl.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
                <p>Koszyk pusty</p>
            </div>
        `;
        totalEl.textContent = '0 zł';
        return;
    }
    
    // Render cart items
    let total = 0;
    
    cart.forEach((item) => {
        const row = createMiniCartItem(item);
        itemsEl.appendChild(row);
        
        const lineTotal = (item.qty || 1) * (Number(item.price) || 0);
        total += lineTotal;
    });
    
    totalEl.textContent = `${total} zł`;
}

function createMiniCartItem(item) {
    const row = document.createElement('div');
    row.className = 'mini-cart-item';
    
    const lineTotal = (item.qty || 1) * (Number(item.price) || 0);
    
    row.innerHTML = `
        <img src="${item.img}" alt="${item.name}" loading="lazy">
        <div style="flex: 1;">
            <div style="font-weight: 500;">${item.name}</div>
            <div style="font-size: 12px; color: #666;">
                ${item.qty || 1} × ${item.price} zł
            </div>
        </div>
        <button type="button" 
                aria-label="Usuń ${item.name}" 
                data-remove-id="${item.id}"
                style="background: none; border: none; color: #999; cursor: pointer; padding: 4px; border-radius: 4px; transition: all 0.2s ease;">
            ✕
        </button>
    `;
    
    // Add hover effect to remove button
    const removeBtn = row.querySelector('button');
    if (removeBtn) {
        removeBtn.addEventListener('mouseenter', () => {
            removeBtn.style.color = '#ff4444';
            removeBtn.style.background = '#fff5f5';
        });
        
        removeBtn.addEventListener('mouseleave', () => {
            removeBtn.style.color = '#999';
            removeBtn.style.background = 'none';
        });
    }
    
    return row;
}

// Event handlers
function setupCartEventHandlers() {
    // Toggle mini-cart
    document.addEventListener('click', (e) => {
        const miniCart = document.getElementById('mini-cart');
        const cartBtn = document.querySelector('.cart-btn');
        
        if (!miniCart || !cartBtn) return;
        
        const target = e.target;
        
        if (cartBtn.contains(target)) {
            e.preventDefault();
            miniCart.classList.toggle('active');
            return;
        }
        
        if (!miniCart.contains(target)) {
            miniCart.classList.remove('active');
        }
    });
    
    // Remove from mini-cart
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target && target.matches('#mini-cart [data-remove-id]')) {
            const id = Number(target.getAttribute('data-remove-id'));
            removeFromCart(id);
        }
    });
}

// Initialize cart UI
function initializeCart() {
    updateCartUI();
    setupCartEventHandlers();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCart);
} else {
    initializeCart();
}

// Export cart utilities for external use
window.cartUtils = {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    updateCartUI
};


