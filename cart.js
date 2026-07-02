/* ─── Cart — Chiang Mai Craft House ─── */

// PRODUCTS is populated from products.json at load time — see loadProducts() below.
// Editing products.json (directly, or via /admin CMS) updates price/name everywhere.
let PRODUCTS = {};

let cart = JSON.parse(localStorage.getItem('cmch-cart') || '{}');

async function loadProducts() {
  try {
    const res = await fetch('products.json', { cache: 'no-store' });
    const data = await res.json();
    const list = data.products || [];
    list.forEach(p => {
      PRODUCTS[p.id] = {
        name: p.name,
        sub: `${p.material} · ${p.typeLabel}`,
        price: p.price,
        bg: p.bg || '#d9cfc2',
        image: p.image || '',
      };
    });
    syncProductCards(list);
  } catch (err) {
    console.error('Could not load products.json', err);
  }
}

// Updates price / name / type text on any product card already in the page markup
// (index.html, collection.html) so the CMS-edited values show up without touching HTML.
function syncProductCards(list) {
  list.forEach(p => {
    document.querySelectorAll(`[data-product="${p.id}"]`).forEach(btn => {
      const priceEl = btn.closest('.flex')?.querySelector('span');
      if (priceEl) priceEl.textContent = '฿' + p.price.toLocaleString();

      const card = btn.closest('article');
      if (!card) return;
      const nameEl = card.querySelector('h3');
      if (nameEl) nameEl.textContent = p.name;
      const typeEl = card.querySelector('p.uppercase, p[class*="uppercase"]');
      if (typeEl) typeEl.textContent = `${p.material} · ${p.typeLabel}`;

      if (p.dimensions) {
        const dimEl = [...card.querySelectorAll('p')].find(el => /cm|total/i.test(el.textContent));
        if (dimEl) dimEl.textContent = p.dimensions;
      }

      if (card.dataset) {
        card.dataset.type = p.type;
        card.dataset.price = p.price;
      }

      if (p.image) {
        const imgBox = card.querySelector('.product-img');
        if (imgBox) {
          imgBox.innerHTML = `<img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" />`;
        }
      }
    });
  });
}

function saveCart() {
  localStorage.setItem('cmch-cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  openCart();
  showAddedFeedback(id);
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
}

function changeQty(id, delta) {
  const next = (cart[id] || 0) + delta;
  if (next <= 0) removeFromCart(id);
  else { cart[id] = next; saveCart(); }
}

function getTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    return sum + (PRODUCTS[id]?.price || 0) * qty;
  }, 0);
}

function getCount() {
  return Object.values(cart).reduce((s, q) => s + q, 0);
}

function updateCartCount() {
  const count = getCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderCartItems() {
  const container = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-footer');
  if (!container) return;

  const entries = Object.entries(cart).filter(([id]) => PRODUCTS[id]);

  if (entries.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg width="40" height="40" fill="none" stroke="#c9bba8" stroke-width="1.2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <p style="font-family:'Raleway',sans-serif;font-size:13px;color:#9c8070;font-weight:300;line-height:1.7">Your cart is empty.<br>Add a lamp to begin.</p>
        <button onclick="closeCart()" class="btn-outline btn-sm" style="margin-top:8px">Browse collection</button>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  container.innerHTML = entries.map(([id, qty]) => {
    const p = PRODUCTS[id];
    return `
    <div class="cart-item">
      <div style="height:72px;width:72px;background:${p.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" />` : lampSVG(id)}
      </div>
      <div>
        <p style="font-family:'Lora',serif;font-size:14px;color:#2c2420;margin-bottom:2px">${p.name}</p>
        <p style="font-family:'Raleway',sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#9c8070">${p.sub}</p>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty('${id}',-1)" aria-label="Decrease quantity">−</button>
          <span style="font-family:'Raleway',sans-serif;font-size:13px;color:#4a3c30;min-width:16px;text-align:center">${qty}</span>
          <button class="qty-btn" onclick="changeQty('${id}',1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <span style="font-family:'Raleway',sans-serif;font-size:13px;color:#4a3c30">฿${(p.price * qty).toLocaleString()}</span>
        <button onclick="removeFromCart('${id}')" style="background:none;border:none;cursor:pointer;color:#c9bba8;padding:2px;" aria-label="Remove ${p.name}">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>`;
  }).join('');

  document.getElementById('cart-total').textContent = '฿' + getTotal().toLocaleString();
}

function lampSVG(id) {
  const svgs = {
    'doi-suthep': `<svg width="32" height="52" viewBox="0 0 60 90" fill="none"><line x1="30" y1="0" x2="30" y2="12" stroke="#8a7060" stroke-width="1.5"/><path d="M20 13 Q12 40 8 76 Q18 79 30 80 Q42 79 52 76 Q48 40 40 13 Z" fill="#c4a882" opacity="0.88"/><ellipse cx="30" cy="47" rx="12" ry="14" fill="#f5e0a0" opacity="0.22"/></svg>`,
    'nimman': `<svg width="36" height="52" viewBox="0 0 72 90" fill="none"><line x1="36" y1="0" x2="36" y2="12" stroke="#8a7060" stroke-width="1.5"/><ellipse cx="36" cy="15" rx="14" ry="5" fill="#8a7060" opacity="0.5"/><path d="M12 18 Q6 50 4 80 Q18 84 36 85 Q54 84 68 80 Q66 50 60 18 Z" fill="#b89e7c" opacity="0.85"/><ellipse cx="36" cy="52" rx="16" ry="18" fill="#f5e0a0" opacity="0.2"/></svg>`,
    'ping-river': `<svg width="30" height="60" viewBox="0 0 60 110" fill="none"><line x1="30" y1="0" x2="30" y2="14" stroke="#8a7060" stroke-width="1.5"/><path d="M30 14 Q24 17 22 22"/><path d="M22 22 Q10 38 8 84 Q18 88 30 89 Q42 88 52 84 Q50 38 38 22 Q36 17 30 14" fill="#cdb08a" opacity="0.85"/><line x1="30" y1="89" x2="30" y2="110" stroke="#8a7060" stroke-width="1.5"/></svg>`,
    'wualai': `<svg width="36" height="52" viewBox="0 0 72 85" fill="none"><ellipse cx="36" cy="8" rx="18" ry="6" fill="#8a7060" opacity="0.5"/><path d="M18 12 Q10 42 8 74 Q22 79 36 80 Q50 79 64 74 Q62 42 54 12 Z" fill="#c4a882" opacity="0.85"/><line x1="36" y1="80" x2="36" y2="85" stroke="#8a7060" stroke-width="1.5"/></svg>`,
    'mae-rim': `<svg width="44" height="52" viewBox="0 0 90 85" fill="none"><line x1="28" y1="0" x2="28" y2="14" stroke="#8a7060" stroke-width="1.2"/><path d="M20 15 Q14 46 10 76 Q20 79 28 80 Q36 79 46 76 Q42 46 36 15 Z" fill="#c4a882" opacity="0.8"/><line x1="55" y1="0" x2="55" y2="20" stroke="#8a7060" stroke-width="1.2"/><path d="M47 22 Q40 54 37 82 Q47 85 55 86 Q63 85 73 82 Q70 54 63 22 Z" fill="#b89e7c" opacity="0.82"/></svg>`,
    'san-kamphaeng': `<svg width="44" height="44" viewBox="0 0 90 80" fill="none"><rect x="8" y="10" width="74" height="44" rx="2" fill="#c4a882" opacity="0.75"/><path d="M8 32 Q45 38 82 32" stroke="#9c7e60" stroke-width="0.8" fill="none" opacity="0.7"/><path d="M8 44 Q45 50 82 44" stroke="#9c7e60" stroke-width="0.8" fill="none" opacity="0.7"/><ellipse cx="45" cy="32" rx="20" ry="14" fill="#f5e0a0" opacity="0.2"/></svg>`,
    'chom-thong': `<svg width="38" height="60" viewBox="0 0 76 110" fill="none"><line x1="38" y1="0" x2="38" y2="16" stroke="#8a7060" stroke-width="1.5"/><path d="M38 16 Q22 20 14 30 Q8 50 6 86 Q20 90 38 92 Q56 90 70 86 Q68 50 62 30 Q54 20 38 16" fill="#b89e7c" opacity="0.85"/><line x1="38" y1="92" x2="38" y2="110" stroke="#8a7060" stroke-width="2"/></svg>`,
    'lamphun': `<svg width="36" height="48" viewBox="0 0 72 80" fill="none"><ellipse cx="36" cy="10" rx="22" ry="8" fill="#8a7060" opacity="0.45"/><path d="M14 16 Q6 44 4 66 Q18 70 36 72 Q54 70 68 66 Q66 44 58 16 Z" fill="#cdb08a" opacity="0.82"/><line x1="36" y1="72" x2="36" y2="80" stroke="#8a7060" stroke-width="1.5"/></svg>`,
  };
  return svgs[id] || svgs['doi-suthep'];
}

function showAddedFeedback(id) {
  const btn = document.querySelector(`[data-product="${id}"]`);
  if (!btn) return;
  const orig = btn.textContent;
  btn.textContent = 'Added ✓';
  btn.style.background = '#2c2420';
  btn.style.color = '#faf8f4';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    btn.style.color = '';
  }, 1400);
}

function openCart() {
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCart() {
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.body.style.overflow = '';
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  await loadProducts();
  updateCartCount();
  renderCartItems();

  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll fade-in — elements already in viewport get visible immediately
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
});
