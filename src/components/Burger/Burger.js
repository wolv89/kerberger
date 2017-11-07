import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {
	let preparedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if(preparedIngredients.length === 0) {
		preparedIngredients = <p>Please start adding ingredients!</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{preparedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	);
}

export default burger;