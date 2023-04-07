import {useState, useEffect} from "react"
import {useGlobalContext} from "../Context/Context.js";
import axios from "axios"
 import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {Link} from "react-router-dom"


const DiscoverTv = () => {
	
	const [discoverTv, setDiscoverTv] = useState([]);
	const {dataLoader, setDataLoader, defaultImg} = useGlobalContext()
	useEffect(() => {
		const fetchData = async() => {
			setDataLoader(true)
			try {
				const {data} = await axios.get("https://api.themoviedb.org/3/discover/tv?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8");
				setDiscoverTv(data.results);
				setDataLoader(false)
			} catch (e) {
				console.log(e)
				setDataLoader(false)
			}
		}
		fetchData()
	}, []);
	
	return (
		  <div className="discover">
		     <h3 className="discover-topic">Check out the tv series</h3>
		    { dataLoader ? (<div className="data-loader">Loading...</div>) : (<div className="discover-body">
		      {discoverTv.map(discover => {
		      	const {id, name, poster_path, first_air_date, vote_average} = discover;
		      	return (
		      	   <Link to={`/details/${id}`}><div className="discover-card" key={id}>
		      	      <img src={poster_path ? getPosterUrl(poster_path) : defaultImg} alt={name}/>
		      	      <div className="discover-details">
		      	         <div className="vote-percent">{Math.floor(vote_average/10*100)}%</div>
		      	         <h3>{name}</h3>
		      	         <p>{first_air_date}</p>
		      	      </div>
		      	   </div></Link>
		      	)
		      })}
		    </div>)}
		  </div>
		)
}

export default DiscoverTv