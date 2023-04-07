import Header from "../Components/Header.js";
import DiscoverMovies from "../Components/DiscoverMovies.js";
import Footer from "../Components/Footer.js";
import TopRated from "../Components/TopRated.js";
import {useState, useEffect} from "react"
import {useGlobalContext} from "../Context/Context.js";
import axios from "axios"
 import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {Link} from "react-router-dom"


const Movies = () => {
	
	const [ratedMovies, setRatedMovies] = useState([]);
	const {dataLoader, setDataLoader, defaultImg} = useGlobalContext()
	useEffect(() => {
		const fetchData = async() => {
			setDataLoader(true)
			try {
				const {data} = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8");
				setRatedMovies(data.results);
				setDataLoader(false)
			} catch (e) {
				console.log(e)
				setDataLoader(false)
			}
		}
		fetchData()
	}, []);
	
	const item = ratedMovies.map(rated => {
		const {id, title, poster_path, release_date, vote_average} = rated
		return(
    <Link to={`/details/${id}`}><div className="trend-card" key={id}>
		  <img src={poster_path ? getPosterUrl(poster_path) : defaultImg} alt={title}/>
		   <div className="trend-details">
		      <div className="vote-percent">{Math.floor(vote_average/10*100)}%</div>
		      <h3>{title }</h3>
		      <p>{release_date}</p>
        </div>
		</div></Link>
		)
	})
	
	return(
		<section>
		  <Header/> 
		  {dataLoader ? <div className="data-loader">Loading...</div> : <TopRated child={item}/>}
		  <DiscoverMovies/>
		  <Footer/>
		</section>
		)
}

export default Movies