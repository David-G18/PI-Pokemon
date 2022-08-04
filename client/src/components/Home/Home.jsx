import React from "react";
import './Home.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    activateLoading,
    getAllPokemons,
    getAllTypes,
} from "../../redux/actions";
import PokemonCard from "../PokemonCard/PokemonCard";
import Pagination from "../Pagination/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ControlPanel from "../ControlPanel/ControlPanel";
import SearchBar from "../SearchBar/SearchBar";


export default function Home () {

    const dispatch = useDispatch();
    const order = useSelector((state) => state.order);
    const pokemons = useSelector((state) => state.pokemons);
    const isLoading = useSelector((state) => state.isLoading);
    const currentPage = useSelector((state) => state.currentPage);
    const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    useEffect(() => {
        dispatch(activateLoading());
        dispatch(getAllPokemons());
        dispatch(getAllTypes());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [currentPage]);

    return (
        <div className = "home">
            {
                isLoading ? <LoadingSpinner /> : 
                <div className = "content">
                    <SearchBar />
                    <ControlPanel />
                    <Pagination />

                    {   
                        currentPokemons.length ? 
                        currentPokemons?.map( (p, i) => {
                            return (
                                <PokemonCard
                                    key = {i}
                                    id = {p.id}
                                    name = {p.name}
                                    image = {p.image}
                                    types = {p.types.map(t => {
                                        return t.name;
                                    })}
                                />
                            )
                        }) : <h1> No se encontro ningun Pokemon </h1>
                    }

                    <Pagination /> 
                </div>             
            }
        </div>
    )
}