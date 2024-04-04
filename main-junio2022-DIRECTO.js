// Programa principal

const {
    load,
    alumnosContinuaDIRECTO,
    alumnosContinuaDIRECTOAprobados,
    notaMediaContinuaDIRECTO
} = require ('./junio2022-DIRECTO.js');

const notasFilename = './notas.json';

let main = async () => {

    try {
        const notas = await load(notasFilename);

        console.log(`Alumnos de continua: ${alumnosContinuaDIRECTO(notas).length}`);
        console.log(`Alumnos de continua APROBADOS: ${alumnosContinuaDIRECTOAprobados(notas).length}`);
        console.log(`Media de continua: ${notaMediaContinuaDIRECTO(notas)}`);

        // console.log(`
        //     Continua: Total = ${alumnosContinua(notas).length},
        //     Aprobados = ${alumnosContinuaAprobados(notas).length},
        //     Media = ${mediaAlumnosContinua(notas)}
        // `);

        // console.log(`
        //     Final: Total = ${alumnosFinal(notas).length},
        //     Aprobados = ${alumnosFinalAprobados(notas).length},
        //     Media = ${mediaAlumnosFinal(notas)}
        // `);
    } catch (error) {
        console.log(error);
    }
}

main();
