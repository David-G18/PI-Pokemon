import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { 
    getPokemonDetail,
    activateLoading
} from "../../redux/actions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import './PokemonDetail.css';

export default function PokemonDetail () {

    const dispatch = useDispatch();
    const { id } = useParams();
    const pokemonDetail = useSelector((state) => state.pokemonDetail);
    const isLoading = useSelector((state) => state.isLoading);

    useEffect(() => {
        dispatch(activateLoading());
        dispatch(getPokemonDetail(id));
    }, [dispatch, id]);

    return (
        <div>
            {
                isLoading ? <LoadingSpinner /> :
                Object.keys(pokemonDetail).length ? 
                <div className = "containerDetail">
                    <div> 
                        <h3 id = "idPokemon"> #
                        {
                            isNaN(pokemonDetail.id) ? 
                            pokemonDetail.id.replace(/[^0-9]+/g, "").slice(0,5) :
                            pokemonDetail.id
                        }
                        </h3>
                        <h1> {pokemonDetail.name.toUpperCase()} </h1>
                        <img 
                            src = {pokemonDetail.image} 
                            alt = {pokemonDetail.name} 
                            className = "imagePokemon"
                        />
                        <div className = "types">
                            {
                                pokemonDetail.types.map((t, i) => {
                                    return (
                                        <h3 key = {i}> 
                                            {t.name[0].toUpperCase()+ t.name.substring(1)} 
                                        </h3>
                                    )
                                })
                            }
                        </div>
                    </div>
                            
                    <div className = "statsCard"> 
                        <h2> ESTADISTICAS </h2>
                        {
                            isNaN(pokemonDetail.id) ?
                            <div>
                                <h3> Puntos de vida: {pokemonDetail.hp} </h3>
                                <h3> Ataque: {pokemonDetail.attack} </h3>
                                <h3> Defensa: {pokemonDetail.defense} </h3>
                                <h3> Velocidad: {pokemonDetail.speed} </h3>
                                <h3> Altura: {pokemonDetail.height} M </h3>
                                <h3> Peso: {pokemonDetail.weight} kg </h3>
                            </div> :
                            <div>
                                <h3> Puntos de vida: {pokemonDetail.hp} </h3>
                                <h3> Ataque: {pokemonDetail.attack} </h3>
                                <h3> Defensa: {pokemonDetail.defense} </h3>
                                <h3> Velocidad: {pokemonDetail.speed} </h3>
                                <h3> Altura: {pokemonDetail.height / 10} M </h3>
                                <h3> Peso: {pokemonDetail.weight / 10} kg </h3> 
                            </div>
                        }
                        
                    </div>
                </div>
                : <h1>No existe actualmente el pokemon con id {`${id}`}</h1>
            }
        </div>
    )
}