const { Pokemon, Type } = require('../db');
const ModelCrud = require('./index');
const axios = require('axios').default;
const { POKEMON_URL } = process.env;
const { v4: uuidv4 } = require('uuid');


class PokemonModel extends ModelCrud {
    constructor (model) {
        super(model);
    }
    getPokemon = async (req, res, next) => {
        try {
            const { name } = req.query;      

            // Si me pasan un nombre por query, busco un pokemon con ese nombre en la base de datos y 
            // devuelvo el pokemon, si no lo encuentro en la base de datos, busco en la api y devulvo ese 
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
                // Si no me pasan un nombre por query, devulvo todo los pokemons tantos lo que haya
                // en la base de datos, como los de la api
                const dbPokemon = await this.model.findAll({
                    include: {
                        model: Type
                    }
                });
                const first20 = await axios(POKEMON_URL);
                const second20 = await axios(first20.data.next);             
                const datosPokemon = await Promise.all(first20.data.results.map( async url => {
                    const pokemon = await axios(url.url);
                    const types = pokemon.data.types.map( t => {
                        return t.type;
                    });
                    return {
                        name: pokemon.data.name,
                        image: pokemon.data.sprites.other.dream_world.front_default,
                        types
                    };
                }));
                const datosPokemon2 = await Promise.all(second20.data.results.map( async url => {
                    const pokemon = await axios(url.url);
                    const types = pokemon.data.types.map( t => {
                        return t.type;
                    });
                    return {
                        name: pokemon.data.name,
                        image: pokemon.data.sprites.other.dream_world.front_default,
                        types
                    };
                }));
                const allPokemons = dbPokemon.concat(datosPokemon.concat(datosPokemon2));

                res.send(allPokemons);
            }

        } catch (error) {
            next(error);
        }
    };

    // Busco un pokemon de acuerdo al id que me pasen por parametro
    getPokemonById = async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!isNaN(id)) {
                const apiPokemon = await axios(POKEMON_URL + `/${id}`)
                const pokemon = apiPokemon.data;

                res.send(pokemon);
            } else {
                const dbPokemon = await this.model.findByPk(id, {
                    include: {
                        model: Type
                    }
                });

                res.send(dbPokemon);
            }

        } catch (error) {
            next(error);
        }
    };

    createPokemon = async (req, res, next) => {
        try {
            await this.fillDB();
            const pokemon = req.body;
            const id = uuidv4();

            const newPokemon = await this.model.create({
                ...pokemon,
                id
            });

            const typeOne = await Type.findByPk(pokemon.idTypeOne);
            const typeTwo = await Type.findByPk(pokemon.idTypeTwo);

            if(typeOne) await newPokemon.addType(typeOne, {through: 'Pokemon_type'});
            if(typeTwo) await newPokemon.addType(typeTwo, {through: 'Pokemon_type'});

            res.status(201).send('The Pokemon has been created successfully');
        } catch (error) {
            next(error);
        }
    };
}

const pokemonController = new PokemonModel(Pokemon, POKEMON_URL);

module.exports = pokemonController;