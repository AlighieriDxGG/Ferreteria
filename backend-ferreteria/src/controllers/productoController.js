const productoModel = require('../models/ProductoModel');

exports.getTodosLosProductos = async (req, res) => {
  try {
    const productos = await productoModel.obtenerTodos();
    console.log(`🛒 Usuario ${req.user.email} consultó los productos`);
    res.json(productos);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos desde la base de datos." });
  }
};

exports.getProductosPorBodega = async (req, res) => {
  const { id_sucursal, id_bodega } = req.query;
  if (!id_sucursal || !id_bodega) {
    return res.status(400).json({ error: "Debe enviar id_sucursal e id_bodega en los parámetros de consulta." });
  }

  try {
    const productos = await productoModel.obtenerPorBodega(id_bodega, id_sucursal);
    res.json(productos);
  } catch (err) {
    console.error("Error al consultar bodega_sucursal:", err);
    res.status(500).json({ error: "Error al obtener información de bodega y sucursal." });
  }
};

exports.getProductosPorBodegaPost = async (req, res) => {
  const { id_sucursal, id_bodega } = req.body;
  if (!id_sucursal || !id_bodega) {
    return res.status(400).json({ error: "Debe enviar id_sucursal e id_bodega en el body." });
  }

  try {
    const productos = await productoModel.obtenerPorBodega(id_bodega, id_sucursal);
    console.log(`Consulta POST de bodega ${id_bodega} en sucursal ${id_sucursal} por ${req.user.email}`);
    res.json(productos);
  } catch (err) {
    console.error("Error al consultar productos:", err);
    res.status(500).json({ error: "Error al obtener productos desde la base de datos." });
  }
};
