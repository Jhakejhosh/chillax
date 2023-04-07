import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import NavigateBack from "../Components/NavigateBack.js";
import {useState, useEffect} from "react"
import axios from "axios"
import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {useGlobalContext} from "../Context/Context.js";
import {useParams} from "react-router-dom";
import {BsFillStarFill, BsBookmark} from "react-icons/bs"
import {BiUpvote} from "react-icons/bi"
import {GiVote} from "react-icons/gi"
import {Link} from "react-router-dom";
import {doc, updateDoc, arrayUnion} from "firebase/firestore"
import {db} from "../Firebase/Firebase.js"
import {toast} from "react-toastify"

const SingleContent = () => {
	
	const {id} = useParams();
	const {defaultImg, setDataLoader, dataLoader, numberWithCommas, user, watchlist, navigate} = useGlobalContext();
	const [getDetails, setGetDetails] = useState([])
	const [tvDetails, setTvDetails] = useState([])
	const [movieCast, setMovieCast] = useState([])
	const [tvCast, setTvCast] = useState([])
	const [tvKeyword, setTvKeyword] = useState([])
	const [movieKeyword, setMovieKeyword] = useState([])
	
	//fetching details for movies
	const fetchDetailsData = async() => {
		setDataLoader(true)
		try {
			const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8`);
			setGetDetails(data)
			setDataLoader(false)
		} catch (e) {
			console.log(e)
		}
	}
	//fetching details for tv
  const fetchData = async() => {
		setDataLoader(true)
		try {
			const {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8`);
			setTvDetails(data)
			setDataLoader(false)
		} catch (e) {
			console.log(e)
		}
	}
	//fetching movie casts
  const fetchMovieCast = async() => {
		setDataLoader(true)
		try {
			const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8`);
			setMovieCast(data.cast)
			setDataLoader(false)
		} catch (e) {
			console.log(e)
		}
	}
	//fetching tv casts
  const fetchTvCast = async() => {
		setDataLoader(true)
		try {
			const {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8`);
			setTvCast(data.cast)
			setDataLoader(false)
		} catch (e) {
			console.log(e)
		}
	}
	//fetching tv keywords
  const fetchTvKeyword = async() => {
		setDataLoader(true)
		try {
			const {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}/keywords?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8`);
			setTvKeyword(data.results)
			setDataLoader(false)
		} catch (e) {
			console.log(e)
		}
	}
	//fetching movie keywords
  const fetchMovieKeyword = async() => {
		setDataLoader(true)
		try {
			const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/keywords?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8`);
			setMovieKeyword(data.keywords)
			setDataLoader(false)
		} catch (e) {
			console.log(e)
		}
	}
	
	useEffect(() => {
		window.scroll(0, 0)
		fetchDetailsData();
		fetchData()
		fetchMovieCast()
		fetchTvCast()
		fetchTvKeyword()
		fetchMovieKeyword()
	}, [id])
	
	const {title, budget, genres, overview, popularity, release_date, revenue, status, tagline, vote_average, vote_count} = getDetails;
	const {name, first_air_date, type, number_of_episodes, number_of_seasons, poster_path, backdrop_path} = tvDetails;
	
	//function for adding movies to firebase database
	{/*const addToWatchlist = async() => {
		const movieRef = doc(db,"watchlist", user.uid);
		try {
			if(user){
				await updateDoc(movieRef, {
				watchlist:watchlist?arrayUnion({
				id:id,
				title:title||name,
				img:poster_path||getDetails.poster_path,
				date:first_air_date||release_date,
				overview:overview||tvDetails.overview
				}):[id]
			});
      toast.info(`${name||title} was added to watchlist`, {
				position:toast.POSITION.TOP_CENTER,
				autoClose:2000})
			}else{
				navigate("/Login")
			}
		} catch (e) {
     toast.success(`${e.message}`, {
				position:toast.POSITION.TOP_CENTER,
				autoClose:2000})
		}
	}*/}
	
	return (
		<div className="container">
		  <Header/>
		  <div className="content-body">
		     <section>
		       <NavigateBack/>
		       <div className="content-banner">
		       <div className="content-img">
		          <img className="bg" src={backdrop_path||getDetails.backdrop_path?getPosterUrl(backdrop_path||getDetails.backdrop_path):defaultImg} alt={name||title}/>
		          <div className="overlay"></div>
		          <img className="poster" src={poster_path||getDetails.poster_path?getPosterUrl(poster_path||getDetails.poster_path):defaultImg} alt={name||title}/>
		       </div>
		       <div className="content-info">
		          <h3>{name||title}</h3>
		          <p className="tagline">{tagline||tvDetails.tagline}</p>
		          <div className="rating">
		            <div><span><BsFillStarFill style={{color:"var(--secondary-color)", marginRight:"0.5rem"}}/><p style={{color:"gray"}}>{Math.floor(vote_average/10*100 ||tvDetails.vote_average/10*100)}<sup>%</sup></p></span><h4>User score</h4></div>
		            <div><span><BiUpvote style={{color:"green", marginRight:"0.5rem"}}/><p>{Math.floor(popularity||tvDetails.popularity)}</p></span><h4>Popularity</h4></div>
		            <div><span><GiVote style={{color:"var(--primary-color", marginRight:"0.5rem"}}/><p>{Math.floor(vote_count/1000*100||tvDetails.vote_count/1000*100)}</p></span><h4>Counts</h4></div>
		          </div>
		          <div className="genre">
		            {genres&&genres.map(genre => {
		            	const {id, name} = genre;
		            	return (
		            		<p key={id}>{name}</p>
		            		)
		            })}{tvDetails.genres&&tvDetails.genres.map(genre => {
		            	const {id, name} = genre;
		            	return (
		            		<p key={id}>{name}</p>
		            		)
		            })}
		          </div>
		          <h3 className="over-view">Overview</h3>
		          <p>{overview||tvDetails.overview}</p>
		          <button className="add-movie"><BsBookmark style={{marginRight:"0.5rem"}}/>Add to watchlist</button>
		       </div>
		       </div>
		     </section>
		     <div className="top-cast">
		        <h3>{movieCast&&"Top casts"||tvCast&&"Series casts"}</h3>
		        <div className="cast-body">
		          {tvCast.map(cast => {
		          	const {id, name, profile_path, character} = cast;
		          	return(
		          	  <Link to={`/person/${id}`}><div className="cast-card" key={id}>
		          	    <img src={profile_path?getPosterUrl(profile_path):defaultImg}/>
		          	    <div className="cast-details">
		          	      <h3>{name}</h3>
		          	      <p>{character}</p>
		          	    </div>
		          	  </div></Link>
		          	)
		          })}{movieCast.map(cast => {
		          	const {id, name, profile_path, character} = cast;
		          	return(
		          	  <Link to={`/person/${id}`}><div className="cast-card" key={id}>
		          	    <img src={profile_path?getPosterUrl(profile_path):defaultImg}/>
		          	    <div className="cast-details">
		          	      <h3>{name}</h3>
		          	      <p>{character}</p>
		          	    </div>
		          	  </div></Link>
		          	)
		          })}
		        </div>
		     </div>
		     <div className="more-details">
		       <h3>Details</h3>
		       <div className="more-body">
		         <div className="more-card">
		           <h3>Status</h3>
		           <p>{status||tvDetails.status}</p>
		         </div>
		         <div className="more-card">
		           <h3>{getDetails.budget?"Budget":"Season"}</h3>
		           <p>{budget&&`$${numberWithCommas(budget)}`||number_of_seasons}</p>
		         </div>
		         <div className="more-card">
		           <h3>Date released</h3>
		           <p>{release_date||first_air_date}</p>
		         </div>
		         <div className="more-card">
		           <h3>{getDetails.revenue?"Revenue":"Episodes"}</h3>
		           <p>{revenue&&`$${numberWithCommas(revenue)}`||number_of_episodes}</p>
		         </div>
		         <div className="more-card">
		           <h3>{tvDetails.type?"Type":null}</h3>
		           <p>{type||null}</p>
		         </div>
		       </div>
		     </div>
		     <div className="keyword">
		        <h3>Keywords</h3>
		        <div className="keyword-body">
		          {tvKeyword.map(keyword => {
		          	const {id, name} = keyword;
		          	return(
		          	  <div className="keyword-button" key={id}>
		          	    {name}
		          	  </div>
		          	)
		          })}{movieKeyword.map(keyword => {
		          	const {id, name} = keyword;
		          	return(
		          	  <div className="keyword-button" key={id}>
		          	    {name}
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

export default SingleContent