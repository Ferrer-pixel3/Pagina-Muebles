// main.js - Funcionalidad centralizada para Muebles Ferrer
// Se integra en todas las páginas principales

// Import config
const CONFIG = { API_URL: 'http://127.0.0.1:3001/api' };

// ===== Carrusel automático de landing =====
const carouselImages = [
  'images/banner-img.jpg',
  'images/Carrusel1.jpg',
  'images/Carrusel2.jpg',
  'images/Carrusel3.jpg'
];

let currentSlideIndex = 0;
let carouselInterval = null;

function showSlide(index) {
  const img = document.querySelector('.carousel-image');
  const dots = document.querySelectorAll('.dot');
  
  if (!img) return; // Si no existe el carrusel, no hace nada
  
  // Validar índice
  if (index >= carouselImages.length) currentSlideIndex = 0;
  if (index < 0) currentSlideIndex = carouselImages.length - 1;
  
  img.src = carouselImages[currentSlideIndex];
  
  // Actualizar dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlideIndex);
  });
}

function currentSlide(index) {
  currentSlideIndex = index;
  showSlide(currentSlideIndex);
  // Reiniciar el intervalo al hacer clic
  clearInterval(carouselInterval);
  startCarousel();
}

function nextSlide() {
  currentSlideIndex++;
  showSlide(currentSlideIndex);
}

function startCarousel() {
  // Cambiar imagen cada 4 segundos
  carouselInterval = setInterval(nextSlide, 4000);
}

// Iniciar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.carousel-image')) {
    startCarousel();
  }
});

// Data de productos (id único por producto)
const productData = {
  // Recamaras 101-105
  101: { name: 'Recámara A', price: 5200, desc: 'Recámara con diseño moderno y almacenamiento.', img: 'images/recamara A.jpg', stars: 5, category: 'recamara' },
  102: { name: 'Recámara B', price: 6100, desc: 'Recámara con cabecera acolchada y acabado premium.', img: 'images/recamara B.jpg', stars: 4, category: 'recamara' },
  103: { name: 'Recámara C', price: 4800, desc: 'Aprovecha espacio y estilo contemporáneo.', img: 'images/recamara C.jpg', stars: 4, category: 'recamara' },
  104: { name: 'Recámara D', price: 7300, desc: 'Recámara amplia con acabados en madera.', img: 'images/recamara D.jpg', stars: 5, category: 'recamara' },
  105: { name: 'Recámara E', price: 5900, desc: 'Elegancia y confort en un solo conjunto.', img: 'images/recamara E.jpg', stars: 4, category: 'recamara' },
  // Buffet 201-205
  201: { name: 'Buffet A', price: 1900, desc: 'Buffet elegante para sala-comedor.', img: 'images/buffer A.jpg', stars: 4, category: 'buffet' },
  202: { name: 'Buffet B', price: 2200, desc: 'Acabados resistentes y prácticos.', img: 'images/buffer B.jpg', stars: 4, category: 'buffet' },
  203: { name: 'Buffet C', price: 2500, desc: 'Diseño compacto y funcional.', img: 'images/Buffer C.jpg', stars: 3, category: 'buffet' },
  204: { name: 'Buffet D', price: 3000, desc: 'Buffet con estantes ajustables.', img: 'images/buffer D.webp', stars: 5, category: 'buffet' },
  205: { name: 'Buffet E', price: 1750, desc: 'Perfecto para espacios pequeños.', img: 'images/buffer E.jpeg', stars: 3, category: 'buffet' },
  // Comedor 301-305
  301: { name: 'Comedor A', price: 4500, desc: 'Juego de comedor con acabados premium.', img: 'images/Comedor A.jpg', stars: 5, category: 'comedor' },
  302: { name: 'Comedor B', price: 3800, desc: 'Comedor resistente a manchas.', img: 'images/comedor B.webp', stars: 4, category: 'comedor' },
  303: { name: 'Comedor C', price: 4200, desc: 'Diseño moderno y práctico.', img: 'images/comedor C.webp', stars: 4, category: 'comedor' },
  304: { name: 'Comedor D', price: 5000, desc: 'Incluye sillas tapizadas.', img: 'images/comedor D.jpg', stars: 5, category: 'comedor' },
  305: { name: 'Comedor E', price: 3500, desc: 'Perfecto para reuniones familiares.', img: 'images/comedor E.jpeg', stars: 4, category: 'comedor' },
  // Sofa 401-405
  401: { name: 'Sofa A', price: 3200, desc: 'Sofá cómodo y elegante.', img: 'images/sofa A.jpg', stars: 5, category: 'sofa' },
  402: { name: 'Sofá B', price: 2800, desc: 'Sofá de dos plazas con buen soporte.', img: 'images/sofa B.jpeg', stars: 4, category: 'sofa' },
  403: { name: 'Sofá C', price: 3600, desc: 'Sofá seccional con diseño actual.', img: 'images/sofa C.jpg', stars: 5, category: 'sofa' },
  404: { name: 'Sofá D', price: 2100, desc: 'Sillón reclinable cómodo.', img: 'images/sofa D.jpEg', stars: 4, category: 'sofa' },
  405: { name: 'Sofá E', price: 2950, desc: 'Tapicería resistente y fácil limpieza.', img: 'images/sofa E.jpg', stars: 4, category: 'sofa' },
  // Mesa 501-505
  501: { name: 'Mesa A', price: 1200, desc: 'Mesa auxiliar moderna.', img: 'images/mesa A.jpeg', stars: 4, category: 'mesa' },
  502: { name: 'Mesa B', price: 1600, desc: 'Mesa de centro resistente.', img: 'images/mesa B.webp', stars: 4, category: 'mesa' },
  503: { name: 'Mesa C', price: 900, desc: 'Mesa plegable práctica.', img: 'images/mesa C.jpg', stars: 3, category: 'mesa' },
  504: { name: 'Mesa D', price: 2000, desc: 'Mesa grande para comedor.', img: 'images/mesa D.webp', stars: 5, category: 'mesa' },
  505: { name: 'Mesa E', price: 1400, desc: 'Diseño minimalista.', img: 'images/mesa E.webp', stars: 4, category: 'mesa' },
  // Ropero 601-605
  601: { name: 'Ropero A', price: 2800, desc: 'Ropero con gran espacio interior.', img: 'images/ropero A.webp', stars: 4, category: 'ropero' },
  602: { name: 'Ropero B', price: 3200, desc: 'Ropero con espejo integrado.', img: 'images/ropero B.jpg', stars: 5, category: 'ropero' },
  603: { name: 'Ropero C', price: 2500, desc: 'Compacto y funcional.', img: 'images/ropero C.webp', stars: 3, category: 'ropero' },
  604: { name: 'Ropero D', price: 4000, desc: 'Acabados premium y organizado.', img: 'images/ropero D.jpg', stars: 5, category: 'ropero' },
  605: { name: 'Ropero E', price: 2300, desc: 'Ropero resistente y durable.', img: 'images/ropero E.jpg', stars: 4, category: 'ropero' }
};

// Navegación: logo lleva al inicio
document.addEventListener('click', (e) => {
  const logo = document.getElementById('logo-title');
  if (e.target === logo) {
    window.location.href = 'index.html';
  }
});

// --- Page-specific renderers: carrito, favoritos, perfil ---
document.addEventListener('DOMContentLoaded', () => {
  // Render carrito page if present
  const cartList = document.getElementById('cart-list');
  if (cartList) renderCartPage(cartList);

  // Render favoritos page if present
  const favsList = document.getElementById('favs-list');
  if (favsList) renderFavsPage(favsList);

  // Render perfil page if present
  const profileEl = document.getElementById('profile-section');
  if (profileEl) renderProfilePage(profileEl);
  // If not on login/register pages, check session and redirect to login if unauthenticated
  (async function ensureAuthenticated() {
    try {
      const path = window.location.pathname.split('/').pop();
      if (path === 'login.html' || path === 'register.html') return;
      const res = await fetch(`${CONFIG.API_URL}/me`, { credentials: 'include' });
      const data = await res.json();
      if (!data || !data.user) {
        window.location.href = 'login.html';
      }
    } catch (err) {
      // If server unreachable, do not redirect (user may be developing offline)
      console.warn('Auth check failed:', err);
    }
  })();
});
function renderCartPage(container) {
  container.innerHTML = '';
  if (!cart.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <i class="fa-solid fa-shopping-cart" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
        <h3 style="color: #666; margin: 0.5rem 0;">Tu carrito está vacío</h3>
        <p style="color: #999; margin-bottom: 1.5rem;">Explora nuestros productos y agrega algo</p>
        <a href="productos.html" style="display: inline-block; padding: 0.8rem 2rem; background: #f8872b; color: white; text-decoration: none; border-radius: 5px; font-weight: 600;">Ir a Productos</a>
      </div>
    `;
    return;
  }

  // Agrupar artículos por ID para contar cantidades
  const itemCounts = {};
  cart.forEach(item => {
    itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
  });

  let total = 0;
  const cartWrapper = document.createElement('div');
  cartWrapper.style.cssText = 'max-width: 1000px; margin: 0 auto;';
  
  Object.keys(itemCounts).forEach((pid) => {
    const id = Number(pid);
    const pdata = productData[id] || {};
    const qty = itemCounts[id];
    const price = pdata.price || 0;
    const subtotal = price * qty;
    total += subtotal;

    const img = pdata.img || 'images/pricing-armchair.png';
    const name = pdata.name || 'Producto';
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.style.cssText = `
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 1rem;
      background: #fafafa;
      align-items: center;
    `;
    cartItem.dataset.id = id;
    cartItem.innerHTML = `
      <img src="${img}" alt="${name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;" />
      <div style="flex: 1;">
        <h4 style="margin: 0 0 0.5rem 0; color: #073e72; font-size: 1.1rem;">${name}</h4>
        <p style="margin: 0 0 0.8rem 0; color: #666;">Precio unitario: <strong>$${price.toLocaleString('es-MX')}</strong></p>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="color: #666; font-size: 0.95rem;">Cantidad:</span>
          <button class="qty-decrement" data-id="${id}" style="width: 30px; height: 30px; border: 1px solid #ddd; background: #fff; cursor: pointer; border-radius: 3px; font-weight: 600; color: #073e72;">-</button>
          <input type="number" class="qty-input" data-id="${id}" value="${qty}" min="1" style="width: 50px; padding: 0.3rem; text-align: center; border: 1px solid #ddd; border-radius: 3px;" />
          <button class="qty-increment" data-id="${id}" style="width: 30px; height: 30px; border: 1px solid #ddd; background: #fff; cursor: pointer; border-radius: 3px; font-weight: 600; color: #073e72;">+</button>
        </div>
      </div>
      <div style="text-align: right;">
        <div style="margin-bottom: 1rem;">
          <p style="margin: 0; color: #666; font-size: 0.9rem;">Subtotal:</p>
          <p style="margin: 0.3rem 0 0 0; font-size: 1.4rem; font-weight: 700; color: #d32f2f;">$${subtotal.toLocaleString('es-MX')}</p>
        </div>
        <button class="remove-cart" data-id="${id}" style="width: 100%; padding: 0.6rem; background: #f0f0f0; color: #d32f2f; border: 1px solid #ddd; border-radius: 5px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
          <i class="fa-solid fa-trash"></i> Quitar
        </button>
      </div>
    `;
    cartWrapper.appendChild(cartItem);
  });

  container.appendChild(cartWrapper);

  // Total section
  const totalSection = document.createElement('div');
  totalSection.style.cssText = `
    max-width: 1000px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: linear-gradient(135deg, #073e72 0%, #0d5a9e 100%);
    border-radius: 8px;
    color: white;
    text-align: right;
  `;
  totalSection.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <div>
        <p style="margin: 0; font-size: 1.1rem;">Total de artículos: <strong>${Object.values(itemCounts).reduce((a,b) => a+b, 0)}</strong></p>
      </div>
    </div>
    <h2 style="margin: 0; font-size: 2rem;">Total: $${total.toLocaleString('es-MX')}</h2>
    <div style="display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: flex-end;">
      <a href="productos.html" style="padding: 0.8rem 2rem; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 5px; border: 1px solid white; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Continuar comprando</a>
      <button id="clear-cart" style="padding: 0.8rem 2rem; background: rgba(255,255,255,0.2); color: white; border: 1px solid white; border-radius: 5px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Vaciar carrito</button>
      <button id="checkout" style="padding: 0.8rem 2rem; background: #f8872b; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Proceder al pago</button>
    </div>
  `;
  container.appendChild(totalSection);

  // Event delegation
  container.addEventListener('click', (e) => {
    // Quitar artículo
    const removeBtn = e.target.closest('.remove-cart');
    if (removeBtn) {
      const id = Number(removeBtn.dataset.id);
      cart = cart.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartTotal();
      renderCartPage(container);
      return;
    }

    // Incrementar cantidad
    const incBtn = e.target.closest('.qty-increment');
    if (incBtn) {
      const id = Number(incBtn.dataset.id);
      const pdata = productData[id] || {};
      cart.push({id, name: pdata.name, price: pdata.price});
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartTotal();
      renderCartPage(container);
      return;
    }

    // Decrementar cantidad
    const decBtn = e.target.closest('.qty-decrement');
    if (decBtn) {
      const id = Number(decBtn.dataset.id);
      const idx = cart.findIndex(item => item.id === id);
      if (idx !== -1) {
        cart.splice(idx, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
        renderCartPage(container);
      }
      return;
    }

    // Cambiar cantidad directamente
    const qtyInput = e.target.closest('.qty-input');
    if (qtyInput && e.key === 'Enter') {
      const id = Number(qtyInput.dataset.id);
      const newQty = Math.max(1, Number(qtyInput.value) || 1);
      // Contar actual
      const currentQty = cart.filter(item => item.id === id).length;
      if (newQty > currentQty) {
        const diff = newQty - currentQty;
        const pdata = productData[id] || {};
        for (let i = 0; i < diff; i++) {
          cart.push({id, name: pdata.name, price: pdata.price});
        }
      } else if (newQty < currentQty) {
        const diff = currentQty - newQty;
        for (let i = 0; i < diff; i++) {
          const idx = cart.findIndex(item => item.id === id);
          if (idx !== -1) cart.splice(idx, 1);
        }
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartTotal();
      renderCartPage(container);
    }
  });

  // Clear cart button
  document.getElementById('clear-cart').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartTotal();
      renderCartPage(container);
      showToast('Carrito vaciado', 'success');
    }
  });

  // Checkout button
  document.getElementById('checkout').addEventListener('click', () => {
    // Show checkout form modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
      z-index: 9999;
    `;
    modal.innerHTML = `
      <div style="background: #fff; padding: 2rem; border-radius: 12px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;">
        <h2 style="color: #073e72; margin: 0 0 1.5rem 0;">Información de Compra</h2>
        <form id="checkout-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; color: #073e72; font-weight: 600; margin-bottom: 0.4rem;">Nombre</label>
            <input type="text" name="buyerName" placeholder="Tu nombre" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px;" />
          </div>
          <div>
            <label style="display: block; color: #073e72; font-weight: 600; margin-bottom: 0.4rem;">Correo electrónico</label>
            <input type="email" name="buyerEmail" placeholder="tu@email.com" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px;" />
          </div>
          <div>
            <label style="display: block; color: #073e72; font-weight: 600; margin-bottom: 0.4rem;">Teléfono</label>
            <input type="tel" name="phone" placeholder="+1234567890" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px;" />
          </div>
          <div>
            <label style="display: block; color: #073e72; font-weight: 600; margin-bottom: 0.4rem;">Dirección</label>
            <input type="text" name="address" placeholder="Calle, número, apartamento" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px;" />
          </div>
          <div>
            <label style="display: block; color: #073e72; font-weight: 600; margin-bottom: 0.4rem;">Ubicación / Ciudad</label>
            <input type="text" name="location" placeholder="Ciudad, Estado" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px;" />
          </div>
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button type="button" id="cancel-checkout" style="flex: 1; padding: 0.8rem; background: #f0f0f0; color: #666; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Cancelar</button>
            <button type="submit" style="flex: 1; padding: 0.8rem; background: #f8872b; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Completar compra</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('checkout-form');
    document.getElementById('cancel-checkout').addEventListener('click', () => modal.remove());

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData(form);
        const buyerName = formData.get('buyerName') || '';
        const buyerEmail = formData.get('buyerEmail') || '';
        const phone = formData.get('phone') || '';
        const address = formData.get('address') || '';
        const location = formData.get('location') || '';

        // Group cart items
        const itemCounts = {};
        cart.forEach(item => { itemCounts[item.id] = (itemCounts[item.id] || 0) + 1; });
        const items = Object.keys(itemCounts).map(pid => {
          const id = Number(pid);
          const pdata = productData[id] || {};
          return { id, name: pdata.name || 'Producto', unit_price: pdata.price || 0, quantity: itemCounts[pid] };
        });

        const res = await fetch(`${CONFIG.API_URL}/purchases`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ buyerName, buyerEmail, phone, address, location, items })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error creating purchase');
        
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
        modal.remove();
        renderCartPage(container);
        showToast('¡Compra registrada exitosamente! Gracias por tu compra.', 'success');
      } catch (err) {
        console.error('Checkout error:', err);
        showToast('Error procesando la compra: ' + (err.message || ''), 'error');
      }
    });
  });
}

function renderFavsPage(container) {
  container.innerHTML = '';
  if (!favs.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <i class="fa-solid fa-heart" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
        <h3 style="color: #666; margin: 0.5rem 0;">No tienes favoritos</h3>
        <p style="color: #999; margin-bottom: 1.5rem;">Agrega artículos a favoritos para guardarlos aquí</p>
        <a href="productos.html" style="display: inline-block; padding: 0.8rem 2rem; background: #f8872b; color: white; text-decoration: none; border-radius: 5px; font-weight: 600;">Explorar Productos</a>
      </div>
    `;
    return;
  }

  const favsWrapper = document.createElement('div');
  favsWrapper.style.cssText = 'max-width: 1200px; margin: 0 auto;';

  const headerDiv = document.createElement('div');
  headerDiv.style.cssText = `
    padding: 2rem;
    background: linear-gradient(135deg, #f8872b 0%, #f5a56d 100%);
    border-radius: 8px;
    margin-bottom: 2rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  headerDiv.innerHTML = `
    <div>
      <h2 style="margin: 0; font-size: 2rem; font-weight: 700;">Mis Favoritos</h2>
      <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">${favs.length} artículo${favs.length !== 1 ? 's' : ''} guardado${favs.length !== 1 ? 's' : ''}</p>
    </div>
    <button id="clear-favs" style="padding: 0.8rem 1.5rem; background: rgba(255,255,255,0.2); color: white; border: 1px solid white; border-radius: 5px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
      <i class="fa-solid fa-trash"></i> Limpiar favoritos
    </button>
  `;
  favsWrapper.appendChild(headerDiv);

  const gridDiv = document.createElement('div');
  gridDiv.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  `;

  favs.forEach((fid) => {
    const id = Number(fid);
    const pdata = productData[id] || null;
    if (!pdata) return;

    const favCard = document.createElement('div');
    favCard.className = 'product-card';
    favCard.style.cssText = `
      border: 2px solid #f8872b;
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    `;
    favCard.dataset.id = id;
    favCard.innerHTML = `
      <div style="position: relative; overflow: hidden; background: #f5f5f5;">
        <img src="${pdata.img}" alt="${pdata.name}" style="width: 100%; height: 200px; object-fit: cover; transition: transform 0.3s ease;" />
        <div style="position: absolute; top: 10px; right: 10px; background: #d32f2f; color: white; padding: 0.5rem 0.8rem; border-radius: 50px; font-size: 1.2rem;">
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
      <div style="padding: 1.2rem; flex: 1; display: flex; flex-direction: column;">
        <h4 style="margin: 0 0 0.5rem 0; color: #073e72; font-size: 1.1rem;">${pdata.name}</h4>
        <div style="margin-bottom: 0.8rem;">
          <span class="stars" style="color: #f8872b;">${'★'.repeat(pdata.stars)}${'☆'.repeat(5-pdata.stars)}</span>
          <span style="color: #999; font-size: 0.85rem; margin-left: 0.5rem;">(${pdata.stars} de 5)</span>
        </div>
        <p class="price" style="margin: 0.8rem 0; font-size: 1.4rem; font-weight: 700; color: #d32f2f;">$${pdata.price.toLocaleString('es-MX')}</p>
        <p style="margin: 0.8rem 0; color: #666; font-size: 0.9rem; flex: 1;">${pdata.desc}</p>
        <div style="display: flex; gap: 0.8rem; margin-top: auto;">
          <button class="add-cart" style="flex: 1; padding: 0.8rem; background: #f8872b; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
            <i class="fa-solid fa-cart-shopping"></i> Carrito
          </button>
          <button class="remove-fav" data-id="${id}" style="flex: 0 0 auto; padding: 0.8rem 1rem; background: #f0f0f0; color: #d32f2f; border: 1px solid #ddd; border-radius: 5px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    gridDiv.appendChild(favCard);
  });

  favsWrapper.appendChild(gridDiv);
  container.appendChild(favsWrapper);

  // Event listeners
  container.addEventListener('click', (e) => {
    // Remove from favorites
    const remBtn = e.target.closest('.remove-fav');
    if (remBtn) {
      const id = Number(remBtn.dataset.id);
      favs = favs.filter(f => Number(f) !== id);
      localStorage.setItem('favs', JSON.stringify(favs));
      renderFavsPage(container);
      showToast('Removido de favoritos', 'info');
      return;
    }

    // Add to cart from favorites
    const addCartBtn = e.target.closest('.add-cart');
    if (addCartBtn) {
      const card = addCartBtn.closest('.product-card');
      const id = Number(card.dataset.id);
      const pdata = productData[id] || {};
      cart.push({id, name: pdata.name, price: pdata.price});
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartTotal();
      showToast(`${pdata.name} agregado al carrito`, 'success');
    }
  });

  // Clear all favorites
  const clearFavsBtn = document.getElementById('clear-favs');
  if (clearFavsBtn) {
    clearFavsBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
        favs = [];
        localStorage.setItem('favs', JSON.stringify(favs));
        renderFavsPage(container);
        showToast('Favoritos eliminados', 'success');
      }
    });
  }
}

function renderProfilePage(container) {
  const stored = JSON.parse(localStorage.getItem('profile') || '{}');
  const name = stored.name || '';
  const email = stored.email || '';
  const avatar = stored.avatar || 'images/profile-placeholder.png';
  container.innerHTML = `
    <div class="profile-card">
      <img id="profile-avatar" src="${avatar}" alt="Avatar" style="width:120px;height:120px;object-fit:cover;border-radius:50%;" />
      <div class="profile-fields">
        <label>Nombre: <input id="profile-name" value="${name}" /></label>
        <label>Correo: <input id="profile-email" value="${email}" /></label>
        <label>Avatar: <input id="profile-avatar-file" type="file" accept="image/*" /></label>
        <button id="save-profile">Guardar</button>
      </div>
    </div>
  `;

  const fileInput = container.querySelector('#profile-avatar-file');
  fileInput.addEventListener('change', (ev) => {
    const f = ev.target.files && ev.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const imgEl = document.getElementById('profile-avatar');
      if (imgEl) imgEl.src = data;
      stored.avatar = data;
    };
    reader.readAsDataURL(f);
  });

  container.querySelector('#save-profile').addEventListener('click', () => {
    stored.name = container.querySelector('#profile-name').value;
    stored.email = container.querySelector('#profile-email').value;
    localStorage.setItem('profile', JSON.stringify(stored));
    alert('Perfil guardado');
  });
}

// Utility: get element by id safely
const $ = id => document.getElementById(id);

// Buscador: filtra productos al escribir (delegado)
document.addEventListener('input', (e) => {
  if (e.target && e.target.id === 'search-input') {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const h = card.querySelector('h4');
      const name = h ? h.textContent.toLowerCase() : '';
      card.style.display = name.includes(term) ? '' : 'none';
    });
  }
});

// Cart and favorites stored in localStorage
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let favs = JSON.parse(localStorage.getItem('favs') || '[]');
// Normalize favorites: older versions may have stored names; convert to ids when possible
favs = favs.map(f => {
  if (typeof f === 'number') return f;
  // try to find id by name
  for (const id in productData) {
    if (productData[id].name === f) return Number(id);
  }
  return f; // leave as-is if not found
}).filter(Boolean);
localStorage.setItem('favs', JSON.stringify(favs));

function updateCartTotal() {
  const cartTotal = $('cart-total');
  if (!cartTotal) return;
  let total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  cartTotal.textContent = `$${total.toLocaleString('es-MX', {minimumFractionDigits:2})}`;
}
updateCartTotal();

// Event delegation for clicks: add-cart, add-fav, cart-icon, fav-icon, profile-icon, product-card
document.addEventListener('click', (e) => {
  const addCartBtn = e.target.closest('.add-cart');
  if (addCartBtn) {
    const card = addCartBtn.closest('.product-card');
    if (!card) return;
    const id = card.dataset.id && Number(card.dataset.id);
    const pdata = productData[id] || {};
    const name = pdata.name || (card.querySelector('h4') ? card.querySelector('h4').textContent : 'Producto');
    const price = pdata.price || (card.querySelector('.price') ? parseFloat(card.querySelector('.price').textContent.replace(/[$,]/g,'')) : 0);
    cart.push({id, name, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTotal();
    showToast(`${name} agregado al carrito`, 'success');
    return;
  }

  const addFavBtn = e.target.closest('.add-fav');
  if (addFavBtn) {
    const card = addFavBtn.closest('.product-card');
    if (!card) return;
    const id = card.dataset.id && Number(card.dataset.id);
    if (id && !favs.includes(id)) favs.push(id);
    localStorage.setItem('favs', JSON.stringify(favs));
    const pdata = productData[id] || {};
    const name = pdata.name || (card.querySelector('h4') ? card.querySelector('h4').textContent : 'Producto');
    showToast(`${name} agregado a favoritos`, 'success');
    return;
  }

  const cartIcon = e.target.closest('#cart-icon');
  if (cartIcon) {
    window.location.href = 'carrito.html';
    return;
  }

  const favIconEl = e.target.closest('#fav-icon');
  if (favIconEl) {
    window.location.href = 'favoritos.html';
    return;
  }

  const profileIcon = e.target.closest('#profile-icon');
  if (profileIcon) {
    window.location.href = 'perfil.html';
    return;
  }

  // Click en tarjeta -> navegar a detalle (si tiene data-id), ignorar si se clickeó un botón
  const cardEl = e.target.closest('.product-card');
  if (cardEl && !e.target.closest('button')) {
    const id = cardEl.dataset.id;
    if (id) {
      window.location.href = `product.html?id=${encodeURIComponent(id)}`;
    }
  }

  // Click en .product-feature -> abrir modal con detalles
  const featureEl = e.target.closest('.product-feature');
  if (featureEl && !e.target.closest('a')) {
    const id = featureEl.dataset.id && Number(featureEl.dataset.id);
    if (id) {
      // Obtener imagen, descripción y título de la tarjeta actual
      const cardImg = featureEl.querySelector('img');
      const cardTitle = featureEl.querySelector('h4');
      const cardDesc = featureEl.dataset.desc || null; // descripción personalizada si existe
      const currentImg = cardImg ? cardImg.src : null;
      const currentTitle = cardTitle ? cardTitle.textContent : null;
      openProductModal(id, currentImg, currentTitle, cardDesc);
    }
  }

  // Cerrar modal al hacer click en el overlay o en el botón cerrar
  const modalOverlay = e.target.id === 'product-modal-overlay';
  if (modalOverlay) {
    closeProductModal();
  }

  const closeBtn = e.target.id === 'product-modal-close';
  if (closeBtn) {
    closeProductModal();
  }
});

// Modal functions
function openProductModal(id, customImg = null, customTitle = null, customDesc = null) {
  const pdata = productData[id];
  if (!pdata) return;

  let modal = document.getElementById('product-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.innerHTML = `
      <div id="product-modal-overlay"></div>
      <div class="product-modal-content">
        <button id="product-modal-close"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-body">
          <div class="modal-img-wrap">
            <img id="modal-product-img" src="" alt="" />
          </div>
          <div class="modal-info">
            <h2 id="modal-product-name"></h2>
            <div id="modal-product-rating" class="modal-rating"></div>
            <p id="modal-product-desc"></p>
            <div class="modal-price-section">
              <p class="modal-price" id="modal-product-price"></p>
              <div class="modal-quantity">
                <button id="modal-qty-minus">-</button>
                <input id="modal-qty" type="number" min="1" value="1" />
                <button id="modal-qty-plus">+</button>
              </div>
            </div>
            <div class="modal-actions">
              <button id="modal-add-cart" class="btn-primary">Agregar al Carrito</button>
              <button id="modal-add-fav" class="btn-secondary">Agregar a Favoritos</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Store the product ID in the modal for later use
  modal.dataset.productId = id;

  // Populate modal with product data
  // Usar imagen personalizada si se proporciona, si no usar la de productData
  const imgToUse = customImg || pdata.img;
  document.getElementById('modal-product-img').src = imgToUse;
  document.getElementById('modal-product-img').alt = pdata.name;
  
  // Usar título personalizado si se proporciona, si no usar el de productData
  const titleToUse = customTitle || pdata.name;
  document.getElementById('modal-product-name').textContent = titleToUse;
  
  document.getElementById('modal-product-price').textContent = `$${pdata.price.toLocaleString('es-MX')}`;
  
  // Usar descripción personalizada si se proporciona, si no usar la de productData
  const descToUse = customDesc || pdata.desc;
  document.getElementById('modal-product-desc').textContent = descToUse;

  // Stars
  const ratingDiv = document.getElementById('modal-product-rating');
  ratingDiv.innerHTML = `<span class="stars">${'★'.repeat(pdata.stars)}${'☆'.repeat(5 - pdata.stars)}</span><span class="review-count">(${pdata.stars * 2} reseñas)</span>`;

  // Reset quantity
  document.getElementById('modal-qty').value = 1;

  // Show modal
  modal.style.display = 'flex';

  // Event listeners for modal buttons
  document.getElementById('modal-qty-minus').onclick = () => {
    const qty = document.getElementById('modal-qty');
    if (qty.value > 1) qty.value--;
  };

  document.getElementById('modal-qty-plus').onclick = () => {
    const qty = document.getElementById('modal-qty');
    qty.value = Number(qty.value) + 1;
  };

  document.getElementById('modal-add-cart').onclick = () => {
    const qty = Number(document.getElementById('modal-qty').value);
    const modal = document.getElementById('product-modal');
    const productId = Number(modal.dataset.productId);
    const pdata = productData[productId];
    
    if (!pdata) {
      showToast('Error: Producto no encontrado', 'error');
      return;
    }
    
    for (let i = 0; i < qty; i++) {
      cart.push({id: productId, name: pdata.name, price: pdata.price});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTotal();
    showToast(`${qty} x ${pdata.name} agregado al carrito`, 'success');
    closeProductModal();
  };

  document.getElementById('modal-add-fav').onclick = () => {
    const modal = document.getElementById('product-modal');
    const productId = Number(modal.dataset.productId);
    const pdata = productData[productId];
    
    if (!pdata) {
      showToast('Error: Producto no encontrado', 'error');
      return;
    }
    
    if (!favs.includes(productId)) {
      favs.push(productId);
      localStorage.setItem('favs', JSON.stringify(favs));
      showToast(`${pdata.name} agregado a favoritos`, 'success');
    } else {
      showToast(`${pdata.name} ya está en favoritos`, 'info');
    }
  };
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.style.display = 'none';
}

// Toast notification system
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let bgColor = '#4caf50'; // success
  let icon = 'fa-check-circle';
  if (type === 'error') {
    bgColor = '#f44336';
    icon = 'fa-exclamation-circle';
  } else if (type === 'warning') {
    bgColor = '#ff9800';
    icon = 'fa-warning';
  } else if (type === 'info') {
    bgColor = '#2196f3';
    icon = 'fa-info-circle';
  }

  toast.style.cssText = `
    background: ${bgColor};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    min-width: 300px;
    pointer-events: all;
    animation: slideIn 0.3s ease;
  `;

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add CSS animations for toast
if (!document.getElementById('toast-styles')) {
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Suscripción desde `contacto.html` (input + botón)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('subscribe-btn');
  console.log('subscribe handler init, button found:', !!btn);
  if (!btn) return;
  btn.addEventListener('click', () => {
    console.log('subscribe button clicked');
    const emailEl = document.getElementById('subscribe-email');
    const email = emailEl ? emailEl.value.trim() : '';
    if (!email) {
      showToast('Introduce un correo válido', 'warning');
      return;
    }

    fetch(`${CONFIG.API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: email, asunto: 'Suscripción', mensaje: 'Registro boletín' })
    })
    .then(r => r.json())
    .then(data => {
      if (data && data.ok) {
        showToast('¡Gracias! Correo registrado', 'success');
        if (emailEl) emailEl.value = '';
      } else {
        showToast('Error al registrar: ' + (data && data.error ? data.error : 'inténtalo de nuevo'), 'error');
      }
    })
    .catch(err => {
      console.error('Error al enviar suscripción:', err);
      showToast('Error de conexión con el servidor', 'error');
    });
  });
});
