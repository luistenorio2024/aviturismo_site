
(function(){
  const ul=document.getElementById('listaEventos'); if(!ul)return;
  DATA.eventos.forEach(e=>{const li=document.createElement('li'); li.className='list-group-item d-flex justify-content-between'; li.innerHTML=`<span>${e.titulo}</span><span class="badge bg-success-subtle text-success">${new Date(e.fecha).toLocaleDateString('es-NI')}</span>`; ul.appendChild(li);});
})();
