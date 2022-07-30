const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const PokemonsRoutes = require('./pokemons'); // Importando las rutas que empiezan con /pokemons
const TypesRoutes = require('./types');       // Importando las rutas que empiezan con /types

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', PokemonsRoutes); // Estamos haciendo que las rutas que empicen por /pokemons, deben ir a PokemonsRoutes 
router.use('/types', TypesRoutes);       // Estamos haciendo que las rutas que empicen por /types, deben ir a TypesRoutes 

module.exports = router;