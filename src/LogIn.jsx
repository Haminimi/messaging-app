import { Form, redirect } from 'react-router-dom';

export async function action({ request }) {
	const formData = await request.formData();
	const formattedData = Object.fromEntries(formData);
	//Log in a user here
	//const user = await logInUser(formattedData);
	return redirect(`/users/${user._id}`);
}

function LogIn() {
	return (
		<div className="content-container">
			<div className="log-in-container">
				<Form method="post" id="log-in-form">
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
		</div>
	);
}

export default LogIn;
