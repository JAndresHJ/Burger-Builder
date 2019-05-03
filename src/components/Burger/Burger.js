import React from 'react';
import classes from './Burger.module.css';
import Ingredient from './Ingredients/Ingredient';

const burger = ( props ) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, idx) => {
                return <Ingredient key={igKey + idx} type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p> ADD INGREDIENTS! </p>
    }
    
    return(
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transformedIngredients}
            <Ingredient type="bread-bottom"/>
        </div>
    );
}

export default burger;