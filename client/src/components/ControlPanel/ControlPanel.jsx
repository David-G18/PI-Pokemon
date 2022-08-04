import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    filterByNewExist,
    orderByName,
    filterByType
} from "../../redux/actions";
import './ControlPanel.css';

export default function ControlPanel (props) {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);

    const handleFilterByNewExist = (e) => {
        dispatch(filterByNewExist(e.target.value));
    };

    const handleOrderByName = (e) => {
        dispatch(orderByName(e.target.value));
    };

    const handleFilterByType = (e) => {
        dispatch(filterByType(e.target.value));
    };

    return (
        <div className = "controlPanel">
            <button 
                type = "button" 
                onClick = {() => window.location.reload()}
            > Recargar Lista de Pokemons </button>

            <label for = "Ordenar"> Ordenar por: </label>
            <select 
                name = "Ordenar"
                onChange = {e => handleOrderByName(e)} 
                >
                <option value = "pred" > Predeterminado </option>
                <option value = "asc"> Ascendente </option>
                <option value = "desc"> Descendente </option>
            </select>

            <label for = "Creados/Existente"> Elegir origen: </label>
            <select 
                name = "Creados/Existentes" 
                onChange = {e => handleFilterByNewExist(e)}
                >
                <option value = "todos"> Todos </option>
                <option value = "creados"> Creados </option>
                <option value = "existentes"> Existentes </option>
            </select>

            <label for = "Tipos"> Elegir Tipo: </label>
            <select 
                name = "Tipos"
                onChange = {e => handleFilterByType(e)}
                >
                <option value = "todos"> Todos </option>
                {
                    types.map( t => {
                        return (
                            <option 
                                key = {t.id} 
                                value = {t.name}
                            > {t.name[0].toUpperCase() + t.name.substring(1)} </option>
                        )
                    })
                }
            </select>
            <hr />
        </div>
    )    
}