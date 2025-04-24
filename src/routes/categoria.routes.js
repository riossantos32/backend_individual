import { Router } from 'express';
import {  obtenerCategorias,
          registrarCategoria, 
          eliminarCategoria, 
          actualizarCategoria 
         } from '../controllers/categorias.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/categoria', obtenerCategorias);
router.post('/registrarcategoria', registrarCategoria);
router.delete('/eliminarcategoria/:id', eliminarCategoria);
router.patch('/actualizarcategoria/:id', actualizarCategoria);

export default router;