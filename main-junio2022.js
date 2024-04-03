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

        console.log(`
            Continua: Total = ${alumnosContinua(notas).length},
            Aprobados = ${alumnosContinuaAprobados(notas).length},
            Media = ${mediaAlumnosContinua(notas)}
        `);

        console.log(`
            Final: Total = ${alumnosFinal(notas).length},
            Aprobados = ${alumnosFinalAprobados(notas).length},
            Media = ${mediaAlumnosFinal(notas)}
        `);
    } catch (error) {
        console.log(error);
    }
}

main();
