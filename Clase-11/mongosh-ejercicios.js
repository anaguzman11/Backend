// Crear explícitamente (opcional)
db.createCollection('authors');
db.createCollection('books');


//Insertar 5 autores y 12 libros con al menos 2 tags por libro//
// Insertar múltiples autores
db.authors.insertMany([
  { name: 'Gabriel García Márquez', birthYear: 1927, country: 'Colombia' },
  { name: 'Isabel Allende', birthYear: 1942, country: 'Chile' },
  { name: 'J. R. R. Tolkien', birthYear: 1892, country: 'Reino Unido' },
  { name: 'George Orwell', birthYear: 1903, country: 'Reino Unido' },
  { name: 'Ray Bradbury', birthYear: 1920, country: 'EE.UU.' },
  { name: 'Jane Austen', birthYear: 1775, country: 'Reino Unido' },
  { name: 'Victor Hugo', birthYear: 1802, country: 'Francia' },
  { name: 'J.K. Rowling', birthYear: 1965, country: 'Reino Unido' },
  { name: 'Miguel de Cervantes', birthYear: 1547, country: 'España' },
  { name: 'Julio Cortázar', birthYear: 1914, country: 'Argentina' },
  { name: 'Juan Rulfo', birthYear: 1917, country: 'México' },
  { name: 'Jorge Luis Borges', birthYear: 1899, country: 'Argentina' }
]);

// Insertar libros (rellenar con ObjectId reales de authors)

db.books.insertMany([
  {
    title: 'Cien años de soledad',
    pages: 471,
    publishedAt: new Date('1967-05-30'),
    tags: ['ficción', 'realismo mágico'],
    authorId: ObjectId('6938aab53b79cf20576b3ac2') // García Márquez
  },
  {
    title: 'La casa de los espíritus',
    pages: 433,
    publishedAt: new Date('1982-01-01'),
    tags: ['ficción', 'familia'],
    authorId: ObjectId('6938aab53b79cf20576b3ac3') // Allende
  },
  {
    title: 'El señor de los anillos',
    pages: 1178,
    publishedAt: new Date('1954-07-29'),
    tags: ['fantasía', 'épico'],
    authorId: ObjectId('6938aab53b79cf20576b3ac4') // Tolkien
  },
  {
    title: '1984',
    pages: 328,
    publishedAt: new Date('1949-06-08'),
    tags: ['distopía', 'política'],
    authorId: ObjectId('6938aab53b79cf20576b3ac5') // Orwell
  },
  {
    title: 'Fahrenheit 451',
    pages: 256,
    publishedAt: new Date('1953-10-19'),
    tags: ['distopía', 'ciencia ficción'],
    authorId: ObjectId('6938aab53b79cf20576b3ac6') // Bradbury
  },
  {
    title: 'Orgullo y prejuicio',
    pages: 432,
    publishedAt: new Date('1813-01-28'),
    tags: ['romántico', 'clásico'],
    authorId: ObjectId('6938aab53b79cf20576b3ac7') // Austen
  },
  {
    title: 'Los miserables',
    pages: 1463,
    publishedAt: new Date('1862-01-01'),
    tags: ['histórico', 'épico'],
    authorId: ObjectId('6938aab53b79cf20576b3ac8') // Hugo
  },
  {
    title: 'Harry Potter y la piedra filosofal',
    pages: 223,
    publishedAt: new Date('1997-06-26'),
    tags: ['fantasía', 'juvenil'],
    authorId: ObjectId('6938aab53b79cf20576b3ac9') // Rowling
  },
  {
    title: 'Don Quijote de la Mancha',
    pages: 863,
    publishedAt: new Date('1605-01-16'),
    tags: ['clásico', 'humor'],
    authorId: ObjectId('6938aab53b79cf20576b3aca') // Cervantes
  },
  {
    title: 'Rayuela',
    pages: 600,
    publishedAt: new Date('1963-01-01'),
    tags: ['experimental', 'argentino'],
    authorId: ObjectId('6938aab53b79cf20576b3acb') // Cortázar
  },
  {
    title: 'Pedro Páramo',
    pages: 124,
    publishedAt: new Date('1955-01-01'),
    tags: ['mexicano', 'realismo mágico'],
    authorId: ObjectId('6938aab53b79cf20576b3acc') // Rulfo
  },
  {
    title: 'El Aleph',
    pages: 174,
    publishedAt: new Date('1949-01-01'),
    tags: ['cuento', 'metafísica'],
    authorId: ObjectId('6938aab53b79cf20576b3acd') // Borges
  }
]);

//Obtener los 5 libros con más páginas mostrando title, pages y ocultando _id.

db.books.find({}, { title: 1, pages: 1, _id: 0 }).sort({ pages: -1 }).limit(5); // incluir title, pages y excluye id

//Listar libros publicados entre 1970 y 1990 (inclusive) ordenados por publishedAt asc.
db.books.find({
  $and: [{ publishedAt: { $gt:new Date('1970-01-01') } }, { publishedAt: { $lte: new Date('1990-12-31') } }]}).sort({ publishedAt: 1 });

//Agregar el campo classic: true a libros con publishedAt < 1975. 
db.books.updateMany(
  { publishedAt: { $lt: new Date('1975-01-01') } }, // libros publicados antes del 1975
  { $set: { classic: true } } // agregar campo 'classic' con valor true
);

//Subir 50 páginas a todos los libros con tag fantasía.
db.books.updateMany({ tags: 'fantasía' }, { $inc: { pages: 50 } });

//Borrar libros con menos de 150 páginas y verificar cuántos fueron eliminados.
db.books.find({pages:{$lt:150}});//devuelve 1
db.books.deleteMany({ pages: { $lt: 150 } }); //borrar
db.books.find({pages:{$lt:150}}); //para validar la eliminación //devuelve 0

//Buscar libros cuyo título contenga "amor" o "soledad", ignorando mayúsculas.
db.books.find({ title: { $regex: /(amor|soledad)/i } }); 

//Traer solo libros con exactamente 2 tags y proyectar title y tags.
db.books.find({ tags: { $size: 2 } },{title:1, tags:1});
db.books.find({ tags: { $size: 2 } },{title:1, tags:1,_id:0});

//Crear un índice compuesto { authorId: 1, pages: -1 } y correr una consulta que lo use.
db.books.createIndex({ authorId: 1, pages: -1 }); // para crear el Indice
db.books.find({authorId:ObjectId('6938aab53b79cf20576b3ac2')}); // consulta por autor

//Paginación: traer página 2 de tamaño 5 (registros 6–10) ordenados por title asc.
db.books.find().skip(5).limit(5).sort({title:1});

