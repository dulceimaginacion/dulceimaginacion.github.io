import React, {useState, useEffect, useRef} from 'react';

export default function ChatWindow(){
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const messagesRef = useRef(null);

  useEffect(()=>{
    const stored = localStorage.getItem('AGUAPANELA_GOOGLE_API_KEY') || '';
    setKey(stored);
  },[]);

  useEffect(()=>{ if(messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight; },[messages]);

  function saveKey(){ localStorage.setItem('AGUAPANELA_GOOGLE_API_KEY', key); alert('Clave guardada en este navegador.'); setKey(''); }
  function clearKey(){ localStorage.removeItem('AGUAPANELA_GOOGLE_API_KEY'); alert('Clave borrada.'); }

  async function send(){
    if(!input) return;
    const userMessage = {who:'user', text: input};
    setMessages(m=>[...m, userMessage]);
    setInput('');
    const apiKey = localStorage.getItem('AGUAPANELA_GOOGLE_API_KEY');
    if(!apiKey){
      setMessages(m=>[...m, {who:'ai', text:'No hay API key configurada. Abre ajustes para agregarla.'}]);
      return;
    }
    setMessages(m=>[...m, {who:'ai', text:'Pensando...'}]);
    try{
      const resp = await fetch('https://generative.googleapis.com/v1beta2/models/text-bison-001:generate?key=' + encodeURIComponent(apiKey), {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({prompt:{text: input}, temperature:0.2, maxOutputTokens:256})
      });
      if(!resp.ok){ const txt = await resp.text(); setMessages(m=>[...m, {who:'ai', text:'Error API: '+resp.status+' '+txt}]); return; }
      const data = await resp.json();
      let answer = '';
      if(data.candidates && data.candidates.length) answer = data.candidates[0].content || data.candidates[0].output || JSON.stringify(data.candidates[0]);
      else if(data.output) answer = data.output[0]?.content || JSON.stringify(data.output);
      else answer = JSON.stringify(data).slice(0,600);
      setMessages(m=>[...m.slice(0,-1), {who:'ai', text: answer}]);
    }catch(err){
      setMessages(m=>[...m, {who:'ai', text:'Error de conexión: '+err.message}]);
    }
  }

  return (
    <>
      <button aria-label="Abrir chat" onClick={()=>setOpen(true)} className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-pink-200 shadow-lg flex items-center justify-center text-2xl">☕</button>
      {open && (
        <div className="fixed right-6 bottom-20 w-80 bg-white rounded-xl shadow-2xl overflow-hidden" role="dialog" aria-modal="true">
          <div className="bg-pink-50 px-4 py-3 flex items-center gap-3">
            <img src="/public/icon.svg" alt="" className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <div className="font-semibold">Aguapanela Dulce Imaginación</div>
              <div className="text-xs text-stone-500">Un lugar donde la imaginación se sirve dulce y con amor. ☕💭</div>
            </div>
            <button onClick={()=>setOpen(false)} className="text-stone-400">✕</button>
          </div>
          <div className="p-3 h-56 overflow-auto" ref={messagesRef}>
            {messages.length===0 && <div className="text-sm text-stone-500">✨ Bienvenid@s al universo creativo de Aguapanela Dulce Imaginación.<br/>¿Cuál es la idea que tienes en mente hoy?</div>}
            {messages.map((m,i)=> (
              <div key={i} className={'my-2 flex '+(m.who==='user'?'justify-end':'justify-start')}>
                {m.who==='ai' && <div className="w-8 h-8 mr-2"><img src="/public/icon.svg" alt="" className="w-8 h-8 rounded-full"/></div>}
                <div className={'px-3 py-2 rounded-lg max-w-[70%] '+(m.who==='user'?'bg-pink-100 text-stone-700':'bg-sky-50 text-stone-700')}>{m.text}</div>
                {m.who==='user' && <div className="w-8 h-8 ml-2"></div>}
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Escribe tu idea..." className="flex-1 px-3 py-2 border rounded-lg" />
              <button onClick={send} className="px-3 py-2 bg-pink-300 rounded-lg">Enviar</button>
            </div>
            <div className="mt-2 text-xs text-stone-500 flex gap-2">
              <input value={key} onChange={e=>setKey(e.target.value)} placeholder="Pega tu API key" className="flex-1 px-2 py-1 border rounded" />
              <button onClick={saveKey} className="px-2 py-1 bg-sky-100 rounded">Guardar</button>
              <button onClick={clearKey} className="px-2 py-1 bg-stone-100 rounded">Borrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
