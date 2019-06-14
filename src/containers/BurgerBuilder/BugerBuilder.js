import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 0.4,
    bacon : 0.5,
    cheese: 1,
    meat: 1.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    //Life cycle where data should be fetched
    componentDidMount(){
        axios.get('https://burger-builder-44afa.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({error: true})
        });
    }

    isPurchasable (ingredients) {        
        const sum = Object.keys(ingredients).map(ingredient => {
            return ingredients[ingredient];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable : sum > 0});
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.isPurchasable(updatedIngredients);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.isPurchasable(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.setState({loading : true}); // Shows the spinner
        // SIDE NOTE: For the production application the final price should 
        // be calculated on the server to make sure that the user do no
        // manipulate the price
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'JAndres',
                address: {
                    street: 'test',
                    country: 'México'
                },
                deliveryMethod: 'super fast'
            }
        }
        // (1) Argument: endpoint provided by firebase
        // (2) Argument: body
        axios.post('/orders', order).then(response => {
            // Shows the summary and close modal
            this.setState({loading : false, purchasing : false}); 
            console.log(response);
        }).catch(error => {
            // Shows the summary and close modal even if an error ocurrs
            this.setState({loading : false, purchasing: false}); 
            console.log(error);
        })
    }
    
    render(){
        const disabled = {
            ...this.state.ingredients         
        };
        for(let key in disabled){  //Loop through all the keys
            disabled[key] = disabled[key] <= 0;
        }

        //orderSummary will contain the summary or the Spinner depending of the loading state
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

        if(this.state.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.addIngredient}
                        ingredientRemoved = {this.removeIngredient}
                        disabled = {disabled}
                        price = {this.state.totalPrice}
                        ordered = {this.purchaseHandler}
                        purchasable = {this.state.purchasable}/>
                </>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}/>
        }
        
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        return(
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);