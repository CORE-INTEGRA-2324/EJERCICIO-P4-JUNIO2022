// Lectura de datos Fichero: notas.json
import { readFile } from 'fs/promises';
const buf = await readFile("notas.json");
const notas = JSON.parse(buf);


// Crear arrays con alumnos de: Continua y Final
const alumnosContinua = notas.filter(alumno =>
    typeof alumno.parcial1 !== "undefined" && typeof alumno.parcial2 !== "undefined");
                                   
const alumnosFinal = notas.filter(alumno => typeof alumno.final !== "undefined");


// Cálculo alumnos aprobado
const aprobadosContinua = alumnosContinua.filter(alumno => (alumno.parcial1 + alumno.parcial2) / 2 >= 5);
const aprobadosFinal = alumnosFinal.filter(alumno => alumno.final >= 5);

// Cálculo media alumnos
const mediaContinua = alumnosContinua
    .map(alumno => (alumno.parcial1 + alumno.parcial2) / 2)
    .reduce((total, n) => total + n, 0) / alumnosContinua.length;

const mediaFinal = alumnosFinal
    .reduce((total, a) => total + a.final, 0) / alumnosF.length;

// Representar resultados
console.log("Continua: Total =", alumnosContinua.length, "Aprobados =",
    aprobadosContinua.length, "Media =", mediaContinua);

console.log("Final: Total =", alumnosFinal.length, "Aprobados =",
    aprobadosFinal.length, "Media =", mediaFinal);