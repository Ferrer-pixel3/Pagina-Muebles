// admin.js - simple admin UI to list and manage purchases
(async function(){
  const tableBody = document.querySelector('#purchases-table tbody');
  const CONFIG = { API_URL: 'http://127.0.0.1:3001/api' };
  const api = CONFIG.API_URL;

  async function fetchPurchases(){
    try{
      const res = await fetch(api + '/admin/purchases', { credentials: 'include' });
      if (!res.ok) {
        const err = await res.json().catch(()=>({error:'Unknown'}));
        throw new Error(err.error || 'No autorizado');
      }
      const data = await res.json();
      renderPurchases(data.purchases || []);
    }catch(e){
      console.error('Error cargando compras', e);
      alert('Error cargando compras: ' + e.message);
      if (e.message.includes('Not authenticated') || e.message.includes('Admin required')) window.location.href = 'login.html';
    }
  }

  function renderPurchases(list){
    tableBody.innerHTML = '';
    list.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.user_id || '-'}</td>
        <td>${escapeHtml(p.buyer_name||'')}</td>
        <td>${escapeHtml(p.buyer_email||'')}</td>
        <td>${escapeHtml(p.phone||'-')}</td>
        <td>${escapeHtml(p.address||'-')}</td>
        <td>${escapeHtml(p.location||'-')}</td>
        <td>$${Number(p.total_amount).toFixed(2)}</td>
        <td>${p.created_at}</td>
        <td class="admin-actions">
          <button data-id="${p.id}" class="view">Ver</button>
          <button data-id="${p.id}" class="edit">Editar</button>
          <button data-id="${p.id}" class="delete">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Delegated actions
  tableBody.addEventListener('click', async (e) => {
    const view = e.target.closest('.view');
    const edit = e.target.closest('.edit');
    const del = e.target.closest('.delete');
    const id = view?.dataset.id || edit?.dataset.id || del?.dataset.id;
    if (!id) return;
    if (view) {
      // fetch single purchase items and show
      const res = await fetch(api + '/admin/purchases', { credentials: 'include' });
      const data = await res.json();
      const p = (data.purchases||[]).find(x => String(x.id) === String(id));
      if (!p) return alert('Compra no encontrada');
      const items = (p.items||[]).map(i => `${i.product_name} x${i.quantity} — $${Number(i.subtotal).toFixed(2)}`).join('\n');
      alert(`Items:\n${items}`);
    } else if (edit) {
      // Get current purchase data
      const res = await fetch(api + '/admin/purchases', { credentials: 'include' });
      const data = await res.json();
      const p = (data.purchases||[]).find(x => String(x.id) === String(id));
      if (!p) return alert('Compra no encontrada');
      
      const newName = prompt('Nombre del comprador:', p.buyer_name || '');
      if (newName === null) return;
      const newEmail = prompt('Email del comprador:', p.buyer_email || '');
      if (newEmail === null) return;
      const newPhone = prompt('Teléfono:', p.phone || '');
      if (newPhone === null) return;
      const newAddress = prompt('Dirección:', p.address || '');
      if (newAddress === null) return;
      const newLocation = prompt('Ubicación/Ciudad:', p.location || '');
      if (newLocation === null) return;
      
      try{
        const r = await fetch(api + '/admin/purchases/' + id, { method: 'PUT', credentials: 'include', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ buyerName: newName, buyerEmail: newEmail, phone: newPhone, address: newAddress, location: newLocation }) });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || 'Error');
        alert('Actualizado');
        fetchPurchases();
      }catch(err){ alert('Error actualizando: '+err.message); }
    } else if (del) {
      if (!confirm('Eliminar esta compra?')) return;
      try{
        const res = await fetch(api + '/admin/purchases/' + id, { method: 'DELETE', credentials: 'include' });
        const j = await res.json();
        if (!res.ok) throw new Error(j.error || 'Error');
        alert('Eliminado');
        fetchPurchases();
      }catch(err){ alert('Error eliminando: '+err.message); }
    }
  });

  document.getElementById('logout').addEventListener('click', async () => {
    await fetch(api + '/logout', { method: 'POST', credentials: 'include' });
    window.location.href = 'login.html';
  });

  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, (c)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

  fetchPurchases();
})();
