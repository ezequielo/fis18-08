 

# CreditsApp 
[![Build Status](https://travis-ci.org/ezequielo/fis18-08.svg?branch=master)](https://travis-ci.org/ezequielo/fis18-08)

Proyecto para la asignatura de Fundamentos de Software para Sistemas Cloud

## Features

### Microservicio básico
Todas

### Microservicios Avanzados
1. Tests usando **mocks y stubs** para los endpoints y para la base de datos (apikey y credits). Además de los **tests de pactos**

2. Además obtenemos el coverage y utilizando **istambul** y el **paquete nyc** (https://github.com/istanbuljs/nyc) comando para los tests (package.json): `"test": "nyc mocha --exit"` reporte de coverage (para coveralls): `"coverage": "nyc report --reporter=text-lcov | coveralls"`

3. Consumo de un **api externa** (rates: https://exchangeratesapi.io/) a través de nuestro back (rate-resource) para procesar el payload que devuelve este servicio y devolverlo al front en un formato más adecuado

4. **Pactos** con otros MS (Grupo 2 - Proyectos) y publicado en el broker de pactos (G8->G2). También está el fichero de verify pacts para poder validar el caso en el que otros servicios se integren con nosotros.

5. **Implementación de cachés**: Ejemplo cacheando el resultado de llamar al servicio de rates, para evitar llamadas innecesarias y el rendimiento de la app. Paquete: https://github.com/ptarjan/node-cache#readme

6. **Validación de formularios** (Usando el propio de angular con las validaciones built-in). En los formularios de login y de nuevo crédito

7. **Circuit breaker** (tanto para el MS de proyectos como para la api externa de rates)

### Extras
1. **Login endpoint**. 
El endpoing accede a mongo donde tenemos el documento apikey (user, password encriptada y apikey), comprueba las credenciales y envía {usuario, apikey}. 
En el front-end el token se guarda en el localStorage y se hace disponible a los componentes a través del TokenService, usado por los componentes de navbar (login/logout button), servicio de seguridad de las rutas, componente de login y servicios que se comunican con el backend (envían el token en las cabeceras). 

2. Otros aspectos de Angular: **Routes, Protected routes, componentes múltiples**. Uso de **Bootstrap** para las plantillas de los componentes.

3. Integraciones: **Codeclimate** y **Coveralls**. En el caso de coveralls, es necesario tener comandos específicos en el package.json comentados anteriormente. En los pull requests, aparecen como un check más, si aumenta el coverage, etc.

4. **Documentación del API** publicado con Postman (https://documenter.getpostman.com/view/6313455/RznEKe5S)

### Archivos
1. [**Presentación**](presentacion_cloud.pptx)
2. [**Colección Postman**](fis2018-08.postman_collection.json)

## Links
1. [Travis-CI](https://travis-ci.org/ezequielo/fis18-08)
2. [Coveralls](https://coveralls.io/github/ezequielo/fis18-08)
3. [Codeclimate](https://codeclimate.com/github/ezequielo/fis18-08)
4. [Api docs](https://documenter.getpostman.com/view/6313455/RznEKe5S)
5. [Heroku](https://fis2018-08.herokuapp.com/)


