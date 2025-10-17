import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatWindow from './components/ChatWindow';

function App(){ 
  return (<div className="min-h-screen bg-gradient-to-b from-white to-stone-50">
    <header className="p-6 text-center">
      <h1 className="text-2xl font-semibold">☕ Aguapanela Dulce Imaginación</h1>
      <p className="text-sm text-stone-500 mt-1">Un lugar donde la imaginación se sirve dulce y con amor. ☕💭</p>
    </header>
    <ChatWindow />
  </div>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
