import HeaderNavigate from "../Components/HeaderNavigate.jsx";
import greet from "../Assests/Images/handshake-2.png";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {FaFacebookF} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc"
import {useGlobalContext} from "../Context/Context.js";
import {Link} from "react-router-dom";
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from "firebase/auth"
import {auth} from "../Firebase/Firebase.js";
import {toast} from "react-toastify"
import {useState} from "react"

const Login = () => {
	
	const {showPassword, setShowPassword, error, setError, navigate} = useGlobalContext()
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//function handling submitting
	const handleSubmit = async(e) => {
		e.preventDefault();
		if(!email || !password) {
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
		//logic for logging user with email and password
		try {
			const result = await signInWithEmailAndPassword(auth, email, password)
			console.log(result)
			toast.success(`Welcome back! ${result.user.displayName}`, {
				position:toast.POSITION.TOP_CENTER,
				autoClose:2000
			});
		} catch (e) {
			toast.error(`${e.message}`, {
				position:toast.POSITION.TOP_CENTER
			})
		}
	}
	
	//function for signing in with google account 
	const googleProvider = new GoogleAuthProvider();
	const googleSignIn = async() => {
		try {
			const result = await signInWithPopup(auth, googleProvider)
			console.log(result);
			toast.success(`Welcome! ${result.user.displayName}`, {
				position:toast.POSITION.TOP_CENTER,
				autoClose:2000
			});
		} catch (e) {
			toast.error(`${e.message}`, {
				position:toast.POSITION.TOP_CENTER
			})
		}
	}
	
	// function for forget password
	const forgotPassword = async() => {
		if(email){
			await sendPasswordResetEmail(auth, email)
		}
	}
	
	return (
		  <div className="container">
		   <div className="header"><HeaderNavigate child="Sign in"/>
		     <img src={greet} alt="Login"/>
		   </div>
		   <div className="login-body">
		      <h3>Welcome back!</h3>
		      <p>Hello there, login to continue</p>
		      <div className="social-login">
		         <button className="google" onClick={googleSignIn}><span><FcGoogle/></span>Signin with Google</button>
		      </div>
		      <p className="or">Or signin with</p>
		      <form onSubmit={handleSubmit}>
		         <label for="email">Email</label>
		         <input type="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
		         <small>{error.message}</small>
		         <label for="password">Password</label>
		         <div className="password">
		            <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
		            <small>{error.message}</small>
		            <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <BsEye/> : <BsEyeSlash/>}</span>
		         </div>
		         <p className="forgot-pwd" onClick={forgotPassword}>Forgot password ?</p>
		         <button type="submit" className="login-acct">Login account</button>
		         <p>Don't have an account ? <span className="text-signin"><Link to="/Signup">Sign up</Link></span></p>
		      </form>
		   </div>
		  </div>
		)
}

export default Login
