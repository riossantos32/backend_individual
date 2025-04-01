import { Router } from 'express';
import { obtenerVentasConDetalles } from '../controllers/venta.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/venta', obtenerVentasConDetalles);

export default router;