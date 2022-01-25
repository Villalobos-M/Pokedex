import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux"
import axios from 'axios';
import {useDispatch} from 'react-redux'
import PokemonCardId from './PokemonCardId';
import "../styles/pokeSearch.styles.css"
import {useNavigate} from 'react-router-dom';

const PokeSearch = () => {
   const aSearch = useSelector(state => state.aPokemon)
   const name = useSelector(state => state.name)

   const [poke, setPoke] = useState([]);
   const [types, setTypes] = useState([]);
   const [aPokemon, setAPokemon] = useState("");

   const navigate = useNavigate();
   const dispatch = useDispatch();

   

     useEffect(() => {
         axios.get('https://pokeapi.co/api/v2/type')
         .then(res => setTypes(res.data.results))
    }, [])

   
      useEffect(() => {
         axios.get(`https://pokeapi.co/api/v2/pokemon/${aSearch}`)
         .then(res => setPoke(res.data))
    }, [aSearch])


    const handleTypes = (e) =>{
      dispatch({
         type: "SET_API",
         payload: e.target.value})

         navigate("/types")
    }
    const handleAll = () => {
         navigate("/pokedex")
      }

      const handleSearch = () => {
         dispatch({
            type: "SET_POKEMON",
            payload: aPokemon
         })
         navigate("/pokeSearch")
      }
  return (
      <div className='container-pokedex-search'>
         <header>
            <p> Welcome {name}! this is to the pokedex, here you can find all the information of the pokemon that you like the most</p>
         </header>

          <div className="container-select">
            <label>
               <select name="types" id="types" onChange={e => handleTypes(e)}>
                  <option>Types</option>
                  {types.map(type => 
                     <option key={type.name} value={type.url} > 
                        {type.name}
                     </option>
                     )}
               </select>
            </label>
            <button onClick={handleAll} className='btn-all'>All</button>
         </div>


         <section className="container-search">
            <p>Write the name of your favorite pokemon</p>
            <label className='label-container'>
               <div className="label-container">
                 <input type="text" value={aPokemon} placeholder='Search Pokemon...'
                        onChange={e => setAPokemon(e.target.value) } />
                  <button onClick={handleSearch} >
                     <i className="fab fa-searchengin"></i>
                  </button>
               </div>
            </label>

         </section>
         
         <section className="container-ul">
            <ul className='ul-search'>
            {
               <PokemonCardId  key={poke.name} 
                              name={poke.name}
                              id={poke.id}
                              abilities={poke.abilities}
                              types={poke.types}
                              sprites={poke.sprites} />
            } 
            </ul>
         </section>
         
      </div>
      );
};

export default PokeSearch;
