import {AiOutlineHome} from "react-icons/ai";
import {BsArrowLeft} from "react-icons/bs"
import {Link} from "react-router-dom";
import {useGlobalContext} from "../Context/Context.js"

const HeaderNavigate = ({child}) => {
	
	const {navigate} = useGlobalContext();
	
	 return (
	 	  <div className="navigation">
	 	     <span onClick={() => navigate(-1)}><BsArrowLeft/></span>
	 	     <p>{child}</p>
	 	     <Link to="/"><span><AiOutlineHome/></span></Link>
	 	  </div>
	 	)
}
export default HeaderNavigate