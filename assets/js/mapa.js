(function(){
  if (!window.L) return;
  const map = L.map('map').setView([12.8654, -85.2072], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let markers = [];

  function clearMarkers(){ markers.forEach(m=>map.removeLayer(m)); markers = []; }
  function add(r){
    const m = L.marker([r.lat, r.lng]).addTo(map)
      .bindPopup(`<strong>${r.nombre}</strong><br>${r.ciudad} — ${formatUSD(r.precio)}`);
    markers.push(m);
  }

  function render(){
    clearMarkers();
    const barato = document.getElementById('fBarato').checked;
    const medio  = document.getElementById('fMedio').checked;
    const alto   = document.getElementById('fAlto').checked;
    DATA.reservas.forEach(r => {
      const tier = r.precio < 40 ? 'barato' : (r.precio <= 42 ? 'medio' : 'alto');
      if ((tier==='barato' && barato) || (tier==='medio' && medio) || (tier==='alto' && alto)) add(r);
    });
  }

  ['fBarato','fMedio','fAlto'].forEach(id=>{
    const el = document.getElementById(id); if (el) el.addEventListener('change', render);
  });
  render();
})();