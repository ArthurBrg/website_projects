 // header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // mobile drawer
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
    if(item.classList.contains('open')){
      a.style.maxHeight = a.scrollHeight + 'px';
    }
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // testimonial auto-scroll (gentle, pauses on hover, respects reduced motion)
  const track = document.getElementById('testiTrack');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced){
    let scrollPos = 0;
    let paused = false;
    track.parentElement.addEventListener('mouseenter', () => paused = true);
    track.parentElement.addEventListener('mouseleave', () => paused = false);
    function autoScroll(){
      if(!paused){
        scrollPos += 0.4;
        if(scrollPos >= track.scrollWidth - track.parentElement.offsetWidth){
          scrollPos = 0;
        }
        track.parentElement.scrollLeft = scrollPos;
      }
      requestAnimationFrame(autoScroll);
    }
    requestAnimationFrame(autoScroll);
  }

  // smooth anchor scroll offset adjustment (for fixed header)
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