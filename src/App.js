import React from "react"
import './App.css';
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom" ;
import Home from "./Pages/Home.js";
import Bookmark from "./Pages/Bookmark.js";
import Movies from "./Pages/Movies.js";
import Tv from "./Pages/Tv.js";
import Register from "./Pages/Register.js";
import People from "./Pages/People.js"
import Login from "./Pages/Login.js";
import Person from "./Pages/Person.js";
import SingleContent from "./Pages/SingleContent.js"
import Loading from "./Components/Loading.js";
import {Helmet} from "./Components/Helmet.js"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
	
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		setLoading(true) ;
		setTimeout(() => {
			setLoading(false)
		}, 3000);
	}, []);
	
  return (
    <>
    		<ToastContainer theme="colored"/>
    {
    	loading ? (<><Loading/></>) : (
    		<>
       <Routes>
         <Route path="/" element={<Helmet title="Home"><Home/></Helmet>} exact/>
         <Route path="/watchlist" element={<Helmet title="Watchlist"><Bookmark/></Helmet>} exact/>
         <Route path="/SignUp" element={<Helmet title="Sign-up"><Register/></Helmet>} />
         <Route path="/Login" element={<Helmet title="Login"><Login/></Helmet>} />
         <Route path="/movies" element={<Helmet title="Movies"><Movies/></Helmet>} />
         <Route path="/tv" element={<Helmet title="Tv"><Tv/></Helmet>} />
         <Route path="/people" element={<Helmet title="People"><People/></Helmet>} />
         <Route path="/details/:id" element={<SingleContent/>}/>
         <Route path="/person/:id" element={<Person/>}/>
       </Routes>  
    		</>
    		)
    }

    </>
  );
}

export default App;
