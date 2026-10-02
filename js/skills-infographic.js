/* ============================================================
   Renders an animated circular ("3D style") progress ring for each
   item in a data array ({name, level 1-10}). Reused for both the
   Skills and Languages categories in the profile section.
============================================================= */
window.App = window.App || {};

App.renderRingInfographic = function(containerId, items){
  const container = document.getElementById(containerId);
  if(!container || !items) return;

  const RADIUS = 34, CIRC = 2 * Math.PI * RADIUS;

  container.innerHTML = items.map(item => `
    <div class="ring-item">
      <div class="ring">
        <svg width="76" height="76" viewBox="0 0 76 76">
          <circle class="track" cx="38" cy="38" r="${RADIUS}"></circle>
          <circle class="progress" cx="38" cy="38" r="${RADIUS}"
            style="stroke-dasharray:${CIRC};stroke-dashoffset:${CIRC}"
            data-offset="${CIRC - (item.level/10) * CIRC}"></circle>
        </svg>
        <span class="ring-label">${item.level}/10</span>
      </div>
      <div class="ring-name">${item.name}</div>
    </div>`).join('');

  // Animate rings in after they're in the DOM
  requestAnimationFrame(()=>{
    setTimeout(()=>{
      container.querySelectorAll('.progress').forEach(circle=>{
        circle.style.strokeDashoffset = circle.dataset.offset;
      });
    }, 300);
  });
};
