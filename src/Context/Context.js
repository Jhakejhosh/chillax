import  React,{useContext, useState, useEffect, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"
import {onAuthStateChanged} from "firebase/auth"
import {auth, db} from "../Firebase/Firebase.js"
import {doc, onSnapshot} from "firebase/firestore"
//import {initialState, watchlistReducer} from "./WatchlistReducer.js"



const AppContext = React.createContext();

const AppProvider= ({children}) => {
	
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [dataLoader, setDataLoader] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [search, setSearch] = useState([])
	
	//function for seperating long figures with comma
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
	
	//default movie poster
	const defaultImg = "https://www.movienewz.com/img/films/poster-holder.jpg"
	
	const [people, setPeople] = useState([]);
	//function for fetching popular people
	useEffect(() => {
		const fetchData = async() => {
			setDataLoader(true);
			try {
				const {data} = await axios.get("https://api.themoviedb.org/3/person/popular?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8");
				setPeople(data.results);
				setDataLoader(false)
			} catch (e) {
				console.log(e)
				setDataLoader(false)
			}
		}
		fetchData()
	}, []);
  
  //function for fetching data for searched movies and tv series
	const fetchData = async() => {
		setDataLoader(true)
		const {data} = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8&language=en-US&query=${searchValue}&page=1&include_adult=false`);
			setSearch(data.results);
			setDataLoader(false)
		}
	useEffect(() => {
		fetchData()
	}, [searchValue])
	
	//state for updatibg errors
	const [error, setError] = useState({
		open:false,
		message:""
	})
	
	//state for managing watchlist 
	const [watchlist, setWatchlist] = useState([]);
	
	//mounting auth state change
	const [user, setUser] = useState(null)
	useEffect(() => {
		const unSubcribed = onAuthStateChanged(auth, cred => {
			if(cred){setUser(cred)}else{setUser(null)}
		})
		return () => {unSubcribed()};
	}, [])
	
	//handle for useReducer
	{/*const [state, dispatch] = useReducer(watchlistReducer, initialState);
	//fuction for adding items to Watchlist
	const addToWatchlist = (item) => {
		dispatch({type: "ADD_TO_WATCHLIST", payload:item})
	}
	//fuction for removing items from Watchlist
	const removeFromWatchlist = (id) => {
		dispatch({type: "REMOVE_FROM_WATCHLIST", payload:id})
	}
	//fuction for clearing all items from Watchlist
	const clearWatchlist = () => {
		dispatch({type: "CLEAR_WATCHLIST"})
	}
	useEffect(() => {
		localStorage.setItems("watchlist", JSON.stringify(state.watchlist))
	}, [state])*/}
	
	return <AppContext.Provider value={{navigate, showPassword, setShowPassword, dataLoader, setDataLoader, searchValue, search, setSearch, setSearchValue, fetchData, defaultImg, numberWithCommas, people, error, setError, user, watchlist}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}

export default AppProvider;