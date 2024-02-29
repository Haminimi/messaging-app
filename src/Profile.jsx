import { Link, useLoaderData, useParams } from 'react-router-dom';
import Loader from 'react-loaders';
import { useAuth } from './AuthProvider';

export async function loader({ params }) {
	try {
		const token = localStorage?.getItem('token');
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/users/${params.userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await response.json();
		const profile = data.user;
		return { profile };
	} catch (err) {
		console.error(err);
		return null;
	}
}

function Profile() {
	const auth = useAuth();
	const user = auth.user;
	const setUser = auth.setUser;
	const token = auth.token;
	const { userId } = useParams();
	const { profile } = useLoaderData();
	const isCurrentUserProfile = user?._id === userId;

	function isFriend() {
		return user.friends.some((friend) => friend === userId);
	}
	const friend = isFriend();

	async function addToFriends() {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/users/${user._id}/friends`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ friend: userId }),
				}
			);
			const data = await response.json();
			setUser(data.updatedUser);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="content-container">
			{user ? (
				isCurrentUserProfile ? (
					<div className="my-profile">
						<img
							src={`${import.meta.env.VITE_BACKEND_URL}/${
								user.avatar
							}`}
							className="profile-avatar"
						></img>
						<div className="my-profile-information">
							<h1 className="profile-user-name">
								{user.firstName} {user.lastName}
							</h1>
							<p className="profile-email">{user.email}</p>
							<p className="profile-about">{user.about}</p>
							<Link
								to={`/users/${user._id}/edit`}
								className="edit-link"
							>
								<button className="edit-button">Edit</button>
							</Link>
						</div>
					</div>
				) : (
					<div className="user-profile">
						<img
							src={`${import.meta.env.VITE_BACKEND_URL}/${
								profile?.avatar
							}`}
							className="profile-avatar"
						></img>
						<div className="user-profile-information">
							<h1 className="profile-user-name">
								{profile.firstName} {profile.lastName}{' '}
								<button
									className="favorite-button"
									onClick={addToFriends}
								>
									{friend ? (
										<span className="material-symbols-outlined favorite-icon-friend">
											favorite
										</span>
									) : (
										<span className="material-symbols-outlined favorite-icon">
											favorite
										</span>
									)}
								</button>
							</h1>
							<p className="profile-about">{profile.about}</p>
						</div>
					</div>
				)
			) : (
				<div className="loader-container">
					<Loader type="line-scale" active />
				</div>
			)}
		</div>
	);
}

export default Profile;
