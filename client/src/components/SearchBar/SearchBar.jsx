import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { activateLoading, getPokemon } from "../../redux/actions";
import './SearchBar.css';

export default function SearchBar () {

    const dispatch = useDispatch();
    const [ searchName, setSearchName ] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchName) {
            dispatch(getPokemon(searchName.toLocaleLowerCase()));
            dispatch(activateLoading());
            setSearchName('');
            e.target.reset();
        }
    }

    return (
        <div className = "searchBar">
            <form onSubmit = {(e => handleSubmit(e))}>
                <input 
                    type = "text"
                    name = "busqueda"
                    placeholder = "Buscar..."
                    autoComplete = "on"
                    onChange = {(e) => handleInputChange(e)}
                />
                <button 
                    type = "submit"
                > Buscar </button>
            </form>
            <hr />
        </div>
    )
}