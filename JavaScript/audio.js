export function lectura() {
    const codigo = document.getElementById("codigo").getAttribute("data-codigo");

    switch (codigo) {
        case "0":
            reproducirAudio("../Audios/0.m4a");
            break;
        case "01":
            reproducirAudio("../Audios/01.m4a");
            break;
        case "02":
            reproducirAudio("../Audios/02.m4a");
            break;
        case "03":
            reproducirAudio("../Audios/03.m4a");
            break;
        default:
            reproducirAudio("../Audios/default.m4a");
            break;
    }
}

let audioActual = null;

function reproducirAudio(ruta) {

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
        case "02": return 48;
        case "03": return 45;

        default: return 50;


    }
}