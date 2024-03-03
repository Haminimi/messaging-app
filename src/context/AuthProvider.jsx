import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'react-loaders';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [loadingUser, setLoadingUser] = useState(true);

	async function checkAuth() {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/users/isUserAuth`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			if (data.success) {
				setUser(data.user);
			} else {
				logout();
			}
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
			setLoadingUser(false);
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			await checkAuth();
		};
		fetchData();
	}, []);

	async function login(loginData) {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/users/login`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(loginData),
				}
			);
			const data = await response.json();
			if (data.success) {
				setUser(data.user);
				setToken(data.token);
				localStorage.setItem('token', data.token);
				navigate(`/`);
			} else {
				const error = data.message;
				return { error };
			}
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingUser(false);
		}
	}

	async function logout() {
		try {
			setUser(null);
			setToken('');
			localStorage.removeItem('token');
		} catch (err) {
			console.error(err);
		}
	}

	if (loading || loadingUser) {
		return (
			<div className="loader-container">
				<Loader type="line-scale" active />
			</div>
		);
	}

	return (
		<AuthContext.Provider
			value={{ user, setUser, token, login, logout, checkAuth }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
