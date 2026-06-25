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

  // Signature: animated rep counter + bar chart
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const repCountEl = document.getElementById('repCount');
  const repBarsEl = document.getElementById('repBars');
  const totalBars = 12;
  for(let i=0; i<totalBars; i++){
    const bar = document.createElement('div');
    bar.className = 'bar-col';
    bar.style.height = (12 + Math.random()*18) + 'px';
    repBarsEl.appendChild(bar);
  }
  const barEls = repBarsEl.querySelectorAll('.bar-col');

  function animateReps(){
    let count = 0;
    const target = 12;
    const duration = 1400;
    const stepTime = duration / target;
    const interval = setInterval(() => {
      count++;
      repCountEl.textContent = count;
      // light up bars progressively
      const activeIdx = Math.floor((count / target) * totalBars);
      barEls.forEach((b, i) => {
        if(i < activeIdx){
          b.classList.add('active');
          b.style.height = (28 + Math.random()*42) + 'px';
        }
      });
      if(count >= target){
        clearInterval(interval);
        setTimeout(() => {
          // reset and loop
          count = 0;
          repCountEl.textContent = 0;
          barEls.forEach(b => { b.classList.remove('active'); b.style.height = (12 + Math.random()*18) + 'px'; });
          if(!prefersReduced) setTimeout(animateReps, 900);
        }, 1100);
      }
    }, stepTime);
  }

  if(prefersReduced){
    repCountEl.textContent = '12';
    barEls.forEach(b => { b.classList.add('active'); b.style.height='40px'; });
  } else {
    animateReps();
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