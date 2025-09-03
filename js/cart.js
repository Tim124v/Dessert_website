export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function getCart() {
    return cart;
}

export function addToCart(product) {
    const existing = cart.find(p => p.id === product.id);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

export function removeFromCart(productId) {
    cart = cart.filter(p => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

export function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

export function updateCartUI() {
    const badge = document.querySelector('.cart-count');
    if (badge) {
        const count = cart.reduce((s,p)=> s + (p.qty || 1), 0);
        badge.textContent = String(count);
    }
    const sumEl = document.querySelector('.cart-sum');
    if (sumEl) {
        const total = cart.reduce((t,p)=> t + (p.qty || 1) * (Number(p.price)||0), 0);
        sumEl.textContent = `${total} zł`;
    }

    // Mini-cart rendering
    const mini = document.getElementById('mini-cart');
    const itemsEl = document.getElementById('mini-cart-items');
    const totalEl = document.getElementById('mini-cart-total');
    if (mini && itemsEl && totalEl) {
        itemsEl.innerHTML = '';
        let total = 0;
        cart.forEach(p => {
            const row = document.createElement('div');
            row.className = 'mini-cart-item';
            const lineTotal = (p.qty || 1) * (Number(p.price) || 0);
            total += lineTotal;
            row.innerHTML = `
                <img src="${p.img}" alt="${p.name}">
                <div style="flex:1;">
                    <div>${p.name}</div>
                    <div style="font-size:12px;color:#666">${p.qty || 1} × ${p.price} zł</div>
                </div>
                <button type="button" aria-label="Usuń" data-remove-id="${p.id}">✕</button>
            `;
            itemsEl.appendChild(row);
        });
        totalEl.textContent = `${total} zł`;
    }
}

// Initialize badge on load
updateCartUI();

// Toggle mini-cart
document.addEventListener('click', (e) => {
    const mini = document.getElementById('mini-cart');
    const cartBtn = document.querySelector('.cart-btn');
    if (!mini || !cartBtn) return;
    const target = e.target;
    if (cartBtn.contains(target)) {
        e.preventDefault();
        mini.classList.toggle('active');
        return;
    }
    if (!mini.contains(target)) {
        mini.classList.remove('active');
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


