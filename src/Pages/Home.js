import Header from "../Components/Header.js";
import Search from "../Components/Search.js";
import Trending from "../Components/Trending.js";
import Upcoming from "../Components/Upcoming.js";
import Banner from "../Components/Banner.jsx";
import Popular from "../Components/Popular.js";
import Footer from "../Components/Footer.js";
import SearchContainer from "../Components/SearchContainer.js"
import {useGlobalContext} from "../Context/Context.js"


const Home = () => {
	const {searchValue} = useGlobalContext()
	return (
		 <section>
		   <Header/>
		   <Banner/>
		   <Search child="Search for movies and tv..."/>
		   {searchValue ? <SearchContainer/> : (<>
		   <Trending/>
		   <Upcoming/>
		   <Popular/></>)}
		   <Footer/>
		 </section>
		)
}

export default Home;