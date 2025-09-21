
// Datos de demo embebidos
window.DATA = {
  aves: [
    {id:1, nombre:"Guardabarranco", cientifico:"Eumomota superciliosa", region:"Región Central y Pacífico", habitat:"Bosque Tropical Seco", estado:"Nacional", categoria:"Motmot", imagen:"https://images.unsplash.com/photo-1550954970-9f8d0d8c4af0?q=80&w=1200&auto=format&fit=crop"},
    {id:2, nombre:"Tucán Pico Iris", cientifico:"Ramphastos sulfuratus", region:"Bosque Tropical Húmedo", habitat:"Selva tropical", estado:"Vulnerable", categoria:"Tucán", imagen:"https://images.unsplash.com/photo-1567094911054-1719dad9dad7?q=80&w=1200&auto=format&fit=crop"},
    {id:3, nombre:"Quetzal Resplandeciente", cientifico:"Pharomachrus mocinno", region:"Bosques Nubosos del Norte", habitat:"Bosque nuboso", estado:"Casi amenazado", categoria:"Trogón", imagen:"https://images.unsplash.com/photo-1544552863-5f1f0c79e5b8?q=80&w=1200&auto=format&fit=crop"},
    {id:4, nombre:"Colibrí Garganta de Rubí", cientifico:"Archilochus colubris", region:"Región Central", habitat:"Bosque", estado:"Migratorio", categoria:"Colibrí", imagen:"https://images.unsplash.com/photo-1501706362039-c06b2d715385?q=80&w=1200&auto=format&fit=crop"},
    {id:5, nombre:"Águila Harpía", cientifico:"Harpia harpyja", region:"Bosque Atlántico", habitat:"Selva", estado:"En Peligro", categoria:"Rapaz", imagen:"https://images.unsplash.com/photo-1600357164856-4dd2d2e8f7ca?q=80&w=1200&auto=format&fit=crop"},
    {id:6, nombre:"Zanate Grande", cientifico:"Quiscalus mexicanus", region:"Todo el país", habitat:"Urbano", estado:"Residente", categoria:"Icterido", imagen:"https://images.unsplash.com/photo-1619433359741-4f3fcf0be8ad?q=80&w=1200&auto=format&fit=crop"},
    {id:7, nombre:"Oropéndola de Montezuma", cientifico:"Psarocolius montezuma", region:"Bosques Húmedos", habitat:"Selva", estado:"Residente", categoria:"Icterido", imagen:"https://images.unsplash.com/photo-1604233917142-e2a3790fb70a?q=80&w=1200&auto=format&fit=crop"},
    {id:8, nombre:"Reinita Azul", cientifico:"Setophaga cerulea", region:"Bosque del Norte", habitat:"Bosque templado", estado:"Vulnerable", categoria:"Parúlido", imagen:"https://images.unsplash.com/photo-1607887887631-9cfbfbe4ae34?q=80&w=1200&auto=format&fit=crop"}
  ],
  reservas: [
    {id:1, nombre:"Reserva de Biosfera Bosawás", ciudad:"Jinotega", precio:45, lat:13.7, lng:-85.0, imagen:"https://images.unsplash.com/photo-1562166436-0ea4e5cb3b9e?q=80&w=1200&auto=format&fit=crop"},
    {id:2, nombre:"Reserva Natural Laguna de Apoyo", ciudad:"Masaya", precio:35, lat:11.922, lng:-86.044, imagen:"https://images.unsplash.com/photo-1603565815852-98db22e6d9b3?q=80&w=1200&auto=format&fit=crop"},
    {id:3, nombre:"Reserva Silvestre El Jaguar", ciudad:"Jinotega", precio:40, lat:13.217, lng:-86.047, imagen:"https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=1200&auto=format&fit=crop"},
    {id:4, nombre:"Reserva Natural Volcán Mombacho", ciudad:"Granada", precio:38, lat:11.829, lng:-85.967, imagen:"https://images.unsplash.com/photo-1529927052688-d8fc1b8bc43a?q=80&w=1200&auto=format&fit=crop"},
    {id:5, nombre:"Refugio de Vida Silvestre Los Guatuzos", ciudad:"Río San Juan", precio:42, lat:11.0, lng:-84.9, imagen:"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1200&auto=format&fit=crop"}
  ],
  guias: [
    {id:1, nombre:"Elena Martínez", experiencia:8, tarifa:25, rating:4.8},
    {id:2, nombre:"Roberto Guzmán", experiencia:12, tarifa:30, rating:5.0},
    {id:3, nombre:"Ana Lucía Vega", experiencia:5, tarifa:22, rating:4.2}
  ],
  eventos: [
    {id:1, titulo:"Festival del Guardabarranco", fecha:"2025-10-12", lugar:"Reserva El Chocoyero"},
    {id:2, titulo:"Taller de Fotografía de Aves", fecha:"2025-10-20", lugar:"Reserva Miraflor"},
    {id:3, titulo:"Avistamiento Guiado de Aves", fecha:"2025-10-25", lugar:"Laguna de Apoyo"},
    {id:4, titulo:"Migración de Rapaces", fecha:"2025-11-02", lugar:"Volcán Mombacho"}
  ]
};
window.formatUSD = (n) => '$' + Number(n||0).toFixed(2) + ' USD';
window.getUser = () => { const raw=localStorage.getItem('user'); return raw?JSON.parse(raw):null; };
window.setUser = (u) => localStorage.setItem('user', JSON.stringify(u));
document.addEventListener('DOMContentLoaded', ()=>{
  const u = window.getUser();
  const badge = document.getElementById('userBadge');
  if (badge) badge.textContent = u ? u.nombre : 'Invitado';
});
