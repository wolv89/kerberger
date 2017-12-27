import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	loadingOrders: false,
	loading: false,
	purchased: false
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.PURCHASE_INIT:
			return {
				...state,
				purchased: false
			};
		case actionTypes.ORDER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId
			};
			return {
				...state,
				loading: false,
				purchased: true,
				orders: state.orders.concat(newOrder)
			};
		case actionTypes.ORDER_FAILURE:
			return {
				...state,
				loading: false
			};
		case actionTypes.ORDER_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.ORDER_FETCH_SUCCESS:
			return {
				...state,
				loadingOrders: false,
				orders: action.orders
			};
		case actionTypes.ORDER_FETCH_FAILURE:
			return {
				...state,
				loadingOrders: false
			};
		case actionTypes.ORDER_FETCH_START:
			return {
				...state,
				loadingOrders: true
			};
		default:
			return state;
	}
};

export default reducer;