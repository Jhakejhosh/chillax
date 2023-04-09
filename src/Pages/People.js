import Header from "../Components/Header.js"
import Footer from "../Components/Footer.js"
import {useState, useEffect} from "react"
import {useGlobalContext} from "../Context/Context.js"
import axios from "axios"
import {getPosterUrl} from "../Assests/Api/ApiFetched.jsx";
import {Link} from "react-router-dom"


const People = () => {
	const {setDataLoader, dataLoader, defaultImg, searchValue, setSearchValue, people} = useGlobalContext();
	const [searchPeople, setSearchPeople] = useState([])

	//function for fetching the searched name of people
	useEffect(() => {
		const fetchSearchData = async() => {
			setDataLoader(true);
			try {
				const {data} = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=7ada39f589e8d8cd88ab2c2cf3ca6cb8&language=en-US&query=${searchValue}&page=1&include_adult=false`);
				setSearchPeople(data.results);
				setDataLoader(false)
			} catch (e) {
				console.log(e)
				setDataLoader(false)
			}
		}
		fetchSearchData()
	}, [searchValue, setDataLoader])
	return (
		<div className="container">
		   <Header/>
		   <form className="search-people">
		     <input placeholder="Search for celebs..." type="search" value={searchValue} onChange={e => {setSearchValue(e.target.value)}}/>
		   </form>
		   {searchValue ? (
		   <div className="people">
		     <p className="search-result">{`"${searchPeople.length}" search result${searchPeople.length > 1 ? "s" : ""} for "${searchValue}"`}</p>
		  {dataLoader ? (<div className="data-loader">Loading...</div>) : (<div className="people-body">
		   {searchPeople.length >= 1 ? searchPeople.map(item => {
		   	const {id, name, profile_path, known_for_department} = item;
		   	return (
		      	   <Link to={`/person/${id}`}><div className="people-card" key={id}>
		      	      <img src={profile_path ?
                     getPosterUrl(profile_path) : defaultImg} alt={name}/>
		      	      <div className="people-details">
		      	         <h3>{name}</h3>
		      	         <p>{known_for_department}</p>
		      	      </div>
		      	   </div></Link>
		   		)
		   }) : (<div className="not-found">Celeb name not found...</div>)}
		  </div>)}
		  </div>
		   	)
		   : (<div className="people">
		     <h3>Popular People</h3>
		     {dataLoader ? <div className="data-loader2">Loading...</div> : (<div className="people-body">{people.map(person => {
		     	const {id, profile_path, name, known_for_department} = person;
		     	return (
		     	  <Link to={`/person/${id}`}><div className="people-card" key={id}>
		     	    <img src={profile_path ? getPosterUrl(profile_path) : defaultImg} alt={name}/>
		     	    <div className="people-details">
		     	      <h3>{name}</h3>
		     	      <p>{known_for_department}</p>
		     	    </div>
		     	  </div></Link>
		     	)
		     })}</div>)}
		   </div>)}
		   <Footer/>
	  </div>
		)
}

export default People