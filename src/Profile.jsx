import {
	Form,
	useLoaderData,
	Link,
	useFetcher,
	useNavigate,
	useLocation,
	useParams,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from './App';
import { useContext } from 'react';
import { useEffect } from 'react';
import userAvatar from './assets/user.png';
import { useAuth } from './AuthProvider';
/* import { ObjectId } from 'mongodb'; */

export async function loader({ params }) {
	try {
		const token = localStorage?.getItem('token');
		const response = await fetch(
			`http://localhost:3000/users/${params.userId}`,
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
		console.log(err);
		return null;
	}
}

function User() {
	const auth = useAuth();
	const user = auth.user;
	const token = auth.token;
	const setUser = auth.setUser;
	const { userId } = useParams();
	const {profile} = useLoaderData()
	const isCurrentUserProfile = user?._id === userId;

	function isFriend() {
		return user?.friends.some((friend) => friend === userId);
	}
	const friend = isFriend();

	async function addToFriends() {
		try {
			const response = await fetch(
				`http://localhost:3000/users/${user._id}/friends`,
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
							src={`http://localhost:3000${user?.avatar}`}
							className="profile-avatar"
						></img>
						<div className="my-profile-information">
							<h1>
								{user?.firstName} {user?.lastName}
							</h1>
							<p>{user?.email}</p>
							<p>{user?.about}</p>
							<div className="my-profile-buttons">
								<Link to={`/users/${user?._id}/edit`}>
									<button>Edit</button>
								</Link>
							</div>
						</div>
					</div>
				) : (
					<div className="user-profile">
						<img
							src={`http://localhost:3000${profile?.avatar}`}
							className="profile-avatar"
						></img>
						<div className="my-profile-information">
							<h1>
								{profile?.firstName} {profile?.lastName}{' '}
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
							<p>{profile?.about}</p>
						</div>
					</div>
				)
			) : (
				<h1>Loading</h1>
			)}
			<ToastContainer />
		</div>
	);
}

export default User;
