import {
	Form,
	useLoaderData,
	redirect,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from './AuthProvider';

function EditProfile() {
	const navigate = useNavigate();
	const { userId } = useParams();
	const formRef = useRef();
	const auth = useAuth();
	const user = auth.user;
	const setUser = auth.setUser;
	const [first, setFirst] = useState(user.firstName);
	const [last, setLast] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [about, setAbout] = useState(user.about);

	async function updateUser(userData) {
		try {
			const response = await fetch('http://localhost:3000/users/edit', {
				method: 'POST',
				body: userData,
			});
			const data = await response.json();
			return data;
		} catch (err) {
			console.error(err);
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const form = formRef.current;
		const formData = new FormData(form);
		const avatar = formData.get('avatar');
		if (avatar.name === '') {
			formData.set('avatar', user.avatar);
		}
		formData.append('_id', userId);
		const data = await updateUser(formData);
		if (data.success) {
			setUser(data.updatedUser);
			return navigate(`/users/${userId}`);
		} else {
			toast.error(data.error, {
				position: 'bottom-right',
				autoClose: false,
			});
			return null;
		}
	}

	return (
		<div className="content-container">
			<Form
				ref={formRef}
				id="edit-form"
				onSubmit={handleSubmit}
			>
				<p>
					<span>Name</span>
					<input
						placeholder="First"
						aria-label="First name"
						type="text"
						name="first"
						value={first}
						onChange={(e) => setFirst(e.target.value)}
					/>
					<input
						placeholder="Last"
						aria-label="Last name"
						type="text"
						name="last"
						value={last}
						onChange={(e) => setLast(e.target.value)}
					/>
				</p>
				<label>
					<span>Email</span>
					<input
						placeholder="jack@gmail.com"
						type="text"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				{/* <label>
					<span>Password</span>
					<input
						type="password"
						name="password"
						defaultValue={user.password}
					/>
				</label> */}
				<label>
					<span>About me</span>
					<textarea
						name="about"
						rows={6}
						value={about}
						onChange={(e) => setAbout(e.target.value)}
					/>
				</label>
				<label>
					<span>Avatar</span>
					<input
						type="file"
						name="avatar"
						accept="image/*"
					/>
				</label>
				<p>
					<button type="submit">Save</button>
					<button type="button" onClick={() => navigate(-1)}>
						Cancel
					</button>
				</p>
			</Form>
			<ToastContainer />
		</div>
	);
}

export default EditProfile;
