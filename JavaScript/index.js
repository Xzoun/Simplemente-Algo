import { historia, titulo, opciones, lectura, coordinacion, pausarAudio } from "./bd.js";

const guardarBtn = document.getElementById("guardar"),
  textoAnimado = document.getElementById("textoAnimado"),
  nuevaHistoria = document.getElementById("nuevaHistoria"),
  saltarBtn = document.getElementById("saltar"),
  volverBtn = document.getElementById("volver"),
  pausarBtn = document.getElementById("pausar"),
  botonesDiv = document.getElementById("controles");

let indice = 0,
  intervalo,
  textoCompleto,
  velocidad = 50,
  continuarEscritura = true;


// ------------------- Funciones principales || Escritura -------------------


function escribirTexto() {
  textoAnimado.innerHTML = textoCompleto.slice(0, indice);

  if (!continuarEscritura) {
    return;
  }

  indice++;

  if (indice % 250 == 0) {
    window.scrollTo(0, document.body.scrollHeight);
  }

  if (indice > textoCompleto.length) {
    clearInterval(intervalo);
    document.getElementById("opciones").style.display = "flex";
  }
}

async function eleccion(event) {
  const clickedButton = event.target;

  document.getElementById("textoAnimado").innerHTML = "";
  document.getElementById("opciones").style.display = "none";

  const eleccion = clickedButton.getAttribute("data-codigo"),
    codigoActual = document.getElementById("codigo").getAttribute("data-codigo");
  let codigoNuevo = codigoActual + eleccion;
  guardarBtn.style.display = "block";

  if (codigoNuevo == "023" || codigoNuevo == "0212" || codigoNuevo == "0223") {
    codigoNuevo = despertarProbabilidad(codigoNuevo);
  }

  document.getElementById("codigo").setAttribute("data-codigo", codigoNuevo);

  titulo();
  velocidad = coordinacion();
  lectura();
  indice = 0;
  textoCompleto = await historia();
  botonesDiv.style.visibility = "visible";
  opciones();

  clearInterval(intervalo);
  intervalo = setInterval(escribirTexto, velocidad);
}


// ------------------- Funciones de Interfaz || UX -------------------


async function saltar() {
  clearInterval(intervalo);
  pausarAudio(true);
  textoCompleto = await historia();
  textoAnimado.innerHTML = textoCompleto
  document.getElementById("opciones").style.display = "flex";
  window.scrollTo(0, document.body.scrollHeight)
}

function volver() {
  location.reload();
}

pausarBtn.addEventListener("click", () => {
  if (continuarEscritura) {
    pausarAudio(true);
    continuarEscritura = false;
    pausarBtn.innerHTML = "Continuar"
  } else {
    pausarAudio(false);
    continuarEscritura = true;
    pausarBtn.innerHTML = "Pausar"
  }
})


// ------------------- Funciones de trama -------------------
// --------- Reino Onirico ---------

function despertarProbabilidad(codigo) {
  if (codigo == "023") {
    if (Math.random() > 0.8) {
      return "1A";
    } else {
      if (Math.random() > 0.5) {
        return "022";
      } else {
        return "021";
      }
    }
  } else if (codigo == "0212") {
    //Se aumenta la probabilidad de despertar
    if (Math.random() > 0.6) {
      return "1A";
    } else {
      if (Math.random() > 0.5) {
        return "0211";
      } else {
        return "0213";
      }
    }
  } else if (codigo == "0223") {
    if (Math.random() > 0.6) {
      return "1A";
    } else {
      if (Math.random() > 0.5) {
        return "0222";
      } else {
        return "0221";
      }
    }
  }
}


// ------------------- Funciones que pueden iniciar el programa -------------------


nuevaHistoria.addEventListener("click", async () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("textoContenedor").style.display = "block";
  guardarBtn.style.display = "none";

  titulo();
  velocidad = coordinacion();
  lectura();
  textoCompleto = await historia();
  botonesDiv.style.visibility = "visible";
  clearInterval(intervalo);
  intervalo = setInterval(escribirTexto, velocidad);

  opciones();
});

async function cargarCheckpoint(codigo) {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("textoContenedor").style.display = "block";
  document.getElementById("codigo").setAttribute("data-codigo", codigo);
  guardarBtn.style.display = "none";

  titulo();
  velocidad = coordinacion();
  lectura();
  textoCompleto = await historia();
  botonesDiv.style.visibility = "visible";
  clearInterval(intervalo);
  intervalo = setInterval(escribirTexto, velocidad);

  opciones();
}


// ------------------- Funciones de Checkpoint || Guardar -------------------


function guardar() {

  if (!localStorage.getItem("checkpointsGuardados")) {
    localStorage.setItem("checkpointsGuardados", JSON.stringify([]));
  }
  let checkpointsGuardados = JSON.parse(localStorage.getItem("checkpointsGuardados"));

  // Obtener el código actual, el capítulo y el arco
  const codigoActual = document.getElementById("codigo").getAttribute("data-codigo");
  const capitulo = document.getElementById("titulo").innerText;
  const arco = document.getElementById("arco").innerText;

  // Crear un objeto para guardar en la lista de checkpoints
  const checkpoint = {
    id: Date.now().toString(),
    codigo: codigoActual,
    capitulo: capitulo,
    arco: arco
  };

  try {

    checkpointsGuardados.push(checkpoint);
    localStorage.setItem("checkpointsGuardados", JSON.stringify(checkpointsGuardados));
    alerta(true, "  Checkpoint guardado con Éxito!")

  } catch (error) {
    alerta(false, "  Lo sentimos. Ocurrió un error al guardar el checkpoint.");
  } finally {
    intervalo = setInterval(reiniciarAlertas, 3000);
  }
}

function mostrarCheckpoints() {
  const checkpointsContainer = document.getElementById("checkpointsContainer");
  let checkpointsGuardados = localStorage.getItem("checkpointsGuardados");

  if (checkpointsGuardados) {
    checkpointsGuardados = JSON.parse(checkpointsGuardados);
  } else {
    checkpointsGuardados = []; // Inicializar con un array vacío si no hay datos en el Local Storage
  }
  // Limpiar el contenido actual del contenedor
  checkpointsContainer.innerHTML = "";

  // Iterar a través de los checkpoints guardados
  for (const checkpoint of checkpointsGuardados) {
    const boton = document.createElement("button");
    boton.className = "cargarCards";
    boton.addEventListener("click", () => cargarCheckpoint(checkpoint.codigo));

    const cardDiv = document.createElement("div");
    cardDiv.className = "card border-secondary mb-3 checkpoint";
    cardDiv.style = "max-width: 18rem;";

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header checkpointHeader";
    cardHeader.textContent = checkpoint.capitulo;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body text-secondary";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = checkpoint.arco;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    const codigoSpan = document.createElement("span");
    codigoSpan.textContent = checkpoint.codigo;
    codigoSpan.className = "codigo";

    const eliminarButton = document.createElement("button");
    eliminarButton.className = "deleteCheckpoint";
    eliminarButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
  </svg>
    `;

    eliminarButton.addEventListener("click", (event) => {
      event.stopPropagation();
      eliminarCheckpoint(checkpoint.id);
    });

    cardText.appendChild(codigoSpan);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(eliminarButton);

    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);
    cardDiv.setAttribute("data-id", checkpoint.id);

    boton.appendChild(cardDiv);

    checkpointsContainer.appendChild(boton);
  }
}

function eliminarCheckpoint(checkpointId) {
  let checkpointsGuardados = JSON.parse(localStorage.getItem("checkpointsGuardados"));
  checkpointsGuardados = checkpointsGuardados.filter(checkpoint => checkpoint.id !== checkpointId);
  localStorage.setItem("checkpointsGuardados", JSON.stringify(checkpointsGuardados));

  mostrarCheckpoints();
}


// ------------------- Funciones de Notificacion || Alertas -------------------


function alerta(alertaPositiva, texto) {
  if (alertaPositiva) {
    document.getElementById("greenSpan").innerText = texto;
    document.getElementById("greenAlert").classList.remove("hide");
  } else {
    document.getElementById("redSpan").innerText = texto;
    document.getElementById("redAlert").classList.remove("hide");
  }
}

function reiniciarAlertas() {
  document.getElementById("redAlert").classList.add("hide");
  document.getElementById("redSpan").innerText = "";
  document.getElementById("greenAlert").classList.add("hide");
  document.getElementById("greenSpan").innerText = "";
  clearInterval(intervalo);
}


// ------------------- Funciones de Escucha || Clicks y Botones -------------------


opcion1.addEventListener("click", eleccion);
opcion2.addEventListener("click", eleccion);
opcion3.addEventListener("click", eleccion);
saltarBtn.addEventListener("click", saltar);
guardarBtn.addEventListener("click", guardar);
volverBtn.addEventListener("click", volver);

window.onload = () => {
  mostrarCheckpoints();
  titulo(true);
};
