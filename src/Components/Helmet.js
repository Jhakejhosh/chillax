//This function is for easy tracking of the document title
export const Helmet = ({children, title}) => {
	document.title = "Chillax/" + title;
	return children
}
