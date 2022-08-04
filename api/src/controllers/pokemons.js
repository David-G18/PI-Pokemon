const { Pokemon, Type } = require('../db');
const ModelCrud = require('./index');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";


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
                    try {
                        const apiPokemon = await axios(POKEMON_URL + `/${name}`);
                        const pokemon = [apiPokemon.data].map(p => {
                            const types = p.types.map(t => t.type)
                            return {
                                id: p.id,
                                name: p.name,
                                hp: p.stats[0].base_stat,
                                attack: p.stats[1].base_stat,
                                defense: p.stats[2].base_stat,
                                speed: p.stats[5].base_stat,
                                height: p.height,
                                weight: p.weight,
                                image: p.sprites.other.dream_world.front_default,
                                types
                            }
                        });
                        res.send(pokemon);
                    } catch (error) {
                        res.status(404).send('The Pokemon with the provided name does not currently exist');
                    }
                }
            } else {
                // Si no me pasan un nombre por query, devuelvo todo los pokemons tantos lo que haya
                // en la base de datos, como los de la api
                const dbPokemon = await this.model.findAll({
                    include: {
                        model: Type
                    }
                });
                const first20 = await axios(POKEMON_URL);
                const second20 = await axios(first20.data.next);           
                const apiPokemons = first20.data.results.concat(second20.data.results)  
                const datosPokemon = await Promise.all(apiPokemons.map( async poke => {
                    const pokemon = await axios(poke.url);
                    const types = pokemon.data.types.map(t => t.type);
                    return {
                        id: pokemon.data.id,
                        name: pokemon.data.name,
                        image: pokemon.data.sprites.other.dream_world.front_default,
                        types
                    };
                }));
                // const datosPokemon2 = await Promise.all(second20.data.results.map( async url => {
                //     const pokemon = await axios(url.url);
                //     const types = pokemon.data.types.map(t => t.type);
                //     return {
                //         id: pokemon.data.id,
                //         name: pokemon.data.name,
                //         image: pokemon.data.sprites.other.dream_world.front_default,
                //         types
                //     };
                // }));
                const allPokemons = dbPokemon.concat(datosPokemon);

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
                const pokemon = [apiPokemon.data].map(p => {
                    const types = p.types.map(t => t.type)
                    return {
                        id: p.id,
                        name: p.name,
                        hp: p.stats[0].base_stat,
                        attack: p.stats[1].base_stat,
                        defense: p.stats[2].base_stat,
                        speed: p.stats[5].base_stat,
                        height: p.height,
                        weight: p.weight,
                        image: p.sprites.other.dream_world.front_default,
                        types
                    }
                });

                res.send(pokemon[0]);
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
            const pokemon = req.body;

            const newPokemon = await this.model.create({
                ...pokemon,
                id: uuidv4()
            });

            if (pokemon.idTypeOne) {
                const typeOne = await Type.findByPk(pokemon.idTypeOne);
                await newPokemon.addType(typeOne, {through: 'Pokemon_type'});
            };
            if (pokemon.idTypeTwo) {
                const typeTwo = await Type.findByPk(pokemon.idTypeTwo);
                await newPokemon.addType(typeTwo, {through: 'Pokemon_type'});
            };

            res.status(201).send('The Pokemon has been created successfully');
        } catch (error) {
            next(error);
        }
    };
}

const pokemonController = new PokemonModel(Pokemon, POKEMON_URL);

module.exports = pokemonController;