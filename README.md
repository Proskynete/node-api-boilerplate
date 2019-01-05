# Started para aplicaciones con nodejs, express y mongodb

Es un proyecto base para iniciar el proceso de creación de aplicaciones con nodejs, express, mongodb y el ODM más popular de éste último, mongoose.


| Dependencias | versión |
| ------ | ------ |
| [express](https://expressjs.com/es/) | v4.16.2 |
| [mongoose](https://mongoosejs.com/) | v4.13.7 |
| [body-parser](https://www.npmjs.com/package/body-parser) | v1.18.2 |
| [cors](https://www.npmjs.com/package/cors) | v2.8.4 |
| [morgan](https://www.npmjs.com/package/morgan) | v1.9.0 | 


#### Pre requisitos

Es necesario tener instalados previamente [nodejs](https://nodejs.org/), [npm](https://www.npmjs.com/) (o [yarn](https://yarnpkg.com/)) y [mongodb](https://www.mongodb.com/)

### Iniciando proyecto
- Instalar dependencias (con npm)
```sh
$ npm install
```

- Instalar dependencias (con yarn)
```sh
$ yarn
```

- Hacer correr mongodb en Linux o Mac 
```sh
$ sudo mongod
```

Para Windows te recomiendo instalar [MongoDB Compass Community](https://docs.mongodb.com/compass/master/install/)

- Correr programa
```sh
$ yarn start
```

Y listo! ya tienes el proyecto corriendo y listo para tus necesidades.


---

## Entendiendo el proyecto

En a carpeta `config/` existen dos archivos: `app.js` y `config.js`.

##### app.js
- En este archivo encontramos las dependencias a utilizar, también se encuentra una importación de las rutas del proyecto.

~~~
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('../routes/routes');
~~~

- Un poco mas abajo, dentro del mismo archivo, se tienen los middlewares.

~~~
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/node/api/boilerplate', routes);
~~~


##### config.js
En este archivo setiene dos cosas: el puerto en el cual se expondrá el proyecto y la url del acceso a mongodb

~~~
module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/node-api-boilerplate'
};
~~~


En la carpeta `controllers/` se tiene solo un archivo: `items-controller.js`


##### items-controller.js
- Se importa el modelo creado en el archivo `items-models.js` en la carpeta `models/`.

~~~
const Item = require('../models/item-model');
~~~

- Se crean las funciones, las cuales son las encargadas de `Obtener todos los items`, `obtener un item mediante un ID`, `Crear un nuevo item`, `editar un item mediante su ID` y `Eliminar un item mediante su ID`.

En a carpeta `models/` se tiene solo un archivo: `items-model.js`

##### items-model.js
- Se importa mongoose y se utiliza la propiedad `Schema`.

> Everything in Mongoose starts with a Schema. 
> Each schema maps to a MongoDB collection and defines 
> the shape of the documents within that collection.

Extracto de la documentación oficial de [Mongoose](https://mongoosejs.com/docs/guide.html)

~~~
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
~~~

- Luego creamos nuestro nuevo Schema, llamado: `ItemSchema`, el cual exportaremos como una colección llamada `Item`.
~~~
const ItemSchema = Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true }
}, {
  collection: 'Item'
});
~~~

En la última carpeta `routes/` tenemos el archivo: `routes.js` y es el encargado de definir para cada ruta una función especifica, las cuales definimos anteriormente en la carpeta `controllers/`

##### routes.js
- Se importa el controllador y también el router de express.

~~~
const express = require('express');
const ItemsController = require('../controllers/items-controller');
const routes = express.Router();
~~~

- Se asocia para cada ruta y verbo http, un metodo del controlador (Si no sabes que es un verbo http, puedes revisar el siguiente [link](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)).

~~~
routes.get('/', ItemsController.getAll);
routes.get('/:itemId', ItemsController.getById);
routes.post('/', ItemsController.insert);
routes.put('/:itemId', ItemsController.update);
routes.delete('/:itemId', ItemsController.delete);
~~~

Y por ultimo tenemos el archivo `serve.js` que está a la altura de la carpeta raíz

##### serve.js
- Se importan los archivos de configuración, los que se encuentran en la carpeta `config/`

~~~
const mongoose = require('mongoose');
const app = require('./config/app.js');
const config = require('./config/config.js');
~~~

- Se establece la conexión con la url de mongodb y si no hay error, se muestra por consola que la conexión esta realizada.

~~~
mongoose.connect(config.db, (err, res) => {
  if(err) return console.log(`${err}`);
  console.log('Connected with mongodb...');

  app.listen(config.port, () => {
    console.log(`Api running on port: ${config.port}`);
  });
});
~~~

- Una vez realizada la conexión con éxito, se levanta la aplicación en el puerto que definimos en el archivo `config.js` y se muestra por consola obteniendo algo como lo siguiente:

```sh
Connected with mongodb...
Api running on port: 3000
```