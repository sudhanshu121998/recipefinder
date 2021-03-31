import React, { useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';


const App =()=> {
  const APP_ID="311d16a5";
  const APP_KEY="e2575e4f258d5b2a261d711cc916f3bf";

  //Creating state variable to store the data from api
  const [recipes,setRecipes]=useState([]);
  
  //Creating state for dynamic search of food
  const[search,setSearch]=useState(""); 

   //Creating state which get execute after button is clicked,so we don't end up fetching data for every letter   
   const[query,setQuery]=useState('maggi'); 

  //Runs everytime page refreshes/any state change
  useEffect( ()=>{
    getRecipes();  //calling function once
  },[query]); //page gets refresh after each query is passed


  //Gets the response from api
  const getRecipes =async()=>{
  const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data= await response.json();
    setRecipes(data.hits);  //setting the hits from data
  }

  //To update search onChange,its a event driven(e)
  const updateSearch = e=>{
    setSearch(e.target.value);  //everytime onChange it sets the value to search
  }

  //To call api after the submit button is pressed,its a event driven(e)
  const getSearch = e=>{
    e.preventDefault();  //stops the refresh
    setQuery(search); //updates and passes the complete input by user once submit button is pressed
    setSearch("");
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar"
         type="text" 
         value={search} 
         onChange={updateSearch} />

        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      { recipes.map(recipe =>(
      <Recipe 
      key={recipe.recipe.label}  //Unique key
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients} // we need to loop through it
      />
      ))}  
      </div>
      
    </div>
  
  );
}

export default App;
