import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import NavigateBack from "../Components/NavigateBack.js";
import {useState, useEffect} from "react"
import axios from "axios"
import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {useGlobalContext} from "../Context/Context.js";
import {useParams, Link} from "react-router-dom";
import {BiMovie} from "react-icons/bi";
import {BsBookmark, BsDisplay, BsFillStarFill} from "react-icons/bs"


const Person = () => {
	
	const {defaultImg, setDataLoader, dataLoader} = useGlobalContext();
	const {id} = useParams();
	const [readMore, setReadMore] = useState(false);
	
	//function for fetching person info
	const [personInfo, setPersonInfo] = useState([]);
	const fetchPerson = async() => {
		try {
			const {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8`);
			setPersonInfo(data)
		} catch (e) {
			console.log(e)
		}
	}
	//function for fetching person other movies 
	const [personMovie, setPersonMovie] = useState([]);
	const fetchPersonMovie = async() => {
		setDataLoader(true)
		try {
			const {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8`);
			setPersonMovie(data.cast)
			setDataLoader(false)
		} catch (e) {
			console.log(e)
		}
	}
	
	useEffect(() => {
		window.scroll(0, 0)
		fetchPerson()
		fetchPersonMovie()
	}, [id])
	
	const {biography, birthday, death_day, known_for_department, name, place_of_birth, profile_path, also_known_as, gender} = personInfo;
	
	return (
		  <>
		    <Header/>
		    <div className="person">
		       <NavigateBack/>
		       <main>
		         <div className="img-space">
		           <img src={profile_path?getPosterUrl(profile_path):defaultImg} alt={name}/>
		           <h3>{name}</h3>
		           {also_known_as&&<p>{also_known_as[0]}</p>}
		         </div>
		         <div className="person-details">
		           <div className="person-info">
		             <h3>Personal info</h3>
		             <div className="person-list">
		               <div className="person-card">
		                 <h3>Place of birth</h3>
		                 <p>{place_of_birth?place_of_birth:"--"}</p>
		               </div>
		               <div className="person-card">
		                 <h3>Role</h3>
		                 <p>{known_for_department?known_for_department:"--"}</p>
		               </div>
		               <div className="person-card">
		                 <h3>Gender</h3>
		                 <p>{
		                 	gender===1?"Female":"Male"
		                 }</p>
		               </div>
		               <div className="person-card">
		                 <h3>Date of birth</h3>
		                 <p>{birthday?birthday:"--"}</p>
		               </div>
		               {death_day&&(<div className="person-card">
		                 <h3>Death day</h3>
		                 <p>{death_day}</p>
		               </div>)}
		             </div>
		           </div>
		           <div className="biography">
		             <h3>Biography</h3>
		             <p>{readMore?biography:biography&&`${biography.substring(0, 200)}...`}</p>
		             <span onClick={() => setReadMore(!readMore)}>{readMore?"Show less":"Read more"}</span>
		           </div>
		         </div>
		       </main>
		       <div className="other-cast">
		         <h3>Movies featured</h3>
		         {dataLoader ? <div className="data-loader">Loading...</div> : (<div className="feature-body">
		           {personMovie.map(person => {
		           	const {id, name, title, release_date, first_air_date, vote_average, media_type, poster_path} = person;
		           	return (
		      	     <Link to={`/details/${id}`}><div className="trend-card" key={id}>
		      	       <img src={poster_path ? getPosterUrl(poster_path) : defaultImg} alt={media_type==="movie"?title:name}/>
		      	       <div className="bookmark"><span><BsBookmark/></span></div>
		      	       <div className="feature-details">
		      	         <div className="vote-percent">{media_type==="movie"?<BiMovie/>:<BsDisplay/>}</div>
		      	         <div className="vote-rate">
		      	           <BsFillStarFill style={{color:"var(--secondary-color", marginRight:"0.2rem"}}/><p>{vote_average}</p>
		      	         </div>
		      	         <h3>{media_type==="movie"?title:name }</h3>
		      	      </div>
		      	   </div></Link>
		           	)
		           })}
		         </div>)}
		       </div>
		    </div>
		    <Footer/>
		  </>
		)
}

export default Person