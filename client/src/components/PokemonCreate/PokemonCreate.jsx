import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getAllTypes,
    createPokemon,
    activateLoading
} from "../../redux/actions";
import './PokemonCreate.css';

export default function PokemonCreate () {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        hp: 1,
        attack: 5,
        defense: 5,
        speed: 5,
        height: 1,
        weight: 1,
        image: '',
        idTypeOne: '',
        idTypeTwo: ''
    });

    useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch]);

    const validate = (input) => {
        let errors = {};

        if(!input.name) errors.name = "Se debe dar un nombre al pokemon";

        if (isNaN(input.hp)) {
            errors.hp = "Debe ser un valor numerico entre 1 y 255";
        } else if (input.hp < 1 || input.hp > 255) {
            errors.hp = "Debe ser un valor numerico entre 1 y 255";
        };
        
        if (isNaN(input.attack)) {
            errors.attack = "Debe ser un valor numerico entre 5 y 190";
        } else if (input.attack < 5 || input.attack > 190) {
            errors.attack = "Debe ser un valor numerico entre 5 y 190";
        };

        if (isNaN(input.defense)) {
            errors.defense = "Debe ser un valor numerico entre 5 y 230";
        } else if (input.defense < 5 || input.defense > 230) {
            errors.defense = "Debe ser un valor numerico entre 5 y 230";
        };

        if (isNaN(input.speed)) {
            errors.speed = "Debe ser un valor numerico entre 5 y 200";
        } else if (input.speed < 5 || input.speed > 200) {
            errors.speed = "Debe ser un valor numerico entre 5 y 200";
        };

        if (isNaN(input.height)) {
            errors.height = "Debe ser un valor numerico entre 0.1 y 20";
        } else if (input.height < 0.1 || input.height > 20) {
            errors.height = "Debe ser un valor numerico entre 0.1 y 20";
        };

        if (isNaN(input.weight)) {
            errors.weight = "Debe ser un valor numerico entre 0.1 y 1000";
        } else if (input.weight < 0.1 || input.weight > 1000) {
            errors.weight = "Debe ser un valor numerico entre 0.1 y 1000";
        };

        if (!input.idTypeOne && !input.idTypeTwo) {
            errors.type = "Se debe seleccionar al menos un tipo";
        } else if (input.idTypeOne === input.idTypeTwo) {
            errors.type = "No puedes seleccionar un pokemon con dos tipos iguales";
        };

        const urlValidation = /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
        const imageValidation = /.*(png|jpg|jpeg|gif)$/;

        if (!urlValidation.test(input.image) || !imageValidation.test(input.image) ) {
            errors.image = "Se debe ingresar una url valida";
        }

        return errors;
    }

    const handlerInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handlerNameChange = (e) => {
        setInput({
            ...input,
            name: e.target.value.toLowerCase()
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value.toLowerCase()
        }));
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if(!Object.keys(errors).length && input.name) {
            dispatch(createPokemon(input)); 
            setInput({
                name: '',
                hp: 1,
                attack: 5,
                defense: 5,
                speed: 5,
                height: 1,
                weight: 1,
                image: '',
                idTypeOne: '',
                idTypeTwo: ''
            });
            dispatch(activateLoading());
        }
    }

    return (
        <div className = "creationFormConatiner">
            <h1> Crea tu Pokemon </h1>

            <form className = "formCreate"
                onSubmit = {(e) => handlerSubmit(e)}
            >   
                <div className = "containerInput">
                    <div className = "principalData">
                        <label for = "name"> <span> Nombre: </span>
                            <input type = "text" name = "name" placeholder = "Pikachu..." 
                                onChange = {(e) => handlerNameChange(e)}
                            />
                        </label>
                        { errors.name ? <p> {errors.name} </p> : null}                

                        <label for = "image"> <span> Imagen (Link URL) : </span>  
                            <input type = "url" name = "image" placeholder = "https://image.png"
                                onChange = {(e) => handlerInputChange(e)}
                            />
                        </label>
                        { errors.image ? <p> {errors.image} </p> : null }

                        <label for = "idTypeOne"> <span> Seleccionar primer tipo </span> 
                            <select name = "idTypeOne"
                                onChange = {(e) => handlerInputChange(e)}
                            >
                                <option value = ""> Ninguno </option>
                                {
                                    types.map(t => {
                                        return (
                                            <option 
                                                key = {t.id} 
                                                value = {t.id}
                                            > {t.name[0].toUpperCase() + t.name.substring(1)} </option>
                                        )
                                    })
                                }
                            </select>
                        </label>

                        <label for = "idTypeTwo"> <span> Seleccionar segundo tipo </span> 
                            <select name = "idTypeTwo"
                                onChange = {(e) => handlerInputChange(e)}
                            >
                                <option value = ""> Ninguno </option>
                                {
                                    types.map(t => {
                                        return (
                                            <option 
                                                key = {t.id} 
                                                value = {t.id}
                                            > {t.name[0].toUpperCase() + t.name.substring(1)} </option>
                                        )
                                    })
                                }
                            </select>
                        </label>
                        { errors.type ? <p> {errors.type} </p> : null} 
                    </div>

                    <div className = "atributtes">
                        <label for = "hp"> <span> Puntos de vida: </span>  
                        <input type = "number" name = "hp" min = "1" max = "255" placeholder = "1"
                            onChange = {(e) => handlerInputChange(e)}
                        />
                        </label>
                        { errors.hp ? <p> {errors.hp} </p> : null} 

                        <label for = "attack"> <span> Ataque: </span> 
                            <input type = "number" name = "attack" min = "5" max = "190" placeholder = "5"
                                onChange = {(e) => handlerInputChange(e)}
                            />
                        </label>
                        { errors.attack ? <p> {errors.attack} </p> : null} 

                        <label for = "defense"> <span> Defensa: </span>  
                            <input type = "number" name = "defense" min = "5" max = "230" placeholder = "5"
                                onChange = {(e) => handlerInputChange(e)}
                            />
                        </label>
                        { errors.defense ? <p> {errors.defense} </p> : null} 

                        <label for = "speed"> <span> Velocidad: </span>  
                            <input type = "number" name = "speed" min = "5" max = "200" placeholder = "5"
                                onChange = {(e) => handlerInputChange(e)}
                            />
                        </label>
                        { errors.speed ? <p> {errors.speed} </p> : null} 

                        <label for = "height"> <span> Altura (en Metros): </span>  
                            <input type = "number" name = "height" placeholder = "0.1" step = "0.1"
                                min = "0.1" max = "20"
                                onChange = {(e) => handlerInputChange(e)}
                            />
                        </label>
                        { errors.height ? <p> {errors.height} </p> : null} 

                        <label for = "weight"> <span> Peso (en Kilogramos): </span>  
                            <input type = "number" name = "weight" placeholder = "0.1" step = "0.1"
                                min = "0,1" max = "1000"
                                onChange = {(e) => handlerInputChange(e)}
                            />
                        </label>
                        { errors.weight ? <p> {errors.weight} </p> : null}
                    </div>
                </div>

                <button 
                    type = "submit"
                    className = {`createButton ${Object.keys(errors).length ? 'disabled' : ''}`}
                > Crear Pokemon </button>
            </form>
        </div>
    )
}