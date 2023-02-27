const fs = require('fs')

// Lectura fichero de forma asíncrona
exports.load = (file) => {
    let cities = JSON.parse(fs.readFileSync(file));
    return cities;
};

// Temperatura máxima
exports.max_temp = (cities) => {
    let maxTemp = cities[0].main.temp;

    cities.forEach((city) => {
        let temperatura = city.main.temp;
        if (temperatura > maxTemp){
            maxTemp = temperatura;
        }
    });

    /* Método con bucle for habitual

    for (let i = 1; i < cities.length; i++){
        const temperatura = cities[i].main.temp;
        if(temperatura > maxTemp){
            maxTemp = temperatura;
        }
    }

    */
    
    return maxTemp;
};

// Temperatura mínima
exports.min_temp = (cities) => {
    let minTemp = cities[0].main.temp;

    cities.forEach((city) => {
        let temperatura = city.main.temp;
        if (temperatura < minTemp){
            minTemp = temperatura;
        }
    });

    /* Método con bucle for habitual

    for (let i = 1; i < cities.length; i++){
        const temperatura = cities[i].main.temp;
        if(temperatura < minTemp){
            minTemp = temperatura;
        }
    }

    */
    
    return minTemp;
};

// Máxima temperatura mínima
exports.max_temp_min = (cities) => {};

// Mínima temperatura máxima
exports.min_temp_max = (cities) => {};

// Temperatura media
exports.average_temp = (cities) => {};

// Warmer average temp
exports.warmer_average_temp = (cities) => {};

// Ciudad más al norte
exports.max_north = (cities) => {};

// Ciudad más al sur
exports.max_south = (cities) => {};

// Cálculo centro de gravedad
exports.gravity_center = (cities) => {};

// Más cercano al centro de gravedad
exports.closest_GC = (cities) => {};

