// Programa principal

const {
    load,
    alumnosContinua,
    alumnosFinal
} = require ('./junio2022.js');

const notasFilename = './notas.json';

let main = async () => {

    try {
        const notas = await load(notasFilename);

        console.log(alumnosContinua(notas));
        console.log(alumnosFinal(notas));
    } catch (error) {
        console.log(error);
    }
}

main();
