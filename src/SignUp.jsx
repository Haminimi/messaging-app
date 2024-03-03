import { useEffect } from 'react';
import { Form, redirect, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

async function createUser(userData) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/users`,
			{
				method: 'POST',
				body: userData,
			}
		);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
	}
}

export async function action({ request }) {
	const formData = await request.formData();
	const data = await createUser(formData);
	if (data.success) {
		return redirect('/login');
	} else {
		toast.error(data.error, {
			position: 'bottom-right',
			autoClose: false,
			theme: 'colored',
		});
		return null;
	}
}

function SignUp() {
	const auth = useAuth();
	const user = auth.user;
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, []);

	return (
		<div className="content-container">
			<div className="form-wrapper signup-form-wrapper">
				<Form
					id="signup-form"
					className="form"
					method="post"
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
					<div className="form-group">
						<label htmlFor="signup-form-avatar">
							<span>Avatar</span>
							<p className="choose-avatar-button" role="button">
								Choose File
							</p>
						</label>
						<input
							id="signup-form-avatar"
							type="file"
							name="avatar"
							accept="image/*"
							hidden
							aria-hidden="true"
						/>
					</div>
					<p className="signup-button-wrapper">
						<button type="submit" className="signup-button">
							Sign Up
						</button>
					</p>
				</Form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default SignUp;
