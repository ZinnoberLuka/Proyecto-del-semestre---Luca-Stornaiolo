function saveLeadData(data) {
  localStorage.setItem('leadData', JSON.stringify(data));
}

function getLeadData() {
  return JSON.parse(localStorage.getItem('leadData') || 'null');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[0-9+\-\s()]{7,15}$/.test(phone);
}

function setError(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const career = document.getElementById('career').value.trim();
      const switchCareer = document.getElementById('switchCareer').checked;

      let valid = true;

      setError('nameError', false);
      setError('emailError', false);
      setError('phoneError', false);

      if (!name) {
        setError('nameError', true);
        valid = false;
      }
      if (!validateEmail(email)) {
        setError('emailError', true);
        valid = false;
      }
      if (!validatePhone(phone)) {
        setError('phoneError', true);
        valid = false;
      }
      if (!valid) return;

      saveLeadData({ name, email, phone, career, switchCareer });
      window.location.href = 'confirmacion.html';
    });
  }

  const summaryText = document.getElementById('summaryText');
  if (summaryText) {
    const saved = getLeadData();
    if (saved) {
      summaryText.textContent =
        `Nombre: ${saved.name} · Email: ${saved.email} · Teléfono: ${saved.phone}` +
        (saved.career ? ` · Carrera actual: ${saved.career}` : '') +
        (saved.switchCareer ? ' · Interesado en cambio de carrera: Sí' : '');
    }
  }
});