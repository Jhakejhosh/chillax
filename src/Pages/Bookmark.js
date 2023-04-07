import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import {useGlobalContext} from "../Context/Context.js"
import React, {useState, useEffect} from "react"
import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {doc, onSnapshot} from "firebase/firestore"
import {db} from "../Firebase/Firebase.js"


const Bookmark = () => {
	const {user, watchlist, defaultImg} = useGlobalContext();
	const [movies, setMovies] = useState([])
	
	useEffect(() => {
		const movieRef = doc(db, "watchlist", user.uid);
		onSnapshot(movieRef, (movie) => {
		 setMovies(movie.data()?.watchlist)
		})
	}, [user])
	
	return (
		 <div className="container">
		   <Header/>
		   <div className="watchlist">
		   		<div className="watchlist-body">
		   		 <div className="watchlist-header">
		   		   <span>Watchlist {movies&&movies.length}</span>
		   		 </div>
		   		 <div className="body-list">
		   		      {movies&&movies.map(watch => {
		   		      	const {id, title} = watch;
		   		      	return(
		   		      		<div className="watchlist-card" key={id}>
		   		      		{title}
		   		      		</div>
		   		      		)
		   		      })}
		   		 </div>
		   		</div>
		   		</div>
		   <Footer/>
		 </div>
		)
}

export default Bookmark;