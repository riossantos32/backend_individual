import { Router } from 'express';
import {  obtenerEmpleados } from '../controllers/empleados.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerEmpleados);



export default router;