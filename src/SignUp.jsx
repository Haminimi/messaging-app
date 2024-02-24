import { Form, redirect, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './App';
import { ToastContainer, toast } from 'react-toastify';

async function createUser(userData) {
	try {
		const response = await fetch('http://localhost:3000/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
	}
}

export async function action({ request }) {
	const formData = await request.formData();
	const formattedData = Object.fromEntries(formData);
	const data = await createUser(formattedData);
	if (data.success) {
		return redirect('/login');
	} else {
		toast.error(data.error, {
			position: 'bottom-right',
			autoClose: false,
			/* theme: 'colored', */
		});
		return null;
	}
}

function SignUp() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, []);

	return (
		<div className="content-container">
			<div className="sign-up-container">
				<Form
					method="post"
					id="sign-up-form"
					encType="multipart/form-data"
				>
					<p>
						<span>Name</span>
						<input
							placeholder="First"
							aria-label="First name"
							type="text"
							name="first"
							minLength={1}
							required
						/>
						<input
							placeholder="Last"
							aria-label="Last name"
							type="text"
							name="last"
							minLength={1}
							required
						/>
					</p>
					<label>
						<span>Email</span>
						<input
							placeholder="john@gmail.com"
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
							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?])[A-Za-z\d@$!%*#?]{8,}$"
							title="Must contain at least one uppercase and lowercase letter, one digit, one special character, and be at least 8 characters long."
							required
						/>
					</label>
					<label>
						<span>Confirm password</span>
						<input
							type="password"
							name="confirmPassword"
							minLength={8}
							required
						/>
					</label>
					<label>
						<span>About me</span>
						<textarea name="about" rows={3} />
					</label>
					<label>
						<span>Avatar</span>
						<input type="file" name="avatar" />
					</label>
					<p>
						<button type="submit">Sign Up</button>
					</p>
				</Form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default SignUp;
