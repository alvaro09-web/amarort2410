

// VORTEX GAMES - JAVASCRIPT COMPLETO

const $ = id => document.getElementById(id);

const euros = valor => valor.toLocaleString("es-ES", {
  style: "currency",
  currency: "EUR"
});

// 1. MENÚ

$("menuBtn").addEventListener("click", () => {
  $("menu").classList.toggle("abierto");
});

document.querySelectorAll("nav a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    $("menu").classList.remove("abierto");
  });
});

// 2. MAPA INTERACTIVO

const regiones = {
  neon: ["NEON CORE", "El centro de Vortex City, lleno de rascacielos, luces, negocios y grandes avenidas."],
  costa: ["COSTA AZUL", "Playas, puertos deportivos y actividades junto al mar."],
  altos: ["LOS ALTOS", "Montañas, rutas de exploración y miradores impresionantes."],
  puerto: ["PUERTO GRIS", "Una zona industrial con negocios, almacenes y misterios."],
  desierto: ["TIERRAS ROJAS", "Carreteras interminables y paisajes desérticos."],
  bosque: ["BOSQUE LÚMINA", "Naturaleza, senderos y lugares secretos por descubrir."]
};

document.querySelectorAll("[data-region]").forEach(boton => {
  boton.addEventListener("click", () => {
    const region = regiones[boton.dataset.region];

    $("regionNombre").textContent = region[0];
    $("regionTexto").textContent = region[1];

    document.querySelectorAll("[data-region]").forEach(b => {
      b.classList.remove("activo");
    });

    boton.classList.add("activo");
  });
});

// 3. HISTORIA INTERACTIVA

const decisiones = {
  devolver: "Encuentras al propietario de la mochila y consigues un nuevo aliado.",
  investigar: "Descubres una pista que podría abrir una misión secreta.",
  ignorar: "Continúas tu camino sin saber qué escondía la mochila."
};

document.querySelectorAll(".decision").forEach(boton => {
  boton.addEventListener("click", () => {
    $("resultadoHistoria").textContent =
      decisiones[boton.dataset.decision];
  });
});

// 4. GARAJE DE COCHES

const coches = {
  phantom: {
    nombre: "PHANTOM GT",
    tipo: "Deportivo de alto rendimiento",
    icono: "🏎️",
    velocidad: 95,
    manejo: 82,
    resistencia: 60
  },
  titan: {
    nombre: "TITAN X",
    tipo: "Todoterreno para grandes aventuras",
    icono: "🚙",
    velocidad: 65,
    manejo: 70,
    resistencia: 98
  },
  volt: {
    nombre: "VOLT R",
    tipo: "Superdeportivo eléctrico futurista",
    icono: "⚡",
    velocidad: 99,
    manejo: 91,
    resistencia: 55
  },
  retro: {
    nombre: "RETRO 88",
    tipo: "Clásico urbano personalizable",
    icono: "🚗",
    velocidad: 73,
    manejo: 78,
    resistencia: 80
  }
};

function actualizarEstadistica(nombre, valor) {
  $(nombre + "Valor").textContent = valor;
  $(nombre + "Barra").style.width = valor + "%";
}

document.querySelectorAll(".opcion-coche[data-coche]").forEach(boton => {
  boton.addEventListener("click", () => {
    const coche = coches[boton.dataset.coche];

    $("cocheNombre").textContent = coche.nombre;
    $("cocheTipo").textContent = coche.tipo;
    $("cocheIcono").textContent = coche.icono;

    actualizarEstadistica("velocidad", coche.velocidad);
    actualizarEstadistica("manejo", coche.manejo);
    actualizarEstadistica("resistencia", coche.resistencia);

    document.querySelectorAll("[data-coche]").forEach(b => {
      b.classList.remove("activo");
    });

    boton.classList.add("activo");
    $("cocheMensaje").textContent = "Vehículo seleccionado: " + coche.nombre;
  });
});

document.querySelectorAll("[data-color]").forEach(boton => {
  boton.addEventListener("click", () => {
    const color = boton.dataset.color;

    $("cochePintura").style.background = color;
    $("cocheIcono").style.filter =
      "drop-shadow(0 15px 30px " + color + ")";

    $("cocheMensaje").textContent = "Color de personalización actualizado.";
  });
});

// 5. CREADOR DE PERSONAJE

$("formPersonaje").addEventListener("submit", evento => {
  evento.preventDefault();

  const nombre = $("alias").value.trim() || "JUGADOR VORTEX";

  $("carnetNombre").textContent = nombre.toUpperCase();
  $("carnetProfesion").textContent =
    "PROFESIÓN: " + $("profesion").value;
  $("carnetEstilo").textContent =
    "ESTILO: " + $("estilo").value;
});

// 6. REPUTACIÓN

let reputacion = 50;

function actualizarReputacion() {
  $("reputacionNumero").textContent = reputacion;
  $("reputacionBarra").style.width = reputacion + "%";

  if (reputacion >= 80) {
    $("reputacionEstado").textContent = "LEYENDA DE VORTEX CITY";
  } else if (reputacion >= 60) {
    $("reputacionEstado").textContent = "CIUDADANO RESPETADO";
  } else if (reputacion >= 40) {
    $("reputacionEstado").textContent = "CIUDADANO DESCONOCIDO";
  } else {
    $("reputacionEstado").textContent = "REPUTACIÓN CONTROVERTIDA";
  }
}

document.querySelectorAll(".accion").forEach(boton => {
  boton.addEventListener("click", () => {
    const puntos = Number(boton.dataset.puntos);

    reputacion = Math.max(0, Math.min(100, reputacion + puntos));

    actualizarReputacion();

    $("mensajeReputacion").textContent =
      "Tu reputación ha cambiado en " +
      (puntos > 0 ? "+" : "") + puntos + " puntos.";
  });
});

$("reiniciarReputacion").addEventListener("click", () => {
  reputacion = 50;
  actualizarReputacion();
  $("mensajeReputacion").textContent = "Reputación reiniciada.";
});

// 7. VORTEX PHONE

function actualizarHora() {
  $("horaMovil").textContent = new Date().toLocaleTimeString(
    "es-ES",
    { hour: "2-digit", minute: "2-digit" }
  );
}

actualizarHora();

const aplicaciones = {
  misiones: [
    "🎯 MISIONES",
    "Explora Neon Core, conoce a Alex Vega y descubre los secretos del puerto."
  ],
  mensajes: [
    "💬 MENSAJES",
    "Nora Cruz: ¡Tenemos una nueva pista! Reúnete con el equipo en el centro."
  ],
  banco: [
    "💳 V-BANK",
    "Saldo ficticio: 25.000 V$. Esta aplicación no utiliza dinero real."
  ],
  mapa: [
    "🗺️ MAPA",
    "Explora Neon Core, Costa Azul, Los Altos, Puerto Gris, Tierras Rojas y Bosque Lúmina."
  ]
};

document.querySelectorAll("[data-app]").forEach(boton => {
  boton.addEventListener("click", () => {
    const app = aplicaciones[boton.dataset.app];

    $("appTitulo").textContent = app[0];
    $("appTexto").textContent = app[1];
  });
});

// 8. GALERÍA

const visor = $("visor");

document.querySelectorAll(".foto").forEach(boton => {
  boton.addEventListener("click", () => {
    const imagen = boton.querySelector("img");

    $("imagenVisor").src = imagen.src;
    $("imagenVisor").alt = imagen.alt;
    $("tituloVisor").textContent = boton.dataset.titulo;

    visor.showModal();
  });
});

$("cerrarVisor").addEventListener("click", () => visor.close());

visor.addEventListener("click", evento => {
  if (evento.target === visor) visor.close();
});

// 9. DESAFÍOS

const retos = document.querySelectorAll(".reto-check");

function actualizarRetos() {
  const completados = [...retos].filter(reto => reto.checked).length;
  const porcentaje = completados / retos.length * 100;

  $("barraRetos").style.width = porcentaje + "%";

  $("textoRetos").textContent =
    completados + " de " + retos.length +
    " desafíos completados" +
    (completados === retos.length ? " 🏆 ¡Enhorabuena!" : "");
}

retos.forEach(reto => {
  reto.addEventListener("change", actualizarRetos);
});

$("reiniciarRetos").addEventListener("click", () => {
  retos.forEach(reto => reto.checked = false);
  actualizarRetos();
});

// 10. CONFIGURADOR DE AVENTURA

const estilos = {
  explorador: "Te encanta descubrir secretos y explorar.",
  piloto: "Disfrutas conduciendo y participando en competiciones.",
  empresario: "Prefieres construir negocios y desarrollar proyectos.",
  aventurero: "Te gustan las historias y los desafíos."
};

const zonas = {
  ciudad: "Neon Core",
  playa: "Costa Azul",
  montana: "Los Altos",
  desierto: "Tierras Rojas"
};

$("descubrirAventura").addEventListener("click", () => {
  const estilo = estilos[$("tipoJugador").value];
  const zona = zonas[$("zonaJugador").value];

  $("resultadoAventura").textContent =
    "🎮 TU AVENTURA IDEAL: " + estilo +
    " Tu región recomendada es " + zona + ".";
});

// 11. ENCUESTA

const respuestas = {
  coches: "🚗 ¡Genial! Los vehículos son fundamentales en Vortex City.",
  misiones: "🎯 ¡Buena elección! Queremos historias sorprendentes.",
  mapa: "🌍 ¡Perfecto! La exploración es una prioridad.",
  online: "🎮 ¡Excelente! Vortex Online está pensado para jugar en compañía."
};

document.querySelectorAll(".voto").forEach(boton => {
  boton.addEventListener("click", () => {
    document.querySelectorAll(".voto").forEach(b => {
      b.classList.remove("activo");
    });

    boton.classList.add("activo");
    $("mensajeVoto").textContent = respuestas[boton.dataset.voto];
  });
});

// 12. TIENDA Y PRECIOS

const precios = {
  standard: 59.99,
  deluxe: 79.99,
  ultimate: 99.99
};

const nombres = {
  standard: "Standard",
  deluxe: "Deluxe",
  ultimate: "Ultimate"
};

document.querySelectorAll(".elegir-edicion").forEach(boton => {
  boton.addEventListener("click", () => {
    $("edicion").value = boton.dataset.edicion;
    actualizarPrecio();

    $("reservas").scrollIntoView({ behavior: "smooth" });
  });
});

function cantidadValida() {
  const cantidad = Number($("cantidad").value);

  return Number.isInteger(cantidad) &&
    cantidad >= 1 &&
    cantidad <= 5;
}

function actualizarPrecio() {
  const total = cantidadValida()
    ? precios[$("edicion").value] * Number($("cantidad").value)
    : 0;

  $("precioTotal").textContent = euros(total);
}

$("edicion").addEventListener("change", actualizarPrecio);
$("cantidad").addEventListener("input", actualizarPrecio);

// 13. CARRITO

let carrito = [];
const ventanaCarrito = $("carrito");

function actualizarCarrito() {
  $("listaCarrito").replaceChildren();

  let total = 0;
  let unidades = 0;

  carrito.forEach((producto, indice) => {
    const subtotal = producto.precio * producto.cantidad;

    total += subtotal;
    unidades += producto.cantidad;

    const caja = document.createElement("div");
    caja.className = "producto-carrito";

    const titulo = document.createElement("h3");
    titulo.textContent =
      "Vortex City — " + nombres[producto.edicion];

    const descripcion = document.createElement("p");
    descripcion.textContent =
      producto.plataforma + " · " +
      producto.formato + " · " +
      producto.cantidad + " unidad(es)";

    const precio = document.createElement("strong");
    precio.textContent = euros(subtotal);

    const eliminar = document.createElement("button");
    eliminar.className = "btn btn-borde";
    eliminar.textContent = "ELIMINAR";

    eliminar.addEventListener("click", () => {
      carrito.splice(indice, 1);
      actualizarCarrito();
    });

    caja.append(titulo, descripcion, precio, eliminar);
    $("listaCarrito").appendChild(caja);
  });

  if (carrito.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "Tu carrito está vacío.";
    $("listaCarrito").appendChild(mensaje);
  }

  $("contador").textContent = unidades;
  $("totalCarrito").textContent = euros(total);
}

$("formReserva").addEventListener("submit", evento => {
  evento.preventDefault();

  if (!cantidadValida()) {
    $("mensajeReserva").textContent =
      "Selecciona entre 1 y 5 unidades.";
    return;
  }

  carrito.push({
    edicion: $("edicion").value,
    plataforma: $("plataforma").value,
    formato: $("formato").value,
    cantidad: Number($("cantidad").value),
    precio: precios[$("edicion").value]
  });

  $("mensajeReserva").textContent =
    "Producto añadido al carrito de demostración.";

  $("mensajeCarrito").textContent = "";
  actualizarCarrito();
  ventanaCarrito.showModal();
});

$("abrirCarrito").addEventListener("click", () => {
  ventanaCarrito.showModal();
});

$("cerrarCarrito").addEventListener("click", () => {
  ventanaCarrito.close();
});

$("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
  $("mensajeCarrito").textContent = "Carrito vaciado.";
});

$("confirmarReserva").addEventListener("click", () => {
  if (carrito.length === 0) {
    $("mensajeCarrito").textContent =
      "Añade un producto antes de continuar.";
    return;
  }

  $("mensajeCarrito").textContent =
    "¡Simulación completada! No se ha realizado ninguna reserva ni pago real.";
});

// 14. VOLVER ARRIBA

const volverArriba = $("volverArriba");

window.addEventListener("scroll", () => {
  volverArriba.classList.toggle(
    "visible",
    window.scrollY > 450
  );
}, { passive: true });

volverArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 15. TÍTULO DE LA PESTAÑA

const tituloOriginal = document.title;

document.addEventListener("visibilitychange", () => {
  document.title = document.hidden
    ? "🎮 ¡Vortex City te espera!"
    : tituloOriginal;
});

// 16. INICIALIZAR

actualizarPrecio();
actualizarCarrito();
actualizarRetos();
actualizarReputacion();

console.log("Vortex Games: página inicializada.");
