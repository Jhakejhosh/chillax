import axios from "axios";

export default axios.create({
	base_url: "https://api.themoviedb.org/3",
	params: {
		api_key: "7ada39f589e8d8cd88ab2c2cf3ca6cb8"
	}
});

export const getPosterUrl = (poster) => {
	return `https://image.tmdb.org/t/p/w500/${poster}`
}