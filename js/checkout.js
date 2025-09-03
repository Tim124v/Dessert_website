import { getCart, removeFromCart, clearCart, updateCartUI } from './cart.js';

function formatPLN(v) { return `${v} zł`; }

function renderSummary() {
    const container = document.getElementById('summary-items');
    const totalNode = document.getElementById('summary-total');
    if (!container || !totalNode) return;
    const cart = getCart();
    container.innerHTML = '';
    let total = 0;
    cart.forEach((p) => {
        total += Number(p.price) || 0;
        const row = document.createElement('div');
        row.className = 'summary-item';
        row.innerHTML = `
            <span>${p.name}</span>
            <span>
                ${formatPLN(p.price)}
                <button type="button" data-remove-id="${p.id}" style="margin-left:8px">✕</button>
            </span>
        `;
        container.appendChild(row);
    });
    totalNode.textContent = formatPLN(total);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS if available (loaded via script tag)
    if (window.emailjs && typeof window.emailjs.init === 'function') {
        window.emailjs.init('n-2tQQcdZsBfndvrr');
    }
    renderSummary();
    updateCartUI();

    const container = document.getElementById('summary-items');
    if (container) {
        container.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.matches('button[data-remove-id]')) {
                const id = Number(target.getAttribute('data-remove-id'));
                removeFromCart(id);
                renderSummary();
            }
        });
    }

    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const address = document.getElementById('address').value.trim();
            const comment = document.getElementById('comment').value.trim();
            const payNow = document.getElementById('pay-now').checked;
            const cart = getCart();
            if (!name || !phone || !email || !address || cart.length === 0) {
                alert('Uzupełnij wszystkie pola i dodaj co najmniej jeden produkt.');
                return;
            }
            // Prepare payload for EmailJS
            const itemsText = cart.map(p => `${p.name} — ${p.price} zł`).join('\n');
            const totalValue = cart.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
            const payload = { name, phone, email, address, comment, items: itemsText, total: `${totalValue} zł` };
            try {
                if (window.emailjs) {
                    await window.emailjs.send('service_l8zl9rb', 'template_r1m604d', payload);
                } else {
                    throw new Error('EmailJS not loaded');
                }
                clearCart();
                renderSummary();
                const PAYMENT_LINK = '';
                if (payNow && PAYMENT_LINK) {
                    window.location.href = PAYMENT_LINK;
                } else {
                    window.location.href = './thank-you.html';
                }
            } catch (err) {
                alert('Błąd wysyłki. Spróbuj ponownie.');
            }
        });
    }

    // standalone pay button removed in favor of checkbox flow
});


