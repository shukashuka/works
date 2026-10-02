/* ============================================================
   Builds the bottom "Profile" section: Skills, Languages and
   Contact category cards, using SKILLS and PROFILE from
   js/config.js.
============================================================= */
window.App = window.App || {};

App.renderProfileSection = function(){
  const container = document.getElementById('profile-content');
  if(!container) return;

  container.innerHTML = `
    <div class="profile-category">
      <h3>Skills</h3>
      <div class="ring-grid" id="skills-rings"></div>
    </div>
    <div class="profile-category">
      <h3>Languages</h3>
      <div class="ring-grid" id="languages-rings"></div>
    </div>
    <div class="profile-category">
      <h3>Contact</h3>
      <div class="contact-list">
        ${PROFILE.contacts.map(c => `
          <a href="${c.href}" target="_blank" rel="noopener">
            <span class="icon-3d">${c.icon}</span> ${c.label}
          </a>`).join('')}
      </div>
    </div>`;

  if(App.renderRingInfographic){
    App.renderRingInfographic('skills-rings', SKILLS);
    App.renderRingInfographic('languages-rings', PROFILE.languages);
  }
};
