const {readFile} = require('fs/promises');

exports.load = async (filename) => {
    const buf = await readFile(filename);
    return JSON.parse(buf);
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
    let alumnosAprobados = alumnosContinua(notas);
    return alumnosAprobados.filter((alumno) => {
        return (alumno.parcial1 + alumno.parcial2) / 2 >= 5;
    });
};

exports.alumnosFinalAprobados = (notas) => {
    let alumnosAprobados = alumnosFinal(notas);
    return alumnosAprobados.filter((alumno) => {
        return alumno.final >= 5
    });
};

// APROBADOS
// const aprobadosC = alumnosC.filter(a => (a.parcial1 + a.parcial2) / 2 >= 5);
// const aprobadosF = alumnosF.filter(a => a.final >= 5);
