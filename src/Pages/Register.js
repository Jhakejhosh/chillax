import HeaderNavigate from "../Components/HeaderNavigate.jsx";
import greet from "../Assests/Images/handshake-2.png";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {useGlobalContext} from "../Context/Context.js";
import {Link} from "react-router-dom"
import {useState} from "react"
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"
import {auth, db} from "../Firebase/Firebase.js";
import {toast} from "react-toastify"


const Register = () => {
	
	const {showPassword, setShowPassword, error, setError, navigate} = useGlobalContext()
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//function handling submitting
	const handleSubmit = (e) => {
		e.preventDefault();
		if(!fullname || !email || !password) {
			setError({
				open:true,
				message:"Please fill in the space"
			})
			return
		}else {
			setError({
				open:false,
				message:""
			})
		}
		//logic for creating user with email, full name and password
			createUserWithEmailAndPassword(auth, email, password).then(() => {
				return updateProfile(auth.currentUser, {
					displayName:fullname,
				})
			}).then(result => {
			console.log(result)
			toast.success("Sign in successfull, Welcome!", {
				position:toast.POSITION.TOP_CENTER,
				autoClose:2000
			});
			setDoc(doc(db, "users", email), {
				watchlist:[]
			})
			navigate("/")
			}).catch(e =>{
			toast.error(`${e.message}`, {
				position:toast.POSITION.TOP_CENTER
			})
		})
	}
	
	return (
		 <div className="container">
		   <div className="header"><HeaderNavigate child="Register account"/>
		     <img src={greet} alt="register"/>
		   </div>
		   <div className="register-body">
		      <h3>Hello</h3>
		      <p>Create an account to continue</p>
		      <form onSubmit={handleSubmit}>
		         <label for="name">Your name</label> 
		         <input type="text" placeholder="Full name" value={fullname} onChange={e => setFullname(e.target.value)}/>
	           <small>{error.message}</small>
		         <label for="email">Email</label> 
		         <input type="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
		         <small>{error.message}</small>
		         <label for="password">Password</label>
		         <div className="password">
		            <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
	              <small>{error.message}</small>
		            <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <BsEye/> : <BsEyeSlash/>}</span>
		         </div>
		         <button type="submit" className="create-acct">Create an account</button>
		         <p>Already have an account ? <span className="text-signin"><Link to="/Login">Sign in</Link></span></p>
		      </form>
		   </div>
		 </div>
		)
}

export default Register;