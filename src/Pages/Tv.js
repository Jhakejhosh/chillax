import Header from "../Components/Header.js";
import DiscoverTv from "../Components/DiscoverTv.js";
import Footer from "../Components/Footer.js";
import TopRated from "../Components/TopRated.js";
import {useState, useEffect} from "react"
import {useGlobalContext} from "../Context/Context.js";
import axios from "axios"
import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {Link} from "react-router-dom"


const Tv = () => {
	
	const [ratedTv, setRatedTv] = useState([]);
	const {dataLoader, setDataLoader, defaultImg} = useGlobalContext()
	useEffect(() => {
		const fetchData = async() => {
			setDataLoader(true)
			try {
				const {data} = await axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8");
				setRatedTv(data.results);
				setDataLoader(false)
			} catch (e) {
				console.log(e)
				setDataLoader(false)
			}
		}
		fetchData()
	}, [setDataLoader]);
	
	const item = ratedTv.map(rated => {
		const {id, name, poster_path, first_air_date, vote_average} = rated
		return(
    <Link to={`/details/${id}`}><div className="trend-card" key={id}>
		  <img src={poster_path ? getPosterUrl(poster_path) : defaultImg} alt={name}/>
		   <div className="trend-details">
		      <div className="vote-percent">{Math.floor(vote_average/10*100)}%</div>
		      <h3>{name}</h3>
		      <p>{first_air_date}</p>
        </div>
		</div></Link>
		)
	})
	
	return(
		<section>
		  <Header/> 
		  {dataLoader ? <div className="data-loader">Loading...</div> : <TopRated child={item}/>}
		  <DiscoverTv/>
		  <Footer/>
		</section>
		)
}

export default Tv