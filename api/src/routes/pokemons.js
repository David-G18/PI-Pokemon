const { Router } = require('express');
const pokemonController = require('../controllers/pokemons');

const router = Router();

router.get('/', pokemonController.getPokemon);
router.get('/:id', pokemonController.getPokemonById);
router.post('/', pokemonController.createPokemon);
router.put('/:id', pokemonController.update);
router.delete('/:id', pokemonController.delete);

module.exports = router;