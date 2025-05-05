import { Router } from 'express';
import { obtenerVentasConDetalles, obtenerVentas, eliminarVentas,registrarVenta,actualizarVenta } from '../controllers/venta.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/venta', obtenerVentasConDetalles);

router.get('/obtenerventas', obtenerVentas);

router.delete('/eliminarventa/:id_venta', eliminarVentas);

router.post('/registrarventa', registrarVenta);

// Ruta para actualizar una venta
router.patch('/actualizarventa/:id_venta', actualizarVenta);


export default router;