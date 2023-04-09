import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {useState, useEffect} from "react"
import axios from "axios";
import {useGlobalContext} from "../Context/Context.js"
import {Link} from "react-router-dom"


const Upcoming = () => {
	
	const [upcomes, setUpcomes] = useState([]);
	const {dataLoader, setDataLoader, defaultImg} = useGlobalContext();
	useEffect(() => {
		const fetchMovies = async() => {
			setDataLoader(true)
			try {
				const {data} = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8");
				setUpcomes(data.results);
				setDataLoader(false)
			} catch (e) {
				console.log(e)
				setDataLoader(false)
			}
		}
		fetchMovies();
	}, [setDataLoader])
	
	return (
		  <div className="upcome">
		    <h2 className="topic">Upcoming <span>Movies</span></h2>
		    { dataLoader ? (<div className="data-loader">Loading...</div>) : (<div className="trend-body">
		      {upcomes.map(upcome => {
		      	const {id, title, poster_path, release_date, vote_average} = upcome;
		      	return (
		      	   <Link to={`/details/${id}`}><div className="trend-card" key={id}>
		      	      <img src={poster_path ? getPosterUrl(poster_path) : defaultImg} alt={title}/>
		      	      <div className="trend-details">
		      	         <div className="vote-percent">{Math.floor(vote_average/10*100)}%</div>
		      	         <h3>{title?title:"No Title"}</h3>
		      	         <p>{release_date?release_date:"no date"}</p>
		      	      </div>
		      	   </div></Link>
		      	)
		      })}
		    </div>)}
		  </div>
		)
}

export default Upcoming