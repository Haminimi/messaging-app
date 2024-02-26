import { Form, redirect, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from './AuthProvider';

function LogIn() {
	const auth = useAuth();
	/* const user = auth.user; */

	/* 	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, []); */

	function notifyError(message) {
		toast.error(message, {
			position: 'bottom-right',
			autoClose: false,
			/* theme: 'colored', */
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = e.target;
		const loginData = { email: email.value, password: password.value };
		if (email !== '' && password !== '') {
			const response = auth.logInAction(loginData);
			if (response.error) {
				notifyError(response.error);
			}
		}
	};

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
