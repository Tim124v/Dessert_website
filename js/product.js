import { products as fallbackProducts } from '../data/products.js';
import { addToCart, updateCartUI } from './cart.js';

function getId() {
    const url = new URL(window.location.href);
    return Number(url.searchParams.get('id'));
}

function renderProduct(p) {
    const root = document.getElementById('product-root');
    if (!root || !p) return;
    root.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
            <img src="${p.img}" alt="${p.name}" style="width:100%;height:420px;object-fit:cover;border-radius:12px">
            <div>
                <h1 style="margin-bottom:8px">${p.name}</h1>
                <div style="color:#666;margin-bottom:12px">${p.description || ''}</div>
                <div style="font-size:1.4rem;color:#1a365d;margin-bottom:16px">${p.price} zł</div>
                <div style="display:flex;gap:8px;align-items:center">
                    <label>Ilość: <input type="number" id="qty" value="1" min="1" style="width:80px;margin-left:8px"></label>
                </div>
                <div style="display:flex;gap:8px;align-items:center;margin-top:12px">
                    <button id="add-btn" class="btn">Do koszyka</button>
                    <a class="btn" href="./checkout.html">Do kasy</a>
                </div>
            </div>
        </div>
    `;
    document.getElementById('add-btn')?.addEventListener('click', () => {
        const qtyInput = document.getElementById('qty');
        const qty = Math.max(1, Number(qtyInput?.value) || 1);
        for (let i = 0; i < qty; i += 1) addToCart(p);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    updateCartUI();
    const id = getId();
    let data = fallbackProducts;
    try {
        const res = await fetch('./data/products.json', { cache: 'no-store' });
        if (res.ok) {
            const json = await res.json();
            if (Array.isArray(json) && json.length) data = json;
        }
    } catch (e) {}
    const product = data.find(pr => pr.id === id);
    renderProduct(product);
});


