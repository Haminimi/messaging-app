import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

function LogIn() {
	const auth = useAuth();
	const user = auth.user;
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, []);

	function notifyError(message) {
		toast.error(message, {
			position: 'bottom-right',
			autoClose: false,
			theme: 'colored',
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = e.target;
		const loginData = { email: email.value, password: password.value };
		if (email !== '' && password !== '') {
			const response = await auth.login(loginData);
			if (response?.error) {
				notifyError(response.error);
			}
		}
	};

	return (
		<div className="content-container">
			<div className="login-form-wrapper">
				<form method="post" id="login-form" onSubmit={handleSubmit}>
					<label>
						<span>Email</span>
						<input
							placeholder="jack@gmail.com"
							type="email"
							name="email"
							required
						/>
					</label>
					<label>
						<span>Password</span>
						<input
							type="password"
							name="password"
							minLength={8}
							required
						/>
					</label>
					<p>
						<button type="submit" className="login-button">
							Log In
						</button>
					</p>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default LogIn;
