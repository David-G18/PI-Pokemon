const db = require('../db');
const { Pokemon } = require('../db');
const ModelCrud = require('./index');
const axios = require('axios').default;

class PokemonModel extends ModelCrud {
    constructor (model) {
        super(model);
    }
    getPokemon = async (req, res, next) => {
        try {
            const { name } = req.query;      

            if (name) {                     
                const dbPokemon = await this.model.findAll({
                    where: {
                        name
                    }
                });                    
                const apiPokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const pokemon = (apiPokemon ? apiPokemon.data : dbPokemon);

                console.log(pokemon);
                res.send(pokemon);
            } else {
                const dbPokemon = await this.model.findAll();
                const apiPokemonA = await axios("https://pokeapi.co/api/v2/pokemon");
                const apiPokemonB = await axios(apiPokemonA.data.next);
                const pokemons = dbPokemon.concat(apiPokemonA.data.results.concat(apiPokemonB.data.results));

                res.send(pokemons);
            }

        } catch (error) {
            next(error);
        }
    };
    getPokemonById = async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!isNaN(id)) {
                const apiPokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
                const pokemon = apiPokemon.data;

                res.send(pokemon);
            } else {
                const dbPokemon = await this.model.findByPk(id);

                res.send(dbPokemon);
            }

        } catch (error) {
            next(error);
        }
    };
}
const pokemonController = new PokemonModel(Pokemon);

module.exports = pokemonController;