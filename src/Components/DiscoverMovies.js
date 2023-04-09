import {useState, useEffect} from "react"
import {useGlobalContext} from "../Context/Context.js";
import axios from "axios"
import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {Link} from "react-router-dom"


const DiscoverMovies = () => {
	
	const [discoverMovies, setDiscoverMovies] = useState([]);
	const {dataLoader, setDataLoader, defaultImg} = useGlobalContext()
	useEffect(() => {
		const fetchData = async() => {
			setDataLoader(true)
			try {
				const {data} = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8");
				setDiscoverMovies(data.results);
				setDataLoader(false)
			} catch (e) {
				console.log(e)
				setDataLoader(false)
			}
		}
		fetchData()
	}, [setDataLoader]);
	
	return (
		  <div className="discover">
		     <h3 className="discover-topic">Check out the movies</h3>
		    { dataLoader ? (<div className="data-loader">Loading...</div>) : (<div className="discover-body">
		      {discoverMovies.map(discover => {
		      	const {id, title, poster_path, release_date, vote_average} = discover;
		      	return (
		      	   <Link to={`/details/${id}`}><div className="discover-card" key={id}>
		      	      <img src={poster_path ? getPosterUrl(poster_path) : defaultImg} alt={title}/>
		      	      <div className="discover-details">
		      	         <div className="vote-percent">{Math.floor(vote_average/10*100)} %</div>
		      	         <h3>{title}</h3>
		      	         <p>{release_date}</p>
		      	      </div>
		      	   </div></Link>
		      	)
		      })}
		    </div>)}
		  </div>
		)
}

export default DiscoverMovies