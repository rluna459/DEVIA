let currentSlide = 0;
const totalSlides = 4; // Actualizado a 4 pantallas tras quitar Proyectos
const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Control de desplazamiento horizontal (solo actúa en pantallas grandes)
function goToSlide(index) {
  if (window.innerWidth <= 900) {
    // En mobile navega haciendo scroll nativo vertical a la sección correspondiente
    const sections = document.querySelectorAll('.section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;
  currentSlide = index;
  slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
}

// Navegación con flechas del teclado
document.addEventListener('keydown', (e) => {
  if (window.innerWidth > 900) {
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
  }
});

// Seleccionar servicio desde la card y pasar directo al formulario
function selectServiceAndGo(serviceName) {
  const select = document.getElementById('serviceSelect');
  if (select) {
    select.value = serviceName;
  }
  goToSlide(3); // Navega a la pantalla del Formulario (índice 3)
}

// Envío formateado a WhatsApp
function sendToWhatsApp(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const service = document.getElementById('serviceSelect').value;
  const budget = document.getElementById('budgetSelect').value;
  const description = document.getElementById('description').value;
  
  const myPhoneNumber = "5493874632445"; // Reemplaza por tu teléfono en formato intl (Ej: 5491123456789)

  const message = `Hola Devia Software! %0A%0AMi correo es: ${email}%0AServicio de interés: *${service}*%0APresupuesto: *${budget}*%0A%0A*Detalles del proyecto:*%0A${description}`;
  
  window.open(`https://wa.me/${myPhoneNumber}?text=${message}`, '_blank');
}