import React, { useState } from 'react';
import FormularioCompra from './components/FormularioCompra';
import ListaCompras from './components/ListaCompras';

function App() {
  const [recargar, setRecargar] = useState(0);
  const [aviso, setAviso] = useState(null);

  const avisar = (texto, tipo = 'ok') => {
    setAviso({ texto, tipo });
    setTimeout(() => setAviso(null), 2500);
  };

  return (
    <div>
      <h1>🎮 Tienda de Juegos</h1>
      <div className="card">
        <FormularioCompra onSave={() => setRecargar(r => r + 1)} avisar={avisar} />
      </div>
      <div className="card">
        <ListaCompras recargar={recargar} avisar={avisar} />
      </div>
      {aviso && <div className={`toast ${aviso.tipo}`}>{aviso.texto}</div>}
    </div>
  );
}

export default App;