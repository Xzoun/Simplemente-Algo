import firebaseConfig from '../config.js';

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();

// ------------------------ Texto ------------------------
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

export async function titulo(landing = false) {

    const codigo = document.getElementById("codigo").getAttribute("data-codigo");
    const capitulo = document.getElementById("titulo");
    const arco = document.getElementById("arco");
    let codigoValido = false;

    if (landing) {
        capitulo.innerText = "Simplemente Algo!";
       
    } else {
        try {
            const querySnapshot = await db.collection("titulo").get();

            querySnapshot.forEach((doc) => {

                if (doc.data().id === codigo) {
                    capitulo.innerText = doc.data().capitulo;
                    arco.innerText = doc.data().arco;
                    codigoValido = true;
                }
            });

            if (!codigoValido) {
                capitulo.innerText = "Capitulo";
                arco.innerText = "Arco.";
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

}


export async function opciones() {
    const codigo = document.getElementById("codigo").getAttribute("data-codigo");

    const opcion1 = document.getElementById("opcion1"),
        opcion2 = document.getElementById("opcion2"),
        opcion3 = document.getElementById("opcion3");

    let codigoValido = false;

    try {
        const querySnapshot = await db.collection("opciones").get();

        querySnapshot.forEach((doc) => {
            if (doc.data().id === codigo) {
                opcion1.innerText = doc.data().opcion1;
                opcion2.innerText = doc.data().opcion2;
                opcion3.innerText = doc.data().opcion3;
                codigoValido = true;
            }
        });

        if (!codigoValido) {
            opcion1.style.display = "none";
            opcion2.style.display = "none";
            opcion3.style.display = "none";
            document.getElementById("volver").style.display = "block";
        } else {
            opcion1.style.display = "block";
            opcion2.style.display = "block";
            opcion3.style.display = "block";
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }

}

// ------------------------ Audios ------------------------
export async function lectura() {
    const codigo = document.getElementById("codigo").getAttribute("data-codigo");
    const storageRef = storage.ref();
    const audioRef = storageRef.child("Audios/" + codigo + ".m4a");

    try {
        const url = await audioRef.getDownloadURL();
        reproducirAudio(url);
    } catch (error) {
        console.error('Error al obtener la URL del archivo:', error);
        reproducirAudio("../Audios/error.m4a");
    }
}

let audioActual = null;

async function reproducirAudio(ruta) {

    if (audioActual) {
        audioActual.pause();
    }
    audioActual = new Audio(ruta);
    audioActual.play();
}

export function pausarAudio(pausar) {
    if (pausar) {
        audioActual.pause();
    } else {
        audioActual.play();
    }
}

export function coordinacion() {
    const codigo = document.getElementById("codigo").getAttribute("data-codigo");

    switch (codigo) {

        case "01": return 44;
        case "02": return 52;
        case "03": return 45;

        default: return 50;
    }
}
