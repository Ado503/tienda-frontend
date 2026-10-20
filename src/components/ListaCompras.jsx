import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarCompra from './EditarCompra';

function ListaCompras({ recargar }) {
  const [compras, setCompras] = useState([]);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);

  const cargarCompras = () => {
    api.get('/compras')
      .then(res => setCompras(res.data))
      .catch(err => console.error('Error al obtener compras:', err));
  };

  useEffect(() => {
    cargarCompras();
  }, [recargar]);

  const eliminarCompra = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta compra?')) {
      api.delete(`/compras/${id}`)
        .then(res => {
          alert(res.data.message);
          cargarCompras();
        })
        .catch(err => console.error('Error al eliminar compra:', err));
    }
  };

  return (
    <div>
      <h2>Compras de la Tienda</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Juego</th>
            <th>Plataforma</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map(c => (
            <tr key={c.id}>
              <td>{c.cliente}</td>
              <td>{c.juego}</td>
              <td>{c.plataforma}</td>
              <td>{c.cantidad}</td>
              <td>${c.precio}</td>
              <td>${c.total}</td>
              <td>{c.fecha}</td>
              <td>
                <button onClick={() => setCompraSeleccionada(c)}>Editar</button>
                <button onClick={() => eliminarCompra(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {compraSeleccionada && (
        <EditarCompra
          key={compraSeleccionada.id}
          compra={compraSeleccionada}
          onUpdate={() => { setCompraSeleccionada(null); cargarCompras(); }}
        />
      )}
    </div>
  );
}

export default ListaCompras;