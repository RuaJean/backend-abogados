const express = require('express');
const router = express.Router();
const dbConnection = require('./database/db');
const lawyerController = require('./controllers/lawyerController');
const requestsController = require('./controllers/requestsController');
const clientController = require('./controllers/clientController');
const app = express();

// Middleware para analizar JSON
app.use(express.json());

// Ruta para obtener todos los abogados
router.get('/lawyers', lawyerController.getLawyers);

// Ruta para agregar un abogado
router.post('/lawyers', lawyerController.addLawyer);

// Ruta para actualizar un abogado
router.put('/lawyers/:id', lawyerController.updateLawyer);

// Ruta para cambiar el estado de un abogado
router.patch('/lawyers/:id', lawyerController.changeStatus);

// Ruta para obtener un abogado por su ID
router.get('/lawyers/:id', lawyerController.getLawyerById);

// Ruta para obtener todas las peticiones
router.get('/requests', requestsController.getRequests);

// Ruta para actualizar una petición
router.put('/requests/:id', requestsController.updateRequest);

// Ruta para obtener todos los clientes
router.get('/clients', clientController.getClients);

// Ruta para agregar un cliente
router.post('/clients', clientController.addClient);

// Ruta para actualizar un cliente
router.put('/clients/:id', clientController.updateClient);

// Ruta para cambiar el estado de un cliente
router.patch('/clients/:id', clientController.changeStatus);

// Ruta para obtener un cliente por su ID
router.get('/clients/:id', clientController.getClientById);

module.exports = router;
