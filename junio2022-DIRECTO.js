const {readFile} = require('fs/promises');

exports.load = async (filename) => {
    const buf = await readFile(filename);
    return JSON.parse(buf);
};

exports.alumnosContinuaDIRECTO = (notas) => {
    let alumnosContinua = notas.filter((alumno) => {
        return typeof alumno.final === "undefined";
    });

    return alumnosContinua;
};

const alumnosContinua = exports.alumnosContinua = (notas) => {
    return notas.filter((alumno) => {
        let condicionContinua = typeof alumno.parcial1 !== "undefined" && typeof alumno.parcial2 !== "undefined";
        return condicionContinua;
    });
};

const alumnosFinal = exports.alumnosFinal = (notas) => {
    return notas.filter((alumno) => {
        let condicionContinua = typeof alumno.final !== "undefined";
        return condicionContinua;
    });
};

exports.alumnosContinuaAprobados = (notas) => {
    let arrayAlumnosContinua = alumnosContinua(notas);
    return arrayAlumnosContinua.filter((alumno) => {
        return (alumno.parcial1 + alumno.parcial2) / 2 >= 5;
    });
};

exports.alumnosFinalAprobados = (notas) => {
    let arrayAlumnosFinal = alumnosFinal(notas);
    return arrayAlumnosFinal.filter((alumno) => {
        return alumno.final >= 5
    });
};

exports.mediaAlumnosContinua = (notas) => {
    let arrayAlumnosContinua = alumnosContinua(notas);
    let notaMediaAlumnosContinua = arrayAlumnosContinua.map((alumno) => {
        return (alumno.parcial1 + alumno.parcial2) / 2;
    });

    let sumaMedias = notaMediaAlumnosContinua.reduce(
        (acumulador, media) => {
            return acumulador + media
        }, 0);

    let mediaAlumnos = sumaMedias / arrayAlumnosContinua.length;

    return mediaAlumnos;
};

exports.mediaAlumnosFinal = (notas) => {
    let arrayAlumnosFinal = alumnosFinal(notas);
    
    let sumaMedias = arrayAlumnosFinal.reduce(
        (acumulador, alumno) => {
            return acumulador + alumno.final
        }, 0);

    let mediaAlumnos = sumaMedias / arrayAlumnosFinal.length;
    
    return mediaAlumnos;
};