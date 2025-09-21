(function(){
  const reservas = DATA.reservas;
  const guias = DATA.guias;
  let state = { reserva: reservas[0], adultos:1, ninos:0, guia: guias[0], noches:1 };

  const params = new URLSearchParams(location.search);
  const pre = params.get('reserva');
  if (pre){
    const found = reservas.find(r => String(r.id)===String(pre));
    if (found) state.reserva = found;
  }

  const selReservas = document.getElementById('selReservas');
  const selGuias = document.getElementById('selGuias');
  const resumen = document.getElementById('resumen');

  function renderReservas(){
    selReservas.innerHTML='';
    reservas.forEach(r => {
      const col = document.createElement('div');
      col.className = 'col-md-6';
      col.innerHTML = `
      <div class="card card-reserve h-100">
        <img src="${r.imagen}" class="card-img-top" alt="${r.nombre}">
        <div class="card-body">
          <h6 class="mb-1">${r.nombre}</h6>
          <div class="small text-muted">${r.ciudad}</div>
          <div class="mt-1">${formatUSD(r.precio)} / persona / día</div>
          <button class="btn btn-outline-success btn-sm mt-2" data-id="${r.id}">Seleccionar</button>
        </div>
      </div>`;
      selReservas.appendChild(col);
    });
    selReservas.querySelectorAll('button').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = Number(e.target.dataset.id);
        state.reserva = reservas.find(r=>r.id===id);
        updateResumen();
      });
    });
  }

  function renderGuias(){
    selGuias.innerHTML='';
    guias.forEach(g => {
      const card = document.createElement('div');
      card.className = 'card p-3';
      card.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <div class="fw-semibold">${g.nombre}</div>
            <div class="small text-muted">${g.experiencia} años de experiencia</div>
          </div>
          <div class="text-end">
            <div>${formatUSD(g.tarifa)} / hora</div>
            <button class="btn btn-outline-primary btn-sm mt-2" data-id="${g.id}">Seleccionar</button>
          </div>
        </div>`;
      selGuias.appendChild(card);
    });
    selGuias.querySelectorAll('button').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = Number(e.target.dataset.id);
        state.guia = guias.find(g=>g.id===id);
        updateResumen();
      });
    });
  }

  function calcularNoches(){
    const i = document.getElementById('fInicio').value;
    const f = document.getElementById('fFin').value;
    if (!i || !f) return 1;
    const di = new Date(i); const df = new Date(f);
    let diff = Math.round((df - di) / (1000*60*60*24));
    if (isNaN(diff) || diff < 1) diff = 1;
    return diff;
  }

  function updateResumen(){
    const adultos = Number(document.getElementById('fAdultos').value);
    const ninos = Number(document.getElementById('fNinos').value);
    const noches = calcularNoches();
    state.adultos = adultos; state.ninos = ninos; state.noches = noches;

    const precioDia = state.reserva.precio;
    const tarifaReserva = (adultos * precioDia + ninos * precioDia * 0.5) * noches;
    const horasGuia = 4 * noches;
    const tarifaGuia = state.guia.tarifa * horasGuia;
    const impuestos = (tarifaReserva + tarifaGuia) * 0.09;
    const total = tarifaReserva + tarifaGuia + impuestos;

    resumen.innerHTML = `
      <div class="d-flex gap-2 align-items-start">
        <img src="${state.reserva.imagen}" width="64" class="rounded" alt="">
        <div>
          <div class="fw-semibold">${state.reserva.nombre}</div>
          <div class="small text-muted">${state.reserva.ciudad}</div>
        </div>
      </div>
      <ul class="list-unstyled mt-2">
        <li>Noches: <strong>${noches}</strong></li>
        <li>Personas: <strong>${adultos} adultos</strong> y <strong>${ninos} niños</strong></li>
        <li>Guía: <strong>${state.guia.nombre}</strong> (${horasGuia} horas)</li>
      </ul>
      <div class="border-top pt-2">
        <div class="d-flex justify-content-between"><span>Tarifa reserva</span><strong>${formatUSD(tarifaReserva)}</strong></div>
        <div class="d-flex justify-content-between"><span>Guía</span><strong>${formatUSD(tarifaGuia)}</strong></div>
        <div class="d-flex justify-content-between"><span>Impuestos (9%)</span><strong>${formatUSD(impuestos)}</strong></div>
        <div class="d-flex justify-content-between fs-5 mt-2"><span>Total</span><strong>${formatUSD(total)}</strong></div>
      </div>`;
  }

  ['fAdultos','fNinos','fInicio','fFin'].forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateResumen);
  });

  document.getElementById('btnPagar').addEventListener('click', ()=>{
    alert('¡Reserva confirmada! (simulada)');
  });

  renderReservas(); renderGuias(); updateResumen();
})();