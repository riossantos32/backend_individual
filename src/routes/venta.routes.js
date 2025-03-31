import { Router } from 'express';
import { obtenerVenta} from '../controllers/venta_controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/venta', obtenerVenta);



export default router;