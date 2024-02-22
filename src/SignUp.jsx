import { Form, redirect } from 'react-router-dom';

export async function action({ request }) {
	const formData = await request.formData();
	const formattedData = Object.fromEntries(formData);
	//Create a user here
	//await createUser(formattedData);
	return redirect('/login');
}

function SignUp() {
	return (
		<div className="content-container">
			<Form method="post" id="edit-form">
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
					<span>Username</span>
					<input
						type="text"
						name="username"
						placeholder="johndoe"
						minLength={1}
						required
					/>
				</label>
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
						pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
						title="Must contain at least one letter, one digit, one special character, and be at least 8 characters long."
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
	);
}

export default SignUp;
