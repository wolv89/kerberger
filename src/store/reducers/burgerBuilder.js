import * as actions from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
}


const removeIngredient = (state, action) => {
	return {
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName] - 1
		},
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
	};
}


const reducer = (state = initialState, action) => {

	switch(action.type) {
		case actions.ADD_INGREDIENT:
			const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
			const updatedIngredients = updateObject(state.ingredients, updatedIngredient );
			const updatedState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]				
			};
			return updateObject(state, updatedState);
		case actions.REMOVE_INGREDIENT: return removeIngredient(state, action);
		case actions.SET_INGREDIENTS:

			return {
				...state,
				ingredients: action.ingredients,
				totalPrice: 4,
				error: false
			};
		case actions.FETCH_INGREDIENTS_FAILED: 
			return {
				...state,
				error: true
			}
		default:
			return state;
	}

};

export default reducer;