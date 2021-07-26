# Notas

Servidor Rest hecho en Node con TypeScript y con un CRUD completo de una tabla de usuarios en MySQL (ver en la carpeta [db] el script de creación de la base).

Para inicializar el proyecto se debe ejecutar ```npm install```.

El proyecto se desarrolla en [TypeScript] y luego se "compila" a JavaScript (Node) con el comando ```tsc```, para compilar a medida que se modifican los scripts y no tener que estar compilando a cada rato, se puede usar el comando ```tsc --watch```, funciona como el ```nodemon```.

Al final se termina ejecutando el código compilado en JavaScript (node) que se genera en la carpeta [dist].

Si bien, la ejecución está en el [package.json], se deja como tip:
- ```node dist/app.js```
- ```nodemon dist/app.js```

Si se desean ver por consola las querys ejecutadas, descomentar la opción ```logging``` que se pasa entre las opciones al instanciar el objeto [Sequelize] (archivo [db/connection.ts] linea [7]).
