/* ============================================================
   Applies each panel's background image.
   Images live in images/background/ — topbg.jpg, midbg.jpg, botbg.jpg
   (set via data-bg in index.html). If a file is missing, the panel
   just falls back to the plain theme color — no error shown.
============================================================= */
window.App = window.App || {};

App.initPanelBackgrounds = function(){
  document.querySelectorAll('.panel[data-bg]').forEach(panel=>{
    panel.style.backgroundImage = `url('${panel.dataset.bg}')`;
  });
};
