const dbConnection = require('../database/db');

// Controlador para manejar la ruta '/lawyers'
function getLawyers(req, res) {
  dbConnection.query('SELECT * FROM usuarios', (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.json(resultados);
  });
}

//controlador para agregar un abogado

function addLawyer(req, res) {


  const { documento, nombres, apellidos, password, email } = req.body;

  const fecha_registro = new Date(); 
  const status = 1; 
  
  dbConnection.query('INSERT INTO abogados (abo_documento, abo_nombres, abo_apellidos, abo_status, abo_fecha_registro, abo_password, abo_correo) VALUES (?, ?, ?, ?, ?, ?, ?)', [documento, nombres, apellidos, status, fecha_registro, password, email], (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.status(201).send('Abogado agregado correctamente');
  });
}

//controlador para actualizar un abogado

function updateLawyer(req, res) {
  const { id } = req.params;
  const { documento, nombres, apellidos, password, email } = req.body;
  dbConnection.query('UPDATE abogados SET abo_documento = ?, abo_nombres = ?, abo_apellidos = ?, abo_password = ?, abo_correo = ? WHERE abo_id = ?', [documento, nombres, apellidos, password, email, id], (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.status(200).send('Abogado actualizado correctamente');
  });

}

//controlador para cambiar el estado de un abogado
function changeStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  dbConnection.query('UPDATE abogados SET abo_status = ? WHERE abo_id = ?', [status, id], (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.status(200).send('Estado del abogado actualizado correctamente');
  });

}

//controlador para buscar un abogado por id
function getLawyerById(req, res) {
  const { id } = req.params;
  dbConnection.query('SELECT * FROM abogados WHERE abo_id = ?', [id], (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.json(resultados);
  });
}



// Exportar el controlador para ser utilizado en otras partes de la aplicación
module.exports = {
    getLawyers,
    addLawyer,
    updateLawyer,
    changeStatus,
    getLawyerById
};
