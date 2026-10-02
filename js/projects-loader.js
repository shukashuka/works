/* ============================================================
   Auto-loads the "projects" folder from your GitHub repo via the
   GitHub REST API — no manual data entry needed. Each subfolder
   becomes one project card; its name becomes the card's title.

   Requirements:
   - js/config.js > GITHUB_CONFIG.user / .repo must be correct
   - the repo must be PUBLIC (unauthenticated GitHub API access
     only works on public repos)
   See README.md > "How the Projects section works" for details.
============================================================= */
window.App = window.App || {};

const IMAGE_EXTENSION = /\.(jpe?g|png|webp|gif)$/i;

App.loadProjects = async function(){
  const grid = document.getElementById('projects-grid');
  if(!grid) return;

  if(!window.GITHUB_CONFIG){
    grid.innerHTML = '<p class="loading-note">GITHUB_CONFIG is missing in js/config.js</p>';
    return;
  }

  const {user, repo, branch} = GITHUB_CONFIG;
  const projectsUrl = `https://api.github.com/repos/${user}/${repo}/contents/projects?ref=${branch}`;

  try{
    const res = await fetch(projectsUrl);
    if(!res.ok) throw new Error(`Could not read the /projects folder (${res.status})`);
    const items = await res.json();
    const folders = items.filter(item => item.type === 'dir');

    if(folders.length === 0){
      grid.innerHTML = '<p class="loading-note">The projects folder is empty. Add a subfolder with photos, then commit & push.</p>';
      return;
    }

    grid.innerHTML = '';
    for(const folder of folders){
      const filesRes = await fetch(`${folder.url}?ref=${branch}`);
      const files = await filesRes.json();
      const images = (Array.isArray(files) ? files : [])
        .filter(f => IMAGE_EXTENSION.test(f.name))
        .map(f => f.download_url);

      if(images.length === 0) continue;
      grid.appendChild(buildProjectCard(folder.name, images));
    }
  }catch(err){
    grid.innerHTML = `<p class="loading-note">Couldn't load projects automatically (${err.message}).
      Make sure the repo is public and GITHUB_CONFIG in js/config.js is correct. See README.md.</p>`;
  }
};

function buildProjectCard(name, images){
  const card = document.createElement('div');
  card.className = 'project-card';

  const main = images[0];
  const scatter = images.slice(1, 4);
  const scatterHtml = scatter.map((src, i) =>
    `<img class="scatter-photo scatter-${i+1}" src="${src}" alt="${name}" loading="lazy">`
  ).join('');

  card.innerHTML = `
    <div class="photo-stack">
      ${scatterHtml}
      <img class="main-photo" src="${main}" alt="${name}" loading="lazy">
    </div>
    <div class="project-name">${name}</div>`;

  card.addEventListener('click', () => {
    if(App.openProjectOverlay) App.openProjectOverlay(name, images);
  });

  return card;
}
