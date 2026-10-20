import React, { useState } from 'react';
import FormularioCompra from './components/FormularioCompra';
import ListaCompras from './components/ListaCompras';

function App() {
  const [recargar, setRecargar] = useState(0);

  return (
    <div>
      <h1>🎮 Tienda de Juegos</h1>
      <div className="card">
        <FormularioCompra onSave={() => setRecargar(r => r + 1)} />
      </div>
      <div className="card">
        <ListaCompras recargar={recargar} />
      </div>
    </div>
  );
}

export default App;