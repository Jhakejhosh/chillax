import {NavMenu} from "../Assests/Data/Menu.js";
import {BsCameraReels} from "react-icons/bs";
import {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import profile from "../Assests/Images/man.png"
import {useGlobalContext} from "../Context/Context.js";
import {signOut} from "firebase/auth";
import {auth} from "../Firebase/Firebase.js";
import {toast} from "react-toastify"


const Header = () => {
	
	const [showMenu, setShowMenu] = useState(false);
	const navMenu = useRef(null);
	const {user} = useGlobalContext()
	
	useEffect(() => {
		if(showMenu) {
			navMenu.current.style.width="80%"
		}else {
			navMenu.current.style.width="0"
		}
	}, [showMenu])
	
	//function for signing users out 
	const signUserOut = async() => {
		try {
			const result = await signOut(auth)
			console.log(result)
			toast.success("Log out successfull", {
				position:toast.POSITION.TOP_CENTER,
				autoClose:2000
			});
			setShowMenu(false)
		} catch (e) {
			toast.success(`${e.message}`, {
				position:toast.POSITION.TOP_CENTER
			});
		}
	}
	
	return (
		  <header>
		    <nav>
		      <div className="logo">
		         <span><BsCameraReels/>Chillax</span>
		      </div>
		      <div className="nav-menu" ref={navMenu}>
		        <div className="profile-details">
		           <div className="profile-img"><img src={user?user.photoURL||profile:profile} alt={user?user.displayName:"name"}/></div>
		           <h4>{user?user.displayName:"Hello Guest"}</h4>
		           <p>{user?user.email:"@example.com"}</p>
		        </div>
		         <ul>{NavMenu.map(list => {
		         	const {id, icon, menu, route, entails} = list;
		         	return (
		         	  <>
		         	    <Link to={route}><li key={id}><span>{icon}</span><p className="menu-name">{menu}<br/><p>{entails}</p></p></li></Link>
		         	  </>
		         	)
		         })}</ul>
		         {user ? (<span className="account" onClick={signUserOut}>Log out</span>):(<Link to="/Login"><span className="account">Create an account</span></Link>)}
		      </div>
		         {/*menu for desktop view*/}
		         <ul class="deskstop-menu">{NavMenu.map(list => {
		         	const {id, icon, menu, route, entails} = list;
		         	return (
		         	  <>
		         	    <Link to={route}><li key={id}><span>{icon}</span><p className="menu-name">{menu}<br/><p>{entails}</p></p></li></Link>
		         	  </>
		         	)
		         })}</ul>
		      
		      <div className="profile-bar" onClick={() => setShowMenu(!showMenu)}>
		      
		         {user ? (<span className="desktop-account" onClick={signUserOut}>Logout</span>):(<Link to="/Login"><span className="desktop-account">Login</span></Link>)}
		      
		         <div className="profile">
		            <img src={user?user.photoURL||profile:profile} alt={user?user.displayName:"name"} />
		         </div>
		         <span className="btn-toggle">{showMenu ? <FaAngleDown/> : <FaAngleUp/>}</span>
		      </div>
		    </nav>
		  </header>
		)
}

export default Header