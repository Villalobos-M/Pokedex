import React, {useState, useEffect}from 'react';
import axios from 'axios';

import {useNavigate} from 'react-router-dom';
import "../styles/pokemonCard.styles.css"

const PokemonCard = ({name, url}) => {

   const [pokemonData, setPokemonData] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
         axios.get(url)
         .then(res => setPokemonData(res.data))
    }, [url])
    
    const type = (pokemonData?.types?.map((type, i) => <p key={i}> {type?.type?.name} </p>));
    const typeColor = (pokemonData?.types?.[0].type?.name);
    const getId = () => { navigate(`/pokedex/${pokemonData.id}`)}

  return (
      <li onClick={getId} className={ typeColor === "normal" ? "normal" 
         : typeColor === "grass" ? "grass" 
         : typeColor === "fighting" ? "fighting"
         : typeColor === "poison" ? "poison"
         : typeColor === "ground" ? "ground"
         : typeColor === "rock" ? "rock"
         : typeColor === "bug" ? "bug"
         : typeColor === "ghost" ? "ghost"
         : typeColor === "steel" ? "steel"
         : typeColor === "fire" ? "fire"
         : typeColor === "water" ? "water"
         : typeColor === "electric" ? "electric"
         : typeColor === "psychic" ? "psychic"
         : typeColor === "ice" ? "ice"
         : typeColor === "dragon" ? "dragon"
         : typeColor === "dark" ? "dark"
         : typeColor === "fairy" ? "fairy"

      : null}> 
         <section className="first-sect">
            <h5>#{pokemonData.id}</h5>
         </section>

         <section className="second-sect">
            <h2>{name}</h2>
            <p>Abilities: {pokemonData?.abilities?.length}</p>
            <article className="container-type">
               {type}
            </article>
         </section>
         
         <section className="therd-sect">
            <img src={pokemonData.sprites?.other?.dream_world?.front_default} alt={name} />
         </section>
      </li>
      );
};

export default PokemonCard;
