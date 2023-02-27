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
exports.max_temp_min = (cities) => {
    let maxMinTemp = cities[0].main.temp_min;

    cities.forEach((city) => {
        let temperaturaMin = city.main.temp_min;
        if (temperaturaMin > maxMinTemp){
            maxMinTemp = temperaturaMin;
        }
    });

    /* Método con bucle for habitual

    for (let i = 1; i < cities.length; i++){
        const temperaturaMin = cities[i].main.temp_min;
        if(temperaturaMin > maxMinTemp){
            maxMinTemp = temperaturaMin;
        }
    }

    */
    
    return maxMinTemp;
};

// Mínima temperatura máxima
exports.min_temp_max = (cities) => {
    let minMaxTemp = cities[0].main.temp_max;

    cities.forEach((city) => {
        let temperatura = city.main.temp_max;
        if (temperatura < minMaxTemp){
            minMaxTemp = temperatura;
        }
    });

    /* Método con bucle for habitual

    for (let i = 1; i < cities.length; i++){
        const temperatura = cities[i].main.temp_max;
        if(temperatura < minMaxTemp){
            minMaxTemp = temperatura;
        }
    }

    */
    
    return minMaxTemp;
};

// Temperatura media
const average_temp = exports.average_temp = (cities) => {
    let numeroDeCiudades = cities.length;
    let valorInicialAcumulador = 0;

    let sumaTemperaturas = cities.reduce(
        (temperaturaAcumulada, ciudad) => {
            let temperatura = ciudad.main.temp;
            return temperaturaAcumulada + temperatura;
        }, valorInicialAcumulador
    );

    return sumaTemperaturas / numeroDeCiudades;

    /* Método con for con índices:
        for (let i=1; i<cities.length; i++){
            const temperatura = cities[i].main.temp;
            temperaturaAcumulada += temperatura;
        }
        return temperaturaAcumulada/(cities.length);
    */
};

// Warmer average temp
exports.warmer_average_temp = (cities) => {
    let temperaturaMedia = average_temp(cities);

    let ciudadesMasCalientesQueMedia = cities.filter((ciudad) => {
        let temperatura = ciudad.main.temp;    
        return temperatura > temperaturaMedia;
    });

    let nombresCiudades = ciudadesMasCalientesQueMedia.map((ciudad) => ciudad.name);
    return nombresCiudades;

    /*
    Método con for con índices:
    let ciudadesMasCalientesQueMedia = [];
    for(let i = 0; i < cities.length; i++){
        if(cities[i].main.temp > temperaturaMedia){
            ciudadesMasCalientesQueMedia.push(cities[i].name);
        }
    }
    return ciudadesMasCalientesQueMedia;
    */
};

// Ciudad más al norte
exports.max_north = (cities) => {
    let ciudadMasAlNorte = cities[0];

    cities.forEach((ciudad) => {
        let latitud = ciudad.coord.lat;
        if(latitud > ciudadMasAlNorte.coord.lat){
            ciudadMasAlNorte = ciudad;
        }
    });

    return ciudadMasAlNorte.name;

    /*
    Método con for e índices:
        for (let i=0; i < cities.length; i++){
            let latitud = cities[i].coord.lat;
            if(cities[i].coord.lat > ciudad.coord.lat){
                ciudad = cities[i];
            }
        }
        return ciudad.name;
    */
};

// Ciudad más al sur
exports.max_south = (cities) => {};

// Cálculo centro de gravedad
exports.gravity_center = (cities) => {};

// Más cercano al centro de gravedad
exports.closest_GC = (cities) => {};

