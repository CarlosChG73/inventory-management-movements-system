/* ================================================== */
/* 01. PRUEBA INICIAL DE CONEXIÓN JAVASCRIPT */
/* ================================================== */

console.log("JavaScript conectado correctamente.");

/* ================================================== */
/* 02. REFERENCIAS DEL DOM */
/* ================================================== */

/* ---------- Formularios ---------- */
const formularioProductos = document.querySelector(".productos__formulario");
const formularioMovimientos = document.querySelector(".movimientos__formulario");
const formularioRecetas = document.querySelector(".recetas__formulario");

/* ---------- Selects ---------- */
const selectProductoMovimiento = document.querySelector("#producto-movimiento");

/* ---------- Tabla: productos ---------- */
const tablaProductosCuerpo = document.querySelector(".productos__tabla-cuerpo");

/* ---------- Tabla: movimientos ---------- */
const tablaMovimientosCuerpo = document.querySelector(".movimientos__tabla-cuerpo");

/* ---------- Tabla: inventario ---------- */
const tablaInventarioCuerpo = document.querySelector(".inventario__tabla-cuerpo");

/* ---------- Tabla: recetas ---------- */
const tablaRecetasCuerpo = document.querySelector(".recetas__tabla-cuerpo");

/* ---------- Tema y notificaciones ---------- */
const botonTema = document.querySelector("#boton-tema");
const notificacion = document.querySelector("#notificacion");

/* ================================================== */
/* 03. ESTADO EN MEMORIA DEL SISTEMA */
/* ================================================== */

const productos = [];
const movimientos = [];
const recetas = [];

/* ================================================== */
/* 04. CONTADORES E IDENTIFICADORES */
/* ================================================== */

let contadorProductos = 1;
let contadorMovimientos = 1;
let contadorRecetas = 1;

/* ================================================== */
/* 05. MENSAJES DE VALIDACIÓN PERSONALIZADOS */
/* ================================================== */

const mensajesValidacion = {
  nombreProducto: "Debes escribir el nombre del producto.",
  categoriaProducto: "Debes escribir la categoría del producto.",
  unidadMedida: "Debes escribir la unidad de medida.",
  stockInicial: "Debes indicar el stock inicial.",
  stockMinimo: "Debes indicar el stock mínimo.",
  tipoMovimiento: "Debes seleccionar el tipo de movimiento.",
  productoMovimiento: "Debes seleccionar un producto.",
  cantidadMovimiento: "Debes indicar la cantidad del movimiento.",
  fechaMovimiento: "Debes seleccionar la fecha del movimiento.",
  motivoMovimiento: "Debes escribir el motivo del movimiento.",
  nombreReceta: "Debes escribir el nombre de la receta.",
  descripcionReceta: "Debes escribir la descripción de la receta.",
  fechaPreparacion: "Debes seleccionar la fecha de preparación.",
  productosUsados: "Debes escribir los productos usados.",
  enlaceReferencia: "Debes escribir un enlace válido de referencia."
};

/* ================================================== */
/* 06. UTILIDADES GENERALES */
/* ================================================== */

function limpiarTexto(valor) {
  return valor.trim();
}

function convertirANumero(valor) {
  return Number(valor);
}

function buscarProductoPorId(idProducto) {
  return productos.find((producto) => producto.id === idProducto);
}

function obtenerEstadoStock(stockActual, stockMinimo) {
  if (stockActual <= 0) {
    return "Agotado";
  }

  if (stockActual <= stockMinimo) {
    return "Bajo mínimo";
  }

  return "Disponible";
}

function limpiarFormulario(formulario) {
  formulario.reset();
}

function escaparHTML(texto) {
  return texto
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ================================================== */
/* 07. NOTIFICACIONES VISUALES */
/* ================================================== */

function mostrarNotificacion(mensaje) {
  notificacion.textContent = mensaje;
  notificacion.classList.add("notificacion--visible");

  clearTimeout(mostrarNotificacion.temporizador);

  mostrarNotificacion.temporizador = setTimeout(() => {
    notificacion.classList.remove("notificacion--visible");
  }, 2500);
}

/* ================================================== */
/* 08. VALIDACIÓN NATIVA EN ESPAÑOL */
/* ================================================== */

function configurarMensajesDeValidacion(formulario) {
  const campos = formulario.querySelectorAll("input, select, textarea");

  campos.forEach((campo) => {
    campo.addEventListener("invalid", () => {
      const nombreCampo = campo.name;

      if (campo.validity.valueMissing && mensajesValidacion[nombreCampo]) {
        campo.setCustomValidity(mensajesValidacion[nombreCampo]);
        return;
      }

      if (campo.validity.typeMismatch && nombreCampo === "enlaceReferencia") {
        campo.setCustomValidity("Debes escribir una URL válida.");
        return;
      }

      if (campo.validity.rangeUnderflow) {
        campo.setCustomValidity("Debes escribir un valor permitido.");
        return;
      }

      campo.setCustomValidity("Verifica el valor capturado.");
    });

    campo.addEventListener("input", () => {
      campo.setCustomValidity("");
    });

    campo.addEventListener("change", () => {
      campo.setCustomValidity("");
    });
  });
}

/* ================================================== */
/* 09. RENDERIZADO DE PRODUCTOS */
/* ================================================== */

function renderizarTablaProductos() {
  tablaProductosCuerpo.innerHTML = "";

  productos.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.className = "productos__tabla-fila";

    fila.innerHTML = `
      <td class="productos__tabla-celda">${escaparHTML(producto.nombre)}</td>
      <td class="productos__tabla-celda">${escaparHTML(producto.categoria)}</td>
      <td class="productos__tabla-celda">${escaparHTML(producto.unidadMedida)}</td>
      <td class="productos__tabla-celda">${producto.stockActual}</td>
      <td class="productos__tabla-celda">${producto.stockMinimo}</td>
    `;

    tablaProductosCuerpo.appendChild(fila);
  });
}

/* ================================================== */
/* 10. RENDERIZADO DE INVENTARIO */
/* ================================================== */

function renderizarTablaInventario() {
  tablaInventarioCuerpo.innerHTML = "";

  productos.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.className = "inventario__tabla-fila";

    fila.innerHTML = `
      <td class="inventario__tabla-celda">${escaparHTML(producto.nombre)}</td>
      <td class="inventario__tabla-celda">${escaparHTML(producto.categoria)}</td>
      <td class="inventario__tabla-celda">${escaparHTML(producto.unidadMedida)}</td>
      <td class="inventario__tabla-celda">${producto.stockActual}</td>
      <td class="inventario__tabla-celda">${producto.stockMinimo}</td>
      <td class="inventario__tabla-celda">${obtenerEstadoStock(producto.stockActual, producto.stockMinimo)}</td>
    `;

    tablaInventarioCuerpo.appendChild(fila);
  });
}

/* ================================================== */
/* 11. RENDERIZADO DE MOVIMIENTOS */
/* ================================================== */

function renderizarTablaMovimientos() {
  tablaMovimientosCuerpo.innerHTML = "";

  movimientos.forEach((movimiento) => {
    const fila = document.createElement("tr");
    fila.className = "movimientos__tabla-fila";

    fila.innerHTML = `
      <td class="movimientos__tabla-celda">${escaparHTML(movimiento.tipoMovimiento)}</td>
      <td class="movimientos__tabla-celda">${escaparHTML(movimiento.nombreProducto)}</td>
      <td class="movimientos__tabla-celda">${movimiento.cantidad}</td>
      <td class="movimientos__tabla-celda">${escaparHTML(movimiento.fecha)}</td>
      <td class="movimientos__tabla-celda">${escaparHTML(movimiento.motivo)}</td>
    `;

    tablaMovimientosCuerpo.appendChild(fila);
  });
}

/* ================================================== */
/* 12. RENDERIZADO DE RECETAS */
/* ================================================== */

function renderizarTablaRecetas() {
  tablaRecetasCuerpo.innerHTML = "";

  recetas.forEach((receta) => {
    const fila = document.createElement("tr");
    fila.className = "recetas__tabla-fila";

    fila.innerHTML = `
      <td class="recetas__tabla-celda">${escaparHTML(receta.nombreReceta)}</td>
      <td class="recetas__tabla-celda">${escaparHTML(receta.descripcion)}</td>
      <td class="recetas__tabla-celda">${escaparHTML(receta.fechaPreparacion)}</td>
      <td class="recetas__tabla-celda">${escaparHTML(receta.productosUsados)}</td>
      <td class="recetas__tabla-celda">
        <a href="${receta.enlaceReferencia}" target="_blank" rel="noopener noreferrer">
          Ver referencia
        </a>
      </td>
    `;

    tablaRecetasCuerpo.appendChild(fila);
  });
}

/* ================================================== */
/* 13. ACTUALIZACIÓN DEL SELECT DE PRODUCTOS */
/* ================================================== */

function actualizarSelectProductosMovimiento() {
  selectProductoMovimiento.innerHTML = `
    <option value="">Selecciona un producto</option>
  `;

  productos.forEach((producto) => {
    const opcion = document.createElement("option");
    opcion.value = producto.id;
    opcion.textContent = producto.nombre;
    selectProductoMovimiento.appendChild(opcion);
  });
}

/* ================================================== */
/* 14. REGISTRO DE PRODUCTOS */
/* ================================================== */

function registrarProducto(evento) {
  evento.preventDefault();

  if (!formularioProductos.checkValidity()) {
    formularioProductos.reportValidity();
    return;
  }

  const nombreProducto = limpiarTexto(formularioProductos.nombreProducto.value);
  const categoriaProducto = limpiarTexto(formularioProductos.categoriaProducto.value);
  const unidadMedida = limpiarTexto(formularioProductos.unidadMedida.value);
  const stockInicial = convertirANumero(formularioProductos.stockInicial.value);
  const stockMinimo = convertirANumero(formularioProductos.stockMinimo.value);

  const nuevoProducto = {
    id: contadorProductos,
    nombre: nombreProducto,
    categoria: categoriaProducto,
    unidadMedida: unidadMedida,
    stockActual: stockInicial,
    stockMinimo: stockMinimo
  };

  productos.push(nuevoProducto);
  contadorProductos++;

  renderizarTablaProductos();
  renderizarTablaInventario();
  actualizarSelectProductosMovimiento();
  limpiarFormulario(formularioProductos);
  mostrarNotificacion("Producto registrado correctamente.");
}

/* ================================================== */
/* 15. REGISTRO DE MOVIMIENTOS */
/* ================================================== */

function registrarMovimiento(evento) {
  evento.preventDefault();

  if (!formularioMovimientos.checkValidity()) {
    formularioMovimientos.reportValidity();
    return;
  }

  const tipoMovimiento = formularioMovimientos.tipoMovimiento.value;
  const idProducto = convertirANumero(formularioMovimientos.productoMovimiento.value);
  const cantidadMovimiento = convertirANumero(formularioMovimientos.cantidadMovimiento.value);
  const fechaMovimiento = formularioMovimientos.fechaMovimiento.value;
  const motivoMovimiento = limpiarTexto(formularioMovimientos.motivoMovimiento.value);

  const productoSeleccionado = buscarProductoPorId(idProducto);

  if (!productoSeleccionado) {
    mostrarNotificacion("Debes seleccionar un producto válido.");
    return;
  }

  if (tipoMovimiento === "salida" && cantidadMovimiento > productoSeleccionado.stockActual) {
    mostrarNotificacion("No hay stock suficiente para realizar la salida.");
    return;
  }

  if (tipoMovimiento === "entrada") {
    productoSeleccionado.stockActual += cantidadMovimiento;
  }

  if (tipoMovimiento === "salida") {
    productoSeleccionado.stockActual -= cantidadMovimiento;
  }

  const nuevoMovimiento = {
    id: contadorMovimientos,
    tipoMovimiento: tipoMovimiento,
    productoId: productoSeleccionado.id,
    nombreProducto: productoSeleccionado.nombre,
    cantidad: cantidadMovimiento,
    fecha: fechaMovimiento,
    motivo: motivoMovimiento
  };

  movimientos.push(nuevoMovimiento);
  contadorMovimientos++;

  renderizarTablaMovimientos();
  renderizarTablaProductos();
  renderizarTablaInventario();
  limpiarFormulario(formularioMovimientos);
  mostrarNotificacion("Movimiento registrado correctamente.");
}

/* ================================================== */
/* 16. REGISTRO DE RECETAS */
/* ================================================== */

function registrarReceta(evento) {
  evento.preventDefault();

  if (!formularioRecetas.checkValidity()) {
    formularioRecetas.reportValidity();
    return;
  }

  const nombreReceta = limpiarTexto(formularioRecetas.nombreReceta.value);
  const descripcionReceta = limpiarTexto(formularioRecetas.descripcionReceta.value);
  const fechaPreparacion = formularioRecetas.fechaPreparacion.value;
  const productosUsados = limpiarTexto(formularioRecetas.productosUsados.value);
  const enlaceReferencia = limpiarTexto(formularioRecetas.enlaceReferencia.value);

  const nuevaReceta = {
    id: contadorRecetas,
    nombreReceta: nombreReceta,
    descripcion: descripcionReceta,
    fechaPreparacion: fechaPreparacion,
    productosUsados: productosUsados,
    enlaceReferencia: enlaceReferencia
  };

  recetas.push(nuevaReceta);
  contadorRecetas++;

  renderizarTablaRecetas();
  limpiarFormulario(formularioRecetas);
  mostrarNotificacion("Receta registrada correctamente.");
}

/* ================================================== */
/* 17. MODO NOCTURNO */
/* ================================================== */

function aplicarTemaGuardado() {
  const temaGuardado = localStorage.getItem("temaInventario");

  if (temaGuardado === "oscuro") {
    document.body.classList.add("tema-oscuro");
    botonTema.textContent = "☀️";
  } else {
    document.body.classList.remove("tema-oscuro");
    botonTema.textContent = "🌙";
  }
}

function alternarTema() {
  document.body.classList.toggle("tema-oscuro");

  const temaOscuroActivo = document.body.classList.contains("tema-oscuro");

  if (temaOscuroActivo) {
    localStorage.setItem("temaInventario", "oscuro");
    botonTema.textContent = "☀️";
    mostrarNotificacion("Modo nocturno activado.");
  } else {
    localStorage.setItem("temaInventario", "claro");
    botonTema.textContent = "🌙";
    mostrarNotificacion("Modo claro activado.");
  }
}

/* ================================================== */
/* 18. EVENTOS PRINCIPALES */
/* ================================================== */

formularioProductos.addEventListener("submit", registrarProducto);
formularioMovimientos.addEventListener("submit", registrarMovimiento);
formularioRecetas.addEventListener("submit", registrarReceta);
botonTema.addEventListener("click", alternarTema);

/* ================================================== */
/* 19. CONFIGURACIÓN INICIAL */
/* ================================================== */

configurarMensajesDeValidacion(formularioProductos);
configurarMensajesDeValidacion(formularioMovimientos);
configurarMensajesDeValidacion(formularioRecetas);

renderizarTablaProductos();
renderizarTablaMovimientos();
renderizarTablaInventario();
renderizarTablaRecetas();
actualizarSelectProductosMovimiento();
aplicarTemaGuardado();