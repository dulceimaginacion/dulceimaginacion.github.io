
// scripts/menu.js
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.menu-toggle');
  const panel = document.querySelector('.side-panel');
  const overlay = document.querySelector('.menu-overlay');
  const closeX = document.querySelector('.close-x');

  function openMenu(){
    panel.classList.add('open');
    overlay.classList.add('open');
  }
  function closeMenu(){
    panel.classList.remove('open');
    overlay.classList.remove('open');
  }

  toggle && toggle.addEventListener('click', function(e){
    e.stopPropagation();
    if(panel.classList.contains('open')) closeMenu(); else openMenu();
  });
  closeX && closeX.addEventListener('click', closeMenu);
  overlay && overlay.addEventListener('click', closeMenu);

  // close with ESC
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });
});
