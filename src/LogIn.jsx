import { Form, redirect, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './App';
import { ToastContainer, toast } from 'react-toastify';

function LogIn() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, []);

	function notifyError(message) {
		toast.error(message, {
			position: 'bottom-right',
			autoClose: false,
			/* theme: 'colored', */
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const { email, password } = e.target;
		const loginData = { email: email.value, password: password.value };
		try {
			const response = await fetch('http://localhost:3000/users/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(loginData),
			});
			const data = await response.json();
			if (data.success) {
				localStorage.setItem('token', data.token);
				setUser(data.user);
				return navigate(`/users/${data.user._id}`);
			} else {
				notifyError(data.message);
				return null;
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="content-container">
			<div className="log-in-container">
				<Form method="post" id="log-in-form" onSubmit={handleSubmit}>
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
						<button type="submit">Log In</button>
					</p>
				</Form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default LogIn;
