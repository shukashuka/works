/* ============================================================
   Full-folder gallery overlay (opened from a project card) and
   the single-photo lightbox opened from inside that gallery.
============================================================= */
window.App = window.App || {};

App.initGalleryOverlay = function(){
  const overlay = document.getElementById('project-overlay');
  const overlayGrid = document.getElementById('overlay-grid');
  const overlayTitle = document.getElementById('overlay-title');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  App.openProjectOverlay = function(name, images){
    overlayTitle.textContent = name;
    overlayGrid.innerHTML = images.map(src =>
      `<img src="${src}" alt="${name}" loading="lazy">`).join('');

    overlayGrid.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
      });
    });

    overlay.classList.add('open');
  };

  document.getElementById('overlay-close').addEventListener('click', ()=>
    overlay.classList.remove('open'));
  document.getElementById('lightbox-close').addEventListener('click', ()=>
    lightbox.classList.remove('open'));

  lightbox.addEventListener('click', e => {
    if(e.target === lightbox) lightbox.classList.remove('open');
  });

  window.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
      overlay.classList.remove('open');
      lightbox.classList.remove('open');
    }
  });
};
