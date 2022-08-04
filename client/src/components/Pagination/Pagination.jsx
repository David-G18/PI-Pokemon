import React from "react";
import './Pagination.css';
import { useDispatch, useSelector } from "react-redux";
import { 
    goToPreviusPage, 
    goToNextPage, 
    setCurrentPage
} from "../../redux/actions";

export default function Pagination () {

    const pageNumbers = []
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemons);
    const currentPage = useSelector((state) => state.currentPage);
    const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
    
    for (let i = 0; i <= Math.floor(pokemons.length / pokemonsPerPage); i++) {
        pageNumbers.push(i + 1);
    };

    const previousPage = () => {
        dispatch(goToPreviusPage());
    };

    const changePage = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const NextPage = () => {
        dispatch(goToNextPage());
    };

    return (
        <nav className = "pagination">
            <button
                onClick = { () => previousPage()}
                className = {`prev ${currentPage === 1 ? 'disabled' : ''}`}
            > Prev </button>
            {
                pageNumbers?.map( page => {
                    return (
                        <button 
                            key = {page} 
                            onClick = { () => changePage(page)}
                            className = {`paginationItem ${currentPage === page ? 'active' : null}`}
                        > {page} </button>
                    )
                })
            }
            <button
                onClick = { () => NextPage()}
                className = {`next ${currentPage === Math.ceil(pokemons.length / pokemonsPerPage) ? 
                    'disabled' : ''}`}
            > Next </button>
        </nav>
    )
}