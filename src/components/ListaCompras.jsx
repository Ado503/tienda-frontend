import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarCompra from './EditarCompra';

function ListaCompras({ recargar, avisar }) {
  const [compras, setCompras] = useState([]);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const [confirmarId, setConfirmarId] = useState(null);

  const cargarCompras = () => {
    api.get('/compras')
      .then(res => setCompras(res.data))
      .catch(err => console.error('Error al obtener compras:', err));
  };

  useEffect(() => {
    cargarCompras();
  }, [recargar]);

  const eliminarCompra = () => {
    api.delete(`/compras/${confirmarId}`)
      .then(() => {
        cargarCompras();
        avisar('Compra eliminada');
      })
      .catch(err => {
        console.error('Error al eliminar compra:', err);
        avisar('No se pudo eliminar la compra', 'error');
      })
      .finally(() => setConfirmarId(null));
  };

  return (
    <div>
      <h2>Compras de la Tienda</h2>
      <table>
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
                <button onClick={() => setConfirmarId(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {compraSeleccionada && (
        <EditarCompra
          key={compraSeleccionada.id}
          compra={compraSeleccionada}
          onUpdate={() => {
            setCompraSeleccionada(null);
            cargarCompras();
            avisar('Compra actualizada ✔');
          }}
        />
      )}

      {confirmarId && (
        <div className="overlay" onClick={() => setConfirmarId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>¿Eliminar esta compra?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-botones">
              <button className="btn-cancelar" onClick={() => setConfirmarId(null)}>
                Cancelar
              </button>
              <button className="btn-eliminar" onClick={eliminarCompra}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaCompras;