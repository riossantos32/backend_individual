import { Router } from 'express';
import { obtenerVentasConDetalles, obtenerVentas, eliminarVenta,registrarVenta,actualizarVenta, obtenerVentaPorId} from '../controllers/venta.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/venta', obtenerVentasConDetalles);

router.get('/obtenerventas', obtenerVentas);

router.get('/obtenerventaporid/:id_venta', obtenerVentaPorId);

router.delete('/eliminarventa/:id_venta', eliminarVenta);

router.post('/registrarventa', registrarVenta);

// Ruta para actualizar una venta
router.patch('/actualizarventa/:id_venta', actualizarVenta);


export default router;