//controllers
//users.js

exports.getTodosUsers = async (peticion, respuesta) => {
    try {
        const users = await  Users.findAll();
        respuesta.json(users);
        console.log(users);
        respuesta.render('users', { users : users});

        // respuesta.json(versiculos);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};











// exports.getVersiculosPorLibro = async (peticion, respuesta) => {
//     const { nombreLibro } = peticion.params;
//     try {
//         const libroEncontrado = await Libro.findOne({ where : { nombre: nombreLibro } } );
//         if (!libroEncontrado)
//             return respuesta.status(404).json({mensaje: 'Libro no encontrado'});
//         const todosVersiculos = await Versiculo.findAll({
//             where : {idLibro : libroEncontrado.idLibro },
//             include: [{ model: Libro, as: 'libros' }]
//         });
//         respuesta.json(todosVersiculos);
//     }
//     catch(error){
//         console.log(error);
//         respuesta.status(500).send(error);
//     }};