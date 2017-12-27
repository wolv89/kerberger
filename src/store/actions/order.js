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
				dispatch(orderSuccess(response.data.name, orderData));
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

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};


export const orderFetchStart = () => {
	return {
		type: actionTypes.ORDER_FETCH_START
	};
};

export const orderFetchSuccess = (orders) => {
	return {
		type: actionTypes.ORDER_FETCH_SUCCESS,
		orders: orders
	};
};

export const orderFetchFailure = (error) => {
	return {
		type: actionTypes.ORDER_FETCH_FAILURE,
		error: error
	};
};

export const fetchOrders = () => {
	return dispatch => {
		dispatch(orderFetchStart());
		axios.get('/orders.json')
			.then(res => {
				const fetchedOrders = [];
				for( let key in res.data ) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				//this.setState({loading: false, orders: fetchedOrders});
				dispatch(orderFetchSuccess(fetchedOrders));
			})
			.catch(error => {
				//this.setState({loading: false});
				console.log(error);
				dispatch(orderFetchFailure(error));
			});
	};
};