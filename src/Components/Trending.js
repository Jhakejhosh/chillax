import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {useState, useEffect} from "react"
import axios from "axios";
import {BiMovie} from "react-icons/bi";
import {BsDisplay} from "react-icons/bs"
import {useGlobalContext} from "../Context/Context.js"
import {Link} from "react-router-dom"


const Trending = () => {
	
	const [trends, setTrends] = useState([]);
	const {dataLoader, setDataLoader, defaultImg} = useGlobalContext();
	useEffect(() => {
		const fetchMovies = async() => {
			setDataLoader(true)
			try {
				const {data} = await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8");
				setTrends(data.results);
				setDataLoader(false)
			} catch (e) {
				console.log(e)
				setDataLoader(false)
			}
		}
		fetchMovies()
	}, [setDataLoader])
	
	return (
		  <div className="trend">
		    <h2 className="topic">What's trending?</h2>
		    {dataLoader ? <div className="data-loader">Loading...</div> : (<div className="trend-body">
		      {trends&&trends.map(trend => {
		      	const {id, title, poster_path, release_date, media_type, name, first_air_date} = trend;

		      	return (
		      	   <Link to={`/details/${id}`}><div className="trend-card" key={id}>
		      	      <img src={poster_path ? getPosterUrl(poster_path) : defaultImg} alt={media_type==="movie"?title:name}/>
		      	      <div className="trend-details">
		      	         <div className="vote-percent">{media_type==="movie"?<BiMovie/>:<BsDisplay/>}</div>
		      	         <h3>{media_type==="movie"?title:name }</h3>
		      	         <p>{media_type==="movie"?release_date:first_air_date}</p>
		      	      </div>
		      	   </div></Link>
		      	)
		      })}
		    </div>)}
		  </div>
		)
}

export default Trending