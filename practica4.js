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
exports.max_south = (cities) => {
    let ciudadMasAlSur = cities[0];

    cities.forEach((ciudad) => {
        let latitud = ciudad.coord.lat;
        if(latitud < ciudadMasAlSur.coord.lat){
            ciudadMasAlSur = ciudad;
        }
    });

    return ciudadMasAlSur.name;

    /*
    Método con for e índices:
        for (let i=0; i < cities.length; i++){
            let latitud = cities[i].coord.lat;
            if(cities[i].coord.lat < ciudad.coord.lat){
                ciudad = cities[i];
            }
        }
        return ciudad.name;
    */
};

// Cálculo centro de gravedad
const gravity_center = exports.gravity_center = (cities) => {
    let numeroDeCiudades = cities.length;

    /* Método con for e índices:

    let totalLon = 0;
    let totalLat = 0;

    cities.forEach((ciudad) => {
        let longitud = ciudad.coord.lon;
        let latitud = ciudad.coord.lat;
        totalLon += longitud;
        totalLat += latitud;
    });

    */

    let valorInicialAcumulador = 0;

    let totalLon = cities.reduce(
        (longitudAcumulada, ciudad) => {
            return longitudAcumulada += ciudad.coord.lon;
        }, valorInicialAcumulador
    );

    let totalLat = cities.reduce((latitudAcumulada, ciudad) => {
        return latitudAcumulada += ciudad.coord.lat;
    }, valorInicialAcumulador);

    let mediaLon = totalLon/numeroDeCiudades;
    let mediaLat = totalLat/numeroDeCiudades;
 
    return {
        lon: mediaLon,
        lat: mediaLat
    };
};

const getDiferenciaConMedia = (cities, ciudad) => {
    let mediaLon = gravity_center(cities).lon;
    let mediaLat = gravity_center(cities).lat;

    let lonCiudad = ciudad.coord.lon;
    let latCiudad = ciudad.coord.lat;

    let diferenciaLongitudes = lonCiudad - mediaLon;
    let diferenciaLatitudes = latCiudad - mediaLat;

    return Math.sqrt(Math.pow(diferenciaLongitudes, 2) + Math.pow(diferenciaLatitudes, 2));
};

// GET Nombre ciudad más cercana al centro de gravedad
exports.closest_GC = (cities) => {
    let distanciaMin = getDiferenciaConMedia(cities, cities[0]);
    let nameCiudadDistanciaMin = "";

    cities.forEach((ciudad) => {
        let distancia = getDiferenciaConMedia(cities, ciudad);
        if(distancia < distanciaMin){
            distanciaMin = distancia;
            nameCiudadDistanciaMin = ciudad.name;
        }
    });

    return nameCiudadDistanciaMin;
};

exports.citiesWarmerThanTemp = (cities, temp) => {
    console.log(cities);
    let warmerCities = cities.filter((ciudad) => {
        return ciudad.main.temp > temp;
    });

    console.log(warmerCities);

    let warmerCitiesNames = warmerCities.map((ciudad) => {
        return {
            name: ciudad.name,
            temp: ciudad.main.temp
        }
    });
    return warmerCitiesNames;
};

const getDiferenciaTempYFeelLike = (ciudad) => {
    return ciudad.main.temp - ciudad.main.feels_like;
};

exports.ciudadGreatestDifference = (cities) => {
    let cityGreatestDifference = cities[0];
    let greatestDifference = getDiferenciaTempYFeelLike(cities[0]);

    cities.forEach((ciudad) => {
        let currentCityDifference = getDiferenciaTempYFeelLike(ciudad);
        if(currentCityDifference > greatestDifference){
            greatestDifference = currentCityDifference;
            cityGreatestDifference = ciudad;
        }
    });

    return {
        name: cityGreatestDifference.name,
        temp: cityGreatestDifference.main.temp,
        feels_like: cityGreatestDifference.main.feels_like,
        difference: greatestDifference
    };
};
