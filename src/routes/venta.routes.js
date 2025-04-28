import { Router } from 'express';
import { obtenerVentasConDetalles, obtenerVentas } from '../controllers/venta.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/venta', obtenerVentasConDetalles);

router.get('/obtenerventas', obtenerVentas);

export default router;