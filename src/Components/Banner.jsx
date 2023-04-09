import {useState, useEffect} from "react"
import axios from "axios"
import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {useGlobalContext} from "../Context/Context.js";
import {BsFillStarFill} from "react-icons/bs"
import AliceCarousel from "react-alice-carousel"


const Banner = () => {
	
	const {defaultImg, setDataLoader, dataLoader} = useGlobalContext();
	const [bannerImg, setBannerImg] = useState([]);
	
useEffect(() => {
	const fetchMovie = async() => {
		setDataLoader(true)
		try {
			const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8`);
			setBannerImg(data.results)
			setDataLoader(false)
		} catch (e) {
			console.log(e)
		}
	}
	fetchMovie()
	}, [setDataLoader])

	
	const items = bannerImg.map((data) => {
		const {id, backdrop_path, title, poster_path,vote_average} = data;
		
		return(
			  <div className="banner-info" key={id}>
			    <img src={backdrop_path?getPosterUrl(backdrop_path):defaultImg} alt={title} className="banner-img"/>
			    <img src={poster_path?getPosterUrl(poster_path):defaultImg} alt={title} className="banner-poster"/>
			    <div className="banner-overlay"></div>
			    <div className="banner-text">
			      <h3>{title}</h3>
			      <span><BsFillStarFill style={{marginRight:"0.5rem", color:"var(--secondary-color"}}/><p>{vote_average}</p></span>
			    </div>
			  </div>
			)
	})
	
	return (
		   <div className="banner">
		    {dataLoader ? <div className="data-loader">Loading...</div> : (<AliceCarousel items={items} autoPlay animationDuration={1000} autoPlayInterval={5000} disableDotsControls mouseTracking infinite disableButtonsControls animationType="slide"/>)}
		   </div>
		)
}

export default Banner