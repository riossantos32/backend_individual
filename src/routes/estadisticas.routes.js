import { Router } from 'express';
import {
  totalVentasPorDia,
  totalVentasPorMes,
  totalVentasPorAnio,
  totalVentasPorEmpleado,
  cantidadVentasPorEmpleado,
  totalVentasPorEmpleadoYMes,
  totalComprasPorCliente,
  cantidadComprasPorCliente,
  totalComprasPorClienteYMes,
  totalVentasPorProducto,
  totalVentasPorCategoria,
  productosConBajoStock,
  ventasPorClienteEmpleadoYMes,
  promedioVentasPorEmpleado,
  clientesFrecuentes,
  totalVentasPorDiaDeLaSemana,
  productosConMayorRotacion,
} from '../controllers/estadisticas.controller.js';

const router = Router();

// **1. Rutas para Análisis de Ventas por Dimensión Tiempo**
router.get('/totalventaspordia', totalVentasPorDia);
router.get('/totalventaspormes', totalVentasPorMes);
router.get('/totalventasporeanio', totalVentasPorAnio);

// **2. Rutas para Análisis de Ventas por Empleado**
router.get('/totalventasporemppleado', totalVentasPorEmpleado);
router.get('/cantidadventasporemppleado', cantidadVentasPorEmpleado);
router.get('/totalventasporempresaymes', totalVentasPorEmpleadoYMes);

// **3. Rutas para Análisis de Ventas por Cliente**
router.get('/totalcomprasporcliente', totalComprasPorCliente);
router.get('/cantidadcomprasporcliente', cantidadComprasPorCliente);
router.get('/totalcomprasporclienteaymes', totalComprasPorClienteYMes);

// **4. Rutas para Análisis de Ventas por Producto**
router.get('/totalventaspoproducto', totalVentasPorProducto);

// **5. Rutas para Análisis de Ventas por Categoría**
router.get('/totalventaspocategoria', totalVentasPorCategoria);

// **10. Rutas para Análisis de Stock**
router.get('/productosconbajostock', productosConBajoStock);

// **11. Rutas para Análisis Combinado de Ventas**
router.get('/ventasporempresaycliente', ventasPorClienteEmpleadoYMes);

// **13. Rutas para Análisis de Eficiencia de Empleados**
router.get('/promedioventasporempres', promedioVentasPorEmpleado);

// **14. Rutas para Análisis de Clientes Frecuentes**
router.get('/clientesfrecuentes', clientesFrecuentes);

// **16. Rutas para Análisis de Ventas por Día de la Semana**
router.get('/totalventaspordiadelasemana', totalVentasPorDiaDeLaSemana);

// **17. Rutas para Análisis de Rotación de Inventario**
router.get('/productosconmayorrotacion', productosConMayorRotacion);

export default router;
