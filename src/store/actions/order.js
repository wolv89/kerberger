import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderSuccess = (id, orderData) => {
	return {
		type: actionTypes.ORDER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const orderFailure = (error) => {
	return {
		type: actionTypes.ORDER_FAILURE,
		error: error
	};
};

export const orderBurger = (orderData) => {
	return dispatch => {
		dispatch(orderStart());
		axios.post('/orders.json', orderData)
			.then(response => {
				dispatch(orderSuccess(response.data, orderData));
			})
			.catch(error => {
				dispatch(orderFailure(error));
			});
	};
};

export const orderStart = () => {
	return {
		type: actionTypes.ORDER_START
	};
};