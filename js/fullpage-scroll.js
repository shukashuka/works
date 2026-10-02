/* ============================================================
   Fullpage scroll: one wheel/swipe/keypress moves straight to the
   next section (desktop only — see css/responsive.css for the
   ≤900px breakpoint where this is disabled and normal scroll
   takes over). Also drives the right-side dot navigation.
============================================================= */
window.App = window.App || {};

App.initFullpageScroll = function(){
  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const container = document.getElementById('fullpage-container');
  const panels = Array.from(document.querySelectorAll('.panel'));
  const dots = Array.from(document.querySelectorAll('.dot-nav .dot'));
  let current = 0, animating = false;

  function setActiveDot(i){
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
  }

  function goToPanel(i){
    if(i < 0 || i >= panels.length || animating) return;
    animating = true;
    current = i;
    container.style.transform = `translateY(-${i * 100}vh)`;
    if(App.setBackgroundColorForPanel) App.setBackgroundColorForPanel(i);
    setActiveDot(i);
    setTimeout(()=>{ animating = false; }, 850);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if(isMobile){
        panels[i].scrollIntoView({behavior:'smooth', block:'start'});
        setActiveDot(i);
      } else {
        goToPanel(i);
      }
    });
  });

  if(!isMobile){
    window.addEventListener('wheel', (e)=>{
      if(e.deltaY > 30) goToPanel(current+1);
      else if(e.deltaY < -30) goToPanel(current-1);
    }, {passive:true});

    window.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowDown' || e.key === 'PageDown') goToPanel(current+1);
      if(e.key === 'ArrowUp' || e.key === 'PageUp') goToPanel(current-1);
    });

    let touchStartY = null;
    window.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY, {passive:true});
    window.addEventListener('touchend', e=>{
      if(touchStartY === null) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if(dy > 50) goToPanel(current+1);
      else if(dy < -50) goToPanel(current-1);
      touchStartY = null;
    }, {passive:true});
  } else {
    // Keep the active dot in sync with normal scroll position on mobile/tablet
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) setActiveDot(panels.indexOf(entry.target));
      });
    }, {threshold:.5});
    panels.forEach(p => observer.observe(p));
  }

  setActiveDot(0);
};
