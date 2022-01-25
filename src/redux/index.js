const INITIAL_STATE = {
   name: "",
   api: null,
   aPokemon: "",
   pokemonsPerPage: 20
}

const reducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_NAME":
         return {...state, name: action.payload}
         
      case "SET_API":
         return {...state, api: action.payload}
      
      case "SET_POKEMON":
         return {...state, aPokemon: action.payload}
         
      case "SET_PAGES":
         return {...state, pokemonsPerPage: action.payload}

      default: return state;
   }
}

export default reducer;