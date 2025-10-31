// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Language System
let lang = localStorage.getItem('lang') || 'ru';

function setLang(newLang) {
  lang = newLang;
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    const key = el.id;
    const placeholders = {
      en: { name: "John Doe", phone: "+1 (555) 123-4567", company: "Acme Corp", preferred: "e.g. Tuesday 2–4 PM", message: "Tell us about your goals..." },
      ru: { name: "Иван Иванов", phone: "+7 (999) 123-45-67", company: "ООО Ромашка", preferred: "вт 14:00–16:00", message: "Расскажите о ваших целях..." }
    };
    if (placeholders[lang][key] !== undefined) el.placeholder = placeholders[lang][key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === lang.toUpperCase());
  });
}

setLang(lang);

// Form Submission
const form = document.getElementById('consultation-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  status.textContent = lang === 'ru' ? 'Отправка...' : 'Sending...';
  status.className = 'form-status';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      status.textContent = lang === 'ru' 
        ? 'Спасибо! Мы свяжемся с вами в течение 24 часов.' 
        : 'Thank you! We’ll contact you within 24 hours.';
      status.className = 'form-status success';
      form.reset();
    } else throw new Error();
  } catch {
    status.textContent = lang === 'ru'
      ? 'Ошибка. Напишите на manager@eufrasia.ru'
      : 'Error. Please email manager@eufrasia.ru';
    status.className = 'form-status error';
  }
});