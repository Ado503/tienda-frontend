import React, { useState } from 'react';
import FormularioCompra from './components/FormularioCompra.jsx';
import ListaCompras from './components/ListaCompras';

function App() {
  const [recargar, setRecargar] = useState(0);

  return (
    <div>
      <h1>Tienda de Juegos</h1>
      <FormularioCompra onSave={() => setRecargar(r => r + 1)} />
      <ListaCompras recargar={recargar} />
    </div>
  );
}

export default App;