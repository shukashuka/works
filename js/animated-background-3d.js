/* ============================================================
   Subtle animated 3D background (wireframe shape) using Three.js.
   Color changes when the visitor moves to a different section
   (see App.setBackgroundColorForPanel, called from fullpage-scroll.js).
============================================================= */
window.App = window.App || {};

(function(){
  let scene, camera, renderer, mesh;
  const panelColors = [0xc8983f, 0x2f7a6d, 0xe2703b]; // hero, projects, profile

  App.initBackground3D = function(){
    const canvas = document.getElementById('bg-3d');
    if(!window.THREE || !canvas) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, .1, 100);
    camera.position.z = 6;

    renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);

    const geometry = new THREE.IcosahedronGeometry(2.2, 0);
    const material = new THREE.MeshBasicMaterial({
      color: panelColors[0], wireframe: true, transparent: true, opacity: .5
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    window.addEventListener('resize', ()=>{
      camera.aspect = innerWidth/innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });

    animate();
  };

  function animate(){
    requestAnimationFrame(animate);
    if(mesh){ mesh.rotation.x += .0016; mesh.rotation.y += .0022; }
    renderer.render(scene, camera);
  }

  App.setBackgroundColorForPanel = function(panelIndex){
    if(mesh) mesh.material.color.setHex(panelColors[panelIndex % panelColors.length]);
  };
})();
