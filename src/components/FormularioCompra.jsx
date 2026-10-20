import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioCompra({ onSave }) {
  const [formData, setFormData] = useState({
    cliente_id: '', juego_id: '', cantidad: '', fecha: ''
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
    api.post('/compras', formData)
      .then(res => {
        alert(res.data.message);
        setFormData({ cliente_id: '', juego_id: '', cantidad: '', fecha: '' });
        if (onSave) onSave();
      })
      .catch(err => console.error('Error al registrar compra:', err));
  };

  return (
    <div>
      <h2>Registrar Nueva Compra</h2>
      <form onSubmit={handleSubmit}>
        <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
          <option value="">Seleccione cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
        <select name="juego_id" value={formData.juego_id} onChange={handleChange} required>
          <option value="">Seleccione juego</option>
          {juegos.map(j => (
            <option key={j.id} value={j.id}>{j.nombre} ({j.plataforma}) - ${j.precio}</option>
          ))}
        </select>
        <input type="number" name="cantidad" placeholder="Cantidad" min="1"
          value={formData.cantidad} onChange={handleChange} required />
        <input type="date" name="fecha" value={formData.fecha}
          onChange={handleChange} required />
        <button type="submit">Registrar Compra</button>
      </form>
    </div>
  );
}

export default FormularioCompra;