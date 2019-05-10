import React, {Component} from 'react';
import Button from '../../UI/Button/Buttons';

class OrderSummary extends Component {
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(ingredient => {
            return (
                <li key={ingredient}>
                    <span style={{textTransform: 'capitalize'}}>{ingredient}: </span> {this.props.ingredients[ingredient]} 
                </li>
            );
        });

        return(
            <>
                <h3> Your delicious order</h3>
                <p> The stunning ingredients are: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>The total price of your Burger is <strong>${this.props.totalPrice.toFixed(2)}</strong></p>
                <p> Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </>
    
        );
    }
}

export default OrderSummary;