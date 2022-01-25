import React, {useState, useEffect}from 'react';
import {useSelector} from "react-redux"
import axios from 'axios';
import {useDispatch} from 'react-redux'
import PokemonCard from './PokemonCard';
import "../styles/pokedex.styles.css"
import {useNavigate} from 'react-router-dom';

const PokeTypes = () => {
    const navigate = useNavigate();
   const dispatch = useDispatch();

   const name = useSelector(state => state.name)
   const pokemonsPerPage = useSelector(state => state.pokemonsPerPage)
   const api = useSelector(state => state.api)

   const [types, setTypes] = useState([]);
   const [aPokemon, setAPokemon] = useState("");
   const [pokemons, setPokemons] = useState([]);
   const [page, setPage] = useState(1);

     useEffect(() => {
         axios.get('https://pokeapi.co/api/v2/type')
         .then(res => setTypes(res.data.results))
    }, [])

    const handleTypes = (e) =>{
      dispatch({
         type: "SET_API",
         payload: e.target.value})
         navigate("/types")
         setPage(1)
    }

   useEffect(() => {
            axios.get(api)
            .then(res => setPokemons(res.data.pokemon))
      }, [api])

      const handleAll = () => {
         navigate("/pokedex")
      }

      const lastIndex = page * pokemonsPerPage;
      const firstIndex = lastIndex - pokemonsPerPage;
      const filterPokemons = pokemons.slice(firstIndex, lastIndex)
      const totalPages = Math.ceil(pokemons.length/pokemonsPerPage)

      const numberPages = [];
      for (let i = 1; i <= totalPages; i++) {   
         numberPages.push(i)      
      }
      const handleSearch = () => {
         dispatch({
            type: "SET_POKEMON",
            payload: aPokemon
         })
         navigate("/pokeSearch")
      }
      const handleChangePage = (num) =>{
         dispatch({
            type: "SET_PAGES",
            payload: num
         })
         setPage(1)
      }
      
  return (
      <div className='container-pokedex'>
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
            <label>
               <div className="label-container">
                  <input type="text" value={aPokemon} placeholder='Search Pokemon...'
                        onChange={e => setAPokemon(e.target.value) } />
                  <button onClick={handleSearch} >
                     <i className="fab fa-searchengin"></i>
                  </button>
               </div>
            </label>
         </section>
        
         <ul>
           {
              filterPokemons.map(pokemon => <PokemonCard 
                                       key={pokemon.pokemon.name} 
                                       name={pokemon.pokemon.name}
                                       url={pokemon.pokemon.url} />)
           } 
         </ul>

          <section className='section-pages'>
                   <p> Choose the number of pokemons per page</p>
                <p> No. {pokemonsPerPage}</p>

             
              <div className="section-btn">
                  <button onClick={()=> handleChangePage(4)}>4</button>
                  <button onClick={()=> handleChangePage(8)}>8</button>
                  <button onClick={()=> handleChangePage(14)}>14</button>
                  <button onClick={()=> handleChangePage(20)}>20</button>
              </div>
              
              <div className="container-pages">
                  {
                     numberPages.map(number => 
                        <button key={number} onClick={() => setPage(number)}>
                           {number}
                        </button>)
                   } 
              </div>
           </section>
           
   </div>
   );
};

export default PokeTypes;
