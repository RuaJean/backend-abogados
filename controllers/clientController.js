const dbConnection = require('../database/db');

// Controlador para manejar la ruta '/clients'
function getClients(req, res) {
  dbConnection.query('SELECT * FROM clientes', (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.json(resultados);
  });
}



// Controlador para agregar cliente
function addClient(req, res) {
    const fecha_registro = new Date();
    const status = 1;

  const { nombre, apellido, correo, pass, entidad } = req.body;

  const sqlQuery = `
    INSERT INTO clientes ( cli_nombre, cli_apellidos, cli_correo, cli_contraseña, cli_status, cli_fecha_registro, id_entidad) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [ nombre, apellido, correo, pass, fecha_registro, status, entidad];

  dbConnection.query(sqlQuery, values, (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.status(201).send('Cliente agregado correctamente');
  });
}

// Controlador para actualizar cliente
function updateClient(req, res) {
  const { id } = req.params;
  const { nombre, apellido, correo, pass } = req.body;
  const sqlQuery = `
    UPDATE clientes 
    SET cli_nombre = ?, cli_apellidos = ?, cli_correo = ?, cli_contraseña = ?
    WHERE id_clientes = ?
  `;
  const values = [nombre, apellido, correo, pass, id];
  dbConnection.query(sqlQuery, values, (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.status(200).send('Cliente actualizado correctamente');
  });
}

// Controlador para cambiar el estado de un cliente
function changeStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const sqlQuery = `
    UPDATE clientes 
    SET cli_status = ?
    WHERE id_clientes = ?
  `;
  const values = [status, id];
  dbConnection.query(sqlQuery, values, (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.status(200).send('Estado del cliente actualizado correctamente');
  });
}

// Controlador para obtener un cliente por su ID
function getClientById(req, res) {
  const { id } = req.params;
  dbConnection.query('SELECT * FROM clientes WHERE id_clientes = ?', [id], (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.json(resultados);
  });
}

module.exports = {
    getClients,
    addClient,
    updateClient,
    changeStatus,
    getClientById
};