(function(){
  const aves = window.DATA.aves;
  const grid = document.getElementById('avesGrid');
  const fText = document.getElementById('fText');
  const fCategoria = document.getElementById('fCategoria');
  const fRegion = document.getElementById('fRegion');
  const fEstado = document.getElementById('fEstado');
  const pag = document.getElementById('paginacion');
  const favKey = 'favAves';

  // Populate filters
  const cats = [...new Set(aves.map(a => a.categoria))].sort();
  cats.forEach(c => fCategoria.append(new Option(c, c)));
  const regs = [...new Set(aves.map(a => a.region))].sort();
  regs.forEach(r => fRegion.append(new Option(r, r)));

  let state = {page:1, perPage:6, list: aves.slice(), favs: new Set(JSON.parse(localStorage.getItem(favKey) || '[]'))};

  function saveFavs(){
    localStorage.setItem(favKey, JSON.stringify([...state.favs]));
  }

  function pageCount(){ return Math.max(1, Math.ceil(state.list.length / state.perPage)); }

  function openModal(a){
    const m = new bootstrap.Modal('#birdModal');
    document.getElementById('bmTitle').textContent = a.nombre + ' — ' + a.cientifico;
    document.getElementById('bmImg').src = a.imagen;
    document.getElementById('bmInfo').innerHTML = `
      <div><strong>Región:</strong> ${a.region}</div>
      <div><strong>Hábitat:</strong> ${a.habitat}</div>
      <div><strong>Estado:</strong> ${a.estado}</div>
      <div class="mt-2 text-muted">Ficha demostrativa sin fines científicos.</div>`;
    m.show();
  }

  function render(){
    grid.innerHTML = '';
    const start = (state.page-1)*state.perPage;
    const slice = state.list.slice(start, start + state.perPage);

    if (!slice.length){
      grid.innerHTML = '<div class="col-12"><div class="alert alert-info">No se encontraron aves con los filtros seleccionados.</div></div>';
      pag.innerHTML = ''; 
      return;
    }
    slice.forEach(a => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';
      const isFav = state.favs.has(a.id);
      col.innerHTML = `
        <div class="card card-bird h-100 position-relative">
          <button class="btn-fav ${isFav ? 'active' : ''}" title="Favorito" data-fav="${a.id}">★</button>
          <img src="${a.imagen}" class="card-img-top" alt="${a.nombre}">
          <div class="card-body">
            <h5 class="card-title mb-1">${a.nombre}</h5>
            <div class="text-muted small fst-italic">${a.cientifico}</div>
            <div class="mt-2 small">📍 ${a.region}</div>
            <span class="badge bg-success-subtle text-success mt-2">${a.categoria}</span>
            <span class="badge bg-primary-subtle text-primary mt-2">${a.estado}</span>
            <div class="d-grid mt-2">
              <button class="btn btn-outline-primary btn-sm" data-detalle="${a.id}">Ver detalles</button>
            </div>
          </div>
        </div>`;
      grid.appendChild(col);
    });

    // Fav + modal bindings
    grid.querySelectorAll('[data-fav]').forEach(b=>b.addEventListener('click', e=>{
      const id = Number(e.currentTarget.dataset.fav);
      if (state.favs.has(id)) state.favs.delete(id); else state.favs.add(id);
      saveFavs(); render();
    }));
    grid.querySelectorAll('[data-detalle]').forEach(b=>b.addEventListener('click', e=>{
      const id = Number(e.currentTarget.dataset.detalle);
      const a = aves.find(x=>x.id===id);
      openModal(a);
    }));

    // Pagination
    const total = pageCount();
    let html = '';
    html += `<button class="btn btn-outline-success btn-sm" data-page="${Math.max(1, state.page-1)}">Anterior</button>`;
    for(let i=1;i<=total;i++){
      html += `<button class="btn btn-sm ${i===state.page?'btn-success':'btn-outline-success'}" data-page="${i}">${i}</button>`;
    }
    html += `<button class="btn btn-outline-success btn-sm" data-page="${Math.min(total, state.page+1)}">Siguiente</button>`;
    pag.innerHTML = html;
    pag.querySelectorAll('button').forEach(b=>b.addEventListener('click', e=>{
      state.page = Number(e.currentTarget.dataset.page); render();
    }));
  }

  function apply(){
    const txt = (fText.value || '').toLowerCase().trim();
    let list = aves.slice();
    if (fCategoria.value) list = list.filter(a => a.categoria === fCategoria.value);
    if (fRegion.value) list = list.filter(a => a.region === fRegion.value);
    if (fEstado.value) list = list.filter(a => a.estado === fEstado.value);
    if (txt) list = list.filter(a => (a.nombre+' '+a.cientifico).toLowerCase().includes(txt));
    state.list = list; state.page = 1; render();
  }

  document.getElementById('btnAplicar').addEventListener('click', apply);
  render();
})();