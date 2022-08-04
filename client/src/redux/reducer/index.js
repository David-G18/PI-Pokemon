const {
    NEW_ERROR,
    GET_ALL_POKEMONS,
    GET_POKEMON,
    GET_POKEMON_DETAIL,
    GET_ALL_TYPES,
    ACTIVATE_LOADING,
    SET_CURRENT_PAGE,
    GO_TO_NEXT_PAGE,
    GO_TO_PREVIUS_PAGE,
    FILTER_BY_NEW_EXIST,
    ORDER_BY_NAME,
    FILTER_BY_TYPE
} = require('../actions/index');

const initialState = {
    allPokemons: [],
    pokemons: [],
    pokemonDetail: {},
    types: [],
    isLoading: true,
    currentPage: 1,
    pokemonsPerPage: 12,
    order: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case GET_ALL_POKEMONS:
            return {
                ...state, 
                pokemons: action.payload,
                allPokemons: action.payload,
                isLoading: false
            };

        case GET_POKEMON:
            return {
                ...state, 
                pokemons: action.payload,
                isLoading: false,
                currentPage: 1
            };

        case GET_POKEMON_DETAIL:
            return {
                ...state, 
                pokemonDetail: action.payload,
                isLoading: false,
            };

        case GET_ALL_TYPES:
            return {
                ...state, 
                types: action.payload,
            };

        case ACTIVATE_LOADING:
            return {
                ...state, 
                isLoading: true
            };

        case SET_CURRENT_PAGE:
            return {
                ...state, 
                currentPage: action.payload
            };

        case GO_TO_NEXT_PAGE:
            return {
                ...state, 
                currentPage: state.currentPage + 1
            };

        case GO_TO_PREVIUS_PAGE:
            return {
                ...state, 
                currentPage: state.currentPage - 1
            };

        case FILTER_BY_NEW_EXIST:
            if (action.payload === 'todos') {
                return { 
                    ...state, 
                    pokemons: state.allPokemons, 
                    currentPage: 1
                };
            } ;
            const sourcePokemons = action.payload === 'creados' ?
            state.allPokemons.filter(p => isNaN(p.id) === true) :
            state.allPokemons.filter(p => isNaN(p.id) === false);

            return {
                ...state,
                pokemons: sourcePokemons,
                currentPage: 1
            };
            
        case ORDER_BY_NAME:
            if (action.payload === 'pred') {
                return {
                    ...state,
                    pokemons: state.allPokemons,
                    currentPage: 1,
                    order: `Ordenando ${action.payload}`
                };
            };

            const pokemons = state.pokemons.map(p => p );
            pokemons.sort(function (first, second) {
                return first.name.localeCompare(second.name); 
            });
            const sortPokemons = action.payload === 'desc' ? pokemons.reverse() : pokemons;
            
            return {
                ...state,
                pokemons: sortPokemons,
                currentPage: 1,
                order: `Ordenando ${action.payload}`
            };

        case FILTER_BY_TYPE:
            if (action.payload === 'todos') {
                return {
                    ...state,
                    pokemons: state.allPokemons,
                    currentPage: 1
                }
            }

            const typePokemon = state.allPokemons.filter(p => {
                const types = p.types.map(t => t.name);
                return types.includes(action.payload);
            });

            return {
                ...state, 
                pokemons: typePokemon,
                currentPage: 1
            };

        default:
            return state;
    }
}

export default rootReducer;