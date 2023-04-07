{/*const storage = localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : [];

export const initialState = {
	watchlist: storage,
}

export const watchlistReducer = (state, action) => {
	if(action.type === "ADD_TO_WATCHLIST") {
		return {...state, watchlist:[...state.watchlist]}
	};
	if(action.type === "REMOVE_FROM_WATCHLIST") {
		const newItem = state.watchlist.filter(watch => watch.id !== action.payload);
		return {...state, watchlist:newItem}
	};
	if(action.type === "CLEAR_WATCHLIST") {
		return {...state, watchlist:[]}
	};
	return state;
}*/}