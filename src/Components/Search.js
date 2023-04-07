import {BiSearch} from "react-icons/bi";
import {useGlobalContext} from "../Context/Context.js"


const Search = ({child}) => {
	
  const {setSearchValue, searchValue} = useGlobalContext()	
	
	return (
		  <form className="search">
		     <input type="search" placeholder={child} onChange={e => setSearchValue(e.target.value)} value={searchValue}/>
		     <button type="submit"><BiSearch/></button>
		  </form>
		)
}
export default Search