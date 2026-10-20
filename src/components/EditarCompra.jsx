import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarCompra({ compra, onUpdate }) {
  const [formData, setFormData] = useState({
    cliente_id: compra.cliente_id,
    juego_id: compra.juego_id,
    cantidad: compra.cantidad,
    fecha: compra.fecha
  });
  const [clientes, setClientes] = useState([]);
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    api.get('/clientes').then(res => setClientes(res.data)).catch(console.error);
    api.get('/juegos').then(res => setJuegos(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/compras/${compra.id}`, formData)
      .then(res => {
        alert(res.data.message);
        onUpdate();
      })
      .catch(err => console.error('Error al actualizar compra:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar compra #{compra.id}</h3>
      <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
        {clientes.map(c => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>
      <select name="juego_id" value={formData.juego_id} onChange={handleChange} required>
        {juegos.map(j => (
          <option key={j.id} value={j.id}>{j.nombre} ({j.plataforma}) - ${j.precio}</option>
        ))}
      </select>
      <input type="number" name="cantidad" min="1" value={formData.cantidad}
        onChange={handleChange} required />
      <input type="date" name="fecha" value={formData.fecha}
        onChange={handleChange} required />
      <button type="submit">Actualizar Compra</button>
    </form>
  );
}

export default EditarCompra;