import React from 'react';
//importing css module for styling this particular js
import style from './recipe.module.css';



//Destructring and passing the props from state(recipes)
const Recipe = ({title,calories,image,ingredients}) =>{
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ol> 
                {ingredients.map(ingredient =>(
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p>{calories}</p>
            <img className={style.image} src={image} alt=""/>

        </div>
    );
};

export default Recipe;