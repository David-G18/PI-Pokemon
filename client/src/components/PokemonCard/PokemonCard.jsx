import React from "react";
import { Link } from "react-router-dom";
import './PokemonCard.css';

export default function PokemonCard (props) {
    return (
        <div className = "card">
            <Link 
                to = {`/pokemons/${props.id}`}
                style = {{ color: "black" }}
            >
                <h2> {props.name[0].toUpperCase() + props.name.substring(1)} </h2>
            </Link>
            <img 
                src = {props.image} 
                alt = {props.name}
                width = "200px"
                height= "200px"
            />
            <div> Type: 
                {
                    props.types.map((t, i) => {
                        return (
                            <p key={i}> {t[0].toUpperCase() + t.substring(1)} </p>
                        )
                    })
                }
            </div>
        </div>
    );
}