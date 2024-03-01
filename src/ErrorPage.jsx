import { Link } from 'react-router-dom';

function ErrorPage() {
	return (
		<div className="error-page">
			<h1 className="error-header">
				Oops<span className="exclamation-mark">!</span>
			</h1>
			<p className="error-message">
				Sorry, an unexpected error has occurred.
			</p>
			<Link to="/">
				<button className="home-button">Home</button>
			</Link>
		</div>
	);
}

export default ErrorPage;
