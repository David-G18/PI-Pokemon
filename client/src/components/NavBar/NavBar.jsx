import React from "react";
import { Link } from "react-router-dom";
import mainImage from "../../images/pokemon.png";
import './NavBar.css'

export default function NavBar () {

    return (
        <header className = "App-header">
            <img className = "image_logo" src = {mainImage} alt = "Pokemons Imagen" />
            <Link to = "/pokemons" style = {{ textDecoration: 'none', color: "black" }}>
                <h4> PokeWeb </h4>
            </Link>
            <Link to = "/pokemons/create" style = {{ textDecoration: 'none', color: "black" }}>
                <h4> Crear Pokemon </h4>
            </Link>
        </header>
    )
}