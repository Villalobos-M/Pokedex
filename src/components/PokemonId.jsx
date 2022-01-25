import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios'
import "../styles/pokemonId.styles.css"

const PokemonId = () => {

   const {id} = useParams();
    const navigate = useNavigate();

    const [pokemonData, setPokemonData] = useState("")

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => setPokemonData(res.data))
    }, [id])

    const back = () => {
       navigate(-1)
    }
    const typeColor = (pokemonData?.types?.[0].type?.name);

    console.log(pokemonData.sprites?.other?.dream_world?.front_default);
  return (
   <div className='pokemonId-section'>
            <div className="first-section-cont">
               <div className="first-section-id">
                  <div className="container-back">
                    <i onClick={back} className="far fa-arrow-alt-circle-left"></i>
                  </div>

                  <container className="info-cont">
                     <img src={pokemonData.sprites?.other?.dream_world?.front_default} alt={pokemonData.name} className='img-pokemin'/>
                     <div className='info' >
                        <h2>{pokemonData.name}</h2>
                        <h3>#{id}</h3>
                     </div>
                  </container>
               </div>
            </div>

       <div className="second-section-cont">
            
         <article className={`second-section-id ${typeColor === "normal" ? "normal" 
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
            : null}`} >
            <div className="container-first-second">
               <article className='first-article'>
                  <section className='abilities'>
                     <h3>Abilities: </h3>
                     {pokemonData?.abilities?.map((abilitie, i) => <p key={i}>{abilitie?.ability?.name}</p>)}
                  
                     <h3 className='size'>Size: </h3>
                     <p>Height: {pokemonData.height}</p> 
                     <p>Height: {pokemonData.weight}</p> 
                  </section>

                  <section className='moves'>
                     <h3>Moves: </h3>
                     {pokemonData?.moves?.slice(0, 6).map((move, i) => <p key={i}>{move?.move?.name}</p>)}
                  </section>
               </article>


               <article className='second-articlet'>
                  <h3 className='stats'>Stats</h3>
                  {
                     pokemonData?.stats?.map(stat => (
                        <div key={stat?.stat?.name} className='porcent'>
                           <h4>{stat?.stat?.name}:</h4>
                           <p >
                              {stat?.base_stat}% 
                           </p>
                        </div>
                        
                        ))
                  }
               </article>
            </div>

            <article className='therd-article'>
               <h3>Types </h3>
               <div className='types-container'>
               {pokemonData?.types?.map((type, i) => <p key={i}>{type?.type?.name}</p>)}   
               </div>
            </article>
         </article>     
      </div>
   </div>
   );
};

export default PokemonId;
