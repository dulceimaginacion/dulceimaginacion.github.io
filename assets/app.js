const openBtn = document.getElementById('chat-button');
const modal = document.getElementById('chat-modal');
const closeBtn = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const messages = document.getElementById('messages');
const apiKeyInput = document.getElementById('api-key');
const saveKeyBtn = document.getElementById('save-key');
const clearKeyBtn = document.getElementById('clear-key');

openBtn.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','false'); userInput.focus(); loadKeyToInput(); });
closeBtn.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','true'); });
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') handleSend(); });

saveKeyBtn.addEventListener('click', ()=>{
  const k = apiKeyInput.value.trim();
  if(!k){ alert('Introduce una API key válida.'); return; }
  localStorage.setItem('AGUAPANELA_GOOGLE_API_KEY', k);
  alert('Clave guardada en el navegador (solo en este equipo).');
  apiKeyInput.value = '';
});
clearKeyBtn.addEventListener('click', ()=>{ localStorage.removeItem('AGUAPANELA_GOOGLE_API_KEY'); alert('Clave borrada.'); });

function loadKeyToInput(){ apiKeyInput.value = localStorage.getItem('AGUAPANELA_GOOGLE_API_KEY') || ''; }

function appendMessage(text, who='ai'){ 
  const wrapper = document.createElement('div');
  wrapper.className = 'msg ' + (who==='user' ? 'user' : 'ai');
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  wrapper.appendChild(who==='ai' ? (function(){ const img = document.createElement('img'); img.src='public/icon.svg'; img.className='avatar'; return img; })() : null);
  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

async function handleSend(){
  const text = userInput.value.trim();
  if(!text) return;
  appendMessage(text, 'user');
  userInput.value = '';
  const key = localStorage.getItem('AGUAPANELA_GOOGLE_API_KEY');
  if(!key){ appendMessage('No hay API Key configurada. Abre ajustes y pega tu clave.', 'ai'); return; }
  appendMessage('Pensando... (consultando la API)', 'ai');
  try{
    const endpoint = 'https://generative.googleapis.com/v1beta2/models/text-bison-001:generate';
    const body = {"prompt":{"text": text},"temperature":0.2,"maxOutputTokens":256};
    const resp = await fetch(endpoint + '?key=' + encodeURIComponent(key), {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    if(!resp.ok){ const txt = await resp.text(); appendMessage('Error de la API: ' + resp.status + ' — ' + txt, 'ai'); return; }
    const data = await resp.json();
    let answer = '';
    if(data.candidates && data.candidates.length) answer = data.candidates[0].content || data.candidates[0].output || JSON.stringify(data.candidates[0]);
    else if(data.output) answer = data.output[0]?.content || JSON.stringify(data.output);
    else answer = JSON.stringify(data).slice(0,600);
    appendMessage(answer || 'La API respondió pero no pude obtener texto legible.', 'ai');
  }catch(err){
    appendMessage('Error en fetch: ' + err.message, 'ai');
  }
}
