
// scripts/aguapanela.js - simple assistant UI (client-side only)
document.addEventListener('DOMContentLoaded', function(){
  // create button
  const btn = document.createElement('div');
  btn.className = 'aguapanela-button';
  btn.setAttribute('aria-label', 'Abrir Aguapanela');
  btn.innerHTML = '<div class="aguapanela-avatar"><img src="assets/img/icon.png" alt="Aguapanela" style="width:100%;height:100%;object-fit:cover;border-radius:8px"></div>';
  document.body.appendChild(btn);

  // create panel
  const panel = document.createElement('div');
  panel.className = 'aguapanela-panel';
  panel.innerHTML = `
    <div class="aguapanela-header">
      <div class="aguapanela-avatar"><img src="assets/img/icon.png" alt="Aguapanela" style="width:100%;height:100%;object-fit:cover;border-radius:8px"></div>
      <h4>AguaPanela</h4>
    </div>
    <div class="aguapanela-messages" id="aguapanela-messages"></div>
    <div class="aguapanela-input">
      <input id="aguapanela-input" placeholder="Escribe tu pregunta...">
      <button id="aguapanela-send">Enviar</button>
    </div>
  `;
  document.body.appendChild(panel);

  // toggle
  btn.addEventListener('click', function(){
    panel.classList.toggle('open');
    // if opening, add welcome message once
    const msgs = document.getElementById('aguapanela-messages');
    if(panel.classList.contains('open') && !msgs.dataset.welcomed){
      const welcome = document.createElement('div');
      welcome.className = 'aguapanela-msg bot';
      welcome.innerText = '☕ ¡Hola! Soy Aguapanela Dulce Imaginación, tu asistente artesanal. ¿Qué Idea tienes en mente?';
      msgs.appendChild(welcome);
      msgs.dataset.welcomed = '1';
      msgs.scrollTop = msgs.scrollHeight;
    }
  });

  // send handler (mock)
  document.addEventListener('click', function(e){
    if(e.target && e.target.id === 'aguapanela-send'){
      const input = document.getElementById('aguapanela-input');
      const val = input.value.trim();
      if(!val) return;
      const msgs = document.getElementById('aguapanela-messages');
      const user = document.createElement('div');
      user.className = 'aguapanela-msg';
      user.innerText = val;
      msgs.appendChild(user);
      input.value = '';
      // mock bot reply
      setTimeout(function(){
        const bot = document.createElement('div');
        bot.className = 'aguapanela-msg bot';
        bot.innerText = 'Gracias por tu mensaje. Pronto te responderemos con ternura ✨';
        msgs.appendChild(bot);
        msgs.scrollTop = msgs.scrollHeight;
      }, 700);
    }
  });

  // small hover pulse
  btn.addEventListener('mouseover', function(){ btn.style.transform = 'translateY(-4px)'; });
  btn.addEventListener('mouseout', function(){ btn.style.transform = ''; });
});
