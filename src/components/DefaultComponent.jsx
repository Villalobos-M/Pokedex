import axios from 'axios';
import React,{useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import "../styles/defaultComponents.styles.css"

const DefaultComponent = () => {
   
   const dispatch = useDispatch();
   const [name, setName] = useState("");
   const navigate = useNavigate();

   const submit = (e) =>{
      e.preventDefault()
      dispatch({
         type: "SET_NAME",
         payload: name
         
      })
      navigate("/pokedex")
   }
   const [pokemons, setPokemons] = useState([]);
   
   
      useEffect(() => {
         setPokemons("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30")
         axios.get(pokemons)
         .then(res => console.log(res.data.results))
    }, [pokemons])
  return (
      <div className='container-login'>
         <section className='first-section' >
            <h1>Pokedex</h1>
         </section>

         <section className='second-section' >
            <div className='container-input' >
               <label>
                  <h2>Write your name to enter</h2>
                  <input type="text" onChange={e => setName(e.target.value)} value={name} />
                </label>
               <button onClick={submit} ><b>Go</b></button>
            </div>
         </section>
         
      </div>
      );
};

export default DefaultComponent;
