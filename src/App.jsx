import { Outlet, useNavigation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthProvider from './context/AuthProvider';
import './stylesheets/App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'loaders.css/loaders.min.css';

function App() {
	const navigation = useNavigation();

	return (
		<AuthProvider>
			<div className="main-container">
				<Sidebar />
				<div
					id="outlet-container"
					className={
						navigation.state === 'loading' ? 'outlet-loading' : ''
					}
				>
					<Outlet />
				</div>
			</div>
		</AuthProvider>
	);
}

export default App;
