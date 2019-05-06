import React from 'react';
import Button from '../../UI/Button/Buttons';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingredient => {
        return (
            <li key={ingredient}>
                <span style={{textTransform: 'capitalize'}}>{ingredient}: </span> {props.ingredients[ingredient]} 
            </li>
        )
    });

    return(
        <>
            <h3> Your delicious order</h3>
            <p> The stunning ingredients are: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>The total price of your Burger is <strong>${props.totalPrice.toFixed(2)}</strong></p>
            <p> Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </>
    );
};

export default orderSummary