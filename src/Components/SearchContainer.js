import {useGlobalContext} from "../Context/Context.js"
import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {MdRemoveFromQueue} from "react-icons/md";
import {BiCameraMovie} from "react-icons/bi";
import {Link} from "react-router-dom"


const SearchContainer = () => {
	const {search, dataLoader, searchValue, defaultImg} = useGlobalContext()
	return (
		<>
		     <p className="search-result">{`"${search.length}" search result${search.length > 1 ? "s" : ""} for "${searchValue}"`}</p>
		  {dataLoader ? (<div className="data-loader">Loading...</div>) : (<div className="search-body">
		   {search.length >= 1 ? search.map(item => {
		   	const {id, name, title, poster_path, release_date, first_air_date, media_type} = item;
		   	return (
		      	   <Link to={`/details/${id}`}><div className="discover-card" key={id}>
		      	      <img src={poster_path ? getPosterUrl(poster_path) : defaultImg} alt={title || name}/>
		      	      <div className="discover-details">
		      	         <div className="vote-percent">{media_type==="movie"?<BiCameraMovie/>:<MdRemoveFromQueue/>}</div>
		      	         <h3>{title || name}</h3>
		      	         <p>{release_date || first_air_date}</p>
		      	      </div>
		      	   </div></Link>
		   		)
		   }) : (<div className="not-found">Movies and Tv name not found...</div>)}
		  </div>)}
		  </>
		)
}

export default SearchContainer