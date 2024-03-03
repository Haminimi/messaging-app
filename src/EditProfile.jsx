import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

function EditProfile() {
	const auth = useAuth();
	const user = auth.user;
	const setUser = auth.setUser;
	const token = auth.token;
	const navigate = useNavigate();
	const { userId } = useParams();
	const formRef = useRef();
	const [first, setFirst] = useState(user.firstName);
	const [last, setLast] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [about, setAbout] = useState(user.about);

	async function updateUser(userData) {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/users/${user._id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: userData,
				}
			);
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
				theme: 'colored',
			});
			return null;
		}
	}

	return (
		<div className="content-container">
			<div className="form-wrapper edit-form-wrapper">
				<form
					id="edit-form"
					className="form"
					ref={formRef}
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
					<label>
						<span>About me</span>
						<textarea
							name="about"
							rows={6}
							value={about}
							onChange={(e) => setAbout(e.target.value)}
						/>
					</label>
					<div className="form-group">
						<label htmlFor="edit-form-avatar">
							<span>Avatar</span>
							<p
								className="choose-avatar-button"
								role="button"
								tabIndex={0}
							>
								Choose File
							</p>
						</label>
						<input
							id="edit-form-avatar"
							type="file"
							name="avatar"
							accept="image/*"
							hidden
							aria-hidden="true"
						/>
					</div>
					<p className="edit-form-buttons">
						<button type="submit" className="save-button">
							Save
						</button>
						<button
							type="button"
							onClick={() => navigate(-1)}
							className="cancel-button"
						>
							Cancel
						</button>
					</p>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default EditProfile;
