import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import Loader from 'react-loaders';
import Chats from './Chats';

function Index() {
	const auth = useAuth();
	const user = auth.user;
	const token = auth.token;
	const navigate = useNavigate();
	const [friends, setFriends] = useState([]);
	const [loadingFriends, setLoadingFriends] = useState(true);

	useEffect(() => {
		async function fetchFriends() {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/users/${
						user?._id
					}/friends`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				if (data.success) {
					setFriends(data.friends);
				} else {
					console.error(data.error);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoadingFriends(false);
			}
		}

		if (user) {
			fetchFriends();
		}
	}, [user, token]);

	async function openChat(friendId) {
		try {
			const users = [friendId, user._id];
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/users/${user?._id}/chats`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ users }),
				}
			);
			const data = await response.json();
			if (data.success) {
				navigate(`/users/${user._id}/chats/${data.chat._id}`);
			} else {
				console.error(data.error);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="content-container">
			{user ? (
				<div className="home-container">
					<Chats />
					<div className="friends">
						<h2 className="friends-header">Friends</h2>
						{loadingFriends ? (
							<Loader type="line-scale" active />
						) : (
							<div className="friends-list">
								{friends.length ? (
									friends.map((friend) => (
										<div
											key={friend._id}
											className="friend"
										>
											<Link
												to={`users/${friend._id}`}
												className="friend-avatar-and-name"
											>
												<img
													src={`${
														import.meta.env
															.VITE_BACKEND_URL
													}/${friend.avatar}`}
													className="friend-avatar"
												/>
												<p className="friend-name">
													{friend.first} {friend.last}
												</p>
											</Link>
											<button
												className="message-button"
												aria-label="Open chat"
											>
												<span
													className="material-symbols-outlined mail-icon"
													onClick={() =>
														openChat(friend._id)
													}
													aria-hidden="true"
												>
													mail
												</span>
											</button>
										</div>
									))
								) : (
									<p>No results.</p>
								)}
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="home-login">
					<h1 className="home-login-message">
						<span className="welcome-word">Welcome</span>, log in or
						sign up if you don't have an account.
					</h1>
					<div className="home-login-buttons">
						<Link to="/login">
							<button className="home-login-button">
								Log In
							</button>
						</Link>
						<Link to="/signup">
							<button className="home-signup-button">
								Sign Up
							</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default Index;
