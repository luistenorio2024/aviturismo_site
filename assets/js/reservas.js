
(function(){
  const cont=document.getElementById('reservasGrid'); const reservas=DATA.reservas;
  cont.innerHTML = reservas.map(r=>`<div class="col-md-6"><div class="card card-reserve h-100"><img src="${r.imagen}" class="card-img-top"><div class="card-body"><h5>${r.nombre}</h5><div class="small text-muted">${r.ciudad}</div><div class="mt-1">${formatUSD(r.precio)} / persona</div><a class="btn btn-brand mt-2" href="reservar.html?reserva=${r.id}">Ver detalles</a></div></div></div>`).join('');
})();
