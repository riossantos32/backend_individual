import { pool2 } from '../db.js';

// **1. Análisis de Ventas por Dimensión Tiempo**

export const totalVentasPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT DATE_FORMAT(t.fecha, '%Y-%m-%d') AS dia, ROUND(SUM(hv.total_linea), 2) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY t.fecha
       ORDER BY t.fecha;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas.',
      error: error.message,
    });
  }
};

export const totalVentasPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.mes, ROUND(SUM(hv.total_linea), 1) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY t.mes
       ORDER BY t.mes;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por mes.',
      error: error.message,
    });
  }
};

export const totalVentasPorAnio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.año, ROUND(SUM(hv.total_linea), 2) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY t.año
       ORDER BY t.año;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por año.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por año.',
      error: error.message,
    });
  }
};

// **2. Análisis de Ventas por Empleado**

export const totalVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, ROUND(SUM(hv.total_linea), 2) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por empleado.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por empleado.',
      error: error.message,
    });
  }
};

export const cantidadVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, COUNT(DISTINCT hv.id_venta) AS cantidad_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
       ORDER BY cantidad_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de cantidad de ventas por empleado.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de cantidad de ventas por empleado.',
      error: error.message,
    });
  }
};

export const totalVentasPorEmpleadoYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, t.año, t.mes, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por empleado y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por empleado y mes.',
      error: error.message,
    });
  }
};

// **3. Análisis de Ventas por Cliente**

export const totalComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, ROUND(SUM(hv.total_linea), 2) AS total_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
       ORDER BY total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de compras por cliente.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de compras por cliente.',
      error: error.message,
    });
  }
};

export const cantidadComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, COUNT(DISTINCT hv.id_venta) AS cantidad_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
       ORDER BY cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de cantidad de compras por cliente.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de cantidad de compras por cliente.',
      error: error.message,
    });
  }
};

export const totalComprasPorClienteYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, t.año, t.mes, SUM(hv.total_linea) AS total_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido, t.año, t.mes
       ORDER BY t.año, t.mes, total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de compras por cliente y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de compras por cliente y mes.',
      error: error.message,
    });
  }
};

// **4. Análisis de Ventas por Producto**

export const totalVentasPorProducto = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       GROUP BY p.id_producto, p.nombre_producto
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por producto.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por producto.',
      error: error.message,
    });
  }
};

// **5. Análisis de Ventas por Categoría**

export const totalVentasPorCategoria = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       GROUP BY p.nombre_categoria
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por categoría.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por categoría.',
      error: error.message,
    });
  }
};

// **10. Análisis de Stock**

export const productosConBajoStock = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, p.stock
       FROM Dim_Productos p
       WHERE p.stock < 50
       ORDER BY p.stock ASC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron productos con bajo stock.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener los productos con bajo stock.',
      error: error.message,
    });
  }
};

// **11. Análisis Combinado de Ventas**

export const ventasPorClienteEmpleadoYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre AS cliente_nombre, c.primer_apellido AS cliente_apellido,
              e.primer_nombre AS empleado_nombre, e.primer_apellido AS empleado_apellido,
              t.año, t.mes, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.primer_nombre, c.primer_apellido,
                e.id_empleado, e.primer_nombre, e.primer_apellido,
                t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas combinadas.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas combinadas.',
      error: error.message,
    });
  }
};

// **13. Análisis de Eficiencia de Empleados**

export const promedioVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido,
              AVG(hv.total_linea) AS promedio_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
       ORDER BY promedio_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de promedio de ventas por empleado.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de promedio de ventas por empleado.',
      error: error.message,
    });
  }
};

// **14. Análisis de Clientes Frecuentes**

export const clientesFrecuentes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido,
              COUNT(DISTINCT hv.id_venta) AS cantidad_compras,
              SUM(hv.total_linea) AS total_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
       HAVING COUNT(DISTINCT hv.id_venta) > 1
       ORDER BY cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron clientes frecuentes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener los clientes frecuentes.',
      error: error.message,
    });
  }
};

// **16. Análisis de Ventas por Día de la Semana**

export const totalVentasPorDiaDeLaSemana = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.dia_semana, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY t.dia_semana
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas por día de la semana.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por día de la semana.',
      error: error.message,
    });
  }
};

// **17. Análisis de Rotación de Inventario**

export const productosConMayorRotacion = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, p.stock AS stock_inicial,
              SUM(hv.cantidad) AS total_vendido,
              (SUM(hv.cantidad) / p.stock) AS tasa_rotacion
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       WHERE p.stock > 0
       GROUP BY p.id_producto, p.nombre_producto, p.stock
       ORDER BY tasa_rotacion DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron productos con mayor rotación.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener los productos con mayor rotación.',
      error: error.message,
    });
  }
};
