 const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger / Mobile Nav 
  const hamburger   = document.getElementById('hamburger');
  const mobileNav   = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');

  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  mobileClose.addEventListener('click', closeMobile);

  function closeMobile() {
    mobileNav.classList.remove('open');
  }

  // Scroll Reveal 
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // Form submit (demo)
  function submitForm(e) {
    e.preventDefault();
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
  }

  function resetForm() {
    document.getElementById('bookingForm').style.display = 'block';
    document.getElementById('formSuccess').classList.remove('show');
  }

  // Active nav link highlight 
  const sections = document.querySelectorAll('section[id], footer');
  const navLinks  = document.querySelectorAll('nav a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--green-mid)';
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

  // Set today as min date for booking
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }