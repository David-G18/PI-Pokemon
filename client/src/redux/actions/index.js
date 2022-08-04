import axios from 'axios';

export const NEW_ERROR = "NEW_ERROR";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const ACTIVATE_LOADING = "ACTIVATE_LOADING";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const GO_TO_NEXT_PAGE = "GO_TO_NEXT_PAGE";
export const GO_TO_PREVIUS_PAGE = "GO_TO_PREVIUS_PAGE";
export const FILTER_BY_NEW_EXIST = "FILTER_BY_NEW_EXIST";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";

export const getAllPokemons = () => {
    return async function (dispatch) {
        const pokemons = await axios('http://localhost:3001/pokemons');

        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: pokemons.data
        });
    };
};

export const getPokemon = (name) => {
    return async function (dispatch) {
        try {
            const pokemon = await axios(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: GET_POKEMON,
                payload: pokemon.data
            });
        } catch (error) {
            window.alert("Pokemon no encontrado");
            return dispatch({
                type: NEW_ERROR,
            });
        };
    };
};

export const getPokemonDetail = (id) => {
    return async function (dispatch) {
        try {
            const pokemonDetail = await axios(`http://localhost:3001/pokemons/${id}`);
            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: pokemonDetail.data
            });
        } catch (error) {
            window.alert("Pokemon no encontrado");
            return dispatch({
                type: NEW_ERROR,
            });
        };
    };
};

export const createPokemon = (payload) => {
    return async function () {
        try {
            await axios.post('http://localhost:3001/pokemons', payload);
            window.alert('Pokemon Creado');
        } catch (error) {
            window.alert('Error al crear el Pokemons');
        }
    }
}

export const getAllTypes = () => {
    return async function (dispatch) {
        const types = await axios ("http://localhost:3001/types");

        return dispatch({
            type: GET_ALL_TYPES,
            payload: types.data
        });
    };
};

export const activateLoading = () => {
    return function (dispatch) {
        return dispatch({
            type: ACTIVATE_LOADING
        });
    };
};

export const setCurrentPage = (number) => {
    return function (dispatch) {
        return dispatch({
            type: SET_CURRENT_PAGE,
            payload: number
        });
    };
};

export const goToNextPage = () => {
    return function (dispatch) {
        return dispatch({
            type: GO_TO_NEXT_PAGE
        });
    };
};

export const goToPreviusPage = () => {
    return function (dispatch) {
        return dispatch({
            type: GO_TO_PREVIUS_PAGE
        });
    };
};

export const filterByNewExist = (dato) => {
    return function (dispatch) {
        return dispatch({
            type: FILTER_BY_NEW_EXIST,
            payload: dato
        });
    };
};

export const orderByName = (dato) => {
    return function (dispatch) {
        return dispatch({
            type: ORDER_BY_NAME,
            payload: dato
        });
    };
};

export const filterByType = (type) => {
    return function (dispatch) {
        return dispatch({
            type: FILTER_BY_TYPE,
            payload: type
        });
    };
};