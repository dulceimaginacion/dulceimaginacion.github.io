
// scripts/tienda.js - loads assets/data/tienda.json and renders products
document.addEventListener('DOMContentLoaded', function(){
  const container = document.getElementById('productos-list');
  const filters = document.getElementById('categoria-filter');
  fetch('assets/data/tienda.json').then(r=>r.json()).then(data=>{
    window.tiendaData = data;
    const categorias = Array.from(new Set(data.map(p=>p.categoria)));
    // add filter options
    const allOpt = document.createElement('option'); allOpt.value='all'; allOpt.innerText='Todas las categorías'; filters.appendChild(allOpt);
    categorias.forEach(cat=>{
      const o = document.createElement('option'); o.value=cat; o.innerText=cat; filters.appendChild(o);
    });
    // render all
    renderProducts(data);
    filters.addEventListener('change', function(){
      const val = this.value;
      if(val==='all') renderProducts(data); else renderProducts(data.filter(p=>p.categoria===val));
    });
  });

  function renderProducts(list){
    container.innerHTML = '';
    list.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" class="product-img">
        <h4>${p.nombre}</h4>
        <p class="prod-desc">${p.descripcion || ''}</p>
        <div class="prod-meta"><strong>${p.precio.toLocaleString('es-CO')} COP</strong></div>
        <button class="add-cart" data-id="${p.id}">Pedir / Consultar</button>
      `;
      container.appendChild(card);
    });
  }

  // simple add-cart handler (opens whatsapp with prefilled message)
  document.body.addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('add-cart')){
      const id = e.target.dataset.id;
      const prod = window.tiendaData.find(x=>x.id===id);
      if(!prod) return;
      const msg = encodeURIComponent(`Hola! Me interesa el producto: ${prod.nombre} (${prod.categoria}) - ¿Está disponible?`);
      window.open(`https://wa.me/573122665870?text=${msg}`, '_blank');
    }
  });
});
