const { Pokemon, Type } = require('../db');
const ModelCrud = require('./index');
const axios = require('axios').default;
const { POKEMON_URL } = process.env;


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
                    },
                    include: {
                        model: Type
                    }
                });  
                if (dbPokemon.length) {
                    res.send(dbPokemon);
                } else {
                    const apiPokemon = await axios(POKEMON_URL + `/${name}`);

                    res.send(apiPokemon.data);
                }
            } else {
                const dbPokemon = await this.model.findAll({
                    include: {
                        model: Type
                    }
                });
                const first20 = await axios(POKEMON_URL);
                const second20 = await axios(first20.data.next);
                // const resultsApiTotal = first20.data.results.concat(second20.data.resuts);              
                const datosPokemon = await Promise.all(first20.data.results.map( async u => {
                    const p = await axios(u.url);
                    return {
                        name: p.data.name,
                        image: p.data.sprites.other.dream_world.front_default,
                        types: p.data.types
                    };
                }));
                const allPokemons = dbPokemon.concat(datosPokemon);

                res.send(allPokemons);
            }

        } catch (error) {
            next(error);
        }
    };

    getPokemonById = async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!isNaN(id)) {
                const apiPokemon = await axios(POKEMON_URL + `/${id}`)
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

const pokemonController = new PokemonModel(Pokemon, POKEMON_URL);

module.exports = pokemonController;