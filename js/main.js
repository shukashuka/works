/* ============================================================
   Entry point — runs once the page loads, calling each module's
   init function in order. You normally shouldn't need to edit
   this file; see js/config.js to change your data instead.
============================================================= */
(function(){
  App.initPanelBackgrounds();
  App.initBackground3D();
  App.initFullpageScroll();
  App.renderProfileSection();
  App.initGalleryOverlay();
  App.loadProjects();
})();
