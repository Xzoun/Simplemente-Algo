import firebaseConfig from '../config.js';

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export async function historia() {
    const codigo = document.getElementById("codigo").getAttribute("data-codigo");
    let codigoValido = false;

    try {
        const querySnapshot = await db.collection("historia").get();
        let texto = "";

        querySnapshot.forEach((doc) => {
            if (doc.data().codigo === codigo) {
                texto = doc.data().texto;
                codigoValido = true;
            }
        });
        if (!codigoValido) {
            texto = "Lo sentimos, este fragmento de la historia aún no se escribió."
        }

        return texto;
    } catch (error) {
        console.error("Error fetching data:", error);
        return "";
    }
}

export function titulo(landing = false) {

    const codigo = document.getElementById("codigo").getAttribute("data-codigo");
    const capitulo = document.getElementById("titulo");
    const arco = document.getElementById("arco");
    barraRecta.style.display = "block";

    if (landing) {
        capitulo.innerText = "Simplemente Algo!";
        barraRecta.style.display = "none";
    } else {
        switch (codigo) {
            case "0":
                capitulo.innerText = "Preludio";
                arco.innerText = "Despertar."
                break;
            case "01":
                capitulo.innerText = "Preludio";
                arco.innerText = "La Aventura de Carlos y Dydi.";
                break;
            case "02":
                capitulo.innerText = "Reino Onirico";
                arco.innerText = "Entre Sueños y Realidades.";
                break;
            case "021":
                capitulo.innerText = "Reino Onirico";
                arco.innerText = "La Biblioteca de los Recuerdos.";
                break;
            case "022":
                capitulo.innerText = "Reino Onirico";
                arco.innerText = "Un mundo sin fin.";
                break;
            case "03":
                capitulo.innerText = "Preludio";
                arco.innerText = "Café y Encuentros Matutinos.";
                break;

            case "1A":
                capitulo.innerText = "Incendio";
                arco.innerText = "Despertar.";
                break;

            default:
                capitulo.innerText = "Capitulo";
                arco.innerText = "Arco.";
                break;
        }
    }

}

export function opciones() {
    const codigo = document.getElementById("codigo").getAttribute("data-codigo");

    const opcion1 = document.getElementById("opcion1"),
        opcion2 = document.getElementById("opcion2"),
        opcion3 = document.getElementById("opcion3");
    opcion1.style.display = "block";
    opcion2.style.display = "block";
    opcion3.style.display = "block";

    switch (codigo) {
        case "0":
            opcion1.innerText = "Agarrar el Celular";
            opcion2.innerText = "Volver a dormir";
            opcion3.innerText = "Salir de la cama";
            break;


        // --------------------------------------- Amistades ---------------------------------------


        case "01":
            opcion1.innerText = "Llevar la consola";
            opcion2.innerText = "Buscar una excusa";
            opcion3.innerText = "Irse de fiesta";
            break;


        // case "011":
        //     break;

        // case "012":
        //     break;

        // case "013":
        //     break;


        // ----------------------------------------------------------------------------------


        // case "0111":
        //     break;

        // case "0112":
        //     break;

        // case "0113":
        //     break;

        // case "0121":
        //     break;

        // case "0122":
        //     break;

        // case "0123":
        //     break;


        // --------------------------------------- Reino Onirico ---------------------------------------

        // Todos los intentos por despertar saltan directamente al capitulo 1 o no.
        case "02":
            opcion1.innerText = "Recordar el desierto";//A la biblioteca de los recuerdos
            opcion2.innerText = "Hacer zapping";//A Un mundo Sin Fin
            opcion3.innerText = "Intentar despertar";
            break;

        case "021": // La biblioteca de los recuerdos
            opcion1.innerText = "Explorar Recuerdos";// Traumas - Pesadilla
            opcion2.innerText = "Indagar sobre Caris";// Guerra
            opcion3.innerText = "Intentar despertar";
            break;

        case "022": // Un mundo sin Fin
            opcion1.innerText = "Recordar el desierto"; //A la biblioteca de los recuerdos
            opcion2.innerText = "Hacer zapping"; // Otro Libro
            opcion3.innerText = "Intentar despertar";
            break;

        case "0221": // La biblioteca de los recuerdos 2
            opcion1.innerText = "Explorar Recuerdos";// Traumas - Pesadilla
            opcion2.innerText = "Indagar sobre Caris";// Guerra
            opcion3.innerText = "Intentar despertar";
            break;

        case "0222": //Otro Libro
            opcion1.innerText = "Recordar el desierto";//A la biblioteca de los recuerdos
            opcion2.innerText = "Hacer zapping"; // Tercer Libro
            opcion3.innerText = "Intentar despertar";
            break;


        // ----------------------------------------------------------------------------------


        case "03":
            opcion1.innerText = "Cambiar de tema";
            opcion2.innerText = "Llevarla";
            opcion3.innerText = "Inventar una excusa";
            break;


        // ----------------------------------------------------------------------------------


        // case "031":
        //     break;

        // case "032":
        //     break;

        // case "033":
        //     break;

        // case "0211":
        //     break;

        // case "0212":
        //     break;

        // case "0213":
        //     break;

        // case "0221":
        //     break;

        // case "0222":
        //     break;

        // case "0223":
        //     break;

        // case "0231":
        //     break;

        // case "0232":
        //     break;

        // case "0233":
        //     break;

        // case "0311":
        //     break;

        case "1A":
            opcion1.innerText = "Averiguar de donde sale el humo";
            opcion2.innerText = "Despertar a la casa";
            opcion3.innerText = "Llamar al 911";
            break;

        default:
            opcion1.style.display = "none";
            opcion2.style.display = "none";
            opcion3.style.display = "none";
            document.getElementById("volver").style.display = "block";
            break;

    }
}

