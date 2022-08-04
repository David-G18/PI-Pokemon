import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

export default function LandingPage () {
    return (
        <div className = "homePage">
            <h1>Welcome to PokeApp</h1>
            <Link to = '/pokemons'>
                <button className = "buttonStart">START</button>
            </Link>
        </div>
    )
};