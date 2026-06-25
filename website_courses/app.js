const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));

  const burger = document.getElementById('burgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  burger.addEventListener('click', () => drawer.classList.add('open'));
  closeDrawer.addEventListener('click', () => drawer.classList.remove('open'));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if(item.classList.contains('open')) a.style.maxHeight = a.scrollHeight + 'px';
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // Module accordion
  document.querySelectorAll('.module').forEach(mod => {
    const head = mod.querySelector('.module-head');
    const body = mod.querySelector('.module-body');
    if(mod.classList.contains('open')) body.style.maxHeight = body.scrollHeight + 'px';
    head.addEventListener('click', () => {
      const isOpen = mod.classList.contains('open');
      document.querySelectorAll('.module').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.module-body').style.maxHeight = null;
      });
      if(!isOpen){ mod.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }
    });
  });

  // Signature: journey progress animation (loops through the 4 steps)
  const steps = document.querySelectorAll('.jstep');
  const pctEl = document.getElementById('journeyPct');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  const pcts = [25, 55, 80, 100];

  function renderStep(idx){
    steps.forEach((s, i) => {
      s.classList.remove('active','done');
      if(i < idx) s.classList.add('done');
      else if(i === idx) s.classList.add('active');
    });
    pctEl.textContent = pcts[idx] + '%';
  }

  if(prefersReduced){
    renderStep(steps.length - 1);
  } else {
    renderStep(0);
    setInterval(() => {
      current = (current + 1) % steps.length;
      renderStep(current);
    }, 2200);
  }

  // smooth anchor scroll offset
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if(id.length > 1){
        const target = document.querySelector(id);
        if(target){
          e.preventDefault();
          const offset = 90;
          window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - offset, behavior:'smooth'});
        }
      }
    });
  });