// Programa principal

const {
    load,
    alumnosContinua,
    alumnosFinal,
    alumnosContinuaAprobados,
    alumnosFinalAprobados,
    mediaAlumnosContinua,
    mediaAlumnosFinal
} = require ('./junio2022.js');

const notasFilename = './notas.json';

let main = async () => {

    try {
        const notas = await load(notasFilename);

        console.log(alumnosContinua(notas));
        console.log(alumnosFinal(notas));
        console.log(alumnosContinuaAprobados(notas));
        console.log(alumnosFinalAprobados(notas));
        console.log(mediaAlumnosContinua(notas));
        console.log(mediaAlumnosFinal(notas));
    } catch (error) {
        console.log(error);
    }
}

main();
