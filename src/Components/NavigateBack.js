import {BsArrowLeft} from "react-icons/bs"
import {useGlobalContext} from "../Context/Context.js"

const NavigateBack = () => {
	
	const {navigate} = useGlobalContext();
	
	 return (
	 	  <div className="navigation">
	 	     <span onClick={() => navigate(-1)}><BsArrowLeft/></span>
	 	  </div>
	 	)
}
export default NavigateBack