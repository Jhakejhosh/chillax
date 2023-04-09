import {BsBookmark} from "react-icons/bs";
import {BiMovie} from "react-icons/bi";
import {BsPeople, BsDisplay} from "react-icons/bs"
import {AiOutlineHome} from "react-icons/ai"


export const NavMenu = [{
	id: 1,
	icon: <AiOutlineHome/>,
	menu: "Home",
	route:"/",
	entails: "Search, trending, upcoming movies, popular tv"
},
{
	id: 2,
	icon: <BiMovie/>,
	menu: "Movies",
	route: "/movies",
	entails: "Top rated movies, discover movies"
},
{
	id: 3,
	icon: <BsDisplay/>,
	menu: "Tv",
	route: "/tv",
	entails: "Top rated tv series, discover tv series"
},
{
	id: 4,
	icon: <BsPeople/>,
	menu: "People",
	route: "/people",
	entails: "Search, popular people"
},
{
	id: 5,
	icon: <BsBookmark/>,
	menu: "Watchlist",
	route: "/",
	entails: "Watchlisted movies and tv series"
}]